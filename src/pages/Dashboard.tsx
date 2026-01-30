import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { Phone, Wand2, History, TrendingUp, UserCircle, PhoneCall, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { profile } = useAuth()

  // This would come from actual data in production
  const agentCount = 0 // or 1, 2, etc.
  const showCreateAgentBoxes = agentCount <= 2

  const stats = [
    { label: 'Active Agents', value: '0', icon: Phone, color: 'text-electric-blue' },
    { label: 'Total Calls', value: '0', icon: History, color: 'text-blue-500' },
    { label: 'This Week', value: '0', icon: TrendingUp, color: 'text-success' },
  ]

  const quickActions = [
    {
      icon: Phone,
      title: 'Explore Agents',
      description: 'Test our pre-built voice agents with a live call',
      link: '/explore',
      color: 'from-electric-blue to-blue-500',
    },
    {
      icon: Wand2,
      title: 'Create Your Own',
      description: 'Build a custom agent tailored to your business',
      link: '/create',
      color: 'from-blue-600 to-blue-500',
    },
  ]

  const createAgentOptions = [
    {
      icon: UserCircle,
      title: 'Receptionist',
      description: 'Answer calls, transfer to departments, take messages',
      link: '/create?type=receptionist',
      color: 'from-purple/80 to-blue-500/80',
    },
    {
      icon: PhoneCall,
      title: 'Outbound Sales',
      description: 'Make calls, qualify leads, book appointments',
      link: '/create?type=outbound-sales',
      color: 'from-electric-blue/80 to-purple/80',
    },
    {
      icon: Sparkles,
      title: 'From Scratch',
      description: 'Build a completely custom agent for your needs',
      link: '/create?type=custom',
      color: 'from-blue-500/80 to-electric-blue/80',
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-4 md:mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-bold text-white mb-1"
          >
            Welcome back, {profile?.full_name || 'there'}! 👋
          </motion.h1>
          <p className="text-xs md:text-sm text-gray-400">
            Get started by exploring our pre-built agents or creating your own custom agent.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`p-1.5 md:p-2 rounded-lg bg-white/5 ${stat.color}`}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                      <p className="text-lg md:text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link to={action.link}>
                    <Card hover className="h-full group cursor-pointer p-4 md:p-5">
                      <div
                        className={`inline-flex p-2 md:p-2.5 rounded-lg bg-gradient-to-r ${action.color} mb-2 md:mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1">{action.title}</h3>
                      <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3">{action.description}</p>
                      <Button variant="ghost" className="text-electric-blue text-xs md:text-sm">
                        Get Started →
                      </Button>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Create Agent Options - Only shown when user has 0-2 agents */}
        {showCreateAgentBoxes && (
          <div className="mt-4 md:mt-6">
            <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Create Your First Agent</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {createAgentOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link to={option.link}>
                      <Card hover className="h-full group cursor-pointer p-3 md:p-4 bg-white/[0.02]">
                        <div
                          className={`inline-flex p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${option.color} mb-1.5 md:mb-2 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                        </div>
                        <h3 className="text-xs md:text-sm font-semibold text-white mb-0.5 md:mb-1">{option.title}</h3>
                        <p className="text-[10px] md:text-xs text-gray-400 leading-tight">{option.description}</p>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 md:mt-6"
        >
          <Card className="bg-gradient-to-r from-electric-blue/10 to-blue-500/10 border-electric-blue/20 p-4 md:p-5">
            <h3 className="text-base md:text-lg font-semibold text-white mb-1">New to Solaris AI?</h3>
            <p className="text-xs md:text-sm text-gray-300 mb-3">
              Start by exploring our pre-built agents or jump right into creating your own custom voice
              agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Link to="/explore" className="flex-1 sm:flex-initial">
                <Button variant="primary" size="sm" className="w-full sm:w-auto">
                  Explore Agents
                </Button>
              </Link>
              <Link to="/docs" className="flex-1 sm:flex-initial">
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  View Documentation
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
