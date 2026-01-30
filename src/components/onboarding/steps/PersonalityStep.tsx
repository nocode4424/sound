import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { OnboardingData } from '../OnboardingFlow'

interface PersonalityStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

interface SliderConfig {
  key: 'warmth' | 'pace' | 'chattiness' | 'formality'
  label: string
  description: string
  lowLabel: string
  highLabel: string
}

const sliders: SliderConfig[] = [
  {
    key: 'warmth',
    label: 'Warmth',
    description: 'How friendly and enthusiastic should the agent be?',
    lowLabel: 'Professional & Reserved',
    highLabel: 'Warm & Enthusiastic',
  },
  {
    key: 'pace',
    label: 'Conversation Pace',
    description: 'How quickly should the agent speak?',
    lowLabel: 'Slow & Clear',
    highLabel: 'Quick & Efficient',
  },
  {
    key: 'chattiness',
    label: 'Chattiness',
    description: 'How much small talk should the agent make?',
    lowLabel: 'Brief & Direct',
    highLabel: 'Conversational & Friendly',
  },
  {
    key: 'formality',
    label: 'Formality',
    description: 'How formal should the language be?',
    lowLabel: 'Casual & Relaxed',
    highLabel: 'Formal & Polite',
  },
]

const getExampleGreeting = (data: OnboardingData, restaurantName: string = 'your restaurant') => {
  const { warmth = 5, chattiness = 5, formality = 5 } = data

  if (formality >= 7) {
    if (warmth >= 7) {
      return `Good evening! Thank you so much for calling ${restaurantName}. We're delighted to assist you today. How may I help you?`
    }
    return `Good evening. Thank you for calling ${restaurantName}. How may I be of assistance today?`
  }

  if (formality <= 3) {
    if (warmth >= 7 && chattiness >= 7) {
      return `Hey there! Thanks SO much for calling ${restaurantName}! Super excited to help you out today! What sounds good to you?`
    }
    if (warmth >= 7) {
      return `Hey! Thanks for calling ${restaurantName}! How can I help you today?`
    }
    return `Hi there! What can I get for you?`
  }

  // Balanced
  if (warmth >= 7) {
    return `Hello! Thanks for calling ${restaurantName}. We're happy to help you today. What would you like to order?`
  }
  return `Hello, thanks for calling ${restaurantName}. What can I get for you today?`
}

export function PersonalityStep({ data, updateData, onNext, onBack }: PersonalityStepProps) {
  const handleSliderChange = (key: string, value: number[]) => {
    updateData({ [key]: value[0] })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-[#0A0F1C] min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Configure Your Agent's Personality
        </h2>
        <p className="text-gray-400">
          Customize how your AI agent interacts with customers
        </p>
      </div>

      <div className="space-y-5">
        {sliders.map((slider) => (
          <Card key={slider.key} className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{slider.label}</CardTitle>
              <CardDescription>{slider.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>{slider.lowLabel}</span>
                <span className="font-bold text-white bg-[#FF5C00] px-4 py-1.5 rounded-full text-lg shadow-lg">
                  {data[slider.key] || 5}
                </span>
                <span>{slider.highLabel}</span>
              </div>
              <Slider
                value={[data[slider.key] || 5]}
                onValueChange={(value) => handleSliderChange(slider.key, value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview card */}
      <Card className="mt-6 bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] border-[#FF5C00] shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <span className="text-2xl">💬</span>
            Example Greeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white italic leading-relaxed text-base font-medium">
            "{getExampleGreeting(data, data.restaurantName)}"
          </p>
          <div className="mt-4 pt-4 border-t border-white/30 space-y-1 text-sm text-white/90">
            <p>
              <strong>Conversation Style:</strong>{' '}
              {data.chattiness <= 3
                ? 'Brief and to-the-point'
                : data.chattiness >= 7
                ? 'Conversational with small talk'
                : 'Friendly but efficient'}
            </p>
            <p>
              <strong>Speech Pattern:</strong>{' '}
              {data.pace <= 3
                ? 'Speaks slowly and clearly'
                : data.pace >= 7
                ? 'Quick and energetic'
                : 'Comfortable natural pace'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="secondary" onClick={onBack} size="lg">
          ← Back
        </Button>
        <Button onClick={onNext} size="lg" variant="primary">
          Continue →
        </Button>
      </div>
    </div>
  )
}
