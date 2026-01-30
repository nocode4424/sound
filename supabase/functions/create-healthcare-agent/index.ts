import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    console.log('Creating healthcare agent');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const input = await req.json();
    console.log('Input:', JSON.stringify(input).substring(0, 200));

    if (!input.practiceName) {
      throw new Error('practiceName is required');
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured');
    }

    const systemPrompt = generateHealthcarePrompt(input);
    const beginMessage = `Thank you for calling ${input.practiceName}. How may I help you today?`;

    console.log('Generated prompt length:', systemPrompt.length);

    // Create Retell LLM with HIPAA-compliant settings
    const llmResponse = await fetch('https://api.retellai.com/create-retell-llm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        begin_message: beginMessage,
        general_prompt: systemPrompt,
        general_tools: [
          {
            type: 'end_call',
            name: 'end_call',
            description: 'End the call after completing patient request'
          }
        ]
      }),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      throw new Error(`Retell LLM error: ${errorText}`);
    }

    const llmData = await llmResponse.json();
    console.log('LLM created:', llmData.llm_id);

    // Create Retell Agent with healthcare-specific settings
    const agentResponse = await fetch('https://api.retellai.com/create-agent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_name: `${input.practiceName} - Patient Access`,
        response_engine: {
          type: 'retell-llm',
          llm_id: llmData.llm_id,
        },
        voice_id: '11labs-Hailey', // Calm, reassuring voice for healthcare
        voice_model: 'eleven_turbo_v2_5', // ElevenLabs voice model
        language: 'en-US',
        voice_temperature: 0.6, // Lower for consistency and clarity
        voice_speed: 0.95, // Slightly slower for clarity
        responsiveness: 0.8, // Measured, not rushed
        interruption_sensitivity: 0.4, // Let patients finish speaking
        enable_backchannel: true,
        backchannel_frequency: 0.5,
        backchannel_words: ['I understand', 'okay', 'mm-hmm', 'I see'],
        reminder_trigger_ms: 12000, // Longer pause for healthcare
        reminder_max_count: 2,
        normalize_for_speech: true,
        max_call_duration_ms: 600000, // 10 minutes
        end_call_after_silence_ms: 25000,
        enable_voicemail_detection: true,
        voicemail_message: `Thank you for calling ${input.practiceName}. We're assisting other patients right now. Please leave a message with your name and phone number, and we'll return your call as soon as possible. If this is a medical emergency, please hang up and dial 911.`,
        boosted_keywords: [
          input.practiceName,
          ...(input.providers?.split(',').map((p: string) => p.trim()) || []),
          'appointment',
          'prescription',
          'refill',
        ],
      }),
    });

    if (!agentResponse.ok) {
      const errorText = await agentResponse.text();
      throw new Error(`Retell Agent error: ${errorText}`);
    }

    const agentData = await agentResponse.json();
    console.log('Agent created:', agentData.agent_id);

    // Save to database
    const { data: userAgent, error: dbError } = await supabase
      .from('user_agents')
      .insert({
        user_id: user.id,
        name: `${input.practiceName} Patient Access`,
        agent_type: 'healthcare',
        description: `HIPAA-compliant patient access agent for ${input.practiceName}`,
        provider: 'retell',
        provider_agent_id: agentData.agent_id,
        status: 'active',
        config: {
          llmId: llmData.llm_id,
          practiceName: input.practiceName,
          specialty: input.specialty,
          providers: input.providers,
          locations: input.locations,
          services: input.services,
          ehrSystem: input.ehrSystem,
          appointmentTypes: input.appointmentTypes,
          appointmentLengths: input.appointmentLengths,
          schedulingRules: input.schedulingRules,
          emergencySymptoms: input.emergencySymptoms,
          nurseTriageNumber: input.nurseTriageNumber,
          afterHoursLine: input.afterHoursLine,
          verificationMethod: input.verificationMethod,
          canDiscussPHI: input.canDiscussPHI,
          confirmationMethod: input.confirmationMethod,
          reminderTiming: input.reminderTiming,
        },
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        agentId: agentData.agent_id,
        llmId: llmData.llm_id,
        userAgentId: userAgent.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateHealthcarePrompt(input: any): string {
  const services = Array.isArray(input.services) ? input.services.join(', ') : 'general patient access';
  const verification = getVerificationInstructions(input.verificationMethod);

  return `You are a HIPAA-compliant patient access representative for ${input.practiceName}.

## HIPAA COMPLIANCE - CRITICAL
⚠️ NEVER discuss Protected Health Information (PHI) without proper patient verification.
⚠️ All conversations must maintain patient privacy and confidentiality.
⚠️ Log all access to patient information for compliance auditing.

## Practice Information
Specialty: ${input.specialty || 'Primary Care'}
Providers: ${input.providers || 'Healthcare providers'}
Location(s): ${input.locations || 'Main office'}

## Services You Handle
${services}

${input.services?.includes('Appointment scheduling') ? `
## Appointment Scheduling
EHR System: ${input.ehrSystem || 'Manual scheduling'}
Appointment Types: ${input.appointmentTypes || 'Various appointment types available'}
Typical Lengths: ${input.appointmentLengths || '30 minutes standard'}

Scheduling Rules:
${input.schedulingRules || 'Follow standard scheduling procedures'}

When scheduling:
1. Verify patient identity first
2. Ask for preferred date/time
3. Check provider availability
4. Confirm appointment details
5. Send confirmation via ${input.confirmationMethod || 'phone'}
6. Reminder will be sent ${input.reminderTiming || '24'} hours before
` : ''}

${input.services?.includes('Prescription refill requests') ? `
## Prescription Refills
1. Verify patient identity
2. Get prescription name and dosage
3. Confirm pharmacy information
4. Submit request to provider
5. Inform patient of expected processing time (24-48 hours)
6. Confirm callback number for any questions
` : ''}

## Patient Verification
${verification}
${input.canDiscussPHI
  ? 'After verification, you may discuss appointment details, test results, and general health information.'
  : 'After verification, you may only handle scheduling. Do NOT discuss any health information.'}

## Emergency Protocols - CRITICAL
🚨 IMMEDIATELY transfer to nurse triage if patient mentions:
${input.emergencySymptoms || 'Chest pain, difficulty breathing, severe bleeding, loss of consciousness'}

Nurse Triage Line: ${input.nurseTriageNumber || 'Not configured - take detailed message'}
After-Hours Emergency: ${input.afterHoursLine || '911 for emergencies'}

⚠️ If life-threatening emergency: Instruct patient to call 911 immediately!

## Communication Style
- Speak calmly and clearly
- Be empathetic and patient-focused
- Use simple, non-medical language when possible
- Give patients time to express concerns
- Maintain professional boundaries
- Show genuine care and concern

## Call Flow
1. Greet professionally
2. Ask how you can help
3. VERIFY PATIENT IDENTITY (if needed)
4. Handle request based on services
5. Confirm next steps
6. Thank them for calling

## Important Rules
- NEVER skip patient verification for PHI
- NEVER give medical advice - direct to provider
- ALWAYS maintain calm demeanor in emergencies
- NEVER discuss another patient's information
- ALWAYS document the call purpose
- If unsure, transfer to clinical staff

## After-Hours Calls
${input.afterHoursLine
  ? `We have an after-hours line available at ${input.afterHoursLine} for urgent matters.`
  : 'Take detailed messages for next business day follow-up.'}

For emergencies, always direct patients to call 911.

## Protected Health Information (PHI)
Remember: PHI includes any health information that can be linked to a specific individual.
Examples: diagnoses, test results, medications, treatment plans, appointment details.

ONLY discuss PHI after proper verification and ONLY if canDiscussPHI is enabled.

End each call professionally: "Thank you for calling ${input.practiceName}. Take care!"`;
}

function getVerificationInstructions(method: string): string {
  switch (method) {
    case 'dob-lastname':
      return `Verify patient by asking for:
1. Full name (first and last)
2. Date of birth

Confirm: "I have [Name] with date of birth [DOB]. Is that correct?"`;

    case 'account-number':
      return `Verify patient by asking for:
1. Full name
2. Patient account number

Confirm: "I have [Name] with account number ending in [last 4 digits]. Is that correct?"`;

    case 'other':
      return `Verify patient identity using the practice's standard verification method.
Ask for identifying information before discussing any health-related information.`;

    default:
      return 'Verify patient identity before discussing any protected health information.';
  }
}
