import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

export const useGetMatches = (minScore?: number) => {
  return useQuery({
    queryKey: ["matches", minScore],
    queryFn: async () => {
      const params = minScore ? `?min_score=${minScore}` : "";
      const res = await api.get(`/matches${params}`);
      return res.data;
    },
  });
};

export const useGetMatchDetail = (matchId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["match-detail", matchId],
    queryFn: async () => {
      const res = await api.get(`/matches/${matchId}`);
      return res.data;
    },
    enabled,
  });
};

export const useRecalculateMatches = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/matches/recalc");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      toast.success("Recommendations refreshed!");
    },
    onError: () => toast.error("Refresh failed"),
  });
};
