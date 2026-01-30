import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { VoiceWaveIcon } from '@/components/icons/VoiceWaveIcon'
import { ArrowRight, CheckCircle2, Settings, Phone, Sparkles } from 'lucide-react'

export default function Documentation() {
  const steps = [
    {
      number: 1,
      title: 'Configure Restaurant Details',
      description: 'Enter your restaurant name, cuisine type, address, phone number, and operating hours.',
      icon: Settings,
      tips: [
        'Make sure your phone number is accurate - this may be used for call forwarding',
        'Set hours for each day of the week to ensure accurate information'
      ]
    },
    {
      number: 2,
      title: 'Set Agent Personality',
      description: 'Customize how your AI agent communicates with customers using four key personality dimensions.',
      icon: Sparkles,
      details: [
        {
          name: 'Warmth',
          low: 'Professional & Reserved',
          high: 'Warm & Enthusiastic'
        },
        {
          name: 'Pace',
          low: 'Slow & Clear',
          high: 'Quick & Efficient'
        },
        {
          name: 'Chattiness',
          low: 'Brief & Direct',
          high: 'Conversational & Friendly'
        },
        {
          name: 'Formality',
          low: 'Casual & Relaxed',
          high: 'Formal & Polite'
        }
      ],
      tips: [
        'Higher warmth works well for family restaurants',
        'Lower formality suits casual dining',
        'Adjust pace based on your typical customer demographics'
      ]
    },
    {
      number: 3,
      title: 'Select Voice',
      description: 'Choose from 6 professional voice options that match your brand.',
      icon: Phone,
      tips: [
        'Match the voice age and gender to your target demographic',
        'You can test the voice after creating your agent'
      ]
    },
    {
      number: 4,
      title: 'Upload Menu',
      description: 'Provide your menu so the agent knows what to recommend and can answer customer questions.',
      icon: CheckCircle2,
      tips: [
        'Paste your menu text or upload a PDF/image',
        'Include prices for accurate information',
        'The agent will use this to answer menu questions'
      ]
    },
    {
      number: 5,
      title: 'Add Knowledge Base',
      description: 'Optional: Add additional information like policies, specials, or frequently asked questions.',
      icon: CheckCircle2,
      tips: [
        'Include delivery radius information',
        'Add details about specials or promotions',
        'Mention any important policies (refunds, substitutions)'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <VoiceWaveIcon size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">How to Create Your Voice Agent</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Follow this step-by-step guide to create a custom AI voice agent for your restaurant
            in just a few minutes.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {steps.map((step) => (
            <Card key={step.number} className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                      <step.icon className="w-6 h-6 text-blue-600" />
                      {step.title}
                    </CardTitle>
                    <p className="text-gray-600 text-base">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Details if available */}
                {step.details && (
                  <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="space-y-3">
                      {step.details.map((detail) => (
                        <div key={detail.name} className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{detail.name}:</span>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-600">{detail.low}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{detail.high}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2 ml-7">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="text-gray-600 text-sm">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 border-none shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to create your agent?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Your AI voice assistant will be ready in about 2 minutes
            </p>
            <Link to="/create/restaurant">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6">
                Start Creating Your Agent →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
