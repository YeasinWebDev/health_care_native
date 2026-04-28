import { Redirect } from "expo-router";
import { getToken } from "../lib/storage";
import { Text } from "tamagui";

export default function HomeScreen() {
  if (getToken() !== null) {
    return <Redirect href="/(app)/(tabs)/dashboard" />;
  }

  return (
    <>
    <Text>Home</Text>
    </>
    // <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
    //   <H1>Welcome</H1>
    //   <Link href="/(auth)/signup">Go to Login</Link>
    //   <Link href="/(tabs)">Go to tabs</Link>

    //   <Button onPress={handleLogOut}>LogOut</Button>
    // </YStack>
  );
}
