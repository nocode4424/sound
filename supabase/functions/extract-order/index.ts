import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OrderItem {
  name: string
  quantity: number
  price: number
  modifications?: string
}

interface OrderData {
  call_id: string
  customer_name: string
  customer_phone: string
  order_type: 'pickup' | 'delivery' | 'dine_in'
  delivery_address?: string
  items: OrderItem[]
  special_instructions?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const orderData: OrderData = await req.json()
    console.log('Processing order:', orderData)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Find the conversation record for this call
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id, user_agent_id')
      .eq('provider_call_id', orderData.call_id)
      .single()

    if (convError || !conversation) {
      console.error('Conversation not found:', convError)
      throw new Error('Call not found')
    }

    // Calculate totals
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.0825 // 8.25% tax rate (adjust as needed)
    const total = subtotal + tax

    console.log(`Order totals: subtotal=${subtotal}, tax=${tax}, total=${total}`)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('voice_orders')
      .insert({
        user_agent_id: conversation.user_agent_id,
        conversation_id: conversation.id,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        order_type: orderData.order_type,
        delivery_address: orderData.delivery_address,
        items: orderData.items,
        subtotal: subtotal,
        tax: tax,
        total: total,
        special_instructions: orderData.special_instructions,
        order_status: 'pending',
        payment_status: 'unpaid',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw orderError
    }

    console.log('Order created:', order.id)

    // Track analytics
    await supabase.from('analytics_events').insert({
      user_agent_id: conversation.user_agent_id,
      conversation_id: conversation.id,
      event_type: 'order_placed',
      event_data: {
        order_id: order.id,
        total: total,
        item_count: orderData.items.length,
        order_type: orderData.order_type,
      },
    })

    // Return response for AI to speak
    const response = {
      response: `Perfect! Your order total is $${total.toFixed(2)}. It will be ready for ${orderData.order_type} in about 30 to 40 minutes. We'll see you soon, ${orderData.customer_name}!`,
      data: {
        order_id: order.id,
        total: total,
      },
    }

    console.log('Returning response:', response)

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Extract order error:', error)
    return new Response(
      JSON.stringify({
        response: "I'm having trouble processing that order. Let me transfer you to someone who can help.",
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
