export interface AgentPreset {
  name: string
  description: string
  llmModel: string
  temperature: number
  maxTokens: number
  voiceSpeed: number
  voiceTemperature: number
  responsiveness: number
  interruptionSensitivity: number
  enableBackchannel: boolean
  backchannelFrequency: number
  endCallAfterSilenceMs: number
  maxCallDurationMs: number
  ambientSound: 'none' | 'coffee_shop' | 'office' | 'restaurant'
  ambientSoundVolume: number
}

export const AGENT_PRESETS: Record<string, AgentPreset> = {
  casual_restaurant: {
    name: 'Casual Restaurant',
    description: 'Fast-paced, friendly service for casual dining',
    llmModel: 'gpt-4o-mini',
    temperature: 0.8,
    maxTokens: 500,
    voiceSpeed: 1.1,
    voiceTemperature: 0.9,
    responsiveness: 0.8,
    interruptionSensitivity: 1.0,
    enableBackchannel: true,
    backchannelFrequency: 0.6,
    endCallAfterSilenceMs: 20000,
    maxCallDurationMs: 600000,
    ambientSound: 'restaurant',
    ambientSoundVolume: 0.3,
  },

  fine_dining: {
    name: 'Fine Dining',
    description: 'Sophisticated, polished service for upscale establishments',
    llmModel: 'gpt-4o',
    temperature: 0.6,
    maxTokens: 800,
    voiceSpeed: 0.9,
    voiceTemperature: 0.7,
    responsiveness: 0.7,
    interruptionSensitivity: 0.8,
    enableBackchannel: true,
    backchannelFrequency: 0.4,
    endCallAfterSilenceMs: 30000,
    maxCallDurationMs: 900000,
    ambientSound: 'none',
    ambientSoundVolume: 0.0,
  },

  fast_casual: {
    name: 'Fast Casual',
    description: 'Quick, efficient service with a friendly touch',
    llmModel: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 400,
    voiceSpeed: 1.2,
    voiceTemperature: 0.8,
    responsiveness: 1.0,
    interruptionSensitivity: 1.0,
    enableBackchannel: true,
    backchannelFrequency: 0.8,
    endCallAfterSilenceMs: 15000,
    maxCallDurationMs: 300000,
    ambientSound: 'coffee_shop',
    ambientSoundVolume: 0.4,
  },

  custom: {
    name: 'Custom',
    description: 'Configure all settings manually',
    llmModel: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 500,
    voiceSpeed: 1.0,
    voiceTemperature: 1.0,
    responsiveness: 1.0,
    interruptionSensitivity: 1.0,
    enableBackchannel: true,
    backchannelFrequency: 0.8,
    endCallAfterSilenceMs: 30000,
    maxCallDurationMs: 1800000,
    ambientSound: 'none',
    ambientSoundVolume: 0.3,
  },
}

export function getPresetByName(name: string): AgentPreset {
  return AGENT_PRESETS[name] || AGENT_PRESETS.custom
}
