import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { H5, SizableText, XStack, YStack } from "tamagui";
import { getUser } from "../lib/storage";
import { useEffect, useState } from "react";
import { User } from "../types/userTypes";

export default function AuthLayout() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userData = async () => {
      const data = await getUser();
      setUser(data);
    };
    userData();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
      <XStack bg="#f5f5f5" p="$3" br="$6" shadowColor="$shadowColor" shadowRadius={8} mb="$3" ai="center" jc="space-between">
        <YStack>
          <SizableText size="$1" color="$gray10">
            Welcome back 👋
          </SizableText>
          <H5 fontWeight="700" fontSize="$5">
            {user?.name || "User"}
          </H5>
          <SizableText size="$1" color="$gray9" textTransform="lowercase">
            {user.role}
          </SizableText>
        </YStack>

        <Link href='/profile'>
          <XStack w={44} h={44} bg="$blue9" ai="center" jc="center" br="$12" shadowColor="$shadowColor" shadowRadius={6}>
            <SizableText color="white" fontWeight="700" textTransform="uppercase">
              {user.name?.[0]}
            </SizableText>
          </XStack>
        </Link>
      </XStack>
      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
