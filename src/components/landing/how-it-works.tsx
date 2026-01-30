import { motion } from 'framer-motion'
import { Search, Settings, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Choose or Create',
    description: 'Browse our pre-built agents or create your own custom agent in minutes',
  },
  {
    icon: Settings,
    title: 'Configure',
    description: 'Upload your menu, set your hours, customize the personality',
  },
  {
    icon: Rocket,
    title: 'Go Live',
    description: 'Connect to your phone system or test directly in your browser',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get your AI voice agent up and running in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-electric-blue/30">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="glass rounded-2xl p-8 pt-10">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-electric-blue" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-electric-blue/50 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
