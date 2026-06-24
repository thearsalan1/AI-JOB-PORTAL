import { getDashboardStats } from "@/app/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });
};

export default useDashboard;
