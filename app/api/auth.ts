import { apiFetch } from "./client";

// LOGIN API
export const loginApi = async (data: { email: string; password: string }) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// SIGNUP API
export const signupApi = async (data: {
  name: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  imageUri?: string;
}) => {
  const formData = new FormData();

  if (data.imageUri) {
    formData.append("file", {
      uri: data.imageUri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
  }

  formData.append(
    "data",
    JSON.stringify({
      name: data.name,
      address: data.address,
      email: data.email,
      password: data.password,
      gender: data.gender,
    })
  );

  return apiFetch("/user/create-patient", {
    method: "POST",
    body: formData,
  });
};

// GET ME
export const getMeApi = async (token: string) => {
  return apiFetch("/user/me", {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
};