import { getToken } from "../lib/storage";
import { apiFetch } from "./client";

// LOGIN API
export const loginApi = async (data: { email: string; password: string }) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// SIGNUP API
export const signupApi = async (data: { name: string; address: string; email: string; password: string; gender: string; imageUri?: string }) => {
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
    }),
  );

  return apiFetch("/user/create-patient", {
    method: "POST",
    body: formData,
  });
};

export const profileUpdate = async (data: {
  name?: string;
  role?: string;
  email?: string;
  image?: string;
  contactNumber?: string;
  address?: string;
  gender?: string;
  experience?: string;
  appointmentFee?: string;
  designation?: string;
  qualification?: string;
  currentWorkPlace?: string;
}) => {
  const formData = new FormData();
  const token = await getToken();

  // ✅ file upload
  if (data.image && data.image.startsWith("file://")) {
    formData.append("file", {
      uri: data.image,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
  }

  // ✅ clean payload
  const payload: any = {};

  if (data.name) payload.name = data.name;
  if (data.role) payload.role = data.role;
  if (data.email) payload.email = data.email;
  if (data.contactNumber) payload.contactNumber = data.contactNumber;
  if (data.address) payload.address = data.address;
  if (data.gender) payload.gender = data.gender;
  if (data.designation) payload.designation = data.designation;
  if (data.qualification) payload.qualification = data.qualification;
  if (data.currentWorkPlace) payload.currentWorkPlace = data.currentWorkPlace;

  if (data.experience !== undefined && data.experience !== "") {
    payload.experience = Number(data.experience);
  }

  if (data.appointmentFee !== undefined && data.appointmentFee !== "") {
    payload.appointmentFee = Number(data.appointmentFee);
  }

  // ✅ send JSON inside form-data
  formData.append("data", JSON.stringify(payload));

  return apiFetch("/user/update-my-profile", {
    method: "PATCH",
    headers: {
      authorization: `${token}`, 
    },
    body: formData,
  });
};

// GET ME
export const getMeApi = async (token: string) => {
  return await apiFetch("/user/me", {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
};
