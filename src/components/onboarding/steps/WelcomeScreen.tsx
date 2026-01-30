import { motion } from 'framer-motion'
import { Sparkles, Zap, Clock, TrendingUp } from 'lucide-react'

interface WelcomeScreenProps {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a call, even outside business hours',
    },
    {
      icon: TrendingUp,
      title: 'Boost Revenue',
      description: 'Handle more calls and increase order volume',
    },
    {
      icon: Zap,
      title: 'Setup in Minutes',
      description: 'Get your AI agent live in less than 10 minutes',
    },
    {
      icon: Sparkles,
      title: 'Natural Conversations',
      description: 'AI that sounds human and understands context',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center shadow-2xl shadow-orange-500/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          Create Your AI Voice Agent
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Build a custom AI phone agent for your restaurant in minutes. Handle orders, answer questions, and delight customers—all automatically.
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-[#0F172A] border border-white/10 rounded-xl p-6 hover:border-[#FF5C00]/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5C00]/20 to-[#FF8A4C]/20 flex items-center justify-center mb-4">
              <benefit.icon className="w-6 h-6 text-[#FF5C00]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onContinue}
          className="px-10 py-4 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105"
        >
          Get Started
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Takes about 5-10 minutes • No credit card required
        </p>
      </motion.div>
    </div>
  )
}
