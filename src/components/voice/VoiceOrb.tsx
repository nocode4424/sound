import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, MicOff } from 'lucide-react'
import { useRetellCall } from '@/hooks/useRetellCall'

const AGENT_ID = 'agent_de37939cba183a2ae84e0b557e'

// ─── Visualization types ─────────────────────────────────────
export type VizType =
  | 'radial-bars'
  | 'gradient-mist'
  | 'typography-echo'
  | 'constellation'
  | 'edge-glow'
  | 'waveform-ring'
  | 'particle-field'
  | 'pulse-rings'
  | 'frequency-bars'
  | 'aurora'

interface VoiceOrbProps {
  vizType?: VizType
  className?: string
  /** When true, the call is started externally (e.g. by clicking anywhere on page) */
  externalTrigger?: boolean
}

export function VoiceOrb({ vizType = 'radial-bars', className = '', externalTrigger = false }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef(0)
  const activateTimeRef = useRef(0)
  const [hasStarted, setHasStarted] = useState(false)

  const {
    status,
    isAgentSpeaking,
    isMuted,
    startCall,
    endCall,
    toggleMute,
  } = useRetellCall()

  const BAR_COUNT = 72
  const barsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0))
  const targetBarsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0))

  const isInCall = status === 'connected' || status === 'connecting'
  const isConnected = status === 'connected'
  const isIdle = status === 'idle' || status === 'ended' || status === 'error'

  const stateRef = useRef({ isInCall: false, isConnected: false, isAgentSpeaking: false, status: 'idle' as string })
  useEffect(() => {
    stateRef.current = { isInCall, isConnected, isAgentSpeaking, status }
  }, [isInCall, isConnected, isAgentSpeaking, status])

  // Handle external trigger (click anywhere on page)
  useEffect(() => {
    if (externalTrigger && isIdle && !hasStarted) {
      activateTimeRef.current = performance.now()
      setHasStarted(true)
      startCall(AGENT_ID)
    }
  }, [externalTrigger, isIdle, hasStarted, startCall])

  // ─── Visualization renderers ───────────────────────────────
  const drawVisualization = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number, h: number, cx: number, cy: number,
    time: number, bars: number[], active: boolean, speaking: boolean
  ) => {
    switch (vizType) {
      case 'radial-bars':
        drawRadialBars(ctx, w, h, cx, cy, bars, active)
        break
      case 'gradient-mist':
        drawGradientMist(ctx, w, h, cx, cy, time, bars, active, speaking)
        break
      case 'typography-echo':
        drawTypographyEcho(ctx, w, h, cx, cy, time, bars, active)
        break
      case 'constellation':
        drawConstellation(ctx, w, h, cx, cy, time, bars, active)
        break
      case 'edge-glow':
        drawEdgeGlow(ctx, w, h, cx, cy, time, bars, active, speaking)
        break
      case 'waveform-ring':
        drawWaveformRing(ctx, w, h, cx, cy, time, bars, active)
        break
      case 'particle-field':
        drawParticleField(ctx, w, h, cx, cy, time, bars, active)
        break
      case 'pulse-rings':
        drawPulseRings(ctx, w, h, cx, cy, time, bars, active, speaking)
        break
      case 'frequency-bars':
        drawFrequencyBars(ctx, w, h, cx, cy, time, bars, active)
        break
      case 'aurora':
        drawAurora(ctx, w, h, cx, cy, time, bars, active, speaking)
        break
    }
  }, [vizType])

  // Audio data generator
  const generateAudioData = useCallback((time: number): number[] => {
    const data = new Array(BAR_COUNT).fill(0)
    const { isInCall: active, isConnected: connected, isAgentSpeaking: speaking, status: st } = stateRef.current

    if (!active) {
      const elapsed = (time - startTimeRef.current) / 1000
      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2
        const breath1 = Math.sin(elapsed * 0.4 + angle * 2) * 0.15
        const breath2 = Math.sin(elapsed * 0.7 + angle * 3 + 1.5) * 0.1
        const breath3 = Math.sin(elapsed * 0.25 + angle * 1) * 0.08
        data[i] = Math.max(0.04, Math.min(0.35, 0.12 + breath1 + breath2 + breath3))
      }
    } else if (st === 'connecting') {
      const elapsed = (time - activateTimeRef.current) / 1000
      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2
        const spin = Math.sin(elapsed * 6 - angle * 4) * 0.5 + 0.5
        const pulse = Math.sin(elapsed * 3) * 0.3 + 0.4
        data[i] = spin * pulse + 0.1
      }
    } else if (connected) {
      const elapsed = (time - activateTimeRef.current) / 1000
      const intensity = speaking
        ? (Math.sin(elapsed * 2.5) * 0.3 + 0.5) * (Math.sin(elapsed * 7) * 0.2 + 0.8)
        : 0.15 + Math.sin(elapsed * 1.2) * 0.08

      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2
        if (speaking) {
          const bass = Math.sin(elapsed * 4 + angle * 2) * 0.4
          const mid = Math.sin(elapsed * 8 + angle * 5) * 0.25
          const treble = Math.sin(elapsed * 15 + angle * 8) * 0.15
          const noise = (Math.random() - 0.5) * 0.2
          data[i] = (bass + mid + treble + noise) * intensity + 0.15
        } else {
          const breath = Math.sin(elapsed * 0.8 + angle * 2) * 0.12
          const micro = Math.sin(elapsed * 3 + angle * 4) * 0.05
          data[i] = intensity + breath + micro
        }
        data[i] = Math.max(0.04, Math.min(1.0, data[i]))
      }
    }
    return data
  }, [])

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    startTimeRef.current = performance.now()

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

      const targets = generateAudioData(time)
      targetBarsRef.current = targets
      const active = stateRef.current.isInCall
      const smoothing = active ? 0.15 : 0.06
      for (let i = 0; i < BAR_COUNT; i++) {
        barsRef.current[i] += (targetBarsRef.current[i] - barsRef.current[i]) * smoothing
      }

      drawVisualization(ctx, w, h, cx, cy, time, barsRef.current, active, stateRef.current.isAgentSpeaking)
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObserver.disconnect()
    }
  }, [generateAudioData, drawVisualization])

  const handleStart = useCallback(() => {
    if (isIdle) {
      activateTimeRef.current = performance.now()
      setHasStarted(true)
      startCall(AGENT_ID)
    }
  }, [isIdle, startCall])

  const handleEnd = useCallback(() => {
    endCall()
    setHasStarted(false)
    startTimeRef.current = performance.now()
  }, [endCall])

  const statusText = status === 'connecting' ? 'Connecting...'
    : isAgentSpeaking ? 'Agent speaking'
    : isConnected ? 'Listening...' : ''

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isIdle ? (
              <motion.button
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow cursor-pointer"
                aria-label="Start voice call"
              >
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.button>
            ) : (
              <motion.div
                key="split"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-24 h-24 sm:w-28 sm:h-28"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={toggleMute}
                  className="absolute inset-0 cursor-pointer group"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
                  aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  <div className={`w-full h-full rounded-full transition-colors duration-200 ${isMuted ? 'bg-amber-500/30' : 'bg-white/[0.07] group-hover:bg-white/[0.12]'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnd}
                  className="absolute inset-0 cursor-pointer group"
                  style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
                  aria-label="End call"
                >
                  <div className="w-full h-full rounded-full bg-red-500/20 group-hover:bg-red-500/35 transition-colors duration-200" />
                </motion.button>
                <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/15 pointer-events-none" />
                <div className="absolute top-[14%] left-1/2 -translate-x-1/2 pointer-events-none">
                  {isMuted ? (
                    <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  ) : (
                    <div className="relative">
                      {isConnected && !isAgentSpeaking && (
                        <span className="absolute inset-0 -m-1.5 rounded-full border border-white/20 animate-ping" />
                      )}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 pointer-events-none">
                  <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
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

// ═══════════════════════════════════════════════════════════════
// VISUALIZATION DRAW FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function drawRadialBars(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, bars: number[], active: boolean
) {
  const count = bars.length
  const baseRadius = Math.min(cx, cy) * (active ? 0.48 : 0.46)
  const maxBarLen = Math.min(cx, cy) * (active ? 0.32 : 0.22)

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    const v = bars[i]
    const len = v * maxBarLen
    const x1 = cx + Math.cos(angle) * baseRadius
    const y1 = cy + Math.sin(angle) * baseRadius
    const x2 = cx + Math.cos(angle) * (baseRadius + len)
    const y2 = cy + Math.sin(angle) * (baseRadius + len)

    const hue = active ? 250 + v * 60 + (i / count) * 30 : 250 + (i / count) * 20
    const sat = active ? 70 + v * 30 : 30 + v * 20
    const lit = active ? 55 + v * 25 : 45 + v * 15
    const alpha = active ? 0.6 + v * 0.4 : 0.25 + v * 0.35

    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
    ctx.strokeStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`
    ctx.lineWidth = active ? 2.5 : 2; ctx.lineCap = 'round'; ctx.stroke()

    if (active && v > 0.4) {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
      ctx.strokeStyle = `hsla(${hue},80%,70%,${v * 0.2})`
      ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.stroke()
    }
  }
}

