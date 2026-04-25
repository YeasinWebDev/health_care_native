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
  if (!loaded) return;
  if (isLoading) return;

  const checkAuth = async () => {
    const token = await getToken();

    const firstSegment = String(segments[0]);
    const inAuthGroup = firstSegment === "(auth)";

    if (!token) {
      router.replace("/(auth)/login");
      setLoading(false);
      return;
    }

    if (token && !data?.data) {
      await removeToken();
      router.replace("/(auth)/login");
      setLoading(false);
      return;
    }

    if (token && data?.data && inAuthGroup) {
      router.replace("/(app)");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  checkAuth();
}, [loaded, segments, isLoading, data]);

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
