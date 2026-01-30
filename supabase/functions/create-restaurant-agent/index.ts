import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { generateSystemPrompt, generateBeginMessage } from '../lib/generate-prompt.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    console.log('Starting create-restaurant-agent function');

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('User authenticated:', user.id);

    const input = await req.json();
    console.log('Input received:', JSON.stringify(input).substring(0, 200));

    // Validate required fields
    if (!input.restaurantName) {
      throw new Error('restaurantName is required');
    }
    if (!input.voiceId) {
      throw new Error('voiceId is required');
    }

    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not configured');
    }

    // Build proper configuration for prompt generation
    const personality = {
      warmth: input.warmth || 5,
      pace: input.pace || 5,
      chattiness: input.chattiness || 5,
      formality: input.formality || 5,
    };

    const restaurantInfo = {
      name: input.restaurantName,
      cuisine: input.cuisine || 'restaurant',
      phone: input.phone || '',
      address: input.address || '',
      hours: input.hours || {
        monday: { open: '09:00', close: '22:00', closed: false },
        tuesday: { open: '09:00', close: '22:00', closed: false },
        wednesday: { open: '09:00', close: '22:00', closed: false },
        thursday: { open: '09:00', close: '22:00', closed: false },
        friday: { open: '09:00', close: '23:00', closed: false },
        saturday: { open: '09:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false },
      },
    };

    // Parse menu from text or use empty array
    const menuItems = [];
    const knowledgeBase = input.knowledgeBase ? [{ title: 'Menu', content: input.knowledgeBase }] : [];
    if (input.menuText) {
      knowledgeBase.push({ title: 'Full Menu', content: input.menuText });
    }

    const promptConfig = {
      restaurant: restaurantInfo,
      personality,
      menuItems,
      knowledgeBase,
      features: {
        takesOrders: true,
        takesReservations: false,
        answersQuestions: true,
      },
      upsellItems: input.upsellItems || [],
    };

    // Generate the comprehensive system prompt
    const systemPrompt = generateSystemPrompt(promptConfig);
    const beginMessage = generateBeginMessage(personality, restaurantInfo.name);

    console.log('Generated prompt length:', systemPrompt.length);

    // Calculate voice settings based on personality
    const voiceSpeed = 0.7 + ((input.speakingSpeed || 5) / 10) * 0.6;
    const responsiveness = (personality.chattiness / 10);

    // Create Retell LLM with all realistic conversation settings
    console.log('Creating Retell LLM...');
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
        // Add end call tool
        general_tools: [
          {
            type: 'end_call',
            name: 'end_call',
            description: 'End the call when order is complete and customer is ready to hang up'
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

    // Create Retell Agent with ALL realistic conversation parameters
    console.log('Creating Retell Agent...');
    const agentResponse = await fetch('https://api.retellai.com/create-agent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_name: `${input.restaurantName} - Voice Assistant`,
        response_engine: {
          type: 'retell-llm',
          llm_id: llmData.llm_id,
        },
        voice_id: input.voiceId || '11labs-Grace', // Grace - default female voice
        voice_model: 'eleven_turbo_v2_5', // ElevenLabs voice model
        language: 'en-US',

        // === REALISTIC CONVERSATION SETTINGS ===

        // Voice configuration
        voice_temperature: 0.8, // Higher = more expressive and natural
        voice_speed: voiceSpeed,

        // Responsiveness - how quickly agent responds
        responsiveness: 1.0, // Quick response for phone orders

        // Interruption handling - CRITICAL for natural conversation
        interruption_sensitivity: 0.5, // Medium - allows natural interruptions

        // Backchannel - verbal acknowledgments ("mm-hmm", "yeah")
        enable_backchannel: true, // Always enable for natural feel
        backchannel_frequency: personality.chattiness > 5 ? 0.7 : 0.5,
        backchannel_words: [
          'yeah',
          'mhm',
          'uh huh',
          'mm-hmm',
          'okay',
          'right',
          'got it',
          'yep'
        ],

        // Reminder system - gentle prompts if customer goes silent
        reminder_trigger_ms: 10000, // Wait 10 seconds
        reminder_max_count: 2, // Only remind twice

        // Ambient sound - makes it feel like a real restaurant
        ambient_sound: 'coffee-shop', // Subtle background ambient noise
        ambient_sound_volume: 0.3, // Low volume, not distracting

        // Enable speech normalization - converts text to natural speech
        normalize_for_speech: true,

        // Call duration limits
        max_call_duration_ms: 600000, // 10 minutes max
        end_call_after_silence_ms: 30000, // 30 seconds of silence ends call

        // Voicemail detection
        enable_voicemail_detection: true,
        voicemail_detection_timeout_ms: 5000,
        voicemail_message: `Hi, you've reached ${input.restaurantName}. We're unable to take your call right now. Please call back during our business hours. Thanks!`,

        // Boosted keywords for better recognition
        boosted_keywords: [
          input.restaurantName,
          'delivery',
          'pickup',
          'large',
          'medium',
          'small',
        ],

        // Post-call analysis
        post_call_analysis_data: [
          {
            type: 'string',
            name: 'order_type',
            description: 'Was this a delivery or pickup order?',
            examples: ['delivery', 'pickup', 'inquiry only']
          },
          {
            type: 'boolean',
            name: 'order_completed',
            description: 'Was the order successfully completed?',
            examples: [true, false]
          },
          {
            type: 'string',
            name: 'transfer_reason',
            description: 'If call was transferred, why?',
            examples: ['complaint', 'refund request', 'catering', 'complex modification']
          }
        ],
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
    console.log('Saving to database...');
    const { data: userAgent, error: dbError } = await supabase
      .from('user_agents')
      .insert({
        user_id: user.id,
        name: input.restaurantName,
        description: `AI voice agent for ${input.restaurantName}`,
        provider: 'retell',
        provider_agent_id: agentData.agent_id,
        status: 'active',
        config: {
          voiceId: input.voiceId,
          llmId: llmData.llm_id,
          personality,
          voiceSpeed,
          ...promptConfig,
        },
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Agent saved:', userAgent.id);

    return new Response(
      JSON.stringify({
        success: true,
        agentId: agentData.agent_id,
        llmId: llmData.llm_id,
        userAgentId: userAgent.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
