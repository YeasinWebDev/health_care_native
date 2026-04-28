import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../lib/storage";
import { getAllMyAppointments } from "../../api/doctor/doctorAppointment";


type AppointmentStatus = "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCEL" | "";

type PaymentStatus = "PAID" | "UNPAID" | "";

type SortOrder = "asc" | "desc";

export const useGetDoctorAppointments = ({
  page = 1,
  limit = 10,
  status = "",
  paymentStatus = "",
  sortOrder = "desc",
}: {
  page?: number;
  limit?: number;
  status?: AppointmentStatus;
  paymentStatus?: PaymentStatus;
  sortOrder?: SortOrder;
}) => {
  return useQuery({
    queryKey: ["doctorAppointments", page, limit, status, paymentStatus, sortOrder],
    refetchInterval: 1000 * 60 * 2, // 2 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,

    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("No token found");
      }

      return getAllMyAppointments(token, page, limit, status, paymentStatus, sortOrder);
    },
    enabled: true,
  });
};
