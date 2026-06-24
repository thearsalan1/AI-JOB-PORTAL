import api from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await api.get("/skills?limit=100");
      return res.data.skills;
    },
  });
};

export const useSearchSkills = (query: string) => {
  return useQuery({
    queryKey: ["skills-search", query],
    queryFn: async () => {
      const res = await api.get(`/skills/search?q=${query}`);
      return res.data.skills;
    },
    enabled: query.length > 1,
  });
};

export const useJobs = (filters?: {
  location?: string;
  skills?: string;
  salary_min?: number;
  remote?: boolean;
  job_type?: string;
  experience_level?: string;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.location) params.append("location", filters.location);
      if (filters?.skills) params.append("skills", filters.skills);
      if (filters?.salary_min)
        params.append("salary_min", String(filters.salary_min));
      if (filters?.remote) params.append("remote", "true");
      if (filters?.job_type) params.append("job_type", filters.job_type);
      if (filters?.sort) params.append("sort", filters.sort);
      if (filters?.experience_level)
        params.append("experience_level", filters.experience_level);
      const res = await api.get(`/jobs?${params.toString()}`);
      return res.data;
    },
  });
};
