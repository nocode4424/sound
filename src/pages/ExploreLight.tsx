import { useState } from 'react'
import { LightHeader } from '@/components/layout'
import { ModernCallInterface } from '@/components/voice/modern-call-interface'
import { useAgents } from '@/hooks/useAgents'
import type { Agent } from '@/types'
import { motion } from 'framer-motion'
import { Phone, Sparkles, Zap } from 'lucide-react'

export default function ExploreLight() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showCallInterface, setShowCallInterface] = useState(false)
  const { agents, loading } = useAgents()

  const handleTryAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setShowCallInterface(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <LightHeader />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200/50 shadow-sm"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Live Demo - No Sign Up Required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Try Our Voice Agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Experience real AI voice conversations in your browser.
            <span className="font-semibold text-blue-700"> Click to start talking</span>.
          </motion.p>
        </div>

        {/* Agents Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-8 h-80 animate-pulse border border-gray-200 shadow-lg" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-lg">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No agents available</p>
            <p className="text-gray-500">Check back soon for demo agents</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group relative"
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

                <div className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="p-10">
                    {/* Agent Info */}
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{agent.name}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{agent.description}</p>
                    </div>

                    {/* Category */}
                    {agent.category && (
                      <div className="inline-flex items-center px-4 py-2 mb-8 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                        {agent.category}
                      </div>
                    )}

                    {/* Call Button */}
                    <button
                      onClick={() => handleTryAgent(agent)}
                      className="group/btn relative w-full overflow-hidden"
                    >
                      <div className="relative flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform duration-300 shadow-lg">
                          <Phone className="w-7 h-7 text-white" />
                        </div>

                        {/* Text */}
                        <span>Talk to Agent</span>

                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                      </div>
                    </button>
                  </div>

                  {/* Bottom gradient bar */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-10 py-5 bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Live AI</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-sm font-medium text-gray-700">Browser-based</div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-sm font-medium text-gray-700">Instant connection</div>
          </div>
        </motion.div>
      </div>

      {/* Call Interface Modal */}
      {selectedAgent && (
        <ModernCallInterface
          isOpen={showCallInterface}
          onClose={() => {
            setShowCallInterface(false)
            setSelectedAgent(null)
          }}
          agentId={selectedAgent.provider_agent_id}
          agentName={selectedAgent.name}
        />
      )}
    </div>
  )
}
