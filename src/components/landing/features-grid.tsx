import { motion } from 'framer-motion'
import {
  Mic,
  DollarSign,
  Clock,
  Palette,
  BarChart3,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Natural Voice Conversations',
    description: 'Human-like voice quality with natural pauses, emphasis, and tone',
  },
  {
    icon: DollarSign,
    title: 'Menu & Pricing Integration',
    description: 'Automatically calculate order totals from your menu',
  },
  {
    icon: Clock,
    title: 'Real-time Order Processing',
    description: 'Instant order taking with accurate item confirmation',
  },
  {
    icon: Palette,
    title: 'Customizable Personality',
    description: 'Adjust tone from formal to casual to match your brand',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Call Logs',
    description: 'Track calls, transcripts, and customer insights',
  },
  {
    icon: Zap,
    title: 'Easy Setup',
    description: 'No coding required. Get started in minutes',
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to deliver exceptional phone experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
