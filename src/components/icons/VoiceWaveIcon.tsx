interface VoiceWaveIconProps {
  className?: string
  size?: number
  animated?: boolean
}

export function VoiceWaveIcon({ className = '', size = 24, animated = false }: VoiceWaveIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'animate-pulse' : ''}`}
    >
      {/* Speech bubble outline */}
      <path
        d="M 20 20
           L 80 20
           Q 90 20 90 30
           L 90 60
           Q 90 70 80 70
           L 50 70
           L 40 85
           L 35 70
           L 20 70
           Q 10 70 10 60
           L 10 30
           Q 10 20 20 20 Z"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Waveform inside the bubble */}
      <g transform="translate(25, 45)">
        {/* Left bar */}
        <line
          x1="0"
          y1="-8"
          x2="0"
          y2="8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Second bar (taller) */}
        <line
          x1="8"
          y1="-14"
          x2="8"
          y2="14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Center bar (tallest) */}
        <line
          x1="16"
          y1="-18"
          x2="16"
          y2="18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Fourth bar (tall) */}
        <line
          x1="24"
          y1="-16"
          x2="24"
          y2="16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Fifth bar (medium-tall) */}
        <line
          x1="32"
          y1="-14"
          x2="32"
          y2="14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Sixth bar (medium) */}
        <line
          x1="40"
          y1="-10"
          x2="40"
          y2="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Right bar (short) */}
        <line
          x1="48"
          y1="-6"
          x2="48"
          y2="6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
