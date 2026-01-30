import { useState } from 'react'
import { Button } from '@/components/ui'
import { Phone, Sparkles, ArrowRight, Mic, Brain, Clock, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const FEATURED_AGENTS = [
  {
    icon: Phone,
    title: 'Voice Agent',
    description: 'Natural AI phone calls that feel human',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'Intune/sync',
    description: 'Contextual AI that understands your business',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Mic,
    title: 'AI Voice Studio',
    description: 'An entire voice model company in a single API',
    subtitle: 'Learn how AI voice coding',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Meta/Glacia',
    description: 'Meta prompting for next gen agents',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: 'Knowledge Base AI',
    description: 'Find info anywhere with AI',
    color: 'from-orange-500 to-red-500',
  },
]

export function EnhancedHero() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-electric-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
            <Sparkles className="w-4 h-4 text-electric-blue animate-pulse" />
            <span className="text-sm text-gray-300">
              Trusted by 10,000+ businesses worldwide
            </span>
          </div>
        </motion.div>

        {/* Featured Agents Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-6xl mx-auto"
        >
          {FEATURED_AGENTS.map((agent, index) => {
            const Icon = agent.icon
            return (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`relative group cursor-pointer ${
                  index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div
                  className={`relative h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm transition-all duration-300 ${
                    hoveredCard === index
                      ? 'scale-105 border-white/30 shadow-2xl shadow-electric-blue/20'
                      : 'hover:scale-102'
                  }`}
                >
                  {/* Gradient accent */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {agent.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {agent.description}
                  </p>
                  {agent.subtitle && (
                    <p className="text-xs text-electric-blue mt-2 flex items-center gap-1">
                      {agent.subtitle}
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue/0 via-electric-blue/20 to-electric-blue/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Voice AI Platform{' '}
            <br className="hidden sm:block" />
            That{' '}
            <span className="relative inline-block">
              <span className="gradient-primary bg-clip-text text-transparent">
                Actually Understands
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-4"
          >
            From the restaurant around the corner to the financial institution across the world
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 mb-10"
          >
            Voxai delivers human-like voice conversations at any scale
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" className="group">
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="group">
              <Mic className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
