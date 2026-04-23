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
import { getToken, removeToken } from "./lib/storage";
import Toast from "react-native-toast-message";
import { useMe } from "./hooks/useAuth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutInner />
    </QueryClientProvider>
  );
}

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  const { data, isLoading } = useMe();

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
      const token = await getToken();
      const inAuthGroup = segments[0] === "(auth)";

      if (!token && !inAuthGroup) {
        router.replace("/(auth)/login");
      }

      if (token && inAuthGroup) {
        
        if (data?.data) {
          router.replace("/(app)");
        }else{
          router.replace("/(auth)/login");
          await removeToken();
        }
      }

      setLoading(false);
    };

    if (!isLoading) {
      checkAuth();
    }
  }, [segments, isLoading, data]);

  if (!loaded) return null;
  if (loading) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? "light"}>
      <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}