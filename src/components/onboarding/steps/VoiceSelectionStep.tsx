import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { OnboardingData } from '../OnboardingFlow'
import { Check, Play, Pause } from 'lucide-react'
import { VoiceWaveIcon } from '@/components/icons/VoiceWaveIcon'

interface VoiceSelectionStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

interface Voice {
  id: string
  name: string
  gender: string
  age: string
  description: string
  previewText: string
}

const VOICES: Voice[] = [
  {
    id: '11labs-Andrew',
    name: 'Andrew',
    gender: 'Male',
    age: 'Young Adult',
    description: 'Warm, friendly, and approachable',
    previewText: 'Hi! Thanks for calling. How can I help you today?',
  },
  {
    id: '11labs-Grace',
    name: 'Grace',
    gender: 'Female',
    age: 'Young Adult',
    description: 'Clear, professional, and confident',
    previewText: 'Hello, thanks for calling. What can I get for you?',
  },
  {
    id: '11labs-Hailey',
    name: 'Hailey',
    gender: 'Female',
    age: 'Middle Age',
    description: 'Soft, calm, and reassuring',
    previewText: 'Good afternoon. Thank you for calling. How may I assist you?',
  },
  {
    id: '11labs-Brian',
    name: 'Brian',
    gender: 'Male',
    age: 'Middle Age',
    description: 'Deep, authoritative, and trustworthy',
    previewText: 'Hello. Thank you for reaching out. How can I help you today?',
  },
]

export function VoiceSelectionStep({ data, updateData, onNext, onBack }: VoiceSelectionStepProps) {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null)
  const [generatingPreview, setGeneratingPreview] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSelectVoice = (voice: Voice) => {
    updateData({ voiceId: voice.id, voiceName: voice.name })
  }

  const handlePreviewVoice = async (e: React.MouseEvent, voice: Voice) => {
    e.stopPropagation()

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setPlayingVoiceId(null)
      return
    }

    if (playingVoiceId === voice.id) {
      setPlayingVoiceId(null)
      return
    }

    try {
      setGeneratingPreview(voice.id)

      // Fetch voice preview from Retell via our edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/list-voices`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch voices')
      }

      const voicesData = await response.json()

      // Find the matching voice and get its preview URL
      const voiceData = voicesData.find((v: any) => v.voice_id === voice.id)

      if (voiceData?.preview_audio_url) {
        const audio = new Audio(voiceData.preview_audio_url)
        audioRef.current = audio

        audio.onloadeddata = () => {
          setPlayingVoiceId(voice.id)
          setGeneratingPreview(null)
          audio.play()
        }

        audio.onended = () => {
          setPlayingVoiceId(null)
          audioRef.current = null
        }

        audio.onerror = () => {
          console.error('Audio playback error')
          setGeneratingPreview(null)
          setPlayingVoiceId(null)
        }
      } else {
        // Fallback: Use browser speech synthesis
        const utterance = new SpeechSynthesisUtterance(voice.previewText)
        const voices = speechSynthesis.getVoices()
        const matchingVoice = voices.find(v =>
          voice.gender === 'Female'
            ? v.name.toLowerCase().includes('female')
            : v.name.toLowerCase().includes('male')
        )

        if (matchingVoice) utterance.voice = matchingVoice
        utterance.rate = 0.95
        utterance.pitch = voice.gender === 'Female' ? 1.1 : 0.9

        utterance.onstart = () => {
          setPlayingVoiceId(voice.id)
          setGeneratingPreview(null)
        }
        utterance.onend = () => setPlayingVoiceId(null)

        speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error('Preview error:', error)
      setGeneratingPreview(null)

      // Fallback to browser speech
      const utterance = new SpeechSynthesisUtterance(voice.previewText)
      utterance.onstart = () => {
        setPlayingVoiceId(voice.id)
        setGeneratingPreview(null)
      }
      utterance.onend = () => setPlayingVoiceId(null)
      speechSynthesis.speak(utterance)
    }
  }

  const isValid = !!data.voiceId

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-[#0A0F1C] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose your AI's voice
        </h2>
        <p className="text-gray-400 mb-6">
          Select a voice that best represents your restaurant's brand
        </p>

        {/* Voice Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {VOICES.map((voice) => {
            const isSelected = data.voiceId === voice.id
            const isPlaying = playingVoiceId === voice.id
            const isGenerating = generatingPreview === voice.id

            return (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#0F172A] border-2 p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-xl rounded-xl ${
                  isSelected
                    ? 'border-[#FF5C00] shadow-xl shadow-orange-500/30 ring-2 ring-[#FF5C00]/20'
                    : 'border-white/10 hover:border-[#FF5C00]/50'
                }`}
                onClick={() => handleSelectVoice(voice)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="flex justify-end mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF5C00] flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Voice Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] shadow-lg shadow-orange-500/50'
                      : 'bg-white/5'
                  }`}>
                    <VoiceWaveIcon size={32} className={isSelected ? 'text-white' : 'text-[#FF5C00]'} />
                  </div>
                </div>

                {/* Voice Info */}
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{voice.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span className="font-medium">{voice.gender}</span>
                    <span>•</span>
                    <span className="font-medium">{voice.age}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {voice.description}
                  </p>
                </div>

                {/* Preview Button */}
                <button
                  onClick={(e) => handlePreviewVoice(e, voice)}
                  disabled={isGenerating}
                  className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF5C00]/50 text-center text-sm text-white font-medium transition-all rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Stop Preview</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Preview Voice</span>
                    </>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium rounded-lg"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className="px-8 py-3 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
