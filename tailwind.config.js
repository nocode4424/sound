/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			DEFAULT: '12px',
  			none: '0',
  			sm: '8px',
  			md: '12px',
  			lg: '16px',
  			xl: '20px',
  			'2xl': '24px',
  			'3xl': '32px',
  			full: '9999px'
  		},
  		colors: {
  			// Brand colors matching Figma
  			'brand-indigo': '#6366F1',
  			'brand-purple': '#8B5CF6',
  			'brand-violet': '#A855F7',

  			// Orange accent (secondary)
  			'orange-primary': '#FF5C00',
  			'orange-light': '#FF8A4C',

  			// Background colors
  			'bg-page': '#0A0F1C',
  			'bg-surface': '#0F172A',
  			'bg-elevated': '#1E293B',
  			'bg-interactive': '#334155',

  			// Border colors
  			'border-default': '#334155',
  			'border-subtle': '#1E293B',

  			// Text colors
  			'text-primary': '#F8FAFC',
  			'text-secondary': '#CBD5E1',
  			'text-tertiary': '#94A3B8',
  			'text-disabled': '#64748B',
  			'text-placeholder': '#475569',

  			// Legacy support
  			'deep-blue': '#0A1628',
  			navy: '#1E293B',
  			slate: '#334155',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-dark': '#2563EB',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'electric-blue': '#6366F1',
  			'bright-blue': '#8B5CF6',
  			purple: '#8B5CF6',
  			'gray-50': '#F8FAFC',
  			'gray-100': '#F1F5F9',
  			'gray-200': '#E2E8F0',
  			'gray-300': '#CBD5E1',
  			'gray-400': '#94A3B8',
  			'gray-500': '#64748B',
  			'gray-600': '#475569',
  			'gray-700': '#334155',
  			'gray-800': '#1E293B',
  			'gray-900': '#0F172A',
  			success: '#22C55E',
  			warning: '#F59E0B',
  			error: '#EF4444',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		animation: {
  			shine: 'shine 1.5s ease-in-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'spin-slow': 'spin 20s linear infinite',
  			float: 'float 3s ease-in-out infinite'
  		},
  		keyframes: {
  			shine: {
  				'0%': {
  					backgroundPosition: '200% 0'
  				},
  				'100%': {
  					backgroundPosition: '-100% 0'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		backgroundSize: {
  			'250': '250% 250%'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
