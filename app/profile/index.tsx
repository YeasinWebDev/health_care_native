import { useEffect, useState } from "react";
import { YStack, XStack, H4, SizableText, Input, Button, Image, ScrollView, Select, Adapt, Sheet, H5, Text, Spinner } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { removeToken } from "../lib/storage";
import { updateProfile, useMe } from "../hooks/useAuth";

const ProfilePage = () => {
  const router = useRouter();
  const { data, isLoading, isError: isMeError, refetch } = useMe();
  const { mutateAsync: updateUser, isPending: isUpdating } = updateProfile();

  useEffect(() => {
    if (data) {
      const roleData = data?.data?.roleData || {};

      const userInfo = {
        name: roleData.name,
        email: data.data.email,
        image: roleData.profilePhoto,
        contactNumber: roleData.contactNumber,
        address: roleData.address,
        gender: roleData.gender,
        experience: String(roleData.experience || 1) || "",
        appointmentFee: String(roleData.appointmentFee || 100) || "",
        designation: roleData.designation || "",
        qualification: roleData.qualification || "",
        currentWorkPlace: roleData.currentWorkPlace || "",
      };
      setForm(userInfo);
    }
  }, [data]);

  // Form state (all possible fields)
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    contactNumber: "",
    address: "",
    gender: "",
    experience: "",
    appointmentFee: "",
    designation: "",
    qualification: "",
    currentWorkPlace: "",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  // Save handler
  const handleSave = async () => {
    try {
      await updateUser(form);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    await removeToken();

    router.push("/(auth)/login");
  };

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
        <Spinner />
      </YStack>
    );
  }

  if (!data || isMeError) {
    Toast.show({
      type: "error",
      text1: "User not found",
    });
    router.push("/(auth)/login");
    return;
  }

  return (
    <YStack p="$4" gap="$4" bg="#fff" flex={1}>
      <XStack ai="center" jc="space-between">
        {/* Back Button */}
        <Button w={40} h={40} br={20} p={0} ai="center" jc="center" bg="$gray3" onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios-new" size={18} color="black" />
        </Button>

        {/* Logout Button */}
        <Button w={40} h={40} br={20} p={0} ai="center" jc="center" bg="$gray3" onPress={handleLogOut}>
          <MaterialIcons name="logout" size={24} color="red" />
        </Button>
      </XStack>

      <ScrollView>
        {/* Profile Card */}
        <YStack bg="#f5f5f5" p="$4" br="$6" ai="center" gap="$3" shadowColor="$shadowColor" shadowRadius={10}>
          {/* Avatar */}
          <XStack w={90} h={90} br={45} bg="$blue9" ai="center" jc="center" overflow="hidden">
            {form.image ? <Image src={form.image} width="100%" height="100%" /> : <H4 color="white">{form.name?.[0]?.toUpperCase() || "U"}</H4>}
          </XStack>

          {/* Change Image */}
          <Button size="$2" onPress={pickImage} theme="blue">
            Change Photo
          </Button>

          {/* Info */}
          <YStack ai="center">
            <H4>{data?.data?.roleData.name}</H4>
            <SizableText color="$gray11">{data?.data.email}</SizableText>
            <SizableText size="$2" color="$gray10">
              Role: <SizableText fontWeight="600">{data?.data.role.charAt(0) + data?.data.role.slice(1).toLowerCase()}</SizableText>
            </SizableText>
          </YStack>
        </YStack>

        {/* Edit Section */}

        <YStack bg="#f5f5f5" p="$4" br="$6" gap="$3" mt="$3" shadowColor="$shadowColor" shadowRadius={8}>
          <SizableText fontWeight="600">Edit Profile</SizableText>

          {/* Common Fields */}
          <Input value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} placeholder="Name" />

          <Input value={form.contactNumber} onChangeText={(v) => setForm({ ...form, contactNumber: v })} placeholder="Contact Number" />

          <Input value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} placeholder="Address" />

          {/* PATIENT */}
          {data?.data.role === "PATIENT" && (
            <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
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
                    <H5 fontWeight="600" px="$4" py="$2" borderBottomWidth={1} borderBlockColor="$gray10">
                      Gender
                    </H5>
                    <Select.Item index={0} value="MALE">
                      <Select.ItemText>Male</Select.ItemText>
                    </Select.Item>

                    <Select.Item index={1} value="FEMALE">
                      <Select.ItemText>Female</Select.ItemText>
                    </Select.Item>

                    <Select.Item index={2} value="OTHER">
                      <Select.ItemText>Other</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select>
          )}

          {/* DOCTOR */}
          {data?.data.role === "DOCTOR" && (
            <>
              <Input value={form.experience} onChangeText={(v) => setForm({ ...form, experience: v })} placeholder="Experience (years)" />

              <Input value={form.appointmentFee} onChangeText={(v) => setForm({ ...form, appointmentFee: v })} placeholder="Appointment Fee" />

              <Input value={form.designation} onChangeText={(v) => setForm({ ...form, designation: v })} placeholder="Designation" />

              <Input value={form.qualification} onChangeText={(v) => setForm({ ...form, qualification: v })} placeholder="Qualification" />

              <Input value={form.currentWorkPlace} onChangeText={(v) => setForm({ ...form, currentWorkPlace: v })} placeholder="Workplace" />
            </>
          )}

          {/* Save Button */}
          <Button onPress={handleSave} disabled={isUpdating} disabledStyle={{ bg: "#04498c" }} theme="blue">
            <Text color={isUpdating ? "#fff" : "#04498c"}>{isUpdating ? "Updating..." : "Save"}</Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default ProfilePage;
