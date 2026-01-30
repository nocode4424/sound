import { motion } from 'framer-motion'
import { UtensilsCrossed, Building2, Heart, ArrowRight } from 'lucide-react'

const USE_CASES = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    description:
      'Handle reservations, answer FAQs, and process orders seamlessly—turning every call into a satisfied customer.',
    stats: [
      { label: 'Call Deflection', value: '85%' },
      { label: 'Avg Response', value: '3min' },
    ],
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-500/10 to-orange-500/5',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description:
      'Schedule appointments, handle patient questions, and provide accurate information—all while protecting patient data.',
    stats: [
      { label: 'Availability', value: '24/7' },
      { label: 'Patient Calls', value: '24/7' },
    ],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/5',
  },
  {
    icon: Building2,
    title: 'Financial Services',
    description:
      'Secure call handling, fraud detection, and transaction support—delivering the human touch without sacrificing security.',
    stats: [
      { label: 'Success Rate', value: '99.9%' },
      { label: 'Active Users', value: '10M+' },
    ],
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'from-blue-500/10 to-indigo-500/5',
  },
]

export function EnhancedUseCases() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-electric-blue font-semibold tracking-wide uppercase">
            Use Cases Across Industries
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            From local restaurants to
            <br />
            global financial institutions
          </h2>
          <p className="text-xl text-gray-400">
            Our platform scales with your business, whether you're handling 10 calls or 10 million
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className={`relative h-full rounded-2xl bg-gradient-to-br ${useCase.bgColor} border border-white/10 overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {useCase.stats.map((stat) => (
                        <div key={stat.label} className="p-3 rounded-lg bg-white/5">
                          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                          <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-electric-blue font-semibold group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${useCase.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
