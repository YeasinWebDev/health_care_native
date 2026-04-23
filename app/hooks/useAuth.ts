import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { loginApi, signupApi, getMeApi, profileUpdate } from "../api/auth";
import { saveToken, getToken } from "../lib/storage";

// ================= LOGIN =================
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async (data) => {
      await saveToken(data.data.token.accessToken);

      Toast.show({ type: "success", text1: "Login successful" });

      router.replace("/");
    },
  });
};

// ================= SIGNUP =================
export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupApi,

    onSuccess: async () => {
      Toast.show({ type: "success", text1: "Account created" });

      router.replace("/(auth)/login");
    },
  });
};

export const updateProfile = () => {
  return useMutation({
    mutationFn:profileUpdate,
    onSuccess: async () => {
      Toast.show({ type: "success", text1: "Profile updated" });
    },
    onError: async () => {
      Toast.show({ type: "error", text1: "Profile update failed" });
    }
  })
}


// ================= GET ME =================
export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = await getToken();
      if(!token) return
      return getMeApi(token);
    },
  });
};