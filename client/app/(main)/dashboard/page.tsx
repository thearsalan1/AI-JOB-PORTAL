"use client";
import Link from "next/link";
import React from "react";
import { BsBuildingsFill, BsStars } from "react-icons/bs";
import { FaArrowRight, FaBookmark } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { useAuthStore } from "@/app/store/authStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/lib/axios";

const Page = () => {
  const { user } = useAuthStore();

  // Applications count
  const { data: applicationsData } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await api.get("/applications");
      return res.data;
    },
    enabled: user?.role === "seeker",
  });

  // Saved jobs count
  const { data: savedJobsData } = useQuery({
    queryKey: ["saved-jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs/saved");
      return res.data;
    },
  });

  // Recommendations
  const { data: recommendationsData, isLoading: recLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await api.get("/matches/recommendations");
      return res.data;
    },
    enabled: user?.role === "seeker",
  });

  const recommendations = recommendationsData?.recommendations ?? [];

  const stats = [
    {
      title: "Applications Sent",
      value: applicationsData?.applications?.length ?? 0,
      icon: <FiBriefcase />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Saved Jobs",
      value: savedJobsData?.savedJobs?.length ?? 0,
      icon: <FaBookmark />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Recommendations",
      value: recommendations.length,
      icon: <BsStars />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Good Morning, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          You have{" "}
          <span className="text-[#1a3c6e] font-semibold">
            {recommendations.length} new job matches
          </span>{" "}
          based on your profile today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <div className={`p-3 rounded-xl text-2xl ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
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

          {recLoading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
              No recommendations yet — complete your profile first!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {recommendations.map((job: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
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
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-[#1a3c6e] font-medium hover:underline flex items-center gap-1">
                      View Details <FaArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Recently Viewed */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl p-4">
            <h1 className="text-xl sm:text-2xl font-semibold mb-5">
              Recently Viewed
            </h1>
            <p className="text-gray-400 text-sm text-center py-4">
              No recent activity yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;