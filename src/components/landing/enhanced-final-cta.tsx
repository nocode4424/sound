import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { ArrowRight, Check, Zap } from 'lucide-react'

const FEATURES = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
]

export function EnhancedFinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-electric-blue via-blue-500 to-electric-blue p-1 overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue via-blue-500 to-electric-blue animate-spin-slow blur" />

            <div className="relative bg-gradient-to-br from-deep-blue to-navy rounded-3xl p-12 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-electric-blue to-blue-500 flex items-center justify-center"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-4"
              >
                Ready to transform your
                <br />
                customer conversations?
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-8"
              >
                Join 10,000+ businesses using Solaris AI to deliver exceptional voice experiences.
                <br />
                Start free, no credit card required.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-white text-deep-blue hover:bg-gray-100 group"
                >
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  Talk to Sales
                </Button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300"
              >
                {FEATURES.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    {feature}
                  </motion.div>
                ))}
              </motion.div>

              {/* Floating particles */}
              <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-electric-blue animate-ping" />
              <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-blue-500 animate-ping delay-1000" />
              <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white animate-pulse delay-500" />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue/30 via-blue-500/30 to-electric-blue/30 rounded-3xl blur-3xl -z-10 opacity-50" />
        </motion.div>
      </div>
    </section>
  )
}
