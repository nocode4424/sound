import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Play, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-electric-blue/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-electric-blue" />
            <span className="text-sm text-gray-300">Powered by advanced AI voice technology</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Business,{' '}
            <span className="gradient-primary bg-clip-text text-transparent">
              Always Answering
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            AI voice agents that handle calls, take orders, and book appointments—so you never miss
            an opportunity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/sign-up">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="secondary" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-gray-400 mb-4">Trusted by 500+ businesses</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {/* Placeholder for logos - replace with actual logos */}
              <div className="text-gray-500 font-semibold text-lg">Restaurant</div>
              <div className="text-gray-500 font-semibold text-lg">Properties</div>
              <div className="text-gray-500 font-semibold text-lg">Services</div>
              <div className="text-gray-500 font-semibold text-lg">Retail</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
