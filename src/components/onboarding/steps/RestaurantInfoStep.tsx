import { motion } from 'framer-motion'
import { OnboardingData } from '../OnboardingFlow'
import { Input } from '@/components/ui'

interface RestaurantInfoStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function RestaurantInfoStep({ data, updateData, onNext, onBack }: RestaurantInfoStepProps) {
  const isValid = data.restaurantName && data.cuisine && data.phone

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Tell us about your restaurant
        </h2>
        <p className="text-gray-400 mb-10">
          This information helps us create a personalized AI agent for your business
        </p>

        <div className="space-y-6">
          <Input
            label="Restaurant Name"
            type="text"
            value={data.restaurantName}
            onChange={(e) => updateData({ restaurantName: e.target.value })}
            placeholder="Fratelli's Pizza"
            required
          />

          <Input
            label="Cuisine Type"
            type="text"
            value={data.cuisine}
            onChange={(e) => updateData({ cuisine: e.target.value })}
            placeholder="Italian, Pizza"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="(555) 123-4567"
            required
          />

          <Input
            label="Address"
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="123 Main St, City, State 12345"
          />
        </div>

        {/* Hours */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-white mb-4">Business Hours</h3>
          <div className="space-y-3">
            {Object.entries(data.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-28">
                  <span className="text-sm font-medium text-gray-300 capitalize">
                    {day}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={!hours.closed}
                  onChange={(e) => {
                    updateData({
                      hours: {
                        ...data.hours,
                        [day]: { ...hours, closed: !e.target.checked },
                      },
                    })
                  }}
                  className="w-4 h-4"
                />
                {!hours.closed && (
                  <>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => {
                        updateData({
                          hours: {
                            ...data.hours,
                            [day]: { ...hours, open: e.target.value },
                          },
                        })
                      }}
                      className="px-3 py-2 bg-[#0F172A] border border-white/10 rounded-lg text-white text-sm"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => {
                        updateData({
                          hours: {
                            ...data.hours,
                            [day]: { ...hours, close: e.target.value },
                          },
                        })
                      }}
                      className="px-3 py-2 bg-[#0F172A] border border-white/10 rounded-lg text-white text-sm"
                    />
                  </>
                )}
                {hours.closed && (
                  <span className="text-sm text-gray-500">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

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
            disabled={!isValid}
            className="px-8 py-3 bg-gradient-to-r from-[#FF5C00] to-[#FF8A4C] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
