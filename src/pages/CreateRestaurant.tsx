import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, Button, Input } from '@/components/ui'
import { ArrowLeft, ArrowRight, Check, Upload, Smile, Briefcase, Zap, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useOCR } from '@/hooks/useOCR'

const STEPS = [
  'Restaurant Basics',
  'Voice Personality',
  'Menu Upload',
  'Special Instructions',
  'Review & Create',
]

type Personality = 'friendly' | 'professional' | 'energetic'

interface PersonalityOption {
  id: Personality
  label: string
  icon: typeof Smile
  greeting: string
  description: string
}

const PERSONALITY_OPTIONS: PersonalityOption[] = [
  {
    id: 'friendly',
    label: 'Friendly',
    icon: Smile,
    greeting: "Hey! Thanks for calling",
    description: 'Warm and approachable',
  },
  {
    id: 'professional',
    label: 'Professional',
    icon: Briefcase,
    greeting: "Good evening, thank you for calling",
    description: 'Polished and composed',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    icon: Zap,
    greeting: "Hey there! What sounds good today?",
    description: 'Upbeat and enthusiastic',
  },
]

const VOICE_OPTIONS = [
  { id: 'female', label: 'Female', retellVoiceId: '11labs-Grace' },
  { id: 'male', label: 'Male', retellVoiceId: '11labs-Andrew' },
  { id: 'neutral', label: 'Neutral', retellVoiceId: '11labs-Hailey' },
]

