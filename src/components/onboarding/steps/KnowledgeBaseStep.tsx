import { motion } from 'framer-motion'
import { OnboardingData } from '../OnboardingFlow'
import { HelpCircle, Lightbulb } from 'lucide-react'

interface KnowledgeBaseStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function KnowledgeBaseStep({ data, updateData, onNext, onBack }: KnowledgeBaseStepProps) {
  const examples = [
    {
      icon: HelpCircle,
      title: 'FAQs',
      example: 'Do you deliver? What payment methods do you accept? Do you have gluten-free options?',
    },
    {
      icon: Lightbulb,
      title: 'Special Instructions',
      example: 'We use fresh, locally-sourced ingredients. All pizzas are made to order in our wood-fired oven.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Add knowledge base (Optional)
        </h2>
        <p className="text-gray-400 mb-10">
          Help your AI answer common questions about your restaurant
        </p>

        {/* Examples */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {examples.map((example, i) => (
            <div
              key={i}
              className="bg-[#0F172A] border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <example.icon className="w-5 h-5 text-[#FF5C00]" />
                <h3 className="font-semibold text-white">{example.title}</h3>
              </div>
              <p className="text-sm text-gray-400 italic">"{example.example}"</p>
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={data.knowledgeBase}
          onChange={(e) => updateData({ knowledgeBase: e.target.value })}
          placeholder="Enter any additional information your AI should know...&#10;&#10;Examples:&#10;- We offer delivery within 5 miles&#10;- We accept cash, credit cards, and Apple Pay&#10;- All our pasta is made fresh daily&#10;- We have a full gluten-free menu available&#10;- Catering available for parties of 20+"
          className="w-full h-80 px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50 focus:border-transparent transition-all resize-none"
        />

        <p className="text-sm text-gray-500 mt-3">
          💡 Tip: The more information you provide, the better your AI can answer customer questions
        </p>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            Continue →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
