import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button, Input } from '@/components/ui'
import { ArrowLeft, ArrowRight, Check, Headphones, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const STEPS = ['Business Info', 'Knowledge Base', 'Voice & Test']

export default function QuickStartContactCenter() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [businessName, setBusinessName] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState('')
  const [needsAuth, setNeedsAuth] = useState<'yes' | 'no' | 'custom'>('no')
  const [authMethod, setAuthMethod] = useState('')
  const [escalationRules, setEscalationRules] = useState('')
  const [integrations, setIntegrations] = useState<string[]>([])
  const [businessHours, setBusinessHours] = useState('Monday-Friday 9am-5pm')
  const [transferNumber, setTransferNumber] = useState('')

  const goalOptions = [
    'Answer common questions',
    'Check order/account status',
    'Troubleshoot issues',
    'Route calls to departments',
    'Authenticate customers',
  ]

  const integrationOptions = [
    'CRM (Salesforce, HubSpot, Zendesk)',
    'Order management system',
    'Knowledge base/FAQ system',
    'Custom API',
    'None - agent uses provided knowledge only',
  ]

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateAgent = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get the user's session
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('You must be logged in to create an agent')
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-contact-center-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            businessName,
            primaryGoal,
            customerInfo,
            needsAuth,
            authMethod,
            escalationRules,
            integrations,
            businessHours,
            transferNumber,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create agent')
      }

      const data = await response.json()
      console.log('Agent created:', data)

      // Navigate to my agents page
      navigate('/dashboard/my-agents')
    } catch (error) {
      console.error('Failed to create agent:', error)
      setError(error instanceof Error ? error.message : 'Failed to create agent')
    } finally {
      setLoading(false)
    }
  }

  const toggleGoal = (goal: string) => {
    if (primaryGoal.includes(goal)) {
      setPrimaryGoal(primaryGoal.filter((g) => g !== goal))
    } else {
      setPrimaryGoal([...primaryGoal, goal])
    }
  }

  const toggleIntegration = (integration: string) => {
    if (integrations.includes(integration)) {
      setIntegrations(integrations.filter((i) => i !== integration))
    } else {
      setIntegrations([...integrations, integration])
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </button>
          <div className="flex items-center gap-4 mb-2">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Contact Center Self-Service</h1>
              <p className="text-gray-400">Handle common inquiries and route calls 24/7</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      index < currentStep
                        ? 'bg-[#FF5C00] border-[#FF5C00]'
                        : index === currentStep
                        ? 'border-[#FF5C00] text-[#FF5C00]'
                        : 'border-gray-600 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center font-medium ${
                      index <= currentStep ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all ${
                      index < currentStep ? 'bg-[#FF5C00]' : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Business Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Tell us about your business</h2>
                    <p className="text-gray-400">This helps us customize your contact center agent</p>
                  </div>

                  <Input
                    label="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Acme Corp"
                    required
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What should your agent handle? (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      {goalOptions.map((goal) => (
                        <label
                          key={goal}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF5C00]/30 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={primaryGoal.includes(goal)}
                            onChange={() => toggleGoal(goal)}
                            className="w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Do you need customer authentication?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="auth"
                          checked={needsAuth === 'no'}
                          onChange={() => setNeedsAuth('no')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">No authentication needed</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="auth"
                          checked={needsAuth === 'yes'}
                          onChange={() => setNeedsAuth('yes')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">Yes - collect account number/email/phone</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="auth"
                          checked={needsAuth === 'custom'}
                          onChange={() => setNeedsAuth('custom')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">Yes - custom identifier</span>
                      </label>
                    </div>
                    {needsAuth === 'custom' && (
                      <Input
                        className="mt-3"
                        placeholder="Specify identifier (e.g., order number, customer ID)"
                        value={authMethod}
                        onChange={(e) => setAuthMethod(e.target.value)}
                      />
                    )}
                  </div>

                  <Input
                    label="Business Hours"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    placeholder="Monday-Friday 9am-5pm"
                  />

                  <Input
                    label="Transfer Number (for escalations)"
                    value={transferNumber}
                    onChange={(e) => setTransferNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              )}

              {/* Step 2: Knowledge Base */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Knowledge & Integration</h2>
                    <p className="text-gray-400">Help your agent know what customers need</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      What information can customers look up?
                      <span className="block text-xs text-gray-500 font-normal mt-1">
                        Examples: order tracking, return policy, account balance, technical support topics
                      </span>
                    </label>
                    <textarea
                      className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                      placeholder="Customers typically call about..."
                      value={customerInfo}
                      onChange={(e) => setCustomerInfo(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      When should calls escalate to humans?
                      <span className="block text-xs text-gray-500 font-normal mt-1">
                        Examples: complex refunds, angry customers, technical issues beyond basic troubleshooting
                      </span>
                    </label>
                    <textarea
                      className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                      placeholder="Escalate when..."
                      value={escalationRules}
                      onChange={(e) => setEscalationRules(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What systems does this integrate with?
                    </label>
                    <div className="space-y-2">
                      {integrationOptions.map((integration) => (
                        <label
                          key={integration}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF5C00]/30 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={integrations.includes(integration)}
                            onChange={() => toggleIntegration(integration)}
                            className="w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">{integration}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Voice & Test */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Review & Create</h2>
                    <p className="text-gray-400">Almost done! Review your configuration</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Business</h3>
                          <p className="text-white">{businessName || 'Not set'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Primary Goals</h3>
                          <p className="text-white text-sm">{primaryGoal.join(', ') || 'None selected'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Authentication</h3>
                          <p className="text-white text-sm capitalize">{needsAuth === 'custom' ? authMethod : needsAuth}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Integrations</h3>
                          <p className="text-white text-sm">{integrations.join(', ') || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-300">
                      <strong>Next step:</strong> After creation, you'll be able to test your agent with a live call and make adjustments.
                    </p>
                  </div>

                  {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentStep === 0 && !businessName}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleCreateAgent}
                isLoading={loading}
                disabled={!businessName}
              >
                Create Contact Center Agent
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
