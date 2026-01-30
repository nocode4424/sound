import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ChevronDown, Sparkles, BarChart3, Zap, UtensilsCrossed, Building2, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInModal, SignUpModal } from '@/components/auth'

const PLATFORM_ITEMS = [
  { icon: Sparkles, title: 'Voice AI Studio', description: 'Build custom agents', href: '/platform/studio' },
  { icon: BarChart3, title: 'Analytics', description: 'Track performance', href: '/platform/analytics' },
  { icon: Zap, title: 'Integrations', description: 'Connect your tools', href: '/platform/integrations' },
]

const INDUSTRY_ITEMS = [
  { icon: UtensilsCrossed, title: 'Restaurants', href: '/industries/restaurants' },
  { icon: Building2, title: 'Property', href: '/industries/property' },
  { icon: Heart, title: 'Healthcare', href: '/industries/healthcare' },
]

export function LightHeader() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/20">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Solaris AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Platform Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPlatformOpen(true)}
                onMouseLeave={() => setPlatformOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
                  Platform
                  <ChevronDown className={`w-4 h-4 transition-transform ${platformOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {platformOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      <div className="p-2">
                        {PLATFORM_ITEMS.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.description}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIndustriesOpen(true)}
                onMouseLeave={() => setIndustriesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
                  Industries
                  <ChevronDown className={`w-4 h-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {industriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      <div className="p-2">
                        {INDUSTRY_ITEMS.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all"
                            >
                              <Icon className="w-5 h-5 text-primary" />
                              <span className="font-medium text-gray-900">{item.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
                Pricing
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowSignIn(true)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => setShowSignUp(true)}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-500 rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modals */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false)
          setShowSignUp(true)
        }}
      />
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false)
          setShowSignIn(true)
        }}
      />
    </>
  )
}
