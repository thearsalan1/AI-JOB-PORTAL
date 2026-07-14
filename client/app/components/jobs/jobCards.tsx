"use client";
import { FaClock, FaRegStar, FaStar } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { useRouter } from "next/navigation";
import useSaveJob from "@/app/hooks/jobs/useSaveJobs";

const JobCard = ({ job }: { job: any }) => {
  const router = useRouter();
  const { saved, saveMutation } = useSaveJob(job._id);

  return (
    <div className="w-full flex rounded-2xl border border-gray-200 mb-3 p-4 hover:shadow-md transition">
      <div className="flex justify-center items-center rounded-xl border p-2 border-gray-200 h-11 w-11 mr-4 shrink-0">
        <HiOfficeBuilding size={20} color="#1a3c6e" />
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-400 mt-1">
            <span>
              <HiOfficeBuilding className="inline mr-1" />
              {job.company_name || "Company"}
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
          {job.remote && (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Remote
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2 break-words">
          {job.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
          <div className="flex gap-3 flex-wrap">
            <span className="text-xs py-1 px-2 rounded-2xl bg-gray-100">
              {job.job_type}
            </span>
            <span className="text-xs py-1 px-2 rounded-2xl border border-gray-300">
              {job.experience_level}
            </span>
            <span className="text-sm py-1 px-2 text-emerald-500">
              ${job.salary_min?.toLocaleString()} - $
              {job.salary_max?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between sm:justify-end items-center gap-3">
            <button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {saved ? (
                <FaStar size={18} color="#1a3c6e" />
              ) : (
                <FaRegStar
                  size={18}
                  className="text-gray-400 hover:text-[#1a3c6e] transition"
                />
              )}
            </button>
            <button
              onClick={() => router.push(`/jobs/${job._id}`)}
              className="px-4 py-2 text-sm rounded-xl bg-[#1a3c6e] text-white"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
