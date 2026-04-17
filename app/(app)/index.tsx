import { Link } from 'expo-router'
import { Button, H1, YStack } from 'tamagui'
import { removeToken, removeUser } from '../lib/storage'

export default function HomeScreen() {

    const handleLogOut = async() => {
        await removeToken()
        await removeUser()

    }
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
      <H1>Welcome</H1>
      <Link href='/(auth)/signup'>Go to Login</Link>

      <Button onPress={handleLogOut}>LogOut</Button>
    </YStack>
  )
}