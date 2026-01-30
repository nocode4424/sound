-- ===========================================
-- Solaris AI - Initial Database Schema
-- ===========================================
-- Run this migration with: supabase db push
-- Or via dashboard: SQL Editor > New Query
-- ===========================================

-- -------------------------------------------
-- Extensions
-- -------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------
-- PROFILES TABLE
-- Extended user data beyond Supabase Auth
-- -------------------------------------------
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -------------------------------------------
-- AGENTS TABLE
-- Public catalog of pre-built voice agents
-- These are agents YOU created in Retell/VAPI dashboards
-- -------------------------------------------
CREATE TABLE public.agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Basic info
  name TEXT NOT NULL,
  slug TEXT UNIQUE, -- URL-friendly identifier
  description TEXT,
  short_description TEXT, -- For cards (max 120 chars)
  
  -- Provider info
  provider TEXT NOT NULL CHECK (provider IN ('retell', 'vapi')),
  provider_agent_id TEXT NOT NULL, -- The actual agent ID from Retell/VAPI
  
  -- Categorization
  category TEXT CHECK (category IN (
    'restaurant',
    'property-management', 
    'sales',
    'customer-service',
    'scheduling',
    'healthcare',
    'legal',
    'other'
  )),
  tags TEXT[] DEFAULT '{}',
  
  -- Display
  icon TEXT, -- Lucide icon name or emoji
  cover_image_url TEXT,
  demo_audio_url TEXT, -- Sample conversation audio
  
  -- Features & capabilities
  features TEXT[] DEFAULT '{}', -- ['Takes orders', 'Handles payments', etc.]
  use_cases TEXT[] DEFAULT '{}',
  
  -- Visibility
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Stats (updated via triggers/webhooks)
  total_calls INTEGER DEFAULT 0,
  avg_call_duration_seconds INTEGER DEFAULT 0,
  avg_rating DECIMAL(2,1) DEFAULT 0,
  
  -- Ownership
  created_by UUID REFERENCES auth.users(id),
  
  -- Provider config (stored for reference, not secrets)
  config JSONB DEFAULT '{}', -- voice, model, language, etc.
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_agents_category ON public.agents(category);
CREATE INDEX idx_agents_provider ON public.agents(provider);
CREATE INDEX idx_agents_is_public ON public.agents(is_public);
CREATE INDEX idx_agents_is_featured ON public.agents(is_featured);

-- -------------------------------------------
-- USER_AGENTS TABLE
-- Agents created by users through the platform
-- -------------------------------------------
CREATE TABLE public.user_agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic info
  name TEXT NOT NULL,
  description TEXT,
  
  -- Provider info
  provider TEXT NOT NULL CHECK (provider IN ('retell', 'vapi')),
  provider_agent_id TEXT, -- Populated after agent is created in provider API
  
  -- Configuration (what we send to create the agent)
  config JSONB DEFAULT '{}',
  /*
    config schema:
    {
      "voice": {
        "provider": "elevenlabs" | "openai" | "playht",
        "voiceId": "string"
      },
      "llm": {
        "provider": "openai" | "anthropic",
        "model": "gpt-4" | "claude-3-sonnet",
        "temperature": 0.7
      },
      "greeting": "Hello, thanks for calling...",
      "systemPrompt": "You are a helpful assistant...",
      "endCallPhrases": ["goodbye", "have a nice day"],
      "tools": []
    }
  */
  
  -- Generation metadata (from Anthropic)
  generation_input JSONB DEFAULT '{}', -- What the user provided
  generation_output JSONB DEFAULT '{}', -- What Anthropic returned
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft',      -- Config saved but not created in provider
    'creating',   -- Currently being created in provider
    'active',     -- Successfully created and usable
    'failed',     -- Creation failed
    'archived'    -- Soft deleted
  )),
  error_message TEXT, -- If creation failed
  
  -- Stats
  total_calls INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user's agents
