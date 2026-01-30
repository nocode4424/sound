import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'
import type { UserAgent } from '@/types'

export function useUserAgents() {
  const { user } = useAuth()
  const [agents, setAgents] = useState<UserAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadAgents()
    } else {
      setAgents([])
      setLoading(false)
    }
  }, [user])

  const loadAgents = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user_agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAgents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load agents'))
    } finally {
      setLoading(false)
    }
  }

  const deleteAgent = async (agentId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_agents')
        .delete()
        .eq('id', agentId)
        .eq('user_id', user.id)

      if (error) throw error
      await loadAgents()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete agent')
    }
  }

  return { agents, loading, error, reload: loadAgents, deleteAgent }
}
