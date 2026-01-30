import { motion } from 'framer-motion'
import { Sparkles, Settings } from 'lucide-react'

interface ModeSelectionStepProps {
  onSelectMode: (mode: 'simple' | 'advanced') => void
}

export function ModeSelectionStep({ onSelectMode }: ModeSelectionStepProps) {
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Choose Your Setup Method
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Pick the approach that works best for you. You can always adjust settings later.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Simple Mode - Personality Sliders */}
          <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('simple')}
            className="group relative text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0F172A] hover:border-[#FF5C00]/50 hover:shadow-2xl hover:shadow-[#FF5C00]/20 transition-all duration-300 h-full p-10">
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white text-sm font-bold rounded-full shadow-lg">
                  Recommended
                </span>
              </div>

              <div className="inline-flex p-5 rounded-2xl bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] mb-8 shadow-lg shadow-[#FF5C00]/30 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-4xl font-bold text-white mb-4">Guided Setup</h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Easy personality sliders to define your agent's character. Perfect for getting started quickly.
              </p>

              <ul className="space-y-4 text-base text-gray-300 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FF5C00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#FF5C00] font-bold text-sm">✓</span>
                  </div>
                  <span>Simple warmth, pace, and formality controls</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FF5C00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#FF5C00] font-bold text-sm">✓</span>
                  </div>
                  <span>AI generates optimal settings for you</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#FF5C00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#FF5C00] font-bold text-sm">✓</span>
                  </div>
                  <span>Live preview of agent personality</span>
                </li>
              </ul>

              <div className="text-[#FF5C00] font-bold text-xl group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2">
                Get Started
                <span className="text-2xl">→</span>
              </div>
            </div>
          </motion.button>

          {/* Advanced Mode - Full Control */}
          <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('advanced')}
            className="group relative text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0F172A] hover:border-[#3B82F6]/50 hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all duration-300 h-full p-10">
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-[#1E293B] text-[#60A5FA] border border-[#3B82F6]/30 text-sm font-bold rounded-full">
                  Expert
                </span>
              </div>

              <div className="inline-flex p-5 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] mb-8 shadow-lg shadow-[#3B82F6]/30 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-4xl font-bold text-white mb-4">Advanced Setup</h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Full control over all AI settings including model selection, response behavior, and voice tuning.
              </p>

              <ul className="space-y-4 text-base text-gray-300 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#3B82F6] font-bold text-sm">✓</span>
                  </div>
                  <span>Choose your LLM model (GPT-4, Claude, Gemini)</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#3B82F6] font-bold text-sm">✓</span>
                  </div>
                  <span>Fine-tune response timing and interruption handling</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#3B82F6] font-bold text-sm">✓</span>
                  </div>
                  <span>Configure ambient sounds and call management</span>
                </li>
              </ul>

              <div className="text-[#3B82F6] font-bold text-xl group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2">
                Advanced Mode
                <span className="text-2xl">→</span>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
