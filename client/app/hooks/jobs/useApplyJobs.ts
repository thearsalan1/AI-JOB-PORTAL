import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

const useApplyJob = () => {
  return useMutation({
    mutationFn: async (jobId: string) => {
      const res = await api.post("/applications", { job_id: jobId });
      return res.data;
    },
    onSuccess: () => toast.success("Applied successfully!"),
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Apply failed"),
  });
};

export default useApplyJob;