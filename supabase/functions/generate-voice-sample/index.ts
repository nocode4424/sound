import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const { voiceId } = await req.json();

    if (!voiceId) {
      throw new Error('voiceId is required');
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured');
    }

    // Create a simple temporary LLM for voice preview
    const llmResponse = await fetch('https://api.retellai.com/create-retell-llm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        begin_message: 'Hi! This is a sample of my voice. I\'m here to help customers with their orders and questions. Thanks for listening!',
        general_prompt: 'You are a friendly restaurant voice assistant.',
      }),
    });

    if (!llmResponse.ok) {
      const error = await llmResponse.text();
      throw new Error(`Retell error: ${error}`);
    }

    const llmData = await llmResponse.json();

    // Create a temporary agent for preview
    const agentResponse = await fetch('https://api.retellai.com/create-agent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_name: 'Voice Preview - Temporary',
        response_engine: {
          type: 'retell-llm',
          llm_id: llmData.llm_id,
        },
        voice_id: voiceId,
        language: 'en-US',
        max_call_duration_ms: 30000, // 30 seconds max
      }),
    });

    if (!agentResponse.ok) {
      const error = await agentResponse.text();
      throw new Error(`Agent error: ${error}`);
    }

    const agentData = await agentResponse.json();

    // Create web call for preview
    const callResponse = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentData.agent_id,
      }),
    });

    if (!callResponse.ok) {
      const error = await callResponse.text();
      throw new Error(`Call error: ${error}`);
    }

    const callData = await callResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        accessToken: callData.access_token,
        callId: callData.call_id,
        agentId: agentData.agent_id,
        llmId: llmData.llm_id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
