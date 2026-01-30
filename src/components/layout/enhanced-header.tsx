import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BarChart3,
  Zap,
  UtensilsCrossed,
  Building2,
  Heart,
  Wrench,
  Store,
  PhoneCall,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInModal, SignUpModal } from '@/components/auth'

const PLATFORM_ITEMS = [
  {
    icon: Sparkles,
    title: 'Voice AI Studio',
    description: 'Build custom voice agents in minutes',
    href: '/platform/studio',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track performance and optimize',
    href: '/platform/analytics',
  },
  {
    icon: Zap,
    title: 'Integrations',
    description: 'Connect with your tools',
    href: '/platform/integrations',
  },
]

const INDUSTRY_ITEMS = [
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    description: 'Handle orders and reservations',
    href: '/industries/restaurants',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Tenant support and maintenance',
    href: '/industries/property',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Patient scheduling and support',
    href: '/industries/healthcare',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Wrench,
    title: 'Home Services',
    description: 'HVAC, plumbing, contractors',
    href: '/industries/services',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Store,
    title: 'Retail',
    description: 'Customer support and sales',
    href: '/industries/retail',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: PhoneCall,
    title: 'Professional Services',
    description: 'Client intake and scheduling',
    href: '/industries/professional',
    color: 'from-rose-500 to-red-500',
  },
]

export function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false)
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-blue/95 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="gradient-primary p-2 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Solaris AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPlatformDropdownOpen(true)}
              onMouseLeave={() => setPlatformDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
                Platform
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    platformDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {platformDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-navy/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      {PLATFORM_ITEMS.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-0.5 group-hover:text-electric-blue transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-400">{item.description}</p>
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
              onMouseEnter={() => setIndustriesDropdownOpen(true)}
              onMouseLeave={() => setIndustriesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
                Industries
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    industriesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {industriesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[600px] rounded-2xl bg-navy/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 grid grid-cols-2 gap-2">
                      {INDUSTRY_ITEMS.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                          >
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-0.5 group-hover:text-electric-blue transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/pricing"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Pricing
            </Link>
            <Link to="/docs" className="text-gray-300 hover:text-white transition-colors py-2">
              Docs
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowSignIn(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-white/10 border-2 border-white/30 rounded-lg hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
            >
              Log In
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowSignUp(true)}
              className="relative overflow-hidden group shadow-lg shadow-electric-blue/20 hover:shadow-xl hover:shadow-electric-blue/30 transition-all duration-300"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:scale-110 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
              <Link
                to="/explore"
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Agents
              </Link>
              <Link
                to="/pricing"
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/docs"
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <div className="pt-4 space-y-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowSignIn(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-white/10 border-2 border-white/30 rounded-lg hover:bg-white/20 hover:border-white/50 transition-all"
                >
                  Log In
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setShowSignUp(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </header>
  )
}