function drawGradientMist(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  cx: number, cy: number, time: number, bars: number[],
  active: boolean, speaking: boolean
) {
  const t = time / 1000
  const avg = bars.reduce((a, b) => a + b, 0) / bars.length
  const blobCount = 4
  for (let i = 0; i < blobCount; i++) {
    const phase = (i / blobCount) * Math.PI * 2
    const speed = active ? 1.5 : 0.3
    const radius = (active ? 80 + avg * 120 : 60) + Math.sin(t * speed + phase) * 30
    const bx = cx + Math.cos(t * 0.5 * speed + phase) * (active ? 60 : 30)
    const by = cy + Math.sin(t * 0.7 * speed + phase) * (active ? 50 : 20)

    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius)
    const hue = 250 + i * 25 + (speaking ? avg * 40 : 0)
    const alpha = active ? 0.15 + avg * 0.15 : 0.06
    grad.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha})`)
    grad.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }
}

function drawTypographyEcho(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, time: number, bars: number[], active: boolean
) {
  const t = time / 1000
  const avg = bars.reduce((a, b) => a + b, 0) / bars.length
  const text = 'VOCA'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  const layers = active ? 6 : 3
  for (let i = layers; i >= 0; i--) {
    const scale = 1 + i * (active ? 0.15 + avg * 0.2 : 0.08)
    const alpha = (1 - i / (layers + 1)) * (active ? 0.12 + avg * 0.1 : 0.04)
    const offset = Math.sin(t * (active ? 2 : 0.5) + i * 0.5) * (active ? 4 : 1)
    ctx.save()
    ctx.translate(cx + offset, cy)
    ctx.scale(scale, scale)
    ctx.font = `bold ${Math.min(cx, cy) * 0.4}px Inter, sans-serif`
    ctx.fillStyle = `hsla(260, 60%, 70%, ${alpha})`
    ctx.fillText(text, 0, 0)
    ctx.restore()
  }
}

function drawConstellation(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, time: number, bars: number[], active: boolean
) {
  const t = time / 1000
  const count = 40
  const radius = Math.min(cx, cy) * 0.7
  const points: [number, number][] = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const barIdx = Math.floor((i / count) * bars.length)
    const v = bars[barIdx]
    const r = radius * (0.3 + (active ? v * 0.7 : 0.2 + Math.sin(t * 0.3 + angle) * 0.1))
    const px = cx + Math.cos(angle + t * (active ? 0.3 : 0.1)) * r
    const py = cy + Math.sin(angle + t * (active ? 0.3 : 0.1)) * r
    points.push([px, py])

    const dotSize = active ? 2 + v * 3 : 1.5
    const alpha = active ? 0.4 + v * 0.5 : 0.2
    ctx.beginPath(); ctx.arc(px, py, dotSize, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(260, 60%, 70%, ${alpha})`; ctx.fill()
  }

  // Lines between nearby points
  const threshold = active ? 80 : 50
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i][0] - points[j][0]
      const dy = points[i][1] - points[j][1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < threshold) {
        const alpha = (1 - dist / threshold) * (active ? 0.2 : 0.06)
        ctx.beginPath(); ctx.moveTo(points[i][0], points[i][1]); ctx.lineTo(points[j][0], points[j][1])
        ctx.strokeStyle = `hsla(260, 50%, 65%, ${alpha})`; ctx.lineWidth = 1; ctx.stroke()
      }
    }
  }
}

