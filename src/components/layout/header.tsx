import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Phone, Menu, X, Building2, Home, Briefcase, HeadphonesIcon, Sparkles, BarChart3, Zap, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInModal, SignUpModal } from '@/components/auth'

const solutions = [
  {
    icon: Home,
    title: 'Restaurants',
    description: 'AI agents that take pickup orders, recommend dishes, and calculate totals',
    link: '/solutions/restaurants',
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Handle tenant calls, maintenance requests, and scheduling automatically',
    link: '/solutions/property',
  },
  {
    icon: Briefcase,
    title: 'Service Contractors',
    description: 'Schedule appointments, provide quotes, and handle emergency dispatch',
    link: '/solutions/contractors',
  },
  {
    icon: HeadphonesIcon,
    title: 'Sales & Lead Qualification',
    description: 'Qualify leads 24/7, capture contact info, and book demos automatically',
    link: '/solutions/sales',
  },
]

const features = [
  { icon: Sparkles, title: 'Voice Quality', description: 'Natural, human-like conversations' },
  { icon: Zap, title: 'Quick Setup', description: 'Get started in under 5 minutes' },
  { icon: BarChart3, title: 'Analytics', description: 'Track performance and insights' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="gradient-primary p-2 rounded-lg group-hover:scale-110 transition-transform shadow-lg glow-purple">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Solaris AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-2 w-[600px] bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-6 backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {solutions.map((solution) => {
                        const Icon = solution.icon
                        return (
                          <Link
                            key={solution.title}
                            to={solution.link}
                            className="p-4 rounded-lg hover:bg-bg-elevated transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-purple group-hover:scale-110 transition-transform">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-text-primary mb-1 group-hover:text-brand-indigo transition-colors">
                                  {solution.title}
                                </h3>
                                <p className="text-xs text-text-tertiary">{solution.description}</p>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <Link
                        to="/solutions"
                        className="text-sm text-brand-indigo hover:text-brand-purple font-medium transition-colors"
                      >
                        See all solutions →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-2 w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-6 backdrop-blur-xl"
                  >
                    <div className="space-y-3">
                      {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                          <div
                            key={feature.title}
                            className="p-3 rounded-lg hover:bg-bg-elevated transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-brand-indigo" />
                              <div>
                                <h4 className="font-medium text-text-primary">{feature.title}</h4>
                                <p className="text-xs text-text-tertiary">{feature.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowSignUp(true)}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
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
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
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
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setShowSignIn(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setShowSignUp(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Get Started
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
