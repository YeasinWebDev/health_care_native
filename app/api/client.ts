import { getEnvs } from "../utils/getEnvs";

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${getEnvs.apiUrl}${endpoint}`, {
    method: options?.method,
    body: options?.body,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "API Error");
  }

  return data;
}