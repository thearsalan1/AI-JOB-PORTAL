import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const useGetSavedJobs = () => {
  return useQuery({
    queryKey: ["saved-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/saved");
      return res.data;
    },
  });
};

export default useGetSavedJobs;