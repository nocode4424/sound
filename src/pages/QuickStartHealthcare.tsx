import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button, Input } from '@/components/ui'
import { ArrowLeft, ArrowRight, Check, Heart, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const STEPS = ['Practice Info', 'Services & Protocols', 'Review & Create']

export default function QuickStartHealthcare() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [practiceName, setPracticeName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [providers, setProviders] = useState('')
  const [locations, setLocations] = useState('')

  const [services, setServices] = useState<string[]>([])
  const [ehrSystem, setEhrSystem] = useState('')
  const [appointmentTypes, setAppointmentTypes] = useState('')
  const [appointmentLengths, setAppointmentLengths] = useState('')
  const [schedulingRules, setSchedulingRules] = useState('')

  const [emergencySymptoms, setEmergencySymptoms] = useState('Chest pain, difficulty breathing, severe bleeding')
  const [nurseTriageNumber, setNurseTriageNumber] = useState('')
  const [afterHoursLine, setAfterHoursLine] = useState('')

  const [verificationMethod, setVerificationMethod] = useState('dob-lastname')
  const [canDiscussPHI, setCanDiscussPHI] = useState(true)
  const [confirmationMethod, setConfirmationMethod] = useState('sms')
  const [reminderTiming, setReminderTiming] = useState('24')

  const serviceOptions = [
    'Appointment scheduling',
    'Appointment reminders/confirmations',
    'Prescription refill requests',
    'Pre-visit instructions',
    'Post-visit follow-up',
    'Basic triage/symptom routing',
    'Insurance verification',
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-healthcare-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            practiceName,
            specialty,
            providers,
            locations,
            services,
            ehrSystem,
            appointmentTypes,
            appointmentLengths,
            schedulingRules,
            emergencySymptoms,
            nurseTriageNumber,
            afterHoursLine,
            verificationMethod,
            canDiscussPHI,
            confirmationMethod,
            reminderTiming,
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

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service))
    } else {
      setServices([...services, service])
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
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Healthcare Patient Access</h1>
              <p className="text-gray-400">HIPAA-compliant patient communication assistant</p>
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
              {/* Step 1: Practice Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Tell us about your practice</h2>
                    <p className="text-gray-400">We'll create a HIPAA-compliant assistant for your patients</p>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-green-300 font-medium mb-1">HIPAA Compliance Built-In</p>
                        <p className="text-xs text-green-200/80">All conversations are encrypted and compliant with HIPAA regulations</p>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Practice Name"
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                    placeholder="Downtown Family Medicine"
                    required
                  />

                  <Input
                    label="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Primary Care, Pediatrics, etc."
                  />

                  <Input
                    label="Provider Names"
                    value={providers}
                    onChange={(e) => setProviders(e.target.value)}
                    placeholder="Dr. Smith, Dr. Johnson, Nurse Practitioner Lee"
                  />

                  <Input
                    label="Location(s)"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    placeholder="123 Main St, Suite 200, Chicago, IL"
                  />
                </div>
              )}

              {/* Step 2: Services & Protocols */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Services & Clinical Protocols</h2>
                    <p className="text-gray-400">Configure what your agent can help patients with</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What patient services should this handle? (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF5C00]/30 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={services.includes(service)}
                            onChange={() => toggleService(service)}
                            className="w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {services.includes('Appointment scheduling') && (
                    <div className="space-y-4 p-4 rounded-lg bg-teal-500/5 border border-teal-500/20">
                      <h3 className="text-sm font-medium text-teal-300">Appointment Scheduling</h3>

                      <Input
                        label="EHR/Scheduling System"
                        value={ehrSystem}
                        onChange={(e) => setEhrSystem(e.target.value)}
                        placeholder="Epic, Cerner, athenahealth, Custom, or None"
                      />

                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Appointment Types Offered
                        </label>
                        <textarea
                          className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                          placeholder="Annual checkup, sick visit, follow-up, vaccine appointment..."
                          value={appointmentTypes}
                          onChange={(e) => setAppointmentTypes(e.target.value)}
                        />
                      </div>

                      <Input
                        label="Typical Appointment Lengths"
                        value={appointmentLengths}
                        onChange={(e) => setAppointmentLengths(e.target.value)}
                        placeholder="15 min for follow-up, 30 min for annual physical, etc."
                      />

                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">
                          Scheduling Rules
                          <span className="block text-xs text-gray-500 font-normal mt-1">
                            Any special requirements? (e.g., new patients need intake, certain visits need referrals)
                          </span>
                        </label>
                        <textarea
                          className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                          value={schedulingRules}
                          onChange={(e) => setSchedulingRules(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                    <h3 className="text-sm font-medium text-red-300">Clinical Protocols & Safety</h3>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Emergency Symptoms (require immediate routing)
                      </label>
                      <textarea
                        className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50"
                        value={emergencySymptoms}
                        onChange={(e) => setEmergencySymptoms(e.target.value)}
                      />
                    </div>

                    <Input
                      label="Nurse Triage Number"
                      value={nurseTriageNumber}
                      onChange={(e) => setNurseTriageNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />

                    <Input
                      label="After-Hours Emergency Line"
                      value={afterHoursLine}
                      onChange={(e) => setAfterHoursLine(e.target.value)}
                      placeholder="+1 (555) 999-9999"
                    />
                  </div>

                  <div className="space-y-4 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-300">HIPAA & Compliance</h3>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-3 block">
                        Patient Verification Method
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={verificationMethod === 'dob-lastname'}
                            onChange={() => setVerificationMethod('dob-lastname')}
                            className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">Date of Birth + Last Name</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={verificationMethod === 'account-number'}
                            onChange={() => setVerificationMethod('account-number')}
                            className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">Account Number</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="verification"
                            checked={verificationMethod === 'other'}
                            onChange={() => setVerificationMethod('other')}
                            className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                          />
                          <span className="text-white text-sm">Other</span>
                        </label>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={canDiscussPHI}
                        onChange={(e) => setCanDiscussPHI(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#FF5C00] focus:ring-[#FF5C00]"
                      />
                      <div>
                        <span className="text-white font-medium text-sm">Agent can discuss protected health information</span>
                        <p className="text-xs text-gray-400 mt-1">After patient verification. If unchecked, agent will only handle scheduling.</p>
                      </div>
                    </label>
                  </div>

                  {services.includes('Appointment reminders/confirmations') && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-300">Communication Preferences</h3>

                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-3 block">
                          How should we confirm appointments?
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="confirmation"
                              checked={confirmationMethod === 'sms'}
                              onChange={() => setConfirmationMethod('sms')}
                              className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                            />
                            <span className="text-white text-sm">SMS</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="confirmation"
                              checked={confirmationMethod === 'email'}
                              onChange={() => setConfirmationMethod('email')}
                              className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                            />
                            <span className="text-white text-sm">Email</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="confirmation"
                              checked={confirmationMethod === 'call'}
                              onChange={() => setConfirmationMethod('call')}
                              className="w-4 h-4 text-[#FF5C00] focus:ring-[#FF5C00]"
                            />
                            <span className="text-white text-sm">Phone Call</span>
                          </label>
                        </div>
                      </div>

                      <Input
                        label="Reminder Timing"
                        type="number"
                        value={reminderTiming}
                        onChange={(e) => setReminderTiming(e.target.value)}
                        placeholder="24"
                        suffix="hours before appointment"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Review & Create</h2>
                    <p className="text-gray-400">Ready to launch your patient access agent</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Practice</h3>
                          <p className="text-white">{practiceName}</p>
                          <p className="text-sm text-gray-400">{specialty}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Services</h3>
                          <p className="text-white text-sm">{services.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-1">Verification</h3>
                          <p className="text-white text-sm capitalize">{verificationMethod.replace('-', ' + ')}</p>
                          <p className="text-xs text-gray-400 mt-1">{canDiscussPHI ? 'Can discuss PHI after verification' : 'Scheduling only'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-300">
                      <strong>Next step:</strong> Test your HIPAA-compliant agent with a simulated patient call.
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
                disabled={currentStep === 0 && !practiceName}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleCreateAgent}
                isLoading={loading}
                disabled={!practiceName}
              >
                Create Healthcare Agent
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
