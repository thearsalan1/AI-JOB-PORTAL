import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const useGetApplications = (status?: string) => {
  return useQuery({
    queryKey: ["applications", status],
    queryFn: async () => {
      const params = status ? `?status=${status}` : "";
      const res = await api.get(`/applications${params}`);
      return res.data;
    },
  });
};

export default useGetApplications;