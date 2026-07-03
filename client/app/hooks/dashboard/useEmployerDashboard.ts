import api from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useEmployerDashboard = () => {
  return useQuery({
    queryKey: ["employer-dashboard"],
    queryFn: async () => {
      const res = await api.get("/admin/employer");
      return res.data;
    },
  });
};
