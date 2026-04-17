import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import { Stack, useRouter, useSegments } from "expo-router";
import config from "../tamagui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { getToken } from "./lib/storage";
import Toast from "react-native-toast-message"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const segments = useSegments()
  const [loading, setLoading] = useState(true)

  const [loaded] = useFonts({
    ClashDisplayBold: require("../assets/fonts/ClashDisplay-Bold.otf"),
    ClashDisplaySemibold: require("../assets/fonts/ClashDisplay-Semibold.otf"),
    ClashDisplayMedium: require("../assets/fonts/ClashDisplay-Medium.otf"),
    ClashDisplayRegular: require("../assets/fonts/ClashDisplay-Regular.otf"),
    ClashDisplayLight: require("../assets/fonts/ClashDisplay-Light.otf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

    useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken()

      const inAuthGroup = segments[0] === "(auth)"

      if (!token && !inAuthGroup) {
        router.replace("/(auth)/login")
      }

      if (token && inAuthGroup) {
        router.replace("/(app)")
      }

      setLoading(false)
    }

    checkAuth()
  }, [segments])

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? "light"}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </QueryClientProvider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
