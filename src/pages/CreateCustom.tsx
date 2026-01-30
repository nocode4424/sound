import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card } from '@/components/ui'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreateCustom() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-[#FF5C00] mb-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Custom Agent Builder</h1>
            <p className="text-gray-400">Coming soon - build any type of voice AI agent from scratch</p>
          </div>

          <Card className="text-center py-12">
            <p className="text-gray-300 mb-4">
              This powerful agent builder is currently in development. It will let you:
            </p>
            <ul className="text-sm text-gray-400 text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Define completely custom agent behavior with prompts</li>
              <li>• Configure any combination of capabilities</li>
              <li>• Integrate with your existing systems via webhooks</li>
              <li>• Create multi-step conversation flows</li>
              <li>• Build agents for any industry or use case</li>
            </ul>
            <p className="text-sm text-gray-500">
              Want early access? Email us at support@solaris-ai.com
            </p>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
