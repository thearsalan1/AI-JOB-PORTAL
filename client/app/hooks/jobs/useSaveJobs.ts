import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTrackActivity } from "@/app/hooks/activity/useTrackActivity";

const useSaveJob = (jobId: string) => {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);
  const trackActivity = useTrackActivity();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/jobs/${jobId}/save`);
      return res.data;
    },
    onSuccess: (data) => {
      setSaved(data.saved);
      toast.success(data.saved ? "Job saved!" : "Job unsaved!");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });

      // Sirf "save" pe track karo, "unsave" pe nahi
      if (data.saved) {
        trackActivity.mutate({ action: "save_job", job_id: jobId });
      }
    },
    onError: () => toast.error("Something went wrong"),
  });

  return { saved, saveMutation };
};

export default useSaveJob;