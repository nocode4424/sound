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
    console.log('Creating contact center agent');

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

    // Validate required fields
    if (!input.businessName) {
      throw new Error('businessName is required');
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured');
    }

    // Generate system prompt for contact center
    const systemPrompt = generateContactCenterPrompt(input);
    const beginMessage = `Hi! Thanks for calling ${input.businessName}. How can I help you today?`;

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
            description: 'End the call when issue is resolved or customer is satisfied'
          }
        ]
      }),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      console.error('Retell LLM error:', errorText);
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
        agent_name: `${input.businessName} - Contact Center`,
        response_engine: {
          type: 'retell-llm',
          llm_id: llmData.llm_id,
        },
        voice_id: '11labs-Hailey', // Professional female voice for contact center
        voice_model: 'eleven_turbo_v2_5', // ElevenLabs voice model
        language: 'en-US',
        voice_temperature: 0.7,
        voice_speed: 1.0,
        responsiveness: 0.9,
        interruption_sensitivity: 0.6,
        enable_backchannel: true,
        backchannel_frequency: 0.6,
        backchannel_words: ['I see', 'okay', 'mm-hmm', 'understood', 'right'],
        reminder_trigger_ms: 10000,
        reminder_max_count: 2,
        normalize_for_speech: true,
        max_call_duration_ms: 900000, // 15 minutes for contact center
        end_call_after_silence_ms: 30000,
        enable_voicemail_detection: true,
        voicemail_message: `Hi, you've reached ${input.businessName} contact center. Please call back during our business hours. Thank you!`,
      }),
    });

    if (!agentResponse.ok) {
      const errorText = await agentResponse.text();
      console.error('Retell Agent error:', errorText);
      throw new Error(`Retell Agent error: ${errorText}`);
    }

    const agentData = await agentResponse.json();
    console.log('Agent created:', agentData.agent_id);

    // Save to database
    const { data: userAgent, error: dbError } = await supabase
      .from('user_agents')
      .insert({
        user_id: user.id,
        name: `${input.businessName} Contact Center`,
        agent_type: 'contact_center',
        description: `Contact center agent for ${input.businessName}`,
        provider: 'retell',
        provider_agent_id: agentData.agent_id,
        status: 'active',
        config: {
          llmId: llmData.llm_id,
          businessName: input.businessName,
          primaryGoal: input.primaryGoal,
          customerInfo: input.customerInfo,
          needsAuth: input.needsAuth,
          authMethod: input.authMethod,
          escalationRules: input.escalationRules,
          integrations: input.integrations,
          businessHours: input.businessHours,
          transferNumber: input.transferNumber,
        },
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
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

function generateContactCenterPrompt(input: any): string {
  const goals = Array.isArray(input.primaryGoal) ? input.primaryGoal.join(', ') : '';
  const integrations = Array.isArray(input.integrations) ? input.integrations.join(', ') : 'none';

  return `You are a professional contact center agent for ${input.businessName}.

## Your Role
You help customers with: ${goals}

## Business Hours
${input.businessHours || 'Business hours not specified'}

## Customer Information
${input.customerInfo || 'Help customers with general inquiries and support'}

## Authentication
${input.needsAuth === 'yes' ? 'Verify customer identity by collecting account number, email, or phone number before providing sensitive information.' : ''}
${input.needsAuth === 'custom' ? `Verify customer identity by collecting: ${input.authMethod}` : ''}
${input.needsAuth === 'no' ? 'No authentication required for general information.' : ''}

## Escalation Rules
Transfer calls to a human when:
${input.escalationRules || 'Customer requests to speak with a human, complex issues, or complaints'}

Transfer number: ${input.transferNumber || 'Not provided - apologize and take a message'}

## System Integrations
Available systems: ${integrations}
${integrations !== 'none' ? 'Use this information to look up customer data when needed.' : ''}

## Communication Style
- Be professional, clear, and empathetic
- Listen actively and acknowledge customer concerns
- Keep responses concise (under 2 sentences when possible)
- Use natural language and avoid jargon
- Show empathy when customers are frustrated
- Confirm understanding by summarizing the issue

## Call Flow
1. Greet warmly and ask how you can help
2. Listen to the customer's issue
3. Authenticate if needed (based on rules above)
4. Attempt to resolve the issue or provide information
5. Escalate if necessary
6. Confirm resolution and thank the customer

## Important Rules
- Never make promises you can't keep
- If you don't know something, say so and offer to transfer or take a message
- Always remain calm and professional, even with difficult customers
- Document the reason for any transfers
- End calls politely once the issue is resolved`;
}
