import { View, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, H4, SizableText, Text, YStack } from "tamagui";
import Toast from "react-native-toast-message";

import { loginSchema } from "../validation/authSchema";
import { useLogin } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutateAsync, isPending } = useLogin();

  const handleSubmit = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      Toast.show({
        type: "error",
        text1: "Invalid input",
      });
      return;
    }

    try {
      await mutateAsync({ email, password });

      Toast.show({
        type: "success",
        text1: "Login successful",
      });

      router.push("/");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err?.message || "Login failed",
      });
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 ,marginBottom: 130 }}>
      <YStack gap="$1" mb="$4">
        <H4 fontWeight={"700"}>Welcome Back</H4>

        <SizableText>Enter your credentials to access your account</SizableText>
      </YStack>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
          height: 50,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
          height: 50,
        }}
      />

      <Button bg="#1A7FE2" onPress={handleSubmit} disabled={isPending} disabledStyle={{ bg: "#04498c" }}>
        <Text color="white">{isPending ? "Logging in..." : "Login"}</Text>
      </Button>

      <SizableText mt="$2">
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "#1A7FE2", fontWeight: "700" }}>
          Sign Up
        </Link>
      </SizableText>
    </View>
  );
}
