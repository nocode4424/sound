import { useState } from 'react'
import { Modal, Input, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { Chrome, Mail } from 'lucide-react'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  const { signUpWithEmail, signInWithGoogle } = useAuth()

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true)
      setError('')
      await signInWithGoogle()
      // Don't set loading to false - user will be redirected
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google')
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await signUpWithEmail(email, password, fullName)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center mb-6">
        {/* Logo and Branding */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A4C] flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">VoxAgent</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
        <p className="text-sm text-gray-400">Start building AI voice agents today</p>
      </div>

      {!showEmailForm ? (
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full py-3.5 bg-[#0F172A] border border-white/20 hover:border-white/30 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1E293B]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1E293B] text-gray-400">Or</span>
            </div>
          </div>

          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full py-3.5 bg-[#0F172A] border border-white/20 hover:border-white/30 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 hover:bg-[#1E293B]"
          >
            <Mail className="w-5 h-5" />
            Continue with Email
          </button>

          <p className="text-center text-sm text-gray-400 pt-4">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="text-[#FF5C00] hover:text-[#FF6A10] font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 6 characters"
          />

          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
            Create Account
          </Button>

          <button
            type="button"
            onClick={() => setShowEmailForm(false)}
            className="w-full text-center text-sm text-gray-400 hover:text-white"
          >
            ← Back to options
          </button>
        </form>
      )}
    </Modal>
  )
}
