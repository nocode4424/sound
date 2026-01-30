import { useState, useRef, useCallback, useEffect } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'

interface TranscriptEntry {
  role: 'agent' | 'user'
  content: string
  timestamp: number
}

interface UseRetellCallReturn {
  status: 'idle' | 'connecting' | 'connected' | 'ended' | 'error'
  transcript: TranscriptEntry[]
  isAgentSpeaking: boolean
  error: Error | null
  startCall: (agentId: string) => Promise<void>
  endCall: () => void
  toggleMute: () => void
  isMuted: boolean
}

export function useRetellCall(): UseRetellCallReturn {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended' | 'error'>(
    'idle'
  )
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const retellRef = useRef<RetellWebClient | null>(null)

  const startCall = useCallback(async (agentId: string) => {
    try {
      setStatus('connecting')
      setError(null)
      setTranscript([])

      // Get Supabase auth token (optional)
      const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession()
      const authToken = session?.access_token

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      }

      // Add auth header if available
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      console.log('Starting call for agent:', agentId)

      // Call edge function to get access token
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-web-call`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ agentId }),
        }
      )

      console.log('Edge function response status:', response.status)

      if (!response.ok) {
        const error = await response.json()
        console.error('Edge function error:', error)
        throw new Error(error.error || 'Failed to create call')
      }

      const data = await response.json()
      console.log('Got call credentials:', {
        hasAccessToken: !!data.access_token,
        sampleRate: data.sample_rate,
        callId: data.call_id
      })

      const { access_token, sample_rate } = data

      if (!access_token) {
        throw new Error('No access token received from edge function')
      }

      // Initialize Retell client
      console.log('Initializing Retell Web Client...')
      const retell = new RetellWebClient()
      retellRef.current = retell

      retell.on('call_started', () => {
        setStatus('connected')
      })

      retell.on('call_ended', () => {
        setStatus('ended')
      })

      retell.on('agent_start_talking', () => {
        setIsAgentSpeaking(true)
      })

      retell.on('agent_stop_talking', () => {
        setIsAgentSpeaking(false)
      })

      retell.on('update', (update) => {
        if (update.transcript) {
          setTranscript(
            update.transcript.map((t: any) => ({
              role: t.role,
              content: t.content,
              timestamp: Date.now(),
            }))
          )
        }
      })

      retell.on('error', (err) => {
        console.error('Retell SDK error:', err)
        setError(new Error(err.message || 'Call error'))
        setStatus('error')
      })

      console.log('Starting Retell call with access token...')
      await retell.startCall({
        accessToken: access_token,
        sampleRate: sample_rate || 24000,
        captureDeviceId: 'default',
      })
      console.log('Retell call started successfully')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setStatus('error')
    }
  }, [])

  const endCall = useCallback(() => {
    if (retellRef.current) {
      retellRef.current.stopCall()
      retellRef.current = null
    }
    setStatus('ended')
  }, [])

  const toggleMute = useCallback(() => {
    if (retellRef.current) {
      if (isMuted) {
        retellRef.current.unmute()
      } else {
        retellRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  useEffect(() => {
    return () => {
      if (retellRef.current) {
        retellRef.current.stopCall()
      }
    }
  }, [])

  return {
    status,
    transcript,
    isAgentSpeaking,
    error,
    startCall,
    endCall,
    toggleMute,
    isMuted,
  }
}
