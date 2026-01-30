import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'

interface VoiceOrbProps {
  onCallStart?: () => void
  onCallEnd?: () => void
  className?: string
}

export function VoiceOrb({ onCallStart, onCallEnd, className = '' }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [state, setState] = useState<'idle' | 'connecting' | 'active' | 'listening'>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const stateRef = useRef(state)
  const startTimeRef = useRef(0)
  const activateTimeRef = useRef(0)

  // Keep ref in sync
  useEffect(() => {
    stateRef.current = state
  }, [state])

  const BAR_COUNT = 72
  const barsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0))
  const targetBarsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0))

  // Simulated audio data generator
  const generateAudioData = useCallback((time: number): number[] => {
    const data = new Array(BAR_COUNT).fill(0)
    const currentState = stateRef.current

    if (currentState === 'idle') {
      // Ambient breathing - very subtle, slow undulation
      // This is the "decorative" state - looks like a design element
      const elapsed = (time - startTimeRef.current) / 1000
      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2
        // Multiple slow sine waves create organic breathing
        const breath1 = Math.sin(elapsed * 0.4 + angle * 2) * 0.15
        const breath2 = Math.sin(elapsed * 0.7 + angle * 3 + 1.5) * 0.1
        const breath3 = Math.sin(elapsed * 0.25 + angle * 1) * 0.08
        data[i] = 0.12 + breath1 + breath2 + breath3
        // Clamp to keep it subtle
        data[i] = Math.max(0.04, Math.min(0.35, data[i]))
      }
    } else if (currentState === 'connecting') {
      // Spinning buildup effect
      const elapsed = (time - activateTimeRef.current) / 1000
      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2
        const spin = Math.sin(elapsed * 6 - angle * 4) * 0.5 + 0.5
        const pulse = Math.sin(elapsed * 3) * 0.3 + 0.4
        data[i] = spin * pulse + 0.1
      }
    } else if (currentState === 'active' || currentState === 'listening') {
      // Voice-responsive: simulate speech patterns
      const elapsed = (time - activateTimeRef.current) / 1000

      // Create speech-like bursts
      const speaking = currentState === 'active'
      const intensity = speaking
        ? (Math.sin(elapsed * 2.5) * 0.3 + 0.5) * (Math.sin(elapsed * 7) * 0.2 + 0.8)
        : 0.15 + Math.sin(elapsed * 1.2) * 0.08

      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2

        if (speaking) {
          // Active speech: energetic, frequency-band-like response
          const bass = Math.sin(elapsed * 4 + angle * 2) * 0.4
          const mid = Math.sin(elapsed * 8 + angle * 5) * 0.25
          const treble = Math.sin(elapsed * 15 + angle * 8) * 0.15
          const noise = (Math.random() - 0.5) * 0.2
          data[i] = (bass + mid + treble + noise) * intensity + 0.15
        } else {
          // Listening/quiet: gentle breathing with slight responsiveness
          const breath = Math.sin(elapsed * 0.8 + angle * 2) * 0.12
          const micro = Math.sin(elapsed * 3 + angle * 4) * 0.05
          data[i] = intensity + breath + micro
        }

        data[i] = Math.max(0.04, Math.min(1.0, data[i]))
      }
    }

    return data
  }, [])

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    startTimeRef.current = performance.now()

    // Handle DPI scaling
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(canvas)

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2

      ctx.clearRect(0, 0, w, h)

      // Generate target values
      const targets = generateAudioData(time)
      targetBarsRef.current = targets

      // Smooth interpolation
      const smoothing = stateRef.current === 'idle' ? 0.06 : 0.15
      for (let i = 0; i < BAR_COUNT; i++) {
        barsRef.current[i] += (targetBarsRef.current[i] - barsRef.current[i]) * smoothing
      }

      const isActive = stateRef.current !== 'idle'
      const baseRadius = Math.min(cx, cy) * (isActive ? 0.48 : 0.46)
      const maxBarLength = Math.min(cx, cy) * (isActive ? 0.32 : 0.22)

      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2
        const value = barsRef.current[i]
        const barLength = value * maxBarLength

        const x1 = cx + Math.cos(angle) * baseRadius
        const y1 = cy + Math.sin(angle) * baseRadius
        const x2 = cx + Math.cos(angle) * (baseRadius + barLength)
        const y2 = cy + Math.sin(angle) * (baseRadius + barLength)

        // Color: transition from subtle to vibrant based on state
        const hue = isActive
          ? 250 + (value * 60) + (i / BAR_COUNT) * 30 // purple → blue-cyan when active
          : 250 + (i / BAR_COUNT) * 20 // subtle purple when idle

        const saturation = isActive ? 70 + value * 30 : 30 + value * 20
        const lightness = isActive ? 55 + value * 25 : 45 + value * 15
        const alpha = isActive ? 0.6 + value * 0.4 : 0.25 + value * 0.35

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
        ctx.lineWidth = isActive ? 2.5 : 2
        ctx.lineCap = 'round'
        ctx.stroke()

        // Glow effect when active
        if (isActive && value > 0.4) {
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${value * 0.2})`
          ctx.lineWidth = 6
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }

      // Inner glow
      const glowRadius = baseRadius * 0.85
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius)
      if (isActive) {
        const pulse = Math.sin(time / 800) * 0.03 + 0.06
        glowGrad.addColorStop(0, `rgba(99, 102, 241, ${pulse})`)
        glowGrad.addColorStop(0.5, `rgba(139, 92, 246, ${pulse * 0.5})`)
        glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)')
      } else {
        glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.02)')
        glowGrad.addColorStop(1, 'rgba(99, 102, 241, 0)')
      }
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2)
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObserver.disconnect()
    }
  }, [generateAudioData])

  // Simulate speech patterns when active
  useEffect(() => {
    if (state !== 'active' && state !== 'listening') return

    // Toggle between speaking and listening every few seconds
    const interval = setInterval(() => {
      setState(prev => {
        if (prev === 'active') return 'listening'
        if (prev === 'listening') return 'active'
        return prev
      })
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [state === 'active' || state === 'listening'])

  const handlePlay = useCallback(() => {
    if (state === 'idle') {
      activateTimeRef.current = performance.now()
      setState('connecting')
      onCallStart?.()
      // Simulate connection delay
      setTimeout(() => {
        setState('active')
      }, 1800)
    }
  }, [state, onCallStart])

  const handleEnd = useCallback(() => {
    setState('idle')
    startTimeRef.current = performance.now()
    onCallEnd?.()
  }, [onCallEnd])

  const isInCall = state === 'active' || state === 'listening' || state === 'connecting'
  const statusText = state === 'connecting' ? 'Connecting...' :
    state === 'active' ? 'Agent speaking' :
    state === 'listening' ? 'Listening...' : ''

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Canvas visualization */}
      <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Center button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isInCall ? (
              <motion.button
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow cursor-pointer"
                aria-label="Start voice call"
              >
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.button>
            ) : (
              <motion.div
                key="controls"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isMuted ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70 hover:text-white'
                  }`}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEnd}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 transition-colors cursor-pointer"
                  aria-label="End call"
                >
                  <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status text */}
      <AnimatePresence>
        {isInCall && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              {statusText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
