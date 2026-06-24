import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const useGetMatches = (minScore?: number) => {
  return useQuery({
    queryKey: ["matches", minScore],
    queryFn: async () => {
      const params = minScore ? `?min_score=${minScore}` : "";
      const res = await api.get(`/matches${params}`);
      return res.data;
    },
  });
};

export default useGetMatches;