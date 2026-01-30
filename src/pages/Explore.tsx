import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AgentCard } from '@/components/agents/agent-card'
import { CallInterface } from '@/components/voice/call-interface'
import { useAgents } from '@/hooks/useAgents'
import type { Agent } from '@/types'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All Agents' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'property-management', label: 'Property Management' },
  { id: 'sales', label: 'Sales' },
  { id: 'customer-service', label: 'Customer Service' },
]

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showCallInterface, setShowCallInterface] = useState(false)

  const { agents, loading } = useAgents(
    selectedCategory === 'all' ? undefined : selectedCategory
  )

  const handleTryAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setShowCallInterface(true)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Voice Agents</h1>
          <p className="text-gray-400">
            Test-drive our pre-built agents with a live voice call
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-electric-blue text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No agents found in this category.</p>
            <p className="text-sm text-gray-500">
              Try selecting a different category or check back later for new agents.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AgentCard agent={agent} onTryAgent={handleTryAgent} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Call Interface Modal */}
        {selectedAgent && (
          <CallInterface
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
    </DashboardLayout>
  )
}
