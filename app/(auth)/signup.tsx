import { View, TextInput } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, H4, ScrollView, Select, SizableText, XStack } from "tamagui";
import { Adapt, Sheet, YStack } from "tamagui";
import { signupSchema } from "../validation/authSchema";
import Toast from "react-native-toast-message";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState<string>("");

  const [gender, setGender] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async () => {
    const result = signupSchema.safeParse({
      name,
      address,
      email,
      password,
      gender,
    });

    if (!result.success) {
      Toast.show({
        type: "error",
        text1: "Please fill all the fields",
        
      })
      return;
    }

    console.log("VALID DATA:", result.data);

    // 👉 call API here
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", padding: 20, marginBottom: 100 }}>
        <YStack gap="$1" mb="$4">
          <H4 fontWeight={"700"}>Create an account</H4>

          <SizableText>Enter your information below to create your account</SizableText>
        </YStack>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
            height: 50,
          }}
        />

        <XStack gap="$2" mb="$2">
          {/* Address */}
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={{
              flex: 1,
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
          />

          {/* Gender Select */}
          <XStack flex={1} borderWidth={1} borderRadius={8} borderColor="black">
            <Select value={gender} onValueChange={setGender}>
              <Select.Trigger
                style={{
                  borderWidth: 0,
                  paddingLeft: 9,
                  backgroundColor: "transparent",
                  outlineWidth: 0,
                  borderRadius: 8,
                  justifyContent: "space-between",
                }}
              >
                <Select.Value placeholder="Gender" />
              </Select.Trigger>

              <Adapt when="sm" platform="touch">
                <Sheet modal dismissOnSnapToBottom>
                  <Sheet.Frame>
                    <Adapt.Contents />
                  </Sheet.Frame>
                </Sheet>
              </Adapt>

              <Select.Content>
                <Select.Viewport>
                  <Select.Group>
                    <Select.Item index={0} value="male">
                      <Select.ItemText>Male</Select.ItemText>
                    </Select.Item>

                    <Select.Item index={1} value="female">
                      <Select.ItemText>Female</Select.ItemText>
                    </Select.Item>

                    <Select.Item index={2} value="other">
                      <Select.ItemText>Other</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select>
          </XStack>
        </XStack>

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

        <XStack borderWidth={1} borderRadius={8} alignItems="center" paddingHorizontal={10} mb="$4">
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{
              flex: 1,
              paddingVertical: 10,
              height: 50,
            }}
          />

          <Button size="$2" chromeless onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </XStack>

        <Button bg="#1A7FE2" col="white" onPress={handleSubmit}>
          Sign Up
        </Button>

        <SizableText mt="$2">
          Already have an account?{" "}
          <Link href="/(auth)/login" style={{ color: "#1A7FE2", fontWeight: "700" }}>
            Sign in
          </Link>
        </SizableText>
      </View>
    </ScrollView>
  );
}
