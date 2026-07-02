"use client";
import { useAuthStore } from "@/app/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaClock, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn, MdWork, MdAttachMoney } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import api from "@/app/lib/axios";
import useApplyJob from "@/app/hooks/jobs/useApplyJobs";
import { useState } from "react";
import { useGetResumes } from "@/app/hooks/resume/useResume";
import useSaveJob from "@/app/hooks/jobs/useSaveJobs";
import { useEffect } from "react";
import { useTrackActivity } from "@/app/hooks/activity/useTrackActivity";

const JobDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: resumes = [] } = useGetResumes();
  const [selectedResumeId, setSelectedResumeId] = useState("");

  const { saved, saveMutation } = useSaveJob(id as string);
  const applyMutation = useApplyJob();
  const trackActivity = useTrackActivity();

  useEffect(() => {
  if (id) {
    trackActivity.mutate({ action: "view_job", job_id: id as string });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await api.get(`/jobs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Job not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-[#1a3c6e] text-sm font-semibold mb-6 flex items-center gap-1 hover:underline"
      >
        ← Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex justify-center items-center rounded-xl border p-3 border-gray-200 h-14 w-14 shrink-0">
                <HiOfficeBuilding size={24} color="#1a3c6e" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold font-heading text-gray-800 mb-1">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>
                    <HiOfficeBuilding className="inline mr-1" />
                    {job.employer_id?.name ?? "Company"}
                  </span>
                  <span>
                    <MdLocationOn className="inline mr-1" />
                    {job.location}
                  </span>
                  <span>
                    <FaClock className="inline mr-1" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {job.remote && (
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                  Remote
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
                <MdWork size={12} />
                {job.job_type}
              </span>
              <span className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
                <BsBriefcase size={12} />
                {job.experience_level}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                <MdAttachMoney size={12} />${job.salary_min?.toLocaleString()} -
                ${job.salary_max?.toLocaleString()}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Job Description
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>

            {job.skills?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: any) => (
                    <span
                      key={skill._id}
                      className="text-xs bg-[#1a3c6e] text-white px-3 py-1 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              ${job.salary_min?.toLocaleString()} - $
              {job.salary_max?.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-400 mb-6">Annual Salary</p>

            {user?.role === "seeker" && (
              <>
                {resumes.length > 0 && (
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full mb-3 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                  >
                    <option value="">Select resume (optional)</option>
                    {resumes.map((r: any) => (
                      <option key={r._id} value={r._id}>
                        {r.file_name}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() =>
                    applyMutation.mutate({
                      jobId: id as string,
                      resumeId: selectedResumeId || undefined,
                    })
                  }
                  disabled={applyMutation.isPending}
                  className="w-full bg-[#1a3c6e] text-white py-3 rounded-xl font-semibold mb-3 hover:bg-blue-950 transition disabled:opacity-50"
                >
                  {applyMutation.isPending ? "Applying..." : "Apply Now"}
                </button>
              </>
            )}

            <button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              className="w-full border border-[#1a3c6e] text-[#1a3c6e] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition"
            >
              {saved ? <FaBookmark /> : <FaRegBookmark />}
              {saved ? "Saved" : "Save Job"}
            </button>

            <div className="mt-6 space-y-3 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Applicants</span>
                <span className="font-semibold text-gray-700">
                  {job.applications_count ?? 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Job Type</span>
                <span className="font-semibold text-gray-700 capitalize">
                  {job.job_type}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-semibold text-gray-700 capitalize">
                  {job.experience_level}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Work Mode</span>
                <span className="font-semibold text-gray-700">
                  {job.remote ? "Remote" : "On-site"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
