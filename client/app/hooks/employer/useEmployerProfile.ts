import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

export const useGetEmployerProfile = () => {
  return useQuery({
    queryKey: ["employer-profile"],
    queryFn: async () => {
      try {
        const res = await api.get("/profiles/employer");
        return res.data.profile;
      } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
      }
    },
  });
};

export const useCreateEmployerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/profiles/employer", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-profile"] });
      toast.success("Company profile created!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to create profile");
    },
  });
};

export const useUpdateEmployerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.put("/profiles/employer", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-profile"] });
      toast.success("Company profile updated!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to update profile");
    },
  });
};
