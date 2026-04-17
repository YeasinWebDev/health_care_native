import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H5, YStack } from "tamagui";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <YStack alignItems="center" paddingTop="$4">
        <H5 fontWeight="600">CareBridge</H5>
      </YStack>

      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
