import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetJobApplications = (
  jobId: string,
  status?: string,
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["job-applications", jobId, status, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      params.append("page", String(page));
      params.append("limit", "5");

      const res = await api.get(
        `/applications/job/${jobId}?${params.toString()}`,
      );
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
