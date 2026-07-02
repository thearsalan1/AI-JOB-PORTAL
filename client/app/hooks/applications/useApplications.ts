import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

export const useGetApplications = (status?: string) => {
  return useQuery({
    queryKey: ["applications", status],
    queryFn: async () => {
      const params = status ? `?status=${status}` : "";
      const res = await api.get(`/applications${params}`);
      return res.data;
    },
  });
};

export const useRemoveApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: string) => {
      const res = await api.delete(`/applications/${jobId}`);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      return res.data;
    },
    onSuccess: () => toast.success("Application dropped successfully"),
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Can't drop application"),
  });
};
