import api from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/admin/notifications");
      return res.data.notifications as Notification[];
    },
    refetchInterval: 30000,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch(`/admin/notifications/${id}/read`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
