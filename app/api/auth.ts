import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./client";
import { saveToken, saveUser } from "../lib/storage";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export function useLogin() {
  const router = useRouter()
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

    onSuccess: async (data) => {
      await saveToken(data.data.token.accessToken);
      await saveUser(data.data.user);
      Toast.show({ type: "success", text1: "Login successful" });
      router.push("/")
    },
    onError: (error) => {
      // console.log("Login failed:", error.error);
      // Toast.show({ type: "error", text1: "Login failed " });
    },
  });
}
