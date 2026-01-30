import { Slider } from './slider'

interface SimpleSliderProps {
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min: number
  max: number
  step: number
  className?: string
  showValue?: boolean // Accept but ignore this prop for backward compatibility
}

export function SimpleSlider({ value, onChange, min, max, step, className }: SimpleSliderProps) {
  return (
    <Slider
      value={[value]}
      onValueChange={(values) => {
        // Create a fake event object for backward compatibility
        const fakeEvent = {
          target: { value: values[0].toString() }
        } as React.ChangeEvent<HTMLInputElement>
        onChange(fakeEvent)
      }}
      min={min}
      max={max}
      step={step}
      className={className}
    />
  )
}
