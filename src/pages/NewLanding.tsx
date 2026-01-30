import { LightHeader } from '@/components/layout'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Sparkles, Zap, Check, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NewLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LightHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200/50 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                Powering 10,000+ businesses worldwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Voice AI That
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Actually Understands
                </span>
                <svg className="absolute -bottom-4 left-0 w-full" height="12" viewBox="0 0 300 12">
                  <path d="M0,6 Q150,0 300,6" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Build human-like voice agents in minutes. Handle calls, take orders, and delight customers —
              <span className="font-semibold text-blue-700"> no code required</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
            >
              <Link to="/explore">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    Try Live Demo
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </Link>

              <button className="group flex items-center gap-3 px-10 py-5 bg-white text-gray-700 font-bold text-lg rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600"
            >
              {[
                { icon: Check, text: 'Free to start' },
                { icon: Check, text: 'No credit card' },
                { icon: Check, text: 'Cancel anytime' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-2xl border border-blue-100/50 p-8 backdrop-blur-xl">
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl opacity-20 blur" />

                <div className="relative">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: 'Calls Today', value: '2,847', change: '+12%' },
                      { label: 'Success Rate', value: '98.7%', change: '+2.3%' },
                      { label: 'Avg Response', value: '0.8s', change: '↓ 0.2s' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                      >
                        <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-green-600 font-semibold">{stat.change}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Voice Waveform */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white font-semibold">Live Agent Call</span>
                      </div>
                      <span className="text-white/80 text-sm">2:34</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 h-24">
                      {[...Array(40)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-white/80 rounded-full"
                          animate={{
                            height: [
                              Math.random() * 40 + 20,
                              Math.random() * 80 + 10,
                              Math.random() * 40 + 20,
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.02,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border border-blue-100"
              >
                <Phone className="w-8 h-8 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 border border-blue-100"
              >
                <Sparkles className="w-8 h-8 text-blue-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add keyframes for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
