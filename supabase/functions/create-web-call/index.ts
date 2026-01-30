import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get agent ID from request
    const { agentId } = await req.json()

    if (!agentId) {
      return new Response(
        JSON.stringify({ error: 'Agent ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Retell API key from environment
    const retellApiKey = Deno.env.get('RETELL_API_KEY')
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured')
    }

    console.log('Creating web call for agent:', agentId)

    // Create web call with Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Retell API error:', response.status, errorText)
      throw new Error(`Retell API error (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    console.log('Web call created successfully:', data.call_id)

    // Try to log conversation if user is authenticated (optional)
    const authHeader = req.headers.get('Authorization')
    if (authHeader) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          {
            global: {
              headers: { Authorization: authHeader },
            },
          }
        )

        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          await supabase.from('conversations').insert({
            user_id: user.id,
            provider: 'retell',
            provider_call_id: data.call_id,
            status: 'initiated',
            metadata: { agent_id: agentId },
          })
          console.log('Conversation logged for user:', user.id)
        }
      } catch (error) {
        // Don't fail the whole request if logging fails
        console.error('Failed to log conversation:', error)
      }
    }

    return new Response(
      JSON.stringify({
        call_id: data.call_id,
        access_token: data.access_token,
        sample_rate: data.sample_rate || 24000,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in create-web-call:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
