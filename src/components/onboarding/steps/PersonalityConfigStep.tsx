import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { OnboardingData } from '../OnboardingFlow'

interface PersonalityConfigStepProps {
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

export function PersonalityConfigStep({ data, updateData, onNext, onBack }: PersonalityConfigStepProps) {
  const handleSliderChange = (key: string, value: number[]) => {
    updateData({ [key]: value[0] })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Configure Your Agent's Personality
        </h2>
        <p className="text-gray-600 text-lg">
          Customize how your AI agent interacts with customers
        </p>
      </div>

      <div className="space-y-8">
        {sliders.map((slider) => (
          <Card key={slider.key} className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">{slider.label}</CardTitle>
              <CardDescription>{slider.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>{slider.lowLabel}</span>
                <span className="font-medium text-blue-600">{data[slider.key] || 5}</span>
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
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Personality Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Greeting Style:</strong>{' '}
              {data.formality <= 3
                ? 'Hey! Thanks for calling.'
                : data.formality >= 7
                ? 'Good evening, thank you for calling.'
                : 'Hi! Thanks for calling.'}
            </p>
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
      <div className="flex items-center justify-between mt-10">
        <Button variant="secondary" onClick={onBack} size="lg">
          ← Back
        </Button>
        <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
          Continue →
        </Button>
      </div>
    </div>
  )
}
