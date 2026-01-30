export interface Agent {
  id: string
  name: string
  slug?: string
  description: string
  short_description?: string
  provider: 'retell' | 'vapi'
  provider_agent_id: string
  category?: string
  tags?: string[]
  icon?: string
  cover_image_url?: string
  features?: string[]
  use_cases?: string[]
  is_public: boolean
  is_featured?: boolean
  total_calls?: number
  avg_rating?: number
  created_at: string
  updated_at: string
}

export interface UserAgent {
  id: string
  user_id: string
  name: string
  description?: string
  provider: 'retell' | 'vapi'
  provider_agent_id?: string
  config: Record<string, any>
  status: 'draft' | 'creating' | 'active' | 'failed' | 'archived'
  error_message?: string
  total_calls: number
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email?: string
  full_name?: string
  company_name?: string
  phone?: string
  avatar_url?: string
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  user_id: string
  agent_id?: string
  user_agent_id?: string
  provider: 'retell' | 'vapi'
  provider_call_id?: string
  started_at: string
  ended_at?: string
  duration_seconds?: number
  status: 'initiated' | 'ringing' | 'connected' | 'ended' | 'failed' | 'no-answer'
  end_reason?: string
  transcript?: TranscriptEntry[]
  summary?: string
  sentiment?: 'positive' | 'neutral' | 'negative'
  rating?: number
  feedback?: string
  metadata?: Record<string, any>
  created_at: string
}

export interface TranscriptEntry {
  role: 'agent' | 'user'
  content: string
  timestamp: string
}
