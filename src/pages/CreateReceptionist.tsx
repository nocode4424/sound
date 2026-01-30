import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card } from '@/components/ui'
import { UserCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreateReceptionist() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
              <UserCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Receptionist Agent</h1>
            <p className="text-gray-400">Coming soon - professional call handling for your business</p>
          </div>

          <Card className="text-center py-12">
            <p className="text-gray-300 mb-4">
              This agent type is currently in development. It will handle:
            </p>
            <ul className="text-sm text-gray-400 text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Answering incoming calls professionally</li>
              <li>• Transferring calls to the right department</li>
              <li>• Taking detailed messages</li>
              <li>• Providing business hours and location info</li>
              <li>• Scheduling callbacks</li>
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
