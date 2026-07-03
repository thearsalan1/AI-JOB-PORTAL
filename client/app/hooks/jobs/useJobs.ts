import api from "@/app/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface JobSearch {
  page?: number;
  limit?: number;
  location?: string;
  skills?: string;
  salary_min?: number;
  employer_id?: string;
  remote?: boolean;
  job_type?: string;
  experience_level?: string;
  sort?: string;
  search?: string;
}

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

export const useJobs = (filters?: JobSearch, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["jobs", filters],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append("page", String(filters.page));
      if (filters?.limit) params.append("limit", String(filters.limit));
      if (filters?.search) params.append("search", filters.search); // ← ye add kiya
      if (filters?.location) params.append("location", filters.location);
      if (filters?.skills) params.append("skills", filters.skills);
      if (filters?.salary_min)
        params.append("salary_min", String(filters.salary_min));
      if (filters?.remote) params.append("remote", "true");
      if (filters?.employer_id)
        params.append("employer_id", filters.employer_id);
      if (filters?.job_type) params.append("job_type", filters.job_type);
      if (filters?.sort) params.append("sort", filters.sort);
      if (filters?.experience_level)
        params.append("experience_level", filters.experience_level);
      const res = await api.get(`/jobs?${params.toString()}`);
      return res.data;
    },
  });
};


