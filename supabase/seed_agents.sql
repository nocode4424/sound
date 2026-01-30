-- Seed public agents for Explore page
-- Run this manually in Supabase SQL editor if migration doesn't work

INSERT INTO public.agents (
  name,
  slug,
  description,
  short_description,
  provider,
  provider_agent_id,
  category,
  tags,
  icon,
  features,
  use_cases,
  is_public,
  is_featured,
  display_order,
  config
) VALUES
(
  'Restaurant Order Assistant',
  'restaurant-order-assistant',
  'A sophisticated voice AI that handles phone orders for restaurants. Takes orders accurately, suggests upsells, confirms details, and provides estimated wait times. Works with any menu and integrates with popular POS systems.',
  'Takes phone orders, suggests add-ons, confirms details accurately.',
  'retell',
  'agent_fa37190e8f04c48e46532b70c4',
  'restaurant',
  ARRAY['ordering', 'food', 'restaurant', 'phone orders'],
  '🍕',
  ARRAY[
    'Accurate order taking with menu knowledge',
    'Smart upselling and suggestions',
    'Order confirmation and repeat-back',
    'Wait time estimates',
    'Special requests handling',
    'Multiple language support'
  ],
  ARRAY[
    'Pizza shops handling high call volume',
    'Restaurants wanting 24/7 phone ordering',
    'Ghost kitchens managing multiple brands'
  ],
  true,
  true,
  1,
  '{"voice": {"provider": "elevenlabs", "voiceId": "emma"}, "llm": {"model": "gpt-4"}}'::jsonb
),
(
  'Customer Service Agent',
  'customer-service-agent',
  'Professional customer service voice agent that handles inquiries, support requests, and general questions. Provides helpful information and escalates complex issues when needed.',
  'Answers questions, handles support, escalates when needed.',
  'retell',
  'agent_06ea01f0bc105f6211fccd0647',
  'customer-service',
  ARRAY['support', 'customer service', 'help desk', 'inquiries'],
  '💬',
  ARRAY[
    'Friendly and professional tone',
    'Answers common questions',
    'Captures customer information',
    'Escalates complex issues',
    'Multi-channel support',
    '24/7 availability'
  ],
  ARRAY[
    'E-commerce businesses',
    'SaaS companies',
    'Retail stores'
  ],
  true,
  true,
  2,
  '{"voice": {"provider": "elevenlabs", "voiceId": "josh"}, "llm": {"model": "gpt-4"}}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
