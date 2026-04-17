import { config } from '@tamagui/config/v3'
import { createTamagui, createFont } from 'tamagui'

const bodyFont = createFont({
  family: 'ClashDisplay',

  face: {
    400: { normal: 'ClashDisplayRegular' },
    500: { normal: 'ClashDisplayMedium' },
    600: { normal: 'ClashDisplaySemibold' },
    700: { normal: 'ClashDisplayBold' },
  },

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