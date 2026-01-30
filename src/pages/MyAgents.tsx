import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button } from '@/components/ui'
import { CallInterface } from '@/components/voice/call-interface'
import { useUserAgents } from '@/hooks/useUserAgents'
import type { UserAgent } from '@/types'
import { Phone, Edit, Trash2, BarChart3, Play, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MyAgents() {
  const { agents, loading, deleteAgent } = useUserAgents()
  const [selectedAgent, setSelectedAgent] = useState<UserAgent | null>(null)
  const [showCallInterface, setShowCallInterface] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleTestCall = (agent: UserAgent) => {
    if (agent.provider_agent_id) {
      setSelectedAgent(agent)
      setShowCallInterface(true)
    }
  }

  const handleDelete = async (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      try {
        setDeletingId(agentId)
        await deleteAgent(agentId)
      } catch (err) {
        alert('Failed to delete agent')
      } finally {
        setDeletingId(null)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success'
      case 'draft':
        return 'text-gray-400'
      case 'creating':
        return 'text-electric-blue'
      case 'failed':
        return 'text-error'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Agents</h1>
            <p className="text-gray-400">Manage your custom voice agents</p>
          </div>
          <Link to="/create">
            <Button variant="primary">Create New Agent</Button>
          </Link>
        </div>

        {/* Agents List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-6 h-32 animate-pulse" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <Card className="text-center py-12">
            <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No agents yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first custom voice agent to get started.
            </p>
            <Link to="/create">
              <Button variant="primary">Create Your First Agent</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 text-2xl">
                      🤖
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                        <span className={`text-sm ${getStatusColor(agent.status)}`}>
                          {getStatusLabel(agent.status)}
                        </span>
                      </div>

                      {agent.description && (
                        <p className="text-gray-400 text-sm mb-3">{agent.description}</p>
                      )}

                      {agent.status === 'failed' && agent.error_message && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20 mb-3">
                          <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-error">{agent.error_message}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{agent.total_calls} calls</span>
                        </div>
                        <div>
                          Created {new Date(agent.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {agent.status === 'active' && agent.provider_agent_id && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleTestCall(agent)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Test Call
                        </Button>
                      )}

                      <Button variant="secondary" size="sm" disabled>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      <Button variant="secondary" size="sm" disabled>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(agent.id)}
                        disabled={deletingId === agent.id}
                        className="text-error hover:text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call Interface Modal */}
        {selectedAgent && selectedAgent.provider_agent_id && (
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
