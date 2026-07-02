import api from "../lib/axios";

export const getDashboardStats = async () => {
  const [stats, recommendations, recentActivity, savedJobs] = await Promise.all(
    [
      api.get("/admin/seeker"),
      api.get("/matches/recommendations"),
      api.get("/admin/activity/recent"),
      api.get("/jobs/saved"),
    ],
  );

  return {
    stats: stats.data,
    recommendations: recommendations.data,
    recentActivity: recentActivity.data,
    savedJobs: savedJobs.data,
  };
};
