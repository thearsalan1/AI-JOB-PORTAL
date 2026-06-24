import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const useSaveJob = (jobId: string) => {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/jobs/${jobId}/save`);
      return res.data;
    },
    onSuccess: (data) => {
      setSaved(data.saved);
      toast.success(data.saved ? "Job saved!" : "Job unsaved!");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onError: () => toast.error("Something went wrong"),
  });

  return { saved, saveMutation };
};

export default useSaveJob;