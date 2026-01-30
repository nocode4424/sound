import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ReservationData {
  call_id: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  party_size: number
  reservation_datetime: string
  special_requests?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const reservationData: ReservationData = await req.json()
    console.log('Processing reservation:', reservationData)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Find the conversation record for this call
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id, user_agent_id')
      .eq('provider_call_id', reservationData.call_id)
      .single()

    if (convError || !conversation) {
      console.error('Conversation not found:', convError)
      throw new Error('Call not found')
    }

    // Create reservation
    const { data: reservation, error: resError } = await supabase
      .from('voice_reservations')
      .insert({
        user_agent_id: conversation.user_agent_id,
        conversation_id: conversation.id,
        customer_name: reservationData.customer_name,
        customer_phone: reservationData.customer_phone,
        customer_email: reservationData.customer_email,
        party_size: reservationData.party_size,
        reservation_datetime: reservationData.reservation_datetime,
        special_requests: reservationData.special_requests,
        reservation_status: 'pending',
      })
      .select()
      .single()

    if (resError) {
      console.error('Reservation creation error:', resError)
      throw resError
    }

    console.log('Reservation created:', reservation.id)

    // Track analytics
    await supabase.from('analytics_events').insert({
      user_agent_id: conversation.user_agent_id,
      conversation_id: conversation.id,
      event_type: 'reservation_made',
      event_data: {
        reservation_id: reservation.id,
        party_size: reservationData.party_size,
        datetime: reservationData.reservation_datetime,
      },
    })

    // Format datetime for speech
    const datetime = new Date(reservationData.reservation_datetime)
    const dateStr = datetime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    const timeStr = datetime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })

    // Return response for AI to speak
    const response = {
      response: `Great! I've booked a table for ${reservationData.party_size} on ${dateStr} at ${timeStr}. We'll see you then, ${reservationData.customer_name}!`,
      data: {
        reservation_id: reservation.id,
      },
    }

    console.log('Returning response:', response)

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Create reservation error:', error)
    return new Response(
      JSON.stringify({
        response: "I'm having trouble making that reservation. Let me transfer you to our host.",
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
