export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          company_name: string | null
          phone: string | null
          avatar_url: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          slug: string | null
          description: string | null
          short_description: string | null
          provider: 'retell' | 'vapi'
          provider_agent_id: string
          category: string | null
          tags: string[] | null
          icon: string | null
          cover_image_url: string | null
          features: string[] | null
          use_cases: string[] | null
          is_public: boolean
          is_featured: boolean | null
          display_order: number | null
          total_calls: number
          avg_call_duration_seconds: number | null
          avg_rating: number | null
          created_by: string | null
          config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          description?: string | null
          short_description?: string | null
          provider: 'retell' | 'vapi'
          provider_agent_id: string
          category?: string | null
          tags?: string[] | null
          icon?: string | null
          cover_image_url?: string | null
          features?: string[] | null
          use_cases?: string[] | null
          is_public?: boolean
          is_featured?: boolean | null
          display_order?: number | null
          total_calls?: number
          avg_call_duration_seconds?: number | null
          avg_rating?: number | null
          created_by?: string | null
          config?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          description?: string | null
          short_description?: string | null
          provider?: 'retell' | 'vapi'
          provider_agent_id?: string
          category?: string | null
          tags?: string[] | null
          icon?: string | null
          cover_image_url?: string | null
          features?: string[] | null
          use_cases?: string[] | null
          is_public?: boolean
          is_featured?: boolean | null
          display_order?: number | null
          total_calls?: number
          avg_call_duration_seconds?: number | null
          avg_rating?: number | null
          created_by?: string | null
          config?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_agents: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          provider: 'retell' | 'vapi'
          provider_agent_id: string | null
          config: Json
          generation_input: Json
          generation_output: Json
          status: 'draft' | 'creating' | 'active' | 'failed' | 'archived'
          error_message: string | null
          total_calls: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          provider?: 'retell' | 'vapi'
          provider_agent_id?: string | null
          config?: Json
          generation_input?: Json
          generation_output?: Json
          status?: 'draft' | 'creating' | 'active' | 'failed' | 'archived'
          error_message?: string | null
          total_calls?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          provider?: 'retell' | 'vapi'
          provider_agent_id?: string | null
          config?: Json
          generation_input?: Json
          generation_output?: Json
          status?: 'draft' | 'creating' | 'active' | 'failed' | 'archived'
          error_message?: string | null
          total_calls?: number
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          agent_id: string | null
          user_agent_id: string | null
          provider: 'retell' | 'vapi'
          provider_call_id: string | null
          started_at: string
          ended_at: string | null
          duration_seconds: number | null
          status: 'initiated' | 'ringing' | 'connected' | 'ended' | 'failed' | 'no-answer'
          end_reason: string | null
          transcript: Json
          summary: string | null
          sentiment: 'positive' | 'neutral' | 'negative' | null
          rating: number | null
          feedback: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id?: string | null
          user_agent_id?: string | null
          provider: 'retell' | 'vapi'
          provider_call_id?: string | null
          started_at?: string
          ended_at?: string | null
          duration_seconds?: number | null
          status?: 'initiated' | 'ringing' | 'connected' | 'ended' | 'failed' | 'no-answer'
          end_reason?: string | null
          transcript?: Json
          summary?: string | null
          sentiment?: 'positive' | 'neutral' | 'negative' | null
          rating?: number | null
          feedback?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string | null
          user_agent_id?: string | null
          provider?: 'retell' | 'vapi'
          provider_call_id?: string | null
          started_at?: string
          ended_at?: string | null
          duration_seconds?: number | null
          status?: 'initiated' | 'ringing' | 'connected' | 'ended' | 'failed' | 'no-answer'
          end_reason?: string | null
          transcript?: Json
          summary?: string | null
          sentiment?: 'positive' | 'neutral' | 'negative' | null
          rating?: number | null
          feedback?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
