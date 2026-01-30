import { motion } from 'framer-motion'
import { OnboardingData } from '../OnboardingFlow'
import { Check, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface PreviewStepProps {
  data: OnboardingData
  onLaunch: () => void
  onBack: () => void
}

export function PreviewStep({ data, onLaunch, onBack }: PreviewStepProps) {
  const [isCreating, setIsCreating] = useState(false)

  const handleLaunch = async () => {
    setIsCreating(true)
    await onLaunch()
  }

  const getPersonalityLabel = (value: number, labels: string[]) => {
    const index = Math.min(Math.floor((value - 1) / 2.5), labels.length - 1)
    return labels[index]
  }

  const isAdvancedMode = data.generalPrompt && data.generalPrompt.length > 0

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Review & Launch
          </h2>
          <p className="text-gray-400">
            Your AI voice agent is ready to go live!
          </p>
        </div>

        {/* Configuration Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Restaurant Info */}
          <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#FF5C00]" />
              Restaurant Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-medium">{data.restaurantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cuisine:</span>
                <span className="text-white font-medium">{data.cuisine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-white font-medium">{data.phone}</span>
              </div>
            </div>
          </div>

          {/* Voice */}
          <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#FF5C00]" />
              Voice
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Voice:</span>
                <span className="text-white font-medium">{data.voiceName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personality/Settings Visualization */}
        {isAdvancedMode ? (
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-electric-blue/20 rounded-xl p-8 mb-8">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">
              Advanced Configuration
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">LLM Model</div>
                <div className="text-white font-medium">
                  {data.llmModel?.replace('gpt-4o', 'GPT-4 Omni').replace('-mini', ' Mini') || 'GPT-4 Omni'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Temperature</div>
                <div className="text-white font-medium">{data.temperature?.toFixed(1) || '0.7'}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Voice Speed</div>
                <div className="text-white font-medium">{data.voiceSpeed?.toFixed(1) || '1.0'}x</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Responsiveness</div>
                <div className="text-white font-medium">{data.responsiveness?.toFixed(1) || '1.0'}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Interruption</div>
                <div className="text-white font-medium">{data.interruptionSensitivity?.toFixed(1) || '1.0'}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Backchannel</div>
                <div className="text-white font-medium">
                  {data.enableBackchannel !== false ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
            {data.generalPrompt && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-gray-400 mb-2 text-xs">System Prompt Preview</div>
                <div className="text-white text-sm bg-black/30 rounded-lg p-4 max-h-32 overflow-y-auto">
                  {data.generalPrompt.substring(0, 200)}...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#FF5C00]/20 rounded-xl p-8 mb-8">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">
              Personality Profile
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{data.warmth}/10</div>
                <div className="text-sm text-gray-400 mb-1">Warmth</div>
                <div className="text-xs text-[#FF5C00]">
                  {getPersonalityLabel(data.warmth, ['Reserved', 'Friendly', 'Warm', 'Enthusiastic'])}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{data.pace}/10</div>
                <div className="text-sm text-gray-400 mb-1">Pace</div>
                <div className="text-xs text-[#FF5C00]">
                  {getPersonalityLabel(data.pace, ['Slow', 'Comfortable', 'Brisk', 'Quick'])}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{data.chattiness}/10</div>
                <div className="text-sm text-gray-400 mb-1">Chattiness</div>
                <div className="text-xs text-[#FF5C00]">
                  {getPersonalityLabel(data.chattiness, ['Brief', 'Conversational', 'Engaging', 'Chatty'])}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{data.formality}/10</div>
                <div className="text-sm text-gray-400 mb-1">Formality</div>
                <div className="text-xs text-[#FF5C00]">
                  {getPersonalityLabel(data.formality, ['Casual', 'Balanced', 'Polished', 'Formal'])}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Status */}
        <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-[#FF5C00]" />
            Menu & Knowledge Base
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Menu:</span>
              <span className="text-green-400">
                {data.menuFile ? `File uploaded (${data.menuFile.name})` : 'Text provided'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Knowledge Base:</span>
              <span className="text-green-400">
                {data.knowledgeBase ? 'Configured' : 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Launch Button */}
        <div className="text-center">
          <button
            onClick={handleLaunch}
            disabled={isCreating}
            className="px-12 py-4 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCreating ? (
              <>
                <div className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                Creating Your AI Agent...
              </>
            ) : (
              '🚀 Launch My AI Agent'
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            This will take about 30 seconds to set up
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onBack}
            disabled={isCreating}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            ← Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