export default function CreateRestaurant() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { extractTextFromImage, isProcessing: isOCRProcessing, progress: ocrProgress } = useOCR()

  // Form state - Step 1: Restaurant Basics
  const [restaurantName, setRestaurantName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [hours, setHours] = useState({
    mondayFriday: { open: '09:00', close: '21:00' },
    saturday: { open: '10:00', close: '22:00' },
    sunday: { open: '10:00', close: '20:00' },
  })
  const [avgPrepTime, setAvgPrepTime] = useState(15)

  // Step 2: Voice Personality
  const [personality, setPersonality] = useState<Personality>('friendly')
  const [voiceGender, setVoiceGender] = useState<'female' | 'male' | 'neutral'>('female')

  // Step 3: Menu
  const [menu, setMenu] = useState('')
  const [menuFile, setMenuFile] = useState<File | null>(null)

  // Step 4: Special Instructions
  const [dailySpecial, setDailySpecial] = useState('')
  const [upsellDrinks, setUpsellDrinks] = useState(true)
  const [askAllergies, setAskAllergies] = useState(true)
  const [mentionLoyalty, setMentionLoyalty] = useState(false)
  const [loyaltyDetails, setLoyaltyDetails] = useState('')
  const [minimumOrder, setMinimumOrder] = useState('10.00')
  const [neverMention, setNeverMention] = useState("Don't mention delivery (pickup only)")

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

  const handleMenuUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMenuFile(file)
      setError(null)

      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        try {
          // Perform OCR on the image
          const extractedText = await extractTextFromImage(file)
          setMenu(extractedText)
        } catch (err) {
          setError('Failed to extract text from image. Please paste the menu manually or try a different image.')
        }
      } else if (file.type === 'application/pdf') {
        // TODO: Add PDF text extraction
        setError('PDF extraction not yet implemented. Please paste the menu text manually.')
      } else {
        // For text files, read directly
        const reader = new FileReader()
        reader.onload = (event) => {
          const text = event.target?.result as string
          setMenu(text)
        }
        reader.readAsText(file)
      }
    }
  }

  const handleCreateAgent = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get the user's session and auth token
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('You must be logged in to create an agent')
      }

      // Get the voice ID based on gender
      const selectedVoice = VOICE_OPTIONS.find((v) => v.id === voiceGender)

      // Map personality to numeric values (1-10 scale)
      const personalityMap = {
        friendly: { warmth: 7, pace: 6, chattiness: 7, formality: 4 },
        professional: { warmth: 5, pace: 5, chattiness: 4, formality: 8 },
        energetic: { warmth: 8, pace: 8, chattiness: 8, formality: 3 },
      }

      // Build knowledge base with menu and special instructions
      let knowledgeBase = menu ? `MENU:\n${menu}` : ''

      if (dailySpecial) {
        knowledgeBase += `\n\nDAILY SPECIAL:\n${dailySpecial}`
      }

      if (mentionLoyalty && loyaltyDetails) {
        knowledgeBase += `\n\nLOYALTY PROGRAM:\n${loyaltyDetails}`
      }

      let specialInstructions = []
      if (upsellDrinks) {
        specialInstructions.push('Always suggest adding a drink to orders')
      }
      if (askAllergies) {
        specialInstructions.push('Ask about dietary restrictions and allergies')
      }
      if (neverMention) {
        specialInstructions.push(`NEVER mention or offer: ${neverMention}`)
      }

      if (specialInstructions.length > 0) {
        knowledgeBase += `\n\nSPECIAL INSTRUCTIONS:\n${specialInstructions.join('\n')}`
      }

      // Format hours to match expected structure
      const formattedHours = {
        monday: hours.mondayFriday,
        tuesday: hours.mondayFriday,
        wednesday: hours.mondayFriday,
        thursday: hours.mondayFriday,
        friday: hours.mondayFriday,
        saturday: hours.saturday,
        sunday: hours.sunday,
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-restaurant-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            restaurantName,
            phone: phoneNumber,
            hours: formattedHours,
            avgPrepTime,
            warmth: personalityMap[personality].warmth,
            pace: personalityMap[personality].pace,
            chattiness: personalityMap[personality].chattiness,
            formality: personalityMap[personality].formality,
            voiceId: selectedVoice?.retellVoiceId || '11labs-Grace',
            knowledgeBase,
            menuText: menu,
            minimumOrder: parseFloat(minimumOrder),
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create agent' }))
        throw new Error(errorData.error || 'Failed to create agent')
      }

      const data = await response.json()
      console.log('Agent created:', data)

      // Navigate to my agents page
      navigate('/my-agents')
    } catch (error) {
      console.error('Failed to create agent:', error)
      setError(error instanceof Error ? error.message : 'Failed to create agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard/create-agent')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to agent types
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Create Restaurant Agent</h1>
          <p className="text-gray-400">
            Follow the steps below to create your custom restaurant order assistant
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      index < currentStep
                        ? 'bg-electric-blue border-electric-blue'
                        : index === currentStep
                        ? 'border-electric-blue text-electric-blue'
                        : 'border-gray-600 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      index <= currentStep ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      index < currentStep ? 'bg-electric-blue' : 'bg-gray-600'
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
              {/* Step 1: Restaurant Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Let's set up your phone answering AI!</h2>
                    <p className="text-gray-400">We'll start with some basic information about your restaurant</p>
                  </div>

                  <Input
                    label="Restaurant Name"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="Mario's Pizza"
                    required
                  />

                  <Input
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      What hours are you open?
                    </label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Monday-Friday Open</label>
                          <Input
                            type="time"
                            value={hours.mondayFriday.open}
                            onChange={(e) =>
                              setHours({ ...hours, mondayFriday: { ...hours.mondayFriday, open: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Monday-Friday Close</label>
                          <Input
                            type="time"
                            value={hours.mondayFriday.close}
                            onChange={(e) =>
                              setHours({ ...hours, mondayFriday: { ...hours.mondayFriday, close: e.target.value } })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Saturday Open</label>
                          <Input
                            type="time"
                            value={hours.saturday.open}
                            onChange={(e) => setHours({ ...hours, saturday: { ...hours.saturday, open: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Saturday Close</label>
                          <Input
                            type="time"
                            value={hours.saturday.close}
                            onChange={(e) => setHours({ ...hours, saturday: { ...hours.saturday, close: e.target.value } })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Sunday Open</label>
                          <Input
                            type="time"
                            value={hours.sunday.open}
                            onChange={(e) => setHours({ ...hours, sunday: { ...hours.sunday, open: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Sunday Close</label>
                          <Input
                            type="time"
                            value={hours.sunday.close}
                            onChange={(e) => setHours({ ...hours, sunday: { ...hours.sunday, close: e.target.value } })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Average order prep time
                    </label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={avgPrepTime}
                        onChange={(e) => setAvgPrepTime(Number(e.target.value))}
                        min={5}
                        max={60}
                        className="w-24"
                      />
                      <span className="text-gray-400">minutes</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Voice Personality */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Choose your AI's personality</h2>
                    <p className="text-gray-400">Select a voice style that matches your brand</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PERSONALITY_OPTIONS.map((option) => {
                      const Icon = option.icon
                      const isSelected = personality === option.id
                      return (
                        <button
                          key={option.id}
                          onClick={() => setPersonality(option.id)}
                          className={`p-6 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? 'border-electric-blue bg-electric-blue/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <Icon className={`w-12 h-12 mx-auto mb-4 ${isSelected ? 'text-electric-blue' : 'text-gray-400'}`} />
                          <h3 className="font-semibold text-white mb-2">{option.label}</h3>
                          <div className="text-sm text-gray-400 mb-4 italic">"{option.greeting}"</div>
                          <p className="text-xs text-gray-500">{option.description}</p>
                          {isSelected && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-electric-blue">
                              <Check className="w-4 h-4" />
                              <span className="text-sm font-medium">Selected</span>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Voice gender:</label>
                    <div className="flex gap-4">
                      {VOICE_OPTIONS.map((voice) => (
                        <label key={voice.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="voice-gender"
                            checked={voiceGender === voice.id}
                            onChange={() => setVoiceGender(voice.id as any)}
                            className="w-4 h-4 text-electric-blue focus:ring-electric-blue"
                          />
                          <span className="text-white">{voice.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Menu Upload */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Upload your menu</h2>
                    <p className="text-gray-400">We'll automatically extract text from images using OCR</p>
                  </div>

                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    {isOCRProcessing ? (
                      <div className="space-y-4">
                        <Loader2 className="w-12 h-12 text-brand-indigo mx-auto mb-4 animate-spin" />
                        <p className="text-gray-300 mb-2">Extracting text from image...</p>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-indigo to-brand-purple transition-all duration-300"
                            style={{ width: `${ocrProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500">{ocrProgress}% complete</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">Drag & drop your menu here</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Supports images (JPG, PNG), PDF, or text files
                        </p>
                        <input
                          type="file"
                          id="menu-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                          onChange={handleMenuUpload}
                        />
                        <Button
                          variant="secondary"
                          onClick={() => document.getElementById('menu-upload')?.click()}
                        >
                          Choose File
                        </Button>
                        {menuFile && (
                          <div className="mt-4 p-3 bg-brand-indigo/10 border border-brand-indigo/20 rounded-lg">
                            <p className="text-sm text-brand-indigo font-medium">
                              ✓ Uploaded: {menuFile.name}
                            </p>
                            {menu && (
                              <p className="text-xs text-text-tertiary mt-1">
                                Extracted {menu.length} characters
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-navy text-gray-400">OR paste menu text</span>
                    </div>
                  </div>

                  <textarea
                    className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                    placeholder="APPETIZERS&#10;Mozzarella Sticks - $8.99&#10;Garlic Bread - $5.99&#10;&#10;PIZZA&#10;Margherita - $12.99&#10;Pepperoni - $14.99"
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                  />
                </div>
              )}

              {/* Step 4: Special Instructions */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Any special rules for your AI?</h2>
                    <p className="text-gray-400">Customize how your agent interacts with customers</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={upsellDrinks}
                      onChange={(e) => setUpsellDrinks(e.target.checked)}
                      className="mt-1 w-4 h-4"
                    />
                    <div>
                      <span className="text-white font-medium">Upsell drinks with orders</span>
                      <p className="text-sm text-gray-400">Agent will suggest adding a drink to orders</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={askAllergies}
                      onChange={(e) => setAskAllergies(e.target.checked)}
                      className="mt-1 w-4 h-4"
                    />
                    <div>
                      <span className="text-white font-medium">Ask about allergies</span>
                      <p className="text-sm text-gray-400">Agent will check for dietary restrictions</p>
                    </div>
                  </label>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={dailySpecial !== ''}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDailySpecial('2-topping large pizza for $14.99')
                          } else {
                            setDailySpecial('')
                          }
                        }}
                        className="mt-1 w-4 h-4"
                      />
                      <div>
                        <span className="text-white font-medium">Offer daily specials</span>
                        <p className="text-sm text-gray-400">Agent will mention today's special</p>
                      </div>
                    </label>
                    {dailySpecial !== '' && (
                      <Input
                        placeholder="Today's special..."
                        value={dailySpecial}
                        onChange={(e) => setDailySpecial(e.target.value)}
                        className="ml-7"
                      />
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={mentionLoyalty}
                        onChange={(e) => setMentionLoyalty(e.target.checked)}
                        className="mt-1 w-4 h-4"
                      />
                      <div>
                        <span className="text-white font-medium">Mention loyalty program</span>
                        <p className="text-sm text-gray-400">Agent will tell customers about your rewards program</p>
                      </div>
                    </label>
                    {mentionLoyalty && (
                      <Input
                        placeholder="Program details..."
                        value={loyaltyDetails}
                        onChange={(e) => setLoyaltyDetails(e.target.value)}
                        className="ml-7"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Minimum order for pickup
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white">$</span>
                      <Input
                        type="number"
                        value={minimumOrder}
                        onChange={(e) => setMinimumOrder(e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-32"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Anything the AI should NEVER say or offer?
                    </label>
                    <textarea
                      className="w-full h-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                      placeholder="Don't mention delivery (pickup only)"
                      value={neverMention}
                      onChange={(e) => setNeverMention(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Review & Create */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Review Your Agent</h2>
                    <p className="text-gray-400">Make sure everything looks good before creating</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Restaurant Name</h3>
                      <p className="text-white">{restaurantName || 'Not set'}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Personality</h3>
                      <p className="text-white capitalize">{personality}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Voice</h3>
                      <p className="text-white capitalize">{voiceGender}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Hours</h3>
                      <p className="text-white text-sm">
                        Mon-Fri: {hours.mondayFriday.open} - {hours.mondayFriday.close}
                        <br />
                        Sat: {hours.saturday.open} - {hours.saturday.close}
                        <br />
                        Sun: {hours.sunday.open} - {hours.sunday.close}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Average Prep Time</h3>
                      <p className="text-white">{avgPrepTime} minutes</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Menu</h3>
                      <p className="text-white">{menu ? `${menu.split('\n').length} lines` : 'Not provided'}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Special Instructions</h3>
                      <ul className="text-white text-sm space-y-1">
                        {upsellDrinks && <li>• Upsell drinks</li>}
                        {askAllergies && <li>• Ask about allergies</li>}
                        {dailySpecial && <li>• Offer daily special: {dailySpecial}</li>}
                        {mentionLoyalty && <li>• Mention loyalty program</li>}
                        <li>• Minimum order: ${minimumOrder}</li>
                      </ul>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
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
              <Button variant="primary" onClick={handleNext}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleCreateAgent}
                isLoading={loading}
                disabled={!restaurantName}
              >
                Create My Agent
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
