import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  leftLabel?: string
  rightLabel?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = 50,
      onChange,
      showValue = true,
      leftLabel,
      rightLabel,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : internalValue
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(Number(newValue))
      onChange?.(e)
    }

    const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100

    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
              {label}
            </label>
            {showValue && (
              <span className="text-sm font-semibold text-electric-blue">{value}</span>
            )}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={cn('slider', className)}
            style={
              {
                '--slider-percentage': `${percentage}%`,
              } as React.CSSProperties
            }
            {...props}
          />

          {(leftLabel || rightLabel) && (
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>{leftLabel}</span>
              <span>{rightLabel}</span>
            </div>
          )}
        </div>

        <style>{`
          .slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 9999px;
            background: linear-gradient(
              to right,
              rgb(59 130 246 / 0.5) 0%,
              rgb(59 130 246 / 0.5) var(--slider-percentage),
              rgb(255 255 255 / 0.1) var(--slider-percentage),
              rgb(255 255 255 / 0.1) 100%
            );
            outline: none;
            cursor: pointer;
          }

          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #60a5fa);
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
            transition: all 0.2s;
          }

          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
          }

          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #60a5fa);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
            transition: all 0.2s;
          }

          .slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
          }
        `}</style>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
