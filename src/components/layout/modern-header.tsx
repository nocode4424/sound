import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignInModal, SignUpModal } from '@/components/auth'
import { MegaMenu } from './mega-menu'

export function ModernHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false)
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-white/10' : 'bg-[#0A0F1C]/80 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">VoxAgent</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Platform Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPlatformMenuOpen(true)}
                onMouseLeave={() => setPlatformMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors py-2">
                  Platform
                  <ChevronDown className={`w-4 h-4 transition-transform ${platformMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <MegaMenu isOpen={platformMenuOpen} type="platform" />
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsMenuOpen(true)}
                onMouseLeave={() => setSolutionsMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors py-2">
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${solutionsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <MegaMenu isOpen={solutionsMenuOpen} type="solutions" />
              </div>

              <Link to="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/docs" className="text-sm text-gray-300 hover:text-white transition-colors">
                Docs
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSignIn(true)}
                className="text-gray-300 hover:text-white"
              >
                Sign In
              </Button>
              <button
                onClick={() => setShowSignUp(true)}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white text-sm font-medium rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transform"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A10] to-[#FF9A5C] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
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
              className="md:hidden bg-[#0A0F1C] border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-3">
                <Link
                  to="/explore"
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Platform
                </Link>
                <Link
                  to="/pricing"
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
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
                    className="w-full text-gray-300"
                    onClick={() => {
                      setShowSignIn(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    Sign In
                  </Button>
                  <button
                    onClick={() => {
                      setShowSignUp(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-5 py-2.5 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transform"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
