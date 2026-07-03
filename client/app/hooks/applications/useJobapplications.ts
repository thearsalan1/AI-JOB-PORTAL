import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetJobApplications = (jobId: string, status?: string) => {
  return useQuery({
    queryKey: ["job-applications", jobId, status],
    queryFn: async () => {
      const params = status ? `?status=${status}` : "";
      const res = await api.get(`/applications/job/${jobId}${params}`);
      return res.data;
    },
    enabled: !!jobId,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.patch(`/applications/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast.success("Status updated!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to update status");
    },
  });
};
