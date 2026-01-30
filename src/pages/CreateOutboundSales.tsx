import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card } from '@/components/ui'
import { PhoneCall } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreateOutboundSales() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-[#FF5C00] to-purple-500 mb-4">
              <PhoneCall className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Outbound Sales Agent</h1>
            <p className="text-gray-400">Coming soon - AI-powered outbound calling for your sales team</p>
          </div>

          <Card className="text-center py-12">
            <p className="text-gray-300 mb-4">
              This agent type is currently in development. It will handle:
            </p>
            <ul className="text-sm text-gray-400 text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Making outbound calls to leads</li>
              <li>• Qualifying prospects with custom questions</li>
              <li>• Booking appointments on your calendar</li>
              <li>• Following up on previous conversations</li>
              <li>• Logging all interactions to CRM</li>
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
