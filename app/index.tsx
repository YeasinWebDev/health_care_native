import { YStack, Text, Button, H1 } from 'tamagui'
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
      <H1>Welcome</H1>
      <Text>Expo Router + Tamagui is working!</Text>
      <Link href="/login" asChild>
        <Button>Go to About</Button>
      </Link>
    </YStack>
  )
}