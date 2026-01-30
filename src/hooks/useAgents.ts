import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Agent } from '@/types'

export function useAgents(category?: string) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    loadAgents()
  }, [category])

  const loadAgents = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('agents')
        .select('*')
        .eq('is_public', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) throw error
      setAgents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load agents'))
    } finally {
      setLoading(false)
    }
  }

  return { agents, loading, error, reload: loadAgents }
}
