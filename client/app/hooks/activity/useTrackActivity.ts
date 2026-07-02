import api from "@/app/lib/axios";
import { useMutation } from "@tanstack/react-query";

type ActivityAction = "view_job" | "save_job" | "apply_job";

export const useTrackActivity = () => {
  return useMutation({
    mutationFn: async ({
      action,
      job_id,
    }: {
      action: ActivityAction;
      job_id?: string;
    }) => {
      const res = await api.post("/admin/activity", { action, job_id });
      return res.data;
    },
  });
};
