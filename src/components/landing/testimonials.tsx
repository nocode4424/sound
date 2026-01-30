import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      "We've processed over 5,000 calls with Solaris AI and haven't looked back. We don't even take phone orders anymore; people just call the AI agent. Our kitchen is less chaotic and our team is happier.",
    author: 'Sarah Chen',
    role: "Owner, Ming's Kitchen",
    rating: 5,
    image: '👩‍🍳',
  },
  {
    quote:
      "The breakthrough came when we implemented Solaris AI to handle customer inquiries. Within a week, we saw a 60% reduction in wait times and our NPS score improved by 15 points.",
    author: 'Marcus Johnson',
    role: 'CTO, TechFlow Solutions',
    rating: 5,
    image: '👨‍💼',
  },
  {
    quote:
      "I was skeptical at first, but after seeing the AI handle complex tenant requests with empathy and accuracy, I'm a believer. It's like having a 24/7 property manager who never sleeps.",
    author: 'Emily Rodriguez',
    role: 'Property Manager, Urban Living',
    rating: 5,
    image: '👩‍💼',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-electric-blue font-semibold tracking-wide uppercase">
            Customer Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-xl text-gray-400">
            See what our customers have to say about transforming their customer conversations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-20">
                  <Quote className="w-12 h-12 text-electric-blue" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-blue-500 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue/0 via-electric-blue/20 to-electric-blue/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
