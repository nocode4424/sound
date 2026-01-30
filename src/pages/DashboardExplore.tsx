import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, BarChart3, CreditCard, HelpCircle, LayoutDashboard, Settings, Compass, Play, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useAgents } from '@/hooks/useAgents'
import { ModernCallInterface } from '@/components/voice/modern-call-interface'

export default function DashboardExplore() {
  const { profile } = useAuth()
  const [activeNav, setActiveNav] = useState('explore')
  const { agents, loading: agentsLoading } = useAgents()
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [showCallInterface, setShowCallInterface] = useState(false)

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard' },
    { id: 'explore', icon: Compass, label: 'Explore Agents', link: '/dashboard/explore' },
    { id: 'agents', icon: Bot, label: 'My Agents', link: '/my-agents' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', link: '/analytics' },
    { id: 'billing', icon: CreditCard, label: 'Billing', link: '/billing' },
    { id: 'help', icon: HelpCircle, label: 'Help Center', link: '/help' },
  ]

  const handleStartCall = (agent: any) => {
    setSelectedAgent(agent)
    setShowCallInterface(true)
  }

  return (
    <div className="flex h-screen bg-[#0A0F1C]">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#0F172A] border-r border-white/10 border-l-[3px] border-l-[#FF5C00] flex flex-col">
        {/* Logo */}
        <div className="p-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">VOICE AI</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#1E293B] text-[#FF5C00]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* User Section */}
        <div className="p-5 border-t border-white/10">
          <div className="bg-[#1E293B] rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {profile?.full_name || 'User'}
              </div>
              <div className="text-xs text-gray-400 truncate">Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-20 border-b border-white/10 bg-[#0A0F1C] px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Explore Voice Agents</h1>
            <p className="text-sm text-gray-400">Try our pre-built agents with live voice calls</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {agentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#0F172A] border border-white/10 rounded-xl p-6 animate-pulse">
                  <div className="w-12 h-12 bg-white/10 rounded-xl mb-4" />
                  <div className="h-5 bg-white/10 rounded mb-2 w-2/3" />
                  <div className="h-4 bg-white/10 rounded w-full mb-4" />
                  <div className="h-10 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-20">
              <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No agents available yet</h3>
              <p className="text-gray-400">Check back soon for pre-built voice agents to explore.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#0F172A] border border-white/10 rounded-xl p-6 hover:border-[#FF5C00]/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      {agent.category && (
                        <span className="text-xs text-gray-400">{agent.category}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-5 line-clamp-2">
                    {agent.description || 'Experience a live conversation with this AI agent'}
                  </p>

                  <button
                    onClick={() => handleStartCall(agent)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" fill="white" />
                    Try Live Call
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call Interface Modal */}
      {showCallInterface && selectedAgent && (
        <ModernCallInterface
          isOpen={showCallInterface}
          agentId={selectedAgent.provider_agent_id}
          agentName={selectedAgent.name}
          onClose={() => {
            setShowCallInterface(false)
            setSelectedAgent(null)
          }}
        />
      )}
    </div>
  )
}
