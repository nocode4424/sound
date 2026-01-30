import { motion, AnimatePresence } from 'framer-motion'
import {
  Scale,
  Shield,
  Zap,
  Users,
  Webhook,
  BarChart3,
  Utensils,
  ShoppingBag,
  DollarSign,
  HeadphonesIcon,
  Stethoscope,
  Building2,
  ArrowRight
} from 'lucide-react'

interface MegaMenuProps {
  isOpen: boolean
  type: 'platform' | 'solutions'
}

export function MegaMenu({ isOpen, type }: MegaMenuProps) {
  if (type === 'platform') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-20 z-50"
            >
              <div className="max-w-6xl mx-auto px-8 py-8 bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-3 gap-12">
                  {/* Platform Column */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-[#FF5C00] tracking-wider uppercase mb-5">
                      Platform
                    </div>

                    <PlatformItem
                      icon={Scale}
                      iconColor="text-blue-400"
                      title="Scalability"
                      description="Unlimited concurrent calls"
                    />

                    <PlatformItem
                      icon={Shield}
                      iconColor="text-green-400"
                      title="Security"
                      description="Enterprise encryption"
                    />
                  </div>

                  {/* Capabilities Column */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-5">
                      Capabilities
                    </div>

                    <PlatformItem
                      icon={Users}
                      iconColor="text-orange-400"
                      title="Multi-Agent"
                      description="Deploy specialized agents"
                    />

                    <PlatformItem
                      icon={Zap}
                      iconColor="text-purple-400"
                      title="Cloud Agnostic"
                      description="Deploy anywhere"
                    />
                  </div>

                  {/* Integrations Column */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-5">
                      Integrations
                    </div>

                    <PlatformItem
                      icon={Webhook}
                      iconColor="text-cyan-400"
                      title="API & Webhooks"
                      description="Connect your tools"
                    />

                    <PlatformItem
                      icon={BarChart3}
                      iconColor="text-teal-400"
                      title="Analytics"
                      description="Performance insights"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  // Solutions Menu
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-20 z-50"
          >
            <div className="max-w-4xl mx-auto px-8 py-8 bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="mb-6">
                <div className="text-[11px] font-bold text-[#FF5C00] tracking-wider uppercase mb-2">
                  Industry Solutions
                </div>
                <p className="text-sm text-gray-400">
                  Purpose-built agents for your industry
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <IndustryItem
                  icon={Utensils}
                  title="Restaurants"
                  gradient="from-orange-500 to-red-500"
                  badge="Popular"
                />

                <IndustryItem
                  icon={ShoppingBag}
                  title="Retail"
                  gradient="from-blue-500 to-blue-600"
                />

                <IndustryItem
                  icon={DollarSign}
                  title="Collections"
                  gradient="from-green-500 to-emerald-600"
                />

                <IndustryItem
                  icon={HeadphonesIcon}
                  title="Customer Service"
                  gradient="from-amber-500 to-orange-500"
                  badge="New"
                />

                <IndustryItem
                  icon={Stethoscope}
                  title="Medical"
                  gradient="from-purple-500 to-indigo-600"
                />

                <IndustryItem
                  icon={Building2}
                  title="Property"
                  gradient="from-pink-500 to-rose-600"
                />
              </div>

              {/* Trust Section */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-3 text-center">
                  Trusted by industry leaders
                </div>
                <div className="flex items-center justify-center gap-8 opacity-50">
                  <div className="text-gray-600 text-sm font-semibold">ACME</div>
                  <div className="text-gray-600 text-sm font-semibold">TechCo</div>
                  <div className="text-gray-600 text-sm font-semibold">StartupXYZ</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface PlatformItemProps {
  icon: React.ElementType
  iconColor: string
  title: string
  description: string
}

function PlatformItem({ icon: Icon, iconColor, title, description }: PlatformItemProps) {
  return (
    <div className="group cursor-pointer py-3 px-4 rounded-lg hover:bg-white/5 transition-all">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white group-hover:text-[#FF5C00] transition-colors">
            {title}
          </div>
          <div className="text-xs text-gray-500">
            {description}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  )
}

interface IndustryItemProps {
  icon: React.ElementType
  title: string
  gradient: string
  badge?: string
}

function IndustryItem({ icon: Icon, title, gradient, badge }: IndustryItemProps) {
  return (
    <div className="relative group cursor-pointer">
      {badge && (
        <div className={`absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r ${gradient} text-white text-[9px] font-bold rounded-full shadow-lg z-10`}>
          {badge}
        </div>
      )}

      <div className="py-4 px-3 rounded-xl hover:bg-white/5 transition-all">
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="text-sm font-semibold text-white group-hover:text-[#FF5C00] transition-colors">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}
