-- ===========================================
-- Restaurant Voice AI - Production Tables
-- Based on production guide requirements
-- ===========================================

-- Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL,

  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  dietary_info TEXT[] DEFAULT '{}',
  spice_level INTEGER DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  is_available BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_items_user_agent_id ON public.menu_items(user_agent_id);
CREATE INDEX idx_menu_items_category ON public.menu_items(category);

-- Voice Orders Table (orders placed via voice calls)
CREATE TABLE IF NOT EXISTS public.voice_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,

  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,

  order_type TEXT NOT NULL CHECK (order_type IN ('pickup', 'delivery', 'dine_in')),
  delivery_address TEXT,

  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  /*
    items schema:
    [
      {
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 14.99,
        "modifications": "Extra cheese, no basil"
      }
    ]
  */

  special_instructions TEXT,

  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,

  order_status TEXT DEFAULT 'pending' CHECK (order_status IN (
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'completed',
    'cancelled'
  )),

  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN (
    'unpaid',
    'paid',
    'refunded'
  )),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_voice_orders_user_agent_id ON public.voice_orders(user_agent_id);
CREATE INDEX idx_voice_orders_conversation_id ON public.voice_orders(conversation_id);
CREATE INDEX idx_voice_orders_created_at ON public.voice_orders(created_at DESC);

-- Voice Reservations Table
CREATE TABLE IF NOT EXISTS public.voice_reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,

  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,

  party_size INTEGER NOT NULL CHECK (party_size > 0),
  reservation_datetime TIMESTAMPTZ NOT NULL,
  special_requests TEXT,

  reservation_status TEXT DEFAULT 'pending' CHECK (reservation_status IN (
    'pending',
    'confirmed',
    'seated',
    'completed',
    'cancelled',
    'no_show'
  )),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_voice_reservations_user_agent_id ON public.voice_reservations(user_agent_id);
CREATE INDEX idx_voice_reservations_conversation_id ON public.voice_reservations(conversation_id);
CREATE INDEX idx_voice_reservations_datetime ON public.voice_reservations(reservation_datetime);

-- Knowledge Base Documents Table
CREATE TABLE IF NOT EXISTS public.knowledge_base_docs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  content TEXT NOT NULL,
  doc_type TEXT CHECK (doc_type IN (
    'menu_description',
    'hours',
    'policies',
    'dietary_info',
    'faq',
    'custom'
  )),

  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_knowledge_base_docs_user_agent_id ON public.knowledge_base_docs(user_agent_id);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_agent_id UUID REFERENCES public.user_agents(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,

  event_type TEXT NOT NULL CHECK (event_type IN (
    'order_placed',
    'reservation_made',
    'question_answered',
    'complaint_logged',
    'transfer_requested'
  )),

  event_data JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_user_agent_id ON public.analytics_events(user_agent_id);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);

-- RLS Policies
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can only access data for their own agents
CREATE POLICY "Users can view own menu items"
  ON public.menu_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = menu_items.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own menu items"
  ON public.menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = menu_items.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own orders"
  ON public.voice_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = voice_orders.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own orders"
  ON public.voice_orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = voice_orders.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own reservations"
  ON public.voice_reservations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = voice_reservations.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own reservations"
  ON public.voice_reservations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = voice_reservations.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own knowledge base"
  ON public.knowledge_base_docs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = knowledge_base_docs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own knowledge base"
  ON public.knowledge_base_docs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = knowledge_base_docs.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own analytics"
  ON public.analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_agents
      WHERE user_agents.id = analytics_events.user_agent_id
        AND user_agents.user_id = auth.uid()
    )
  );

-- Auto-update updated_at triggers
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_voice_orders_updated_at
  BEFORE UPDATE ON public.voice_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_voice_reservations_updated_at
  BEFORE UPDATE ON public.voice_reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_knowledge_base_docs_updated_at
  BEFORE UPDATE ON public.knowledge_base_docs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
