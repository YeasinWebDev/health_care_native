import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../lib/storage";
import { getDoctorDashboardData } from "../../api/doctor/doctorDashboard";


export const useDoctorDashboard = () => {
  return useQuery({
    queryKey: ["doctorDashboard"],
    queryFn: async () => {
      const token = await getToken();
      return getDoctorDashboardData(token!);
    },
    enabled: !!(getToken), 
    
  });
};