import { config } from '@tamagui/config/v3'
import { createTamagui, createFont } from 'tamagui'

// 🔤 Custom font
const bodyFont = createFont({
  family: 'System',

  // 👉 FONT SIZES
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
  },

  // 👉 FONT WEIGHTS
  weight: {
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
  },

  // 👉 LINE HEIGHT (optional but recommended)
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 32,
    8: 36,
  },

  // 👉 LETTER SPACING (optional)
  letterSpacing: {
    1: 0,
    2: 0.5,
    3: 0.25,
  },
})

// 🔧 Merge with default config
const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    ...config.fonts,
    body: bodyFont,
    heading: bodyFont,
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}