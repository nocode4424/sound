import { Link } from 'react-router-dom'
import { Card } from '@/components/ui'
import { UtensilsCrossed, Building2, Wrench, PhoneCall, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const useCases = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    description: 'Take orders, upsell items, confirm pickup times, and calculate totals automatically.',
    link: '/solutions/restaurant',
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Handle tenant calls, maintenance requests, and scheduling 24/7.',
    link: '/solutions/property',
  },
  {
    icon: Wrench,
    title: 'Contractors & Services',
    description: 'Schedule appointments, provide quotes, and handle emergency dispatch.',
    link: '/solutions/contractors',
  },
  {
    icon: PhoneCall,
    title: 'Sales & Lead Qualification',
    description: 'Qualify leads 24/7, capture contact info, and book demos automatically.',
    link: '/solutions/sales',
  },
]

export function UseCaseCards() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Built for Your Industry</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pre-configured voice agents designed for specific business needs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={useCase.link}>
                  <Card hover className="h-full group cursor-pointer">
                    <div className="flex flex-col h-full">
                      <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 flex-grow">{useCase.description}</p>

                      <div className="flex items-center text-electric-blue text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
