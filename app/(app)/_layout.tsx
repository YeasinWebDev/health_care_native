import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { H5, YStack } from "tamagui";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
