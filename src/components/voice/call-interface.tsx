import { Modal, Button } from '@/components/ui'
import { useRetellCall } from '@/hooks/useRetellCall'
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface CallInterfaceProps {
  isOpen: boolean
  onClose: () => void
  agentId: string
  agentName: string
}

export function CallInterface({ isOpen, onClose, agentId, agentName }: CallInterfaceProps) {
  const { status, transcript, isAgentSpeaking, error, startCall, endCall, toggleMute, isMuted } =
    useRetellCall()

  useEffect(() => {
    if (isOpen && status === 'idle') {
      startCall(agentId)
    }
  }, [isOpen, agentId, status, startCall])

  const handleEnd = () => {
    endCall()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleEnd} title={`Call with ${agentName}`} size="lg">
      <div className="space-y-6">
        {/* Status */}
        {status === 'connecting' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center animate-pulse">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-medium">Connecting...</p>
          </div>
        )}

        {status === 'connected' && (
          <>
            {/* Voice Waveform */}
            <div className="relative h-32 rounded-xl glass flex items-center justify-center">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 rounded-full ${
                      isAgentSpeaking ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                    animate={{
                      height: isAgentSpeaking ? [20, 60, 20] : 20,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? 'primary' : 'secondary'}
                size="lg"
                onClick={toggleMute}
                className="rounded-full w-14 h-14 p-0"
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={handleEnd}
                className="rounded-full w-16 h-16 p-0 bg-error hover:bg-error/80"
              >
                <PhoneOff className="w-8 h-8" />
              </Button>
            </div>

            {/* Transcript */}
            <div className="glass rounded-xl p-4 max-h-64 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Transcript</h3>
              <div className="space-y-3">
                {transcript.map((entry, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      entry.role === 'agent' ? 'text-electric-blue' : 'text-white'
                    }`}
                  >
                    <span className="font-semibold">
                      {entry.role === 'agent' ? 'Agent' : 'You'}:{' '}
                    </span>
                    <span className="text-gray-300">{entry.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-error/20 mx-auto mb-4 flex items-center justify-center">
              <PhoneOff className="w-8 h-8 text-error" />
            </div>
            <p className="text-error font-medium mb-2">Call Failed</p>
            <p className="text-gray-400 text-sm">{error?.message}</p>
          </div>
        )}

        {status === 'ended' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-success" />
            </div>
            <p className="text-white font-medium">Call Ended</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
