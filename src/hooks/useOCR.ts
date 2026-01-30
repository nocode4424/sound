import { useState } from 'react'
import { createWorker, Worker } from 'tesseract.js'

export function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const extractTextFromImage = async (file: File): Promise<string> => {
    setIsProcessing(true)
    setError(null)
    setProgress(0)

    let worker: Worker | null = null

    try {
      // Create Tesseract worker
      worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })

      // Convert file to image URL
      const imageUrl = URL.createObjectURL(file)

      // Perform OCR
      const { data } = await worker.recognize(imageUrl)

      // Clean up
      URL.revokeObjectURL(imageUrl)

      return data.text
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to extract text from image'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      if (worker) {
        await worker.terminate()
      }
      setIsProcessing(false)
      setProgress(0)
    }
  }

  return {
    extractTextFromImage,
    isProcessing,
    progress,
    error,
  }
}
