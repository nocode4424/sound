import { motion } from 'framer-motion'
import { BarChart3, Calendar, TrendingUp } from 'lucide-react'

export function ProductShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            See Solaris AI in Action
          </h2>
          <p className="text-xl text-gray-400">
            Powerful tools to build world-class voice experiences
          </p>
        </motion.div>

        {/* Main Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Browser Chrome */}
          <div className="glass rounded-t-2xl border border-white/10 p-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block px-4 py-1 rounded-lg bg-white/5 text-sm text-gray-400">
                  app.solaris-ai.com/dashboard
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="glass rounded-b-2xl border border-white/10 border-t-0 p-8 space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Calls Today', value: '2,847', trend: '+12%', icon: TrendingUp },
                { label: 'Active Agents', value: '12', trend: '+3', icon: BarChart3 },
                { label: 'Avg Rating', value: '98.7%', trend: '+2.3%', icon: Calendar },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{stat.label}</span>
                      <Icon className="w-4 h-4 text-electric-blue" />
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-white">{stat.value}</span>
                      <span className="text-sm text-green-400">{stat.trend}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Agent Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue to-blue-500 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-3 h-3 rounded-full bg-white"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Restaurant Booking Agent</h3>
                      <p className="text-xs text-gray-400">Active</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Live
                  </div>
                </div>

                {/* Waveform visualization */}
                <div className="flex items-center justify-center h-24 gap-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-electric-blue to-blue-500 rounded-full"
                      animate={{
                        height: [
                          Math.random() * 40 + 20,
                          Math.random() * 60 + 10,
                          Math.random() * 40 + 20,
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-300">
                    "Hi! I'd love to help you make a reservation here. What day were you thinking?"
                  </p>
                </div>
              </motion.div>

              {/* Right: Performance Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
              >
                <h3 className="font-semibold text-white mb-4">Call Volume</h3>
                <div className="flex items-end justify-between h-32 gap-2">
                  {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85, 70, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-electric-blue to-blue-500 cursor-pointer"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-white">98.7%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Avg Duration</p>
                    <p className="text-2xl font-bold text-white">2m 14s</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue/20 via-blue-500/20 to-electric-blue/20 rounded-2xl blur-2xl -z-10 opacity-50" />
        </motion.div>
      </div>
    </section>
  )
}
