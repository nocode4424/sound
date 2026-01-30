import { ModernHeader } from '@/components/layout/modern-header'
import { VoiceOrb } from '@/components/voice/VoiceOrb'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  MessageSquare,
  Utensils,
  Building2,
  Wrench,
  Phone,
  BarChart3,
  Globe,
  Check,
  Star,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// ─── Fade-in helpers ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

// ─── Data ────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: Utensils,
    title: 'Restaurants',
    description: 'Take pickup orders, recommend dishes, calculate totals — all hands-free.',
    gradient: 'from-orange-500 to-amber-500',
    link: '/create/restaurant',
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Handle tenant inquiries, maintenance requests, and scheduling 24/7.',
    gradient: 'from-blue-500 to-cyan-500',
    link: '/create',
  },
  {
    icon: Wrench,
    title: 'Service Businesses',
    description: 'Book appointments, provide quotes, and dispatch crews automatically.',
    gradient: 'from-emerald-500 to-teal-500',
    link: '/create',
  },
  {
    icon: Phone,
    title: 'Sales & Lead Qualification',
    description: 'Qualify inbound leads around the clock and book demos on autopilot.',
    gradient: 'from-purple-500 to-pink-500',
    link: '/create',
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Sub-Second Responses',
    description: 'Conversations that feel natural with lightning-fast latency.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Backchanneling, interruptions, and human-like speech patterns.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2-compliant with end-to-end encryption on every call.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Transcripts, sentiment analysis, and actionable call insights.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Never miss a call — even nights, weekends, and holidays.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Serve customers in English, Spanish, and 20+ more languages.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Choose a template',
    description:
      'Pick from restaurant, receptionist, sales, or custom — each pre-tuned for real business needs.',
  },
  {
    number: '02',
    title: 'Configure your agent',
    description:
      'Upload your menu, set hours, pick a voice, and dial in the personality. Our AI handles the rest.',
  },
  {
    number: '03',
    title: 'Go live in minutes',
    description:
      'Test with a browser call, then connect to your phone system. Start taking calls today.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      "We went from missing 40% of after-hours calls to handling every single one. Revenue jumped overnight.",
    author: 'Maria Santos',
    role: 'Owner',
    company: "Tony's Pizzeria",
    rating: 5,
  },
  {
    quote:
      'Setup was shockingly easy. Uploaded our menu, picked a voice, and our AI agent was live in under 20 minutes.',
    author: 'James Park',
    role: 'Operations Manager',
    company: 'Han\'s Kitchen',
    rating: 5,
  },
  {
    quote:
      "Our maintenance request line used to be a nightmare. Now tenants get instant help and we get structured data.",
    author: 'David Liu',
    role: 'Property Manager',
    company: 'Skyline Properties',
    rating: 5,
  },
]

const STATS = [
  { value: '2M+', label: 'Calls handled' },
  { value: '98.7%', label: 'Accuracy rate' },
  { value: '<1s', label: 'Response time' },
  { value: '4,200+', label: 'Active agents' },
]

// ─── Page ────────────────────────────────────────────────────
export default function ModernLanding() {
  const [callActive, setCallActive] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      <ModernHeader />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 sm:pt-36 pb-20 px-6 overflow-hidden">
        {/* Ambient background gradients */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/[0.05] blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/[0.06] rounded-full border border-white/10 text-sm text-white/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Now handling 2 million+ calls
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] tracking-tight mb-6"
              >
                Voice AI that
                <br />
                <span className="bg-gradient-to-r from-[#818CF8] via-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">
                  sounds human
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Build AI agents that answer calls, take orders, and book appointments —
                so your team can focus on what matters.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8"
              >
                <Link to="/create">
                  <button className="group relative px-7 py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer">
                    Build your agent
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/explore">
                  <button className="px-7 py-3.5 text-white/70 hover:text-white font-medium rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer">
                    Try a live demo
                  </button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-white/40"
              >
                {['Free to start', 'No credit card', 'Cancel anytime'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-400/80" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Voice Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <VoiceOrb
                onCallStart={() => setCallActive(true)}
                onCallEnd={() => setCallActive(false)}
              />
            </motion.div>
          </div>

          {/* Hint text below orb on mobile */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: callActive ? 0 : 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-center text-sm text-white/25 mt-6 lg:hidden"
          >
            Tap the orb to start a demo call
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-12 px-6 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ USE CASES ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              Solutions
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Built for your industry
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/40 max-w-2xl mx-auto">
              Pre-configured agent templates designed around how your business actually works.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={uc.link}>
                  <div className="group h-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all hover:-translate-y-1 cursor-pointer">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${uc.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <uc.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-4">{uc.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Get started <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              How it works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Live in three steps
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/40 max-w-2xl mx-auto">
              No code required. No engineers needed. Just you and your business details.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connecting line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-white/10 to-white/5" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] mb-5">
                    <span className="text-xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES GRID ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              Capabilities
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything you need to scale
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/40 max-w-2xl mx-auto">
              Enterprise-grade voice AI that's simple enough for a solo business owner.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}
                >
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-3">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Trusted by real businesses
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6 text-[0.95rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{t.author}</div>
                    <div className="text-xs text-white/40">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 border border-white/[0.08] p-12 sm:p-16 text-center"
          >
            {/* Decorative blur */}
            <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-40%] right-[-15%] w-[50%] h-[80%] rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Ready to stop missing calls?
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
                Create your first voice agent in minutes. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/create">
                  <button className="group px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold text-lg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer">
                    Get started free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/explore">
                  <button className="px-8 py-4 text-white/70 hover:text-white font-medium text-lg rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer">
                    Try live demo
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-16 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Solaris AI</span>
              </div>
              <p className="text-sm text-white/35 leading-relaxed max-w-xs">
                AI-powered voice agents that understand, respond, and delight — so your business never misses a beat.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Integrations', 'Changelog'],
              },
              {
                title: 'Resources',
                links: ['Documentation', 'API Reference', 'Guides', 'Blog'],
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'Privacy'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/35 hover:text-white/70 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} Solaris AI. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
