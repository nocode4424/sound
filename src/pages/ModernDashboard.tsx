import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Bot, BarChart3, CreditCard, HelpCircle, LayoutDashboard, Settings, Plus, Compass, BookOpen, Headphones, Heart, Zap, UtensilsCrossed, UserCircle, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { QuickStartCard } from '@/components/dashboard/quick-start-card'

export default function ModernDashboard() {
  const { profile } = useAuth()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Show loading screen for at least 800ms for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard' },
    { id: 'explore', icon: Compass, label: 'Explore Agents', link: '/dashboard/explore' },
    { id: 'agents', icon: Bot, label: 'My Agents', link: '/my-agents' },
    { id: 'docs', icon: BookOpen, label: 'Documentation', link: '/docs' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', link: '/analytics' },
    { id: 'billing', icon: CreditCard, label: 'Billing', link: '/billing' },
    { id: 'help', icon: HelpCircle, label: 'Help Center', link: '/help' },
  ]

  const agents: any[] = []

  const quickStartOptions = [
    {
      title: 'AI Receptionist',
      description: 'Professional front-desk assistant for small businesses',
      icon: UserCircle,
      gradient: 'from-purple-500 to-pink-500',
      link: '/quick-start/receptionist',
      estimatedTime: '5 min',
    },
    {
      title: 'Healthcare Voice Agent',
      description: 'HIPAA Compliant - appointment scheduling, pre/post-visit info, no-show reduction, prescription refills, basic triage/routing',
      icon: Heart,
      gradient: 'from-green-500 to-teal-500',
      link: '/quick-start/healthcare',
      estimatedTime: '7 min',
    },
    {
      title: 'Customer Service',
      description: 'Professional team to care for your customers, no matter the industry',
      icon: Headphones,
      gradient: 'from-blue-500 to-purple-500',
      link: '/quick-start/contact-center',
      estimatedTime: '5 min',
    },
    {
      title: 'Restaurant Voice AI',
      description: 'Take orders, handle reservations, answer menu questions',
      icon: UtensilsCrossed,
      gradient: 'from-orange-500 to-red-500',
      link: '/create/restaurant',
      estimatedTime: '7 min',
    },
  ]

  // Loading screen with welcome animation
  if (isLoading) {
    return (
      <div className="flex h-screen bg-bg-page items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative"
        >
          {/* Animated background rings */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -m-20 rounded-full bg-gradient-to-br from-brand-indigo/20 to-brand-purple/20 blur-3xl"
          />

          {/* Main logo with bounce */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center mx-auto mb-6 shadow-2xl glow-purple relative z-10"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </motion.div>

          {/* Animated welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <motion.h2
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl font-bold text-text-primary mb-2"
            >
              Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
            </motion.h2>
            <p className="text-text-tertiary text-sm">Preparing your voice AI dashboard...</p>
          </motion.div>

          {/* Fun loading dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-bg-page">
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-[260px] bg-bg-surface border-r border-border-subtle border-l-[3px] border-l-brand-indigo flex flex-col lg:hidden"
          >
            {/* Logo */}
            <div className="p-6 pb-8 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center shadow-lg glow-purple">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">VOICE AI</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-text-tertiary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-5">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeNav === item.id
                  return (
                    <Link
                      key={item.id}
                      to={item.link}
                      onClick={() => {
                        setActiveNav(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-bg-elevated text-brand-indigo'
                          : 'text-text-tertiary hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* User Section */}
            <div className="p-5 border-t border-border-subtle">
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                <div className="bg-bg-elevated rounded-xl p-3 flex items-center gap-3 hover:bg-bg-page transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center text-white font-semibold text-sm">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate group-hover:text-brand-indigo transition-colors">
                      {profile?.full_name || 'User'}
                    </div>
                    <div className="text-xs text-text-tertiary truncate">{profile?.company_name || profile?.email || 'View Profile'}</div>
                  </div>
                  <Settings className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[260px] bg-bg-surface border-r border-border-subtle border-l-[3px] border-l-brand-indigo flex-col">
        {/* Logo */}
        <div className="p-6 pb-8 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center shadow-lg glow-purple">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">VOICE AI</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-bg-elevated text-brand-indigo'
                      : 'text-text-tertiary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* User Section */}
        <div className="p-5 border-t border-border-subtle">
          <Link to="/settings">
            <div className="bg-bg-elevated rounded-xl p-3 flex items-center gap-3 hover:bg-bg-page transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center text-white font-semibold text-sm">
                {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate group-hover:text-brand-indigo transition-colors">
                  {profile?.full_name || 'User'}
                </div>
                <div className="text-xs text-text-tertiary truncate">{profile?.company_name || profile?.email || 'View Profile'}</div>
              </div>
              <Settings className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 lg:h-20 border-b border-border-subtle bg-bg-page px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-text-tertiary hover:text-text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg lg:text-2xl font-bold text-text-primary">Voice AI Dashboard</h1>
              <p className="text-xs lg:text-sm text-text-tertiary hidden sm:block">Manage your AI voice agents and track performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="p-2 lg:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-text-tertiary hover:text-text-primary transition-colors" />
            </button>
            <Link to="/create">
              <button className="px-3 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs lg:text-sm font-medium rounded-lg hover:shadow-lg glow-purple hover:brightness-110 transition-all flex items-center gap-1.5 lg:gap-2">
                <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Create New Agent</span>
                <span className="sm:hidden">Create</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Create New Agent Section - Now First */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4 lg:mb-5">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-text-primary flex items-center gap-2">
                  <Plus className="w-4 h-4 lg:w-5 lg:h-5 text-brand-indigo" />
                  Create New Agent
                </h2>
                <p className="text-xs lg:text-sm text-text-tertiary mt-1">Start building your AI voice assistant</p>
              </div>
            </div>
            <Link to="/create">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-brand-indigo/10 via-brand-purple/5 to-transparent border-2 border-dashed border-brand-indigo/30 rounded-xl p-5 lg:p-8 hover:border-brand-indigo/50 hover:from-brand-indigo/20 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Background gradient animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/0 via-brand-purple/10 to-brand-indigo/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg glow-purple">
                    <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base lg:text-lg font-semibold text-text-primary group-hover:text-brand-indigo transition-colors">
                      Create a Custom Agent
                    </h3>
                    <p className="text-xs lg:text-sm text-text-tertiary mt-1">
                      Build your perfect AI assistant in minutes
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Quick Start Section - Now Second */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4 lg:mb-5">
              <div>
                <h2 className="text-lg lg:text-xl font-semibold text-text-primary flex items-center gap-2">
                  <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-brand-indigo" />
                  Quick Start Templates
                </h2>
                <p className="text-xs lg:text-sm text-text-tertiary mt-1">Choose a pre-built template and customize in under 5 minutes</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {quickStartOptions.map((option, index) => (
                <QuickStartCard
                  key={option.title}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  gradient={option.gradient}
                  link={option.link}
                  estimatedTime={option.estimatedTime}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Your Agents Section */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4 lg:mb-5">
              <h2 className="text-lg lg:text-xl font-semibold text-text-primary">Your Agents</h2>
              {agents.length > 0 && (
                <button className="text-xs lg:text-sm text-brand-indigo hover:text-brand-purple font-medium transition-colors">
                  View all →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="bg-bg-surface border border-border-subtle rounded-xl p-5 hover:border-brand-indigo/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white mb-1">{agent.name}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs text-green-500 font-medium">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1A1A1A] rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Total Calls</div>
                      <div className="text-lg font-semibold text-white">{agent.calls}</div>
                    </div>
                    <div className="bg-[#1A1A1A] rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Success</div>
                      <div className="text-lg font-semibold text-green-500">{agent.success}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Create New Card */}
              <Link to="/create">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + agents.length * 0.05 }}
                  className="bg-bg-surface border-2 border-dashed border-border-default rounded-xl p-5 hover:border-brand-indigo/50 transition-all cursor-pointer group h-full flex items-center justify-center min-h-[160px]"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-indigo/10 transition-colors">
                      <Plus className="w-6 h-6 text-text-tertiary group-hover:text-brand-indigo transition-colors" />
                    </div>
                    <div className="text-sm font-medium text-text-tertiary group-hover:text-text-primary transition-colors">
                      Create New Agent
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>


          {/* VIP Docs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-brand-indigo/10 to-brand-purple/5 border border-brand-indigo/20 rounded-xl p-4 lg:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-full">
                <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-2">
                  New to Voice AI?
                </h3>
                <p className="text-xs lg:text-sm text-text-tertiary mb-3 lg:mb-4">
                  Get started with our comprehensive guides and tutorials
                </p>
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  <Link to="/docs" className="flex-1 sm:flex-initial">
                    <button className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs lg:text-sm font-medium rounded-lg hover:brightness-110 hover:glow-purple transition-all">
                      View Documentation
                    </button>
                  </Link>
                  <Link to="/explore" className="flex-1 sm:flex-initial">
                    <button className="w-full sm:w-auto px-4 py-2 bg-transparent text-text-primary text-xs lg:text-sm font-medium rounded-lg hover:bg-white/10 transition-colors border border-border-default hover:border-brand-indigo/50">
                      Try Demo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
