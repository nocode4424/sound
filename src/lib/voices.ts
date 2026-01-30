export const VOICE_OPTIONS = [
  {
    id: 'young-male',
    label: 'Young Male',
    retellVoiceId: '11labs-Andrew',
    description: 'Energetic and friendly',
    previewUrl: '/audio/previews/young-male.mp3',
  },
  {
    id: 'middle-age-male',
    label: 'Middle-age Male',
    retellVoiceId: '11labs-Brian',
    description: 'Warm and professional',
    previewUrl: '/audio/previews/middle-age-male.mp3',
  },
  {
    id: 'young-female',
    label: 'Young Female',
    retellVoiceId: '11labs-Grace',
    description: 'Bright and welcoming',
    previewUrl: '/audio/previews/young-female.mp3',
  },
  {
    id: 'middle-age-female',
    label: 'Middle-age Female',
    retellVoiceId: '11labs-Hailey',
    description: 'Composed and reassuring',
    previewUrl: '/audio/previews/middle-age-female.mp3',
  },
] as const

export type VoiceOption = typeof VOICE_OPTIONS[number]
