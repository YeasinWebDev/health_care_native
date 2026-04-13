import { Stack } from 'expo-router'
import { View, Text } from 'react-native'

export default function AuthLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Top branding / logo */}
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Health Care App
        </Text>
      </View>

      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}