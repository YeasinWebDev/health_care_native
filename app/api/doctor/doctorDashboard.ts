import { apiFetch } from "../client";


export const getDoctorDashboardData = async (token: string) => {
  return await apiFetch("/meta", {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
};