function drawEdgeGlow(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  cx: number, cy: number, time: number, bars: number[],
  active: boolean, speaking: boolean
) {
  const t = time / 1000
  const avg = bars.reduce((a, b) => a + b, 0) / bars.length

  // Bokeh blobs at edges
  const blobs = active ? 5 : 3
  for (let i = 0; i < blobs; i++) {
    const phase = (i / blobs) * Math.PI * 2
    const speed = active ? 0.8 : 0.2
    const dist = Math.min(w, h) * (active ? 0.35 + avg * 0.15 : 0.3)
    const bx = cx + Math.cos(t * speed + phase) * dist
    const by = cy + Math.sin(t * speed * 0.7 + phase) * dist * 0.6
    const r = (active ? 50 + avg * 80 : 40) + Math.sin(t + phase) * 15

    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r)
    const hue = 260 + i * 30 + (speaking ? 20 : 0)
    const alpha = active ? 0.12 + avg * 0.12 : 0.04
    grad.addColorStop(0, `hsla(${hue}, 70%, 65%, ${alpha})`)
    grad.addColorStop(0.6, `hsla(${hue}, 60%, 50%, ${alpha * 0.3})`)
    grad.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }
}

function drawWaveformRing(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, time: number, bars: number[], active: boolean
) {
  const t = time / 1000
  const count = bars.length
  const baseR = Math.min(cx, cy) * 0.45

  for (let ring = 0; ring < (active ? 3 : 1); ring++) {
    ctx.beginPath()
    for (let i = 0; i <= count; i++) {
      const idx = i % count
      const angle = (idx / count) * Math.PI * 2 - Math.PI / 2
      const v = bars[idx]
      const offset = active
        ? v * 30 * (1 - ring * 0.3) + Math.sin(t * 3 + idx * 0.2) * 5
        : Math.sin(t * 0.5 + idx * 0.15) * 5
      const r = baseR + ring * 8 + offset
      const px = cx + Math.cos(angle) * r
      const py = cy + Math.sin(angle) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    const alpha = active ? 0.4 - ring * 0.12 : 0.12
    ctx.strokeStyle = `hsla(260, 60%, 65%, ${alpha})`
    ctx.lineWidth = active ? 2 : 1.5
    ctx.stroke()
  }
}

function drawParticleField(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, time: number, bars: number[], active: boolean
) {
  const t = time / 1000
  const count = 60
  const radius = Math.min(cx, cy) * 0.65

  for (let i = 0; i < count; i++) {
    const seed1 = Math.sin(i * 127.1) * 0.5 + 0.5
    const seed2 = Math.sin(i * 311.7) * 0.5 + 0.5
    const barIdx = Math.floor(seed1 * bars.length)
    const v = bars[barIdx]

    const angle = seed1 * Math.PI * 2 + t * (active ? 0.4 : 0.1)
    const dist = seed2 * radius * (active ? 0.5 + v * 0.5 : 0.7)
    const px = cx + Math.cos(angle) * dist
    const py = cy + Math.sin(angle) * dist
    const size = active ? 1.5 + v * 4 : 1 + seed2 * 1.5
    const alpha = active ? 0.3 + v * 0.5 : 0.1 + seed2 * 0.1

    ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${260 + v * 40}, 60%, 70%, ${alpha})`; ctx.fill()
  }
}

function drawPulseRings(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, time: number, bars: number[],
  active: boolean, speaking: boolean
) {
  const t = time / 1000
  const avg = bars.reduce((a, b) => a + b, 0) / bars.length
  const ringCount = active ? 5 : 3
  const maxR = Math.min(cx, cy) * 0.7

  for (let i = 0; i < ringCount; i++) {
    const phase = (i / ringCount) * Math.PI * 2
    const speed = active ? 1.5 : 0.4
    const progress = ((t * speed + phase) % (Math.PI * 2)) / (Math.PI * 2)
    const r = progress * maxR
    const baseAlpha = (1 - progress) * (active ? 0.3 + (speaking ? avg * 0.3 : 0) : 0.08)
    const lineW = active ? 2 + avg * 3 : 1

    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(260, 60%, 65%, ${baseAlpha})`
    ctx.lineWidth = lineW; ctx.stroke()
  }
}

