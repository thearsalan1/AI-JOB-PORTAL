import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

interface ApplyPayload {
  jobId: string;
  resumeId?: string;
}

const useApplyJob = () => {
  return useMutation({
    mutationFn: async ({ jobId, resumeId }: ApplyPayload) => {
      const res = await api.post("/applications", {
        job_id: jobId,
        resume_id: resumeId,
      });
      return res.data;
    },
    onSuccess: () => toast.success("Applied successfully!"),
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Apply failed"),
  });
};

export default useApplyJob;
