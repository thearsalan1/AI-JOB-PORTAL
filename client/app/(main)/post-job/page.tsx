"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiBriefcase } from "react-icons/fi";
import { useAuthStore } from "@/app/store/authStore";
import { useCreateJob } from "@/app/hooks/jobs/useCreateJob";
import DropDown from "@/app/components/jobs/DropDown";
import { useEffect } from "react";
import { useJobs } from "@/app/hooks/jobs/useJobs";
import { useUpdateJob } from "@/app/hooks/jobs/useManageJobs";

interface JobSkillInput {
  value: string;
  label: string;
  category: string;
  required_level: number;
}

const jobTypeOptions = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
];

const experienceOptions = [
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
];

const PostJobPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const createJob = useCreateJob();

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary_min: 0,
    salary_max: 0,
    location: "",
    remote: false,
    job_type: "full-time",
    experience_level: "mid",
  });
  const [skills, setSkills] = useState<JobSkillInput[]>([]);

  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const updateJob = useUpdateJob();

  const { data: jobData } = useJobs(
    { employer_id: user?.id, limit: 50 },
    isEditMode && !!user?.id,
  );
  useEffect(() => {
    if (isEditMode && jobData?.jobs) {
      const job = jobData.jobs.find((j: any) => j._id === editId);
      if (job) {
        setForm({
          title: job.title,
          description: job.description,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          location: job.location,
          remote: job.remote,
          job_type: job.job_type,
          experience_level: job.experience_level,
        });
        setSkills(
          job.skills.map((s: any) => ({
            value: s._id,
            label: s.name,
            category: s.category,
            required_level: 3,
          })),
        );
      }
    }
  }, [jobData, editId]);

  if (user && user.role !== "employer") {
    return (
      <div className="text-center py-20 text-gray-400">
        Only employer can post the job.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.location) return;
    if (form.salary_max < form.salary_min) {
      alert("Max salary must be more than min salary");
      return;
    }

    const payload = {
      ...form,
      skills: skills.map((s) => ({
        skill_id: s.value,
        required_level: s.required_level,
      })),
    };

    if (isEditMode && editId) {
      await updateJob.mutateAsync({ id: editId, data: payload });
    } else {
      await createJob.mutateAsync(payload);
    }

    router.push("/my-jobs");
  };

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#1a3c6e] mb-6 flex items-center gap-2">
        <FiBriefcase /> {isEditMode ? "Edit Job" : "Post a Job"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs text-gray-400 font-semibold">
              Job Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={4}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e] resize-none"
              placeholder="Role responsibilities, requirements..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                placeholder="e.g. Bangalore"
              />
            </div>

            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remote}
                  onChange={(e) =>
                    setForm({ ...form, remote: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-[#1a3c6e] focus:ring-[#1a3c6e]"
                />
                <span className="text-sm text-gray-600">Remote allowed</span>
              </label>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Min Salary ($/year)
              </label>
              <input
                type="number"
                min={0}
                value={form.salary_min}
                onChange={(e) =>
                  setForm({ ...form, salary_min: Number(e.target.value) })
                }
                required
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Max Salary ($/year)
              </label>
              <input
                type="number"
                min={0}
                value={form.salary_max}
                onChange={(e) =>
                  setForm({ ...form, salary_max: Number(e.target.value) })
                }
                required
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Job Type
              </label>
              <select
                value={form.job_type}
                onChange={(e) => setForm({ ...form, job_type: e.target.value })}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              >
                {jobTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Experience Level
              </label>
              <select
                value={form.experience_level}
                onChange={(e) =>
                  setForm({ ...form, experience_level: e.target.value })
                }
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              >
                {experienceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Required Skills
          </h2>
          <DropDown
            onSkillsChange={(newSkills) =>
              setSkills((prev) =>
                newSkills.map((s) => {
                  const existing = prev.find((p) => p.value === s.value);
                  return {
                    ...s,
                    required_level: existing?.required_level ?? 3,
                  };
                }),
              )
            }
          />

          {skills.length > 0 && (
            <div className="mt-3 space-y-2">
              {skills.map((skill, index) => (
                <div
                  key={skill.value}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border border-gray-200 rounded-xl px-3 py-2"
                >
                  <span className="flex-1 min-w-0 text-sm font-medium text-gray-700 truncate">
                    {skill.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-400 shrink-0">
                      Required Level
                    </label>
                    <select
                      value={skill.required_level}
                      onChange={(e) => {
                        const updated = [...skills];
                        updated[index].required_level = Number(e.target.value);
                        setSkills(updated);
                      }}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                    >
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={createJob.isPending || updateJob.isPending}
          className="w-full bg-[#1a3c6e] text-white py-3 rounded-xl font-semibold hover:bg-blue-950 transition disabled:opacity-50"
        >
          {createJob.isPending || updateJob.isPending
            ? "Saving..."
            : isEditMode
              ? "Update Job"
              : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJobPage;
