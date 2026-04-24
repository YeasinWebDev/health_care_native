import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { H5, SizableText, Spinner, XStack, YStack } from "tamagui";
import { useMe } from "../hooks/useAuth";

export default function AuthLayout() {
  const { data, isLoading } = useMe();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
      {data ? (
        <XStack bg="#f5f5f5" p="$3" br="$6" shadowColor="$shadowColor" shadowRadius={8} mb="$3" ai="center" jc="space-between">
          <YStack>
            <SizableText size="$1" color="$gray10">
              Welcome back 👋
            </SizableText>
            <H5 fontWeight="700" fontSize="$5">
              {data?.data?.roleData?.name || "User"}
            </H5>
            <SizableText size="$1" color="$gray9" textTransform="lowercase">
              {data?.data?.role}
            </SizableText>
          </YStack>

          <Link href="/profile">
            <XStack w={44} h={44} bg="$blue9" ai="center" jc="center" br="$12" shadowColor="$shadowColor" shadowRadius={6}>
              <SizableText color="white" fontWeight="700" textTransform="uppercase">
                {data?.data?.roleData?.name[0]}
              </SizableText>
            </XStack>
          </Link>
        </XStack>
      ) : (
        <XStack bg="#f5f5f5" p="$3" br="$6" h="$7" shadowColor="$shadowColor" shadowRadius={8} mb="$3" ai="center" jc="space-between">
          <SizableText size="$1" color="$gray10">
            No user Found
          </SizableText>
        </XStack>
      )}
      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
