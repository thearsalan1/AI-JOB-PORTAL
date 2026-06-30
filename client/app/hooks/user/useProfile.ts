import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["seeker-profile"],
    queryFn: async () => {
      const res = await api.get("/profiles/seeker");
      return res.data.profile;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.put("/profiles/seeker", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["seeker-profile"] });
    },
    onError: () => toast.error("Update failed"),
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/profiles/seeker", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile created!");
      queryClient.invalidateQueries({ queryKey: ["seeker-profile"] });
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.error || "Create failed"),
  });
};
