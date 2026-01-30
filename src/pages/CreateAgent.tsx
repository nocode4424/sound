import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button } from '@/components/ui'
import { UtensilsCrossed, Building2, Wrench, PhoneCall, Clock, UserCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const agentTypes = [
  {
    id: 'restaurant',
    icon: UtensilsCrossed,
    title: 'Restaurant Order Agent',
    description:
      'Perfect for takeout and pickup orders. Takes orders, knows your menu and prices, recommends popular items, and calculates totals automatically.',
    available: true,
  },
  {
    id: 'receptionist',
    icon: UserCircle,
    title: 'Receptionist Agent',
    description:
      'Answer calls, transfer to departments, take messages, and provide basic information. Perfect for businesses that need professional call handling.',
    available: true,
  },
  {
    id: 'outbound-sales',
    icon: PhoneCall,
    title: 'Outbound Sales Agent',
    description:
      'Make outbound calls, qualify leads, book appointments, and follow up with prospects. Perfect for sales teams.',
    available: true,
  },
  {
    id: 'custom',
    icon: Sparkles,
    title: 'Custom Agent (From Scratch)',
    description:
      'Build a completely custom agent from scratch with full control over personality, capabilities, and behavior.',
    available: true,
  },
  {
    id: 'property',
    icon: Building2,
    title: 'Property Management Agent',
    description:
      'Handle tenant calls and maintenance requests 24/7. Triages emergencies, captures details, and creates work orders.',
    available: false,
  },
  {
    id: 'contractor',
    icon: Wrench,
    title: 'Service & Contractor Agent',
    description:
      'Book jobs, qualify leads, and dispatch crews. Perfect for HVAC, plumbing, electrical, and other home services.',
    available: false,
  },
]

export default function CreateAgent() {
  const navigate = useNavigate()

  const handleCreateAgent = (type: string) => {
    if (type === 'restaurant') {
      navigate('/create/restaurant')
    } else if (type === 'receptionist') {
      navigate('/create/receptionist')
    } else if (type === 'outbound-sales') {
      navigate('/create/outbound-sales')
    } else if (type === 'custom') {
      navigate('/create/custom')
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Agent</h1>
          <p className="text-gray-400">
            Choose an agent type to get started. More types coming soon!
          </p>
        </div>

        {/* Agent Types */}
        <div className="space-y-4">
          {agentTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hover={type.available}
                  className={`${!type.available && 'opacity-60'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-white">{type.title}</h3>
                        {!type.available && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{type.description}</p>
                    </div>

                    {/* CTA */}
                    {type.available ? (
                      <Button
                        variant="primary"
                        className="md:w-auto w-full"
                        onClick={() => handleCreateAgent(type.id)}
                      >
                        Create {type.title.replace(' Agent', '')} →
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled className="md:w-auto w-full">
                        <Clock className="w-4 h-4 mr-2" />
                        Join Waitlist
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-electric-blue/10 to-blue-500/10 border-electric-blue/20">
            <h3 className="text-lg font-semibold text-white mb-2">Need help getting started?</h3>
            <p className="text-gray-300 text-sm mb-4">
              Check out our documentation or try one of our pre-built agents first to see how it works.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="text-electric-blue">
                View Documentation
              </Button>
              <Button variant="ghost" size="sm" className="text-electric-blue">
                Explore Pre-built Agents
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
