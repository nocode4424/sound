import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import type { Conversation } from '@/types'

export function useConversations() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadConversations()
    } else {
      setConversations([])
      setLoading(false)
    }
  }, [user])

  const loadConversations = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setConversations(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load conversations'))
    } finally {
      setLoading(false)
    }
  }

  return { conversations, loading, error, reload: loadConversations }
}
