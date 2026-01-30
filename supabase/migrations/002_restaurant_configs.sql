-- ===========================================
-- Restaurant Configs Table
-- Stores restaurant-specific agent settings
-- ===========================================

CREATE TABLE public.restaurant_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL UNIQUE,

  -- Restaurant info
  restaurant_name TEXT NOT NULL,

  -- Personality settings (for simple mode)
  personality_level INTEGER DEFAULT 50 CHECK (personality_level >= 0 AND personality_level <= 100),

  -- Operating hours
  hours_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  /*
    hours_json schema:
    {
      "monday": {"open": "11:00", "close": "22:00", "closed": false},
      "tuesday": {"open": "11:00", "close": "22:00", "closed": false},
      ...
    }
  */

  -- Menu
  menu_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  /*
    menu_json schema:
    [
      {
        "name": "Margherita Pizza",
        "description": "Classic tomato and mozzarella",
        "price": 14.99,
        "category": "Pizza"
      },
      ...
    ]
  */
  menu_raw TEXT, -- Original uploaded/pasted menu text

  -- Recommendations
  popular_items TEXT[] DEFAULT '{}',
  upsell_items TEXT[] DEFAULT '{}',

  -- Operations
  pickup_time_minutes INTEGER DEFAULT 15,

  -- Generated prompt (from Anthropic or user input)
  generated_prompt TEXT,

  -- Advanced settings (stored in user_agents.config JSONB, but denormalized here for convenience)
  llm_model TEXT DEFAULT 'gpt-4o',
  temperature DECIMAL(3,2) DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 500,

  voice_speed DECIMAL(3,2) DEFAULT 1.0,
  voice_temperature DECIMAL(3,2) DEFAULT 1.0,

  responsiveness DECIMAL(3,2) DEFAULT 1.0,
  interruption_sensitivity DECIMAL(3,2) DEFAULT 1.0,
  enable_backchannel BOOLEAN DEFAULT true,
  backchannel_frequency DECIMAL(3,2) DEFAULT 0.8,

  end_call_after_silence_ms INTEGER DEFAULT 30000,
  max_call_duration_ms INTEGER DEFAULT 1800000,
  enable_voicemail_detection BOOLEAN DEFAULT true,

  ambient_sound TEXT CHECK (ambient_sound IN ('none', 'coffee_shop', 'office', 'restaurant')),
  ambient_sound_volume DECIMAL(3,2) DEFAULT 0.3,
  normalize_for_speech BOOLEAN DEFAULT true,
  opt_out_sensitive_data_storage BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_restaurant_configs_user_agent_id ON public.restaurant_configs(user_agent_id);

-- Enable RLS
ALTER TABLE public.restaurant_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only the owner can access their restaurant config
CREATE POLICY "Users can view own restaurant configs"
  ON public.restaurant_configs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = restaurant_configs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own restaurant configs"
  ON public.restaurant_configs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = restaurant_configs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own restaurant configs"
  ON public.restaurant_configs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = restaurant_configs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own restaurant configs"
  ON public.restaurant_configs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = restaurant_configs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

-- Auto-update updated_at
CREATE TRIGGER update_restaurant_configs_updated_at
  BEFORE UPDATE ON public.restaurant_configs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
