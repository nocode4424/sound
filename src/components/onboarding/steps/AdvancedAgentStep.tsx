import { useState } from 'react'
import { motion } from 'framer-motion'
import { OnboardingData } from '../OnboardingFlow'
import { SimpleSlider as Slider } from '@/components/ui/simple-slider'
import { Collapsible } from '@/components/ui/collapsible'
import { AGENT_PRESETS, getPresetByName } from '@/lib/agent-presets'
import { Info } from 'lucide-react'

interface AdvancedAgentStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function AdvancedAgentStep({ data, updateData, onNext, onBack }: AdvancedAgentStepProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('custom')

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName)
    if (presetName !== 'custom') {
      const preset = getPresetByName(presetName)
      updateData({
        llmModel: preset.llmModel,
        temperature: preset.temperature,
        maxTokens: preset.maxTokens,
        voiceSpeed: preset.voiceSpeed,
        voiceTemperature: preset.voiceTemperature,
        responsiveness: preset.responsiveness,
        interruptionSensitivity: preset.interruptionSensitivity,
        enableBackchannel: preset.enableBackchannel,
        backchannelFrequency: preset.backchannelFrequency,
        endCallAfterSilenceMs: preset.endCallAfterSilenceMs,
        maxCallDurationMs: preset.maxCallDurationMs,
        ambientSound: preset.ambientSound,
        ambientSoundVolume: preset.ambientSoundVolume,
      })
    }
  }

  const canContinue = data.generalPrompt && data.generalPrompt.length >= 50

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Configure Your Agent
        </h2>
        <p className="text-gray-400 mb-8">
          Define your agent's behavior with detailed settings
        </p>

        <div className="space-y-6">
          {/* Quick Start - Agent Prompt */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Agent Instructions (System Prompt)
            </label>
            <p className="text-xs text-gray-400 mb-3">
              Describe your agent's role, personality, and how it should handle customer interactions
            </p>
            <textarea
              value={data.generalPrompt || ''}
              onChange={(e) => updateData({ generalPrompt: e.target.value })}
              placeholder="You are a friendly restaurant assistant for Mario's Pizza. You help customers place orders, make reservations, and answer questions about our menu. Be warm and conversational..."
              rows={8}
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              {data.generalPrompt?.length || 0} characters (minimum 50)
            </p>
          </div>

          {/* Preset Selector */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-semibold text-white mb-2">
              Configuration Preset
            </label>
            <p className="text-xs text-gray-400 mb-3">
              Start with optimized settings for your restaurant type
            </p>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
            >
              <option value="casual_restaurant">Casual Restaurant</option>
              <option value="fine_dining">Fine Dining</option>
              <option value="fast_casual">Fast Casual</option>
              <option value="custom">Custom (Configure Manually)</option>
            </select>
            {selectedPreset !== 'custom' && (
              <p className="text-xs text-gray-500 mt-2">
                {AGENT_PRESETS[selectedPreset]?.description}
              </p>
            )}
          </div>

          {/* LLM Settings */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">LLM Settings</h3>
            <div className="space-y-5">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Language Model
                </label>
                <select
                  value={data.llmModel || 'gpt-4o'}
                  onChange={(e) => updateData({ llmModel: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                >
                  <option value="gpt-4o">GPT-4 Omni (Recommended - Best Quality)</option>
                  <option value="gpt-4o-mini">GPT-4 Omni Mini (Faster & Cheaper)</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  <option value="claude-3-haiku">Claude 3 Haiku (Fast)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                </select>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Response Creativity</label>
                  <span className="text-xs text-electric-blue font-medium">
                    {data.temperature !== undefined ? data.temperature.toFixed(1) : '0.7'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24">Consistent</span>
                  <Slider
                    value={data.temperature ?? 0.7}
                    onChange={(e) => updateData({ temperature: Number(e.target.value) })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex-1"
                    showValue={false}
                  />
                  <span className="text-xs text-gray-500 w-24 text-right">Creative</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lower values = more predictable responses
                </p>
              </div>

              {/* Max Tokens */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Max Response Length (tokens)
                </label>
                <input
                  type="number"
                  value={data.maxTokens ?? 500}
                  onChange={(e) => updateData({ maxTokens: Number(e.target.value) })}
                  min={50}
                  max={4000}
                  step={50}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Longer = more detailed responses (typical: 300-800)
                </p>
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Voice Settings</h3>
            <div className="space-y-5">
              {/* Voice Speed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Speaking Speed</label>
                  <span className="text-xs text-electric-blue font-medium">
                    {data.voiceSpeed !== undefined ? data.voiceSpeed.toFixed(1) : '1.0'}x
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-16">0.5x</span>
                  <Slider
                    value={data.voiceSpeed ?? 1.0}
                    onChange={(e) => updateData({ voiceSpeed: Number(e.target.value) })}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="flex-1"
                    showValue={false}
                  />
                  <span className="text-xs text-gray-500 w-16 text-right">2.0x</span>
                </div>
              </div>

              {/* Voice Expressiveness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Voice Expressiveness</label>
                  <span className="text-xs text-electric-blue font-medium">
                    {data.voiceTemperature !== undefined ? data.voiceTemperature.toFixed(1) : '1.0'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24">Monotone</span>
                  <Slider
                    value={data.voiceTemperature ?? 1.0}
                    onChange={(e) => updateData({ voiceTemperature: Number(e.target.value) })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex-1"
                    showValue={false}
                  />
                  <span className="text-xs text-gray-500 w-24 text-right">Expressive</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  How much emotion the voice conveys
                </p>
              </div>
            </div>
          </div>

          {/* Conversation Behavior */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Conversation Behavior</h3>
            <div className="space-y-5">
              {/* Responsiveness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Responsiveness</label>
                  <span className="text-xs text-electric-blue font-medium">
                    {data.responsiveness !== undefined ? data.responsiveness.toFixed(1) : '1.0'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24">Patient</span>
                  <Slider
                    value={data.responsiveness ?? 1.0}
                    onChange={(e) => updateData({ responsiveness: Number(e.target.value) })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex-1"
                    showValue={false}
                  />
                  <span className="text-xs text-gray-500 w-24 text-right">Eager</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  How quickly AI responds during pauses
                </p>
              </div>

              {/* Interruption Sensitivity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Interruption Sensitivity</label>
                  <span className="text-xs text-electric-blue font-medium">
                    {data.interruptionSensitivity !== undefined ? data.interruptionSensitivity.toFixed(1) : '1.0'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-32">Hard to interrupt</span>
                  <Slider
                    value={data.interruptionSensitivity ?? 1.0}
                    onChange={(e) => updateData({ interruptionSensitivity: Number(e.target.value) })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="flex-1"
                    showValue={false}
                  />
                  <span className="text-xs text-gray-500 w-32 text-right">Easy to interrupt</span>
                </div>
              </div>

              {/* Backchannel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">Enable Backchannel</label>
                  <button
                    onClick={() => updateData({ enableBackchannel: !data.enableBackchannel })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      data.enableBackchannel ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        data.enableBackchannel ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  AI says "mm-hmm", "yeah" while listening to sound more natural
                </p>

                {data.enableBackchannel && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-300">Backchannel Frequency</label>
                      <span className="text-xs text-electric-blue font-medium">
                        {data.backchannelFrequency !== undefined ? data.backchannelFrequency.toFixed(1) : '0.8'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-24">Rare</span>
                      <Slider
                        value={data.backchannelFrequency ?? 0.8}
                        onChange={(e) => updateData({ backchannelFrequency: Number(e.target.value) })}
                        min={0}
                        max={1}
                        step={0.1}
                        className="flex-1"
                        showValue={false}
                      />
                      <span className="text-xs text-gray-500 w-24 text-right">Frequent</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call Management */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Call Management</h3>
            <div className="space-y-5">
              {/* Silence Timeout */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Silence Timeout (seconds)
                </label>
                <input
                  type="number"
                  value={(data.endCallAfterSilenceMs ?? 30000) / 1000}
                  onChange={(e) => updateData({ endCallAfterSilenceMs: Number(e.target.value) * 1000 })}
                  min={10}
                  max={600}
                  step={5}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hang up after this many seconds of silence
                </p>
              </div>

              {/* Max Call Duration */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Max Call Duration (minutes)
                </label>
                <input
                  type="number"
                  value={(data.maxCallDurationMs ?? 1800000) / 60000}
                  onChange={(e) => updateData({ maxCallDurationMs: Number(e.target.value) * 60000 })}
                  min={1}
                  max={60}
                  step={1}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum call length before automatic hangup
                </p>
              </div>

              {/* Voicemail Detection */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-white">Voicemail Detection</label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Detect and handle voicemail automatically
                    </p>
                  </div>
                  <button
                    onClick={() => updateData({ enableVoicemailDetection: !data.enableVoicemailDetection })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      data.enableVoicemailDetection !== false ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        data.enableVoicemailDetection !== false ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings - Collapsible */}
          <Collapsible title="Advanced Settings" defaultOpen={false}>
            <div className="space-y-5">
              {/* Ambient Sound */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ambient Sound
                </label>
                <select
                  value={data.ambientSound || 'none'}
                  onChange={(e) => updateData({ ambientSound: e.target.value as any })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                >
                  <option value="none">None</option>
                  <option value="coffee_shop">Coffee Shop</option>
                  <option value="office">Office</option>
                  <option value="restaurant">Restaurant</option>
                </select>
              </div>

              {/* Ambient Volume */}
              {data.ambientSound && data.ambientSound !== 'none' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-white">Ambient Sound Volume</label>
                    <span className="text-xs text-electric-blue font-medium">
                      {data.ambientSoundVolume !== undefined ? (data.ambientSoundVolume * 100).toFixed(0) : '30'}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16">Quiet</span>
                    <Slider
                      value={data.ambientSoundVolume ?? 0.3}
                      onChange={(e) => updateData({ ambientSoundVolume: Number(e.target.value) })}
                      min={0}
                      max={1}
                      step={0.1}
                      className="flex-1"
                      showValue={false}
                    />
                    <span className="text-xs text-gray-500 w-16 text-right">Loud</span>
                  </div>
                </div>
              )}

              {/* Normalize for Speech */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-white">Normalize for Speech</label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Auto-correct text for natural speech (e.g., "$5" → "five dollars")
                    </p>
                  </div>
                  <button
                    onClick={() => updateData({ normalizeForSpeech: !data.normalizeForSpeech })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      data.normalizeForSpeech !== false ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        data.normalizeForSpeech !== false ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Opt Out Data Storage */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-white">Opt Out of Data Storage</label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Don't store call recordings or transcripts
                    </p>
                  </div>
                  <button
                    onClick={() => updateData({ optOutSensitiveDataStorage: !data.optOutSensitiveDataStorage })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      data.optOutSensitiveDataStorage ? 'bg-electric-blue' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        data.optOutSensitiveDataStorage ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </Collapsible>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-electric-blue/10 border border-electric-blue/30 rounded-xl p-4">
            <Info className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300">
                These settings give you fine-grained control over your agent's behavior. Most restaurants work great with the defaults.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            disabled={!canContinue}
            className={`px-8 py-3 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold rounded-xl transition-all text-sm ${
              canContinue
                ? 'hover:shadow-lg hover:shadow-orange-500/30'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Continue →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
