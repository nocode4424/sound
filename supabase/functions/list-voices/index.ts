import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RETELL_API_KEY = Deno.env.get('RETELL_API_KEY')

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Fetch voices from Retell API
    const response = await fetch('https://api.retellai.com/list-voices', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Retell API error:', error)
      throw new Error(`Retell API error: ${response.status}`)
    }

    const voices = await response.json()

    return new Response(JSON.stringify(voices), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error fetching voices:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to fetch voices',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
