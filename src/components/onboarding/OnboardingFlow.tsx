import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WelcomeScreen } from './steps/WelcomeScreen'
import { RestaurantInfoStep } from './steps/RestaurantInfoStep'
import { PersonalityStep } from './steps/PersonalityStep'
import { VoiceSelectionStep } from './steps/VoiceSelectionStep'
import { MenuUploadStep } from './steps/MenuUploadStep'
import { KnowledgeBaseStep } from './steps/KnowledgeBaseStep'
import { PreviewStep } from './steps/PreviewStep'
import { ModeSelectionStep } from './steps/ModeSelectionStep'
import { AdvancedAgentStep } from './steps/AdvancedAgentStep'
import { supabase } from '@/lib/supabase'

export interface OnboardingData {
  // Mode
  mode?: 'simple' | 'advanced'

  // Restaurant Info
  restaurantName: string
  cuisine: string
  phone: string
  address: string

  // Personality (Simple Mode)
  warmth: number // 1-10
  pace: number // 1-10
  chattiness: number // 1-10
  formality: number // 1-10

  // Voice
  voiceId: string
  voiceName: string

  // Menu
  menuText: string
  menuFile?: File

  // Knowledge Base
  knowledgeBase: string

  // Hours
  hours: {
    [key: string]: { open: string; close: string; closed: boolean }
  }

  // Advanced Mode Settings
  generalPrompt?: string
  llmModel?: string
  temperature?: number
  maxTokens?: number
  voiceSpeed?: number
  voiceTemperature?: number
  responsiveness?: number
  interruptionSensitivity?: number
  enableBackchannel?: boolean
  backchannelFrequency?: number
  endCallAfterSilenceMs?: number
  maxCallDurationMs?: number
  enableVoicemailDetection?: boolean
  ambientSound?: 'none' | 'coffee_shop' | 'office' | 'restaurant'
  ambientSoundVolume?: number
  normalizeForSpeech?: boolean
  optOutSensitiveDataStorage?: boolean
}

export function OnboardingFlow() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [creationMode, setCreationMode] = useState<'simple' | 'advanced' | null>(null)
  const [data, setData] = useState<OnboardingData>({
    restaurantName: '',
    cuisine: '',
    phone: '',
    address: '',
    warmth: 5,
    pace: 5,
    chattiness: 5,
    formality: 5,
    voiceId: '',
    voiceName: '',
    menuText: '',
    knowledgeBase: '',
    hours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '09:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false },
    },
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    const totalSteps = creationMode === 'simple' ? 7 : 6
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleModeSelection = (mode: 'simple' | 'advanced') => {
    setCreationMode(mode)
    updateData({ mode })
    nextStep()
  }

  const handleComplete = async () => {
    try {
      console.log('Creating agent with data:', data)

      // Get auth session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Not authenticated')
      }

      // Call edge function to create agent
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-restaurant-agent`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mode: creationMode,
            ...data,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create agent')
      }

      const result = await response.json()
      console.log('Agent created:', result)

      // Navigate to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating agent:', error)
      alert(error instanceof Error ? error.message : 'Failed to create agent')
    }
  }

  // Conditional step arrays based on mode
  const getSteps = () => {
    if (!creationMode) {
      return [<ModeSelectionStep key="mode" onSelectMode={handleModeSelection} />]
    }

    const commonSteps = [
      <WelcomeScreen key="welcome" onContinue={nextStep} />,
      <RestaurantInfoStep key="info" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
    ]

    if (creationMode === 'simple') {
      return [
        ...commonSteps,
        <PersonalityStep key="personality" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <VoiceSelectionStep key="voice" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <MenuUploadStep key="menu" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <KnowledgeBaseStep key="knowledge" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <PreviewStep key="preview" data={data} onLaunch={handleComplete} onBack={prevStep} />,
      ]
    } else {
      // Advanced mode
      return [
        ...commonSteps,
        <AdvancedAgentStep key="advanced" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <VoiceSelectionStep key="voice" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <MenuUploadStep key="menu" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <KnowledgeBaseStep key="knowledge" data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />,
        <PreviewStep key="preview" data={data} onLaunch={handleComplete} onBack={prevStep} />,
      ]
    }
  }

  const steps = getSteps()
  const totalSteps = creationMode === 'simple' ? 7 : creationMode === 'advanced' ? 6 : 1

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col">
      {/* Progress Bar */}
      {creationMode && (
        <div className="bg-[#0F172A] border-b border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        {steps[currentStep]}
      </div>
    </div>
  )
}
