import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { saveToken, saveUser } from "../lib/storage";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { loginSchema } from "../validation/authSchema";

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

    onSuccess: async (data) => {
      await saveToken(data.data.token.accessToken);
      await saveUser(data.data.user);
      Toast.show({ type: "success", text1: "Login successful" });
      router.push("/");
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async ({
      name,
      address,
      email,
      password,
      gender,
      imageUri,
    }: {
      name: string;
      address: string;
      email: string;
      password: string;
      gender: string;
      imageUri?: string;
    }) => {
      const formData = new FormData();

      // ✅ file (only if you have image)
      if (imageUri) {
        formData.append("file", {
          uri: imageUri,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      // ✅ data must be JSON string
      formData.append(
        "data",
        JSON.stringify({
          name,
          address,
          email,
          password,
          gender,
        }),
      );

      return apiFetch("/user/create-patient", {
        method: "POST",
        body: formData,
      });
    },
  });
}
