import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useTrackActivity } from "@/app/hooks/activity/useTrackActivity";

interface ApplyPayload {
  jobId: string;
  resumeId?: string;
}

const useApplyJob = () => {
  const queryClient = useQueryClient();
  const trackActivity = useTrackActivity();

  return useMutation({
    mutationFn: async ({ jobId, resumeId }: ApplyPayload) => {
      const res = await api.post("/applications", {
        job_id: jobId,
        resume_id: resumeId,
      });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      toast.success("Applied successfully!");
      trackActivity.mutate({ action: "apply_job", job_id: variables.jobId });
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Apply failed",
      ),
  });
};

export default useApplyJob;
