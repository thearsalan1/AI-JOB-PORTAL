import api from "@/app/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CreateJobPayload {
  title: string;
  description: string;
  salary_min: number;
  salary_max: number;
  location: string;
  remote: string;
  job_type: string;
  experience_level: string;
  skills: {
    skill_id: string;
    required_level: number;
  }[];
}

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const res = await api.post("/jobs", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job posted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to post job");
    },
  });
};
