import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, disabled, isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-electric-blue/50 disabled:opacity-50 disabled:cursor-not-allowed',
          'transform',
          {
            'bg-gradient-to-r from-brand-indigo to-brand-purple text-white shadow-lg hover:shadow-xl hover:shadow-brand-indigo/30 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0':
              variant === 'primary',
            'bg-transparent text-text-primary border border-border-default hover:bg-white/5 hover:border-brand-indigo/50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0':
              variant === 'secondary',
            'text-text-secondary hover:text-brand-indigo hover:bg-white/5 hover:-translate-y-0.5 active:translate-y-0': variant === 'ghost',
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          // Shiny button effect for primary
          variant === 'primary' && 'overflow-hidden',
          variant === 'primary' && 'before:absolute before:inset-0 before:rounded-lg',
          variant === 'primary' && 'before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.3)_50%,transparent_75%,transparent_100%)]',
          variant === 'primary' && 'before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0]',
          variant === 'primary' && 'before:bg-no-repeat before:[transition:background-position_0s_ease]',
          variant === 'primary' && 'hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]',
          // Glow effect on secondary
          variant === 'secondary' && 'hover:shadow-white/20',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
