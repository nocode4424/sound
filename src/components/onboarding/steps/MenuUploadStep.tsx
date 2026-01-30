import { motion } from 'framer-motion'
import { OnboardingData } from '../OnboardingFlow'
import { Upload, FileText } from 'lucide-react'
import { useState } from 'react'

interface MenuUploadStepProps {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function MenuUploadStep({ data, updateData, onNext, onBack }: MenuUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (file: File) => {
    updateData({ menuFile: file })
    // TODO: Parse file and extract menu
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const isValid = data.menuText || data.menuFile

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Upload your menu
        </h2>
        <p className="text-gray-400 mb-10">
          Your AI will use this to answer questions and take orders accurately
        </p>

        {/* Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? 'border-[#FF5C00] bg-[#FF5C00]/5'
              : 'border-white/20 hover:border-white/30'
          }`}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Drop your menu file here
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Supports PDF, images, CSV, or text files
          </p>
          <label className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg cursor-pointer transition-all">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.csv,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
          </label>
        </div>

        {/* File Preview */}
        {data.menuFile && (
          <div className="mt-6 bg-[#0F172A] border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <FileText className="w-8 h-8 text-[#FF5C00]" />
            <div className="flex-1">
              <div className="text-white font-medium">{data.menuFile.name}</div>
              <div className="text-sm text-gray-400">
                {(data.menuFile.size / 1024).toFixed(1)} KB
              </div>
            </div>
            <button
              onClick={() => updateData({ menuFile: undefined })}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        )}

        {/* OR Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0A0F1C] text-gray-400">Or paste your menu</span>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={data.menuText}
          onChange={(e) => updateData({ menuText: e.target.value })}
          placeholder="Paste your menu items here...&#10;&#10;Example:&#10;Margherita Pizza - $12.99&#10;Pepperoni Pizza - $14.99&#10;Caesar Salad - $8.99"
          className="w-full h-64 px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/50 focus:border-transparent transition-all resize-none"
        />

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
