import { Button } from '@/components/ui'
import { Sparkles, ArrowRight, Mic } from 'lucide-react'
import { motion } from 'framer-motion'

export function SimplifiedHero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
            <Sparkles className="w-4 h-4 text-electric-blue animate-pulse" />
            <span className="text-sm text-gray-300">
              Trusted by 10,000+ businesses worldwide
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-4"
          >
            From the restaurant around the corner to the financial institution across the world
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 mb-10"
          >
            Solaris delivers human-like voice conversations at any scale
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="group relative overflow-hidden shadow-2xl shadow-electric-blue/30 hover:shadow-3xl hover:shadow-electric-blue/50 hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="group hover:scale-105 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <Mic className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
