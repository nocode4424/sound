import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import type { Agent } from '@/types'
import { Star, Phone } from 'lucide-react'

interface AgentCardProps {
  agent: Agent
  onTryAgent: (agent: Agent) => void
}

export function AgentCard({ agent, onTryAgent }: AgentCardProps) {
  return (
    <Card hover className="h-full flex flex-col">
      {/* Icon/Image */}
      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 text-2xl">
        {agent.icon || '🤖'}
      </div>

      {/* Category Badge */}
      {agent.category && (
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-electric-blue/20 text-electric-blue mb-3 w-fit">
          {agent.category.replace('-', ' ')}
        </span>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 flex-grow">
        {agent.short_description || agent.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        {agent.avg_rating && agent.avg_rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{agent.avg_rating.toFixed(1)}</span>
          </div>
        )}
        {agent.total_calls && agent.total_calls > 0 && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{agent.total_calls} calls</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button
        variant="primary"
        size="sm"
        className="w-full"
        onClick={() => onTryAgent(agent)}
      >
        Try This Agent
      </Button>
    </Card>
  )
}