function drawFrequencyBars(
  ctx: CanvasRenderingContext2D, _w: number, _h: number,
  cx: number, cy: number, _time: number, bars: number[], active: boolean
) {
  const barW = 4
  const gap = 3
  const totalBars = 32
  const totalW = totalBars * (barW + gap) - gap
  const startX = cx - totalW / 2
  const maxH = Math.min(cx, cy) * (active ? 0.6 : 0.35)

  for (let i = 0; i < totalBars; i++) {
    const barIdx = Math.floor((i / totalBars) * bars.length)
    const v = bars[barIdx]
    const h = active ? v * maxH + 4 : v * maxH * 0.6 + 2
    const x = startX + i * (barW + gap)
    const y = cy - h / 2

    const hue = 250 + (i / totalBars) * 40
    const alpha = active ? 0.5 + v * 0.4 : 0.15 + v * 0.2
    ctx.fillStyle = `hsla(${hue}, 60%, 65%, ${alpha})`
    ctx.beginPath()
    ctx.roundRect(x, y, barW, h, 2)
    ctx.fill()
  }
}

function drawAurora(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  _cx: number, cy: number, time: number, bars: number[],
  active: boolean, speaking: boolean
) {
  const t = time / 1000
  const avg = bars.reduce((a, b) => a + b, 0) / bars.length
  const layers = active ? 4 : 2

  for (let l = 0; l < layers; l++) {
    ctx.beginPath()
    const yBase = cy + (l - layers / 2) * 30
    ctx.moveTo(0, yBase)

    for (let x = 0; x <= w; x += 4) {
      const barIdx = Math.floor((x / w) * bars.length)
      const v = bars[barIdx]
      const wave1 = Math.sin(x * 0.01 + t * (active ? 1.5 : 0.3) + l) * 20
      const wave2 = Math.sin(x * 0.02 + t * (active ? 2 : 0.5) + l * 2) * 15
      const audioWave = active ? v * 40 * (speaking ? 1.5 : 0.5) : v * 10
      const y = yBase + wave1 + wave2 + audioWave
      ctx.lineTo(x, y)
    }

    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath()
    const hue = 250 + l * 30 + (speaking ? avg * 20 : 0)
    const alpha = active ? 0.06 + avg * 0.06 : 0.03
    ctx.fillStyle = `hsla(${hue}, 60%, 55%, ${alpha})`
    ctx.fill()
  }
}
