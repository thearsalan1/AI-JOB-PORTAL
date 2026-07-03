"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useJobs } from "@/app/hooks/jobs/useJobs";
import { useCloseJob, useDeleteJob } from "@/app/hooks/jobs/useManageJobs";
import { FiBriefcase, FiEdit2 } from "react-icons/fi";
import { MdDelete, MdLockOutline } from "react-icons/md";

const MyJobsPage = () => {
  const { user } = useAuthStore();
  const { data, isLoading } = useJobs(
    { employer_id: user?.id, limit: 50 },
    !!user?.id,
  );
  const closeJob = useCloseJob();
  const deleteJob = useDeleteJob();

  const jobs = data?.jobs ?? [];
  console.log("Current user: ", user);

  if (user && user.role !== "employer") {
    return (
      <div className="text-center py-20 text-gray-400">
        Sirf employers apni jobs manage kar sakte hain.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-heading text-[#1a3c6e] flex items-center gap-2">
          <FiBriefcase /> My Posted Jobs
        </h1>
        <Link
          href="/post-job"
          className="px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition"
        >
          + Post New Job
        </Link>
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      {!isLoading && jobs.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
          Koi job post nahi ki abhi tak
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-start"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-800">{job.title}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    job.status === "open"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {job.location} • {job.job_type} • {job.experience_level}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {job.applications_count ?? 0} applications • {job.views ?? 0}{" "}
                views
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/post-job?id=${job._id}`}
                className="text-gray-400 hover:text-[#1a3c6e]"
                title="Edit"
              >
                <FiEdit2 size={16} />
              </Link>

              {job.status === "open" && (
                <button
                  onClick={() => closeJob.mutate(job._id)}
                  disabled={closeJob.isPending}
                  className="text-gray-400 hover:text-yellow-600"
                  title="Close"
                >
                  <MdLockOutline size={18} />
                </button>
              )}

              <button
                onClick={() => {
                  if (confirm("Pakka is job ko delete karna hai?")) {
                    deleteJob.mutate(job._id);
                  }
                }}
                disabled={deleteJob.isPending}
                className="text-gray-400 hover:text-red-600"
                title="Delete"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobsPage;
