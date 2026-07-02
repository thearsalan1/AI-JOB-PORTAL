import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const useGetSavedJobs = (p0: { page: number; limit: number; search: string; status: string; }) => {
  return useQuery({
    queryKey: ["saved-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/saved");
      return res.data;
    },
  });
};

export default useGetSavedJobs;