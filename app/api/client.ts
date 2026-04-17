import { getEnvs } from "../utils/getEnvs";

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${getEnvs.apiUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await res.json(); // read backend response

  if (!res.ok) {
    // throw backend error message
    throw new Error(data?.message || data?.error || "API Error");
  }

  return data;
}