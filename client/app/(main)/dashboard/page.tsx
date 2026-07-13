"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRight, FaBookmark, FaCheckCircle } from "react-icons/fa";
import { FiBriefcase, FiTarget } from "react-icons/fi";
import { useAuthStore } from "@/app/store/authStore";
import useDashboard from "@/app/hooks/dashboard/useDashboard";
import EmployerDashboard from "@/app/components/dashboard/EmployerDashboard";
import AdminDashboard from "@/app/components/dashboard/AdminDashboard";

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data, isLoading } = useDashboard();

  const stats = data?.stats;
  const recommendations = data?.recommendations?.recommendations ?? [];
  const recentActivity = data?.recentActivity?.recent ?? [];
  const savedJobsCount = data?.savedJobs?.savedJobs?.length ?? 0;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const statCards = [
    {
      title: "Applications Sent",
      value: stats?.total_applications ?? 0,
      icon: <FiBriefcase />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Shortlisted",
      value: stats?.shortlisted ?? 0,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Strong Matches (80%+)",
      value: stats?.total_matches ?? 0,
      icon: <FiTarget />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Saved Jobs",
      value: savedJobsCount,
      icon: <FaBookmark />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  if (user?.role === "employer") {
    return <EmployerDashboard />;
  }
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          {greeting}, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Your average match score is{" "}
          <span className="text-[#1a3c6e] font-semibold">
            {stats?.avg_match_score ?? 0}%
          </span>{" "}
          , and{" "}
          <span className="text-[#1a3c6e] font-semibold">
            {recommendations.length} new job matches
          </span>{" "}
          according to your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {statCards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <div className={`p-3 rounded-xl text-2xl ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "—" : item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {stats?.top_skills?.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-3">Your top skills</p>
          <div className="flex flex-wrap gap-2">
            {stats.top_skills.map((s: any, i: number) => (
              <span
                key={i}
                className="text-xs bg-[#1a3c6e]/10 text-[#1a3c6e] px-3 py-1 rounded-full font-medium"
              >
                {s.skill_name} • Lvl {s.level}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <BsStars className="text-[#00a897]" />
              Recommended For You
            </h1>
            <Link
              href="/recommendations"
              className="text-[#1a3c6e] font-medium hover:underline flex items-center gap-1"
            >
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
              No recommendations yet — complete your profile first!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recommendations.map((job: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {job.job_id?.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {job.job_id?.location}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                      {job.match_score}% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      ${job.job_id?.salary_min?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 gap-2">
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => router.push(`/jobs/${job.job_id?._id}`)}
                      className="text-[#1a3c6e] font-medium hover:underline flex items-center gap-1"
                    >
                      View Details <FaArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:block">
          <div className="bg-white rounded-2xl p-4">
            <h1 className="text-xl sm:text-2xl font-semibold mb-5">
              Recently Viewed
            </h1>

            {isLoading && (
              <p className="text-gray-400 text-sm text-center py-4">
                Loading...
              </p>
            )}

            {!isLoading && recentActivity.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">
                No recent activity yet
              </p>
            )}

            <div className="space-y-3">
              {recentActivity.map((item: any, i: number) => (
                <button
                  key={i}
                  onClick={() => router.push(`/jobs/${item.job?._id}`)}
                  className="w-full text-left border border-gray-100 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {item.job?.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.job?.location} •{" "}
                    {new Date(item.viewed_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
