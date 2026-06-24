"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOfficeBuilding } from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";
import useGetApplications from "@/app/hooks/applications/useGetApplications";

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-600",
  shortlisted: "bg-yellow-100 text-yellow-600",
  hired: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-500",
};

const tabs = ["All", "applied", "shortlisted", "hired", "rejected"];

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading } = useGetApplications(
    activeTab === "All" ? undefined : activeTab
  );

  const applications = data?.applications ?? [];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading text-[#1a3c6e]">
          My Applications
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {data?.pagination?.total ?? 0} total applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["applied", "shortlisted", "hired", "rejected"].map((s) => (
          <div key={s} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className={`text-xs font-semibold capitalize px-2 py-1 rounded-full inline-block mb-2 ${statusColors[s]}`}>
              {s}
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              {data?.applications?.filter((a: any) => a.status === s).length ?? 0}
            </h2>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition capitalize ${
              activeTab === tab
                ? "bg-[#1a3c6e] text-white"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      {/* Empty */}
      {!isLoading && applications.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <FiBriefcase size={40} className="mx-auto mb-4 opacity-20" />
          <p>No applications found</p>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app: any) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center rounded-xl border p-2 border-gray-200 h-11 w-11 shrink-0">
                  <HiOfficeBuilding size={20} color="#1a3c6e" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {app.job_id?.title ?? "Job Title"}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Status badge */}
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => router.push(`/jobs/${app.job_id?._id}`)}
                className="px-4 py-1 rounded-2xl bg-[#1a3c6e] text-white text-sm hover:bg-blue-950 transition"
              >
                View Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;