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
    console.log('Creating receptionist agent');

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

    if (!input.businessName) {
      throw new Error('businessName is required');
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured');
    }

    const systemPrompt = generateReceptionistPrompt(input);
    const beginMessage = `Good ${getTimeOfDay()}, thank you for calling ${input.businessName}. How may I help you today?`;

    console.log('Generated prompt length:', systemPrompt.length);

    // Create Retell LLM
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
            description: 'End the call professionally after completing the task'
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

    // Create Retell Agent
    const agentResponse = await fetch('https://api.retellai.com/create-agent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_name: `${input.businessName} - Receptionist`,
        response_engine: {
          type: 'retell-llm',
          llm_id: llmData.llm_id,
        },
        voice_id: '11labs-Hailey', // Professional, warm voice
        voice_model: 'eleven_turbo_v2_5', // ElevenLabs voice model
        language: 'en-US',
        voice_temperature: 0.8,
        voice_speed: 1.0,
        responsiveness: 1.0,
        interruption_sensitivity: 0.5,
        enable_backchannel: true,
        backchannel_frequency: 0.7,
        backchannel_words: ['yes', 'mm-hmm', 'I understand', 'okay', 'certainly'],
        reminder_trigger_ms: 8000,
        reminder_max_count: 2,
        normalize_for_speech: true,
        max_call_duration_ms: 600000, // 10 minutes
        end_call_after_silence_ms: 20000,
        enable_voicemail_detection: true,
        voicemail_message: `Hi, you've reached ${input.businessName}. We're unable to answer your call right now. Please call back during business hours or leave a message after the beep. Thank you!`,
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
        name: `${input.businessName} Receptionist`,
        agent_type: 'receptionist',
        description: `Receptionist agent for ${input.businessName}`,
        provider: 'retell',
        provider_agent_id: agentData.agent_id,
        status: 'active',
        config: {
          llmId: llmData.llm_id,
          businessName: input.businessName,
          businessType: input.businessType,
          customBusinessType: input.customBusinessType,
          services: input.services,
          location: input.location,
          businessHours: input.businessHours,
          emergencyProtocol: input.emergencyProtocol,
          handlingCapabilities: input.handlingCapabilities,
          schedulingSoftware: input.schedulingSoftware,
          appointmentLength: input.appointmentLength,
          staffMembers: input.staffMembers,
          leadInfo: input.leadInfo,
          transferNumber: input.transferNumber,
          messageDelivery: input.messageDelivery,
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

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function generateReceptionistPrompt(input: any): string {
  const capabilities = Array.isArray(input.handlingCapabilities)
    ? input.handlingCapabilities.join(', ')
    : 'answer questions';

  const businessType = input.businessType === 'Other'
    ? input.customBusinessType
    : input.businessType;

  return `You are a professional receptionist for ${input.businessName}, a ${businessType}.

## About the Business
${input.services || 'Professional services business'}

Location: ${input.location || 'Location not specified'}
Business Hours: ${input.businessHours || 'Standard business hours'}

## Your Capabilities
You can: ${capabilities}

${input.handlingCapabilities?.includes('Schedule appointments') ? `
## Appointment Scheduling
- Scheduling software: ${input.schedulingSoftware || 'Manual scheduling'}
- Typical appointment length: ${input.appointmentLength || '30'} minutes
- Staff members: ${input.staffMembers || 'Team members available'}

When scheduling:
1. Ask for preferred date and time
2. Check availability
3. Confirm appointment details
4. Collect contact information
5. Send confirmation
` : ''}

${input.handlingCapabilities?.includes('Qualify leads (collect info)') ? `
## Lead Qualification
Collect the following information from new callers:
${Array.isArray(input.leadInfo) ? input.leadInfo.map((i: string) => `- ${i}`).join('\n') : '- Name, phone, email'}

Be conversational - don't make it feel like an interrogation.
` : ''}

${input.handlingCapabilities?.includes('Take messages for staff') ? `
## Message Taking
When taking messages:
1. Get caller's name and contact information
2. Ask for the nature of their call
3. Ask which staff member they'd like to reach
4. Confirm you'll relay the message
5. Message delivery method: ${input.messageDelivery || 'email'}
` : ''}

## Call Transfer
${input.transferNumber ? `
Transfer calls to: ${input.transferNumber}

Transfer when:
- Caller specifically requests to speak with someone
- Issue requires specialized knowledge
- Caller insists on speaking with a human
` : 'Take detailed messages if staff is unavailable.'}

## After-Hours Protocol
${input.emergencyProtocol || 'Take a detailed message and inform them someone will call back during business hours.'}

## Communication Style
- Be warm, professional, and helpful
- Use a friendly but professional tone
- Keep responses brief and to the point
- Show genuine interest in helping
- Be organized and efficient
- Maintain confidentiality

## Call Flow
1. Greet professionally with business name
2. Ask how you can help
3. Handle the request based on your capabilities
4. Collect necessary information
5. Confirm next steps
6. Thank them and end politely

## Important Rules
- Always be courteous and patient
- Never argue with callers
- If unsure, take a message rather than give incorrect information
- Protect confidential information
- End each call with "Thank you for calling ${input.businessName}"
- Stay organized and keep accurate notes`;
}
