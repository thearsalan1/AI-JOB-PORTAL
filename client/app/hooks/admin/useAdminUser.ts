import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";

export const useGetAllUsers = (role?: string, search?: string,page:number=1) => {
  return useQuery({
    queryKey: ["admin-users", role, search,page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (role) params.append("role", role);
      if (search) params.append("search", search);
      params.append("page",String(page));
      params.append("limit","5")
      const res = await api.get(`/admin/users?${params.toString()}`);
      return res.data;
    },
  });
};

export const useToggleUserBan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch(`/admin/users/${id}/ban`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Action failed");
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const res = await api.patch(`/admin/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Role updated!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to update role");
    },
  });
};