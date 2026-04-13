// app/_layout.tsx
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { Stack } from 'expo-router'
import config from '../tamagui.config'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? 'light'}>
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  )
}