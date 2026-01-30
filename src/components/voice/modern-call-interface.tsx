import { Modal } from '@/components/ui'
import { useRetellCall } from '@/hooks/useRetellCall'
import { Phone, PhoneOff, Mic, MicOff, Volume2, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface ModernCallInterfaceProps {
  isOpen: boolean
  onClose: () => void
  agentId: string
  agentName: string
}

export function ModernCallInterface({ isOpen, onClose, agentId, agentName }: ModernCallInterfaceProps) {
  const { status, transcript, isAgentSpeaking, error, startCall, endCall, toggleMute, isMuted } =
    useRetellCall()
  const [callDuration, setCallDuration] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && status === 'idle') {
      startCall(agentId)
    }
  }, [isOpen, agentId, status, startCall])

  // Timer
  useEffect(() => {
    if (status === 'connected') {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status])

  // Auto-scroll transcript
  useEffect(() => {
    if (autoScroll && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript, autoScroll])

  const handleEnd = () => {
    endCall()
    onClose()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Modal isOpen={isOpen} onClose={handleEnd} size="md">
      <div className="bg-[#1A1A1A] rounded-2xl -m-6 p-8 min-h-[700px]">
        <AnimatePresence mode="wait">
          {/* Connecting */}
          {status === 'connecting' && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full border-4 border-[#FF5C00]/30 border-t-[#FF5C00] rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connecting...</h3>
              <p className="text-gray-400">Setting up voice connection</p>
            </motion.div>
          )}

          {/* Connected */}
          {status === 'connected' && (
            <motion.div
              key="connected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Status Header */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-500 font-medium">Live Call</span>
                </div>
                <div className="text-2xl font-mono text-white">{formatTime(callDuration)}</div>
              </div>

              {/* Large Circular Avatar */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer Ring */}
                  <svg className="w-52 h-52 -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#2A2A2A"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="url(#orangeGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={565}
                      initial={{ strokeDashoffset: 565 }}
                      animate={{
                        strokeDashoffset: isAgentSpeaking ? [565, 0, 565] : 565,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <defs>
                      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF5C00" />
                        <stop offset="100%" stopColor="#FF8A4C" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inner Circle with Bot Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                      <Bot className="w-16 h-16 text-[#FF5C00]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Name & Status */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{agentName}</h3>
                <p className="text-gray-400">
                  {isAgentSpeaking ? 'Speaking...' : 'Listening to you...'}
                </p>
              </div>

              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 h-16">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-[#FF5C00]"
                    animate={{
                      height: isAgentSpeaking
                        ? [8, Math.random() * 48 + 8, 8]
                        : 8,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Live Transcription */}
              {transcript.length > 0 && (
                <div className="bg-[#0F0F0F] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-400">Live Transcription</h4>
                    <button
                      onClick={() => setAutoScroll(!autoScroll)}
                      className="text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M2 2h8v8H2z" />
                      </svg>
                      Auto-scroll
                    </button>
                  </div>
                  <div
                    ref={transcriptRef}
                    className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                  >
                    {transcript.map((entry, index) => (
                      <div key={index} className="text-sm leading-relaxed">
                        <span
                          className={`font-semibold ${
                            entry.role === 'user' ? 'text-[#FF5C00]' : 'text-green-500'
                          }`}
                        >
                          {entry.role === 'user' ? 'You:' : 'AI:'}
                        </span>{' '}
                        <span className="text-gray-300">{entry.content}</span>
                      </div>
                    ))}
                    {isAgentSpeaking && (
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <button
                  onClick={toggleMute}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isMuted
                      ? 'bg-red-500/20 border-2 border-red-500'
                      : 'bg-[#2A2A2A] hover:bg-[#3A3A3A]'
                  }`}>
                    {isMuted ? (
                      <MicOff className="w-6 h-6 text-red-500" />
                    ) : (
                      <Mic className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">Mute</span>
                </button>

                <button
                  onClick={handleEnd}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] flex items-center justify-center shadow-lg shadow-red-500/30 hover:scale-105 transition-all">
                    <PhoneOff className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">End Call</span>
                </button>

                <button className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-all">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Speaker</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <PhoneOff className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Call Failed</h3>
              <p className="text-gray-400 mb-6">{error?.message || 'Unable to connect'}</p>
              <button
                onClick={handleEnd}
                className="px-8 py-3 bg-[#2A2A2A] text-white rounded-xl hover:bg-[#3A3A3A] transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}

          {/* Ended */}
          {status === 'ended' && (
            <motion.div
              key="ended"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <Phone className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Call Ended</h3>
              <p className="text-gray-400 mb-6">Thanks for trying out our voice agent!</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