CREATE INDEX idx_user_agents_user_id ON public.user_agents(user_id);
CREATE INDEX idx_user_agents_status ON public.user_agents(status);

-- -------------------------------------------
-- CONVERSATIONS TABLE
-- Log of all voice calls made through the platform
-- -------------------------------------------
CREATE TABLE public.conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Which agent was called
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE SET NULL,
  
  -- Provider info
  provider TEXT NOT NULL CHECK (provider IN ('retell', 'vapi')),
  provider_call_id TEXT, -- call_id from Retell or VAPI
  
  -- Call metadata
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  
  -- Status
  status TEXT DEFAULT 'initiated' CHECK (status IN (
    'initiated',
    'ringing',
    'connected',
    'ended',
    'failed',
    'no-answer'
  )),
  end_reason TEXT, -- 'user_hangup', 'agent_hangup', 'error', etc.
  
  -- Transcript
  transcript JSONB DEFAULT '[]',
  /*
    transcript schema:
    [
      {
        "role": "agent" | "user",
        "content": "string",
        "timestamp": "ISO8601"
      }
    ]
  */
  
  -- Summary (generated post-call)
  summary TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  
  -- User feedback
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  
  -- Additional metadata from provider
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversations_agent_id ON public.conversations(agent_id);
CREATE INDEX idx_conversations_user_agent_id ON public.conversations(user_agent_id);
CREATE INDEX idx_conversations_created_at ON public.conversations(created_at DESC);

-- -------------------------------------------
-- AGENT_REVIEWS TABLE
-- User reviews/testimonials for public agents
-- -------------------------------------------
CREATE TABLE public.agent_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  
  -- Moderation
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One review per user per agent
  UNIQUE(agent_id, user_id)
);

CREATE INDEX idx_agent_reviews_agent_id ON public.agent_reviews(agent_id);

-- -------------------------------------------
-- WAITLIST TABLE
-- For capturing leads before they sign up
-- -------------------------------------------
CREATE TABLE public.waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  use_case TEXT,
  source TEXT, -- 'landing', 'blog', 'referral', etc.
  converted BOOLEAN DEFAULT false,
  converted_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- ROW LEVEL SECURITY POLICIES
-- -------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- AGENTS: Anyone can view public agents, owners can manage their own
CREATE POLICY "Anyone can view public agents"
  ON public.agents FOR SELECT
  USING (is_public = true);

CREATE POLICY "Owners can view own agents"
  ON public.agents FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Owners can insert agents"
  ON public.agents FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Owners can update own agents"
  ON public.agents FOR UPDATE
  USING (auth.uid() = created_by);

-- USER_AGENTS: Users can only access their own
CREATE POLICY "Users can view own user_agents"
  ON public.user_agents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user_agents"
  ON public.user_agents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own user_agents"
  ON public.user_agents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own user_agents"
  ON public.user_agents FOR DELETE
  USING (auth.uid() = user_id);

-- CONVERSATIONS: Users can only access their own
CREATE POLICY "Users can view own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = user_id);

-- AGENT_REVIEWS: Anyone can view approved reviews, users can manage their own
CREATE POLICY "Anyone can view approved reviews"
  ON public.agent_reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Users can view own reviews"
  ON public.agent_reviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reviews"
  ON public.agent_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.agent_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- WAITLIST: Anyone can insert (public form), no one can read
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist FOR INSERT
  WITH CHECK (true);

-- -------------------------------------------
-- HELPER FUNCTIONS
-- -------------------------------------------

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_agents_updated_at
  BEFORE UPDATE ON public.user_agents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_agent_reviews_updated_at
  BEFORE UPDATE ON public.agent_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- -------------------------------------------
-- SEED DATA: Sample Public Agents
-- Replace provider_agent_id with your actual IDs from Retell/VAPI
-- -------------------------------------------

-- Uncomment and modify once you have real agent IDs:

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
