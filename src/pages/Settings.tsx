import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Input, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { User, Mail, Key, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Settings() {
  const { user, profile, updateProfile } = useAuth()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [companyName, setCompanyName] = useState(profile?.company_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      await updateProfile({
        full_name: fullName,
        company_name: companyName,
        phone: phone,
      })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <p className="text-sm text-gray-400">Update your personal details</p>
                </div>
              </div>

              <div className="space-y-4">
                {success && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
                    Profile updated successfully!
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                    {error}
                  </div>
                )}

                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />

                <Input
                  label="Company Name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />

                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={loading}
                  className="w-full md:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Account</h2>
                  <p className="text-sm text-gray-400">Manage your account settings</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="glass rounded-lg px-4 py-3 text-gray-400 text-sm">
                    {user?.email}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account ID
                  </label>
                  <div className="glass rounded-lg px-4 py-3 text-gray-400 text-sm font-mono">
                    {user?.id}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Security</h2>
                  <p className="text-sm text-gray-400">Manage your password and security settings</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="secondary" disabled className="w-full md:w-auto">
                  Change Password
                </Button>
                <p className="text-xs text-gray-500">
                  Password management coming soon. If you signed in with Google, you can manage your password through your Google account.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-error/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-error" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
                  <p className="text-sm text-gray-400">Irreversible actions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-error/5 border border-error/20">
                  <h3 className="text-white font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Once you delete your account, there is no going back. This will permanently delete all your agents, call history, and account data.
                  </p>
                  <Button variant="ghost" disabled className="text-error hover:text-error">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
