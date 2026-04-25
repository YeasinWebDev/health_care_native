import { Redirect } from "expo-router";
import { getToken } from "../lib/storage";

export default function HomeScreen() {
  if (getToken() !== null) {
    return <Redirect href="/(app)/(tabs)/dashboard" />;
  }

  return (
    <></>
    // <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
    //   <H1>Welcome</H1>
    //   <Link href="/(auth)/signup">Go to Login</Link>
    //   <Link href="/(tabs)">Go to tabs</Link>

    //   <Button onPress={handleLogOut}>LogOut</Button>
    // </YStack>
  );
}
