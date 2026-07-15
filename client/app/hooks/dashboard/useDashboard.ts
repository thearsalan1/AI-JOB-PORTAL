import { getDashboardStats } from "@/app/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
    enabled,
  });
};

export default useDashboard;
