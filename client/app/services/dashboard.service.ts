import api from "../lib/axios";

export const getDashboardStats = async () => {
  const [applications, savedJobs, recommendations] = await Promise.all([
    api.get("/applications/my-applications"),
    api.get("/jobs/saved"),
    api.get("/matches/recommendations"),
  ]);

  return {
    applications: applications.data,
    savedJobs: savedJobs.data,
    recommendations: recommendations.data,
  };
};