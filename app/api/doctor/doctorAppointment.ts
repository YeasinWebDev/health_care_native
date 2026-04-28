import { apiFetch } from "../client";

export const getAllMyAppointments = async (token: string, page: number, limit: number, status?: string, paymentStatus?: string, sortOrder?: string) => {
  return await apiFetch(`/appointment/my-appointments?page=${page}&limit=${limit}&status=${status}&paymentStatus=${paymentStatus}&sortOrder=${sortOrder}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
};
