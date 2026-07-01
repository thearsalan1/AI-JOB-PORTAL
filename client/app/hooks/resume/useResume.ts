import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// GET /resume
export const useGetResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      try {
        const res = await api.get("/resume");
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 404) return [];
        throw error;
      }
    },
  });
};

// POST /resume/upload
export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formdata = new FormData();
      formdata.append("resume", file);

      const res = await api.post("/resume/upload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume uploaded");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Upload failed");
    },
  });
};

// DELETE /resume/:id
export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: string) => {
      const res = await api.delete(`/resume/${resumeId}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted");
    },
    onError: () => toast.error("Failed to delete resume"),
  });
};

// Resume AI prase hook
export const useParseResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId: string) => {
      const res = await api.post("/resume/parse", { resume_id: resumeId });
      return res.data;
    },
    onSuccess: (_data, resumeId) => {
      queryClient.invalidateQueries({ queryKey: ["resume-detail", resumeId] });
      toast.success("Resume parsed with AI");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Parsing failed");
    },
  });
};

export const useGetResumeDetails = (resumeId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["resume-detail", resumeId],
    queryFn: async () => {
      const res = await api.get(`/resume/${resumeId}`);
      return res.data;
    },
    enabled,
  });
};
