import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button, Input } from '@/components/ui'
import { ArrowLeft, ArrowRight, Check, UserCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const STEPS = ['Business Setup', 'Call Handling', 'Voice & Test']

const BUSINESS_TYPES = [
  'Law firm',
  'Home services (plumbing, HVAC, etc.)',
  'Medical/dental practice',
  'Salon/spa',
  'Restaurant',
  'Other',
]

export default function QuickStartReceptionist() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [customBusinessType, setCustomBusinessType] = useState('')
  const [services, setServices] = useState('')
  const [location, setLocation] = useState('')
  const [businessHours, setBusinessHours] = useState('Monday-Friday 9am-5pm')
  const [emergencyProtocol, setEmergencyProtocol] = useState('')

  const [handlingCapabilities, setHandlingCapabilities] = useState<string[]>([])
  const [schedulingSoftware, setSchedulingSoftware] = useState('')
  const [appointmentLength, setAppointmentLength] = useState('30')
  const [staffMembers, setStaffMembers] = useState('')
  const [leadInfo, setLeadInfo] = useState<string[]>([])
  const [transferNumber, setTransferNumber] = useState('')
  const [messageDelivery, setMessageDelivery] = useState('email')

  const capabilityOptions = [
    'Answer business questions (hours, location, services)',
    'Schedule appointments',
    'Take messages for staff',
    'Qualify leads (collect info)',
    'Provide quotes/pricing',
    'Process simple orders',
  ]

  const leadInfoOptions = [
    'Name',
    'Phone',
    'Email',
    'Service needed',
    'Budget',
    'Timeline',
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
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('You must be logged in to create an agent')
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-receptionist-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            businessName,
            businessType,
            customBusinessType,
            services,
            location,
            businessHours,
            emergencyProtocol,
            handlingCapabilities,
            schedulingSoftware,
            appointmentLength,
            staffMembers,
            leadInfo,
            transferNumber,
            messageDelivery,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create agent')
      }

      const data = await response.json()
      console.log('Agent created:', data)

      navigate('/dashboard/my-agents')
    } catch (error) {
      console.error('Failed to create agent:', error)
      setError(error instanceof Error ? error.message : 'Failed to create agent')
    } finally {
      setLoading(false)
    }
  }

  const toggleCapability = (capability: string) => {
    if (handlingCapabilities.includes(capability)) {
      setHandlingCapabilities(handlingCapabilities.filter((c) => c !== capability))
    } else {
      setHandlingCapabilities([...handlingCapabilities, capability])
    }
  }

  const toggleLeadInfo = (info: string) => {
    if (leadInfo.includes(info)) {
      setLeadInfo(leadInfo.filter((i) => i !== info))
    } else {
      setLeadInfo([...leadInfo, info])
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
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Receptionist</h1>
              <p className="text-gray-400">Professional front-desk assistant for small businesses</p>
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
              {/* Step 1: Business Setup */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Tell us about your business</h2>
                    <p className="text-gray-400">Help us create the perfect receptionist for you</p>
                  </div>

                  <Input
                    label="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Smith & Associates Law Firm"
                    required
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What type of business are you?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {BUSINESS_TYPES.map((type) => (
                        <label
                          key={type}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            businessType === type
                              ? 'bg-[#FF5C00]/10 border-[#FF5C00]'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="business-type"
                            checked={businessType === type}
                            onChange={() => setBusinessType(type)}
                            className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                    {businessType === 'Other' && (
                      <Input
                        className="mt-3"
                        placeholder="Specify your business type"
                        value={customBusinessType}
                        onChange={(e) => setCustomBusinessType(e.target.value)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Services Offered
                      <span className="block text-xs text-gray-500 font-normal mt-1">
                        Brief description of what your business does
                      </span>
                    </label>
                    <textarea
                      className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                      placeholder="We provide legal services including estate planning, business law, and contract review..."
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                    />
                  </div>

                  <Input
                    label="Location / Service Area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Downtown Chicago, IL"
                  />

                  <Input
                    label="Business Hours"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    placeholder="Monday-Friday 9am-5pm"
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Emergency After-Hours Protocol
                      <span className="block text-xs text-gray-500 font-normal mt-1">
                        What should happen when someone calls outside business hours?
                      </span>
                    </label>
                    <Input
                      placeholder="Take message and email on-call staff"
                      value={emergencyProtocol}
                      onChange={(e) => setEmergencyProtocol(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Call Handling */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Call Handling Setup</h2>
                    <p className="text-gray-400">Configure what your receptionist can do</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What should the receptionist handle? (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      {capabilityOptions.map((capability) => (
                        <label
                          key={capability}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF5C00]/30 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={handlingCapabilities.includes(capability)}
                            onChange={() => toggleCapability(capability)}
                            className="w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">{capability}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {handlingCapabilities.includes('Schedule appointments') && (
                    <div className="space-y-4 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <h3 className="text-sm font-medium text-purple-300">Appointment Scheduling</h3>

                      <Input
                        label="Scheduling Software (optional)"
                        value={schedulingSoftware}
                        onChange={(e) => setSchedulingSoftware(e.target.value)}
                        placeholder="Calendly, Acuity, Google Calendar, or Custom"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Average Appointment Length"
                          type="number"
                          value={appointmentLength}
                          onChange={(e) => setAppointmentLength(e.target.value)}
                          placeholder="30"
                          suffix="minutes"
                        />

                        <Input
                          label="Staff Members"
                          value={staffMembers}
                          onChange={(e) => setStaffMembers(e.target.value)}
                          placeholder="Dr. Smith, Dr. Jones"
                        />
                      </div>
                    </div>
                  )}

                  {handlingCapabilities.includes('Qualify leads (collect info)') && (
                    <div className="space-y-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <h3 className="text-sm font-medium text-blue-300">Lead Qualification</h3>
                      <label className="text-sm text-gray-300 block">
                        What info should we collect from new callers?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {leadInfoOptions.map((info) => (
                          <label
                            key={info}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF5C00]/30 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={leadInfo.includes(info)}
                              onChange={() => toggleLeadInfo(info)}
                              className="w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                            />
                            <span className="text-white text-sm">{info}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <Input
                    label="Staff Phone Number(s)"
                    value={transferNumber}
                    onChange={(e) => setTransferNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    helperText="For transferring important calls"
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Message Delivery Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="message-delivery"
                          checked={messageDelivery === 'email'}
                          onChange={() => setMessageDelivery('email')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">Email</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="message-delivery"
                          checked={messageDelivery === 'sms'}
                          onChange={() => setMessageDelivery('sms')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">SMS</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="message-delivery"
                          checked={messageDelivery === 'webhook'}
                          onChange={() => setMessageDelivery('webhook')}
                          className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                        />
                        <span className="text-white">Webhook</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Review & Create</h2>
                    <p className="text-gray-400">Everything looks good?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Business</h3>
                          <p className="text-white">{businessName}</p>
                          <p className="text-sm text-gray-400">{businessType === 'Other' ? customBusinessType : businessType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Capabilities</h3>
                          <p className="text-white text-sm">{handlingCapabilities.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Hours</h3>
                          <p className="text-white text-sm">{businessHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm text-purple-300">
                      <strong>Next step:</strong> Test your receptionist with a live call and fine-tune the responses.
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
                Create Receptionist Agent
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
