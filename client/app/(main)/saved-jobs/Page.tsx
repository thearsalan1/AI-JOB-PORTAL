"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import useGetSavedJobs from "@/app/hooks/jobs/useGetSavedJobs";
import useSaveJob from "@/app/hooks/jobs/useSaveJobs";

// ── Saved Job Card ──────────────────────────────────────────
const SavedJobCard = ({ savedJob }: { savedJob: any }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const job = savedJob.job_id;
  const { saveMutation } = useSaveJob(job?._id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center rounded-xl border p-2 border-gray-200 h-11 w-11 shrink-0">
            <HiOfficeBuilding size={20} color="#1a3c6e" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{job?.title}</h2>
            <span className="text-sm text-gray-400">
              <MdLocationOn className="inline mr-1" />
              {job?.location}
            </span>
          </div>
        </div>

        {/* Unsave button */}
        <button
          onClick={() =>
            saveMutation.mutate(undefined, {
              onSuccess: () =>
                queryClient.invalidateQueries({ queryKey: ["saved-jobs"] }),
            })
          }
          disabled={saveMutation.isPending}
          className="text-[#1a3c6e] hover:text-red-500 transition"
          title="Remove from saved"
        >
          <FaBookmark size={18} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.remote && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
            Remote
          </span>
        )}
        <span className="text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
          ${job?.salary_max?.toLocaleString()}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
          {job?.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {job?.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Saved {new Date(savedJob.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => router.push(`/jobs/${job?._id}`)}
          className="px-4 py-1 rounded-2xl bg-[#1a3c6e] text-white text-sm hover:bg-blue-950 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// ── Main Page ───────────────────────────────────────────────
const Page = () => {
  const { data: savedJobs, isLoading } = useGetSavedJobs();

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading text-[#1a3c6e]">
          Saved Jobs
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {savedJobs?.length ?? 0} saved jobs
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      {/* Empty state */}
      {!isLoading && savedJobs?.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <FaBookmark size={40} className="mx-auto mb-4 opacity-20" />
          <p>No saved jobs yet</p>
          <p className="text-sm mt-1">Browse jobs and save ones you like!</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedJobs?.map((savedJob: any) => (
          <SavedJobCard key={savedJob._id} savedJob={savedJob} />
        ))}
      </div>
    </div>
  );
};

export default Page;
