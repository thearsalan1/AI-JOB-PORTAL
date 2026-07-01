import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddUserSkillPayload {
  skill_id: string;
  level: number;
  years_experience: number;
}
export const useGetSkills = () => {
  return useQuery({
    queryKey: ["All-skills"],
    queryFn: async () => {
      const res = await api.get("/skills");
      return res.data;
    },
  });
};

export const useGetUserSkills = () => {
  return useQuery({
    queryKey: ["seeker-skills"],
    queryFn: async () => {
      const res = await api.get("/skills/user");
      return res.data.userSkills;
    },
  });
};

export const useRemoveSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillId: string) => {
      const res = await api.delete(`/skills/user/${skillId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seeker-skills"] });
      toast.success("Skill removed");
    },
    onError: () => toast.error("Failed to remove skill"),
  });
};

export const useAddSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddUserSkillPayload) => {
      const res = await api.post("/skills/user", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seeker-skills"] });
    },
    onError: (error: any) => {
      if (error?.response?.status !== 409) {
        toast.error("Skill add failed");
      }
    },
  });
};
