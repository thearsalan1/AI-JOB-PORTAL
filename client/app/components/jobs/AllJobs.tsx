"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import Select from "react-select";
import { useJobs } from "@/app/hooks/jobs/useJobs";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary_high", label: "Salary: High to Low" },
  { value: "salary_low", label: "Salary: Low to High" },
];

const AllJobs = () => {
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const { data, isLoading } = useJobs();

  const jobs = data?.jobs ?? [];

  return (
    <div className="bg-white min-h-screen w-full rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <div className="ml-5 mb-4">
          <h1 className="text-[#1a3c6e] font-bold text-4xl font-heading">
            All Jobs
          </h1>
          <p className="text-sm mt-2 text-gray-700">
            Showing {data?.pagination?.total ?? 0} open roles
          </p>
        </div>
        <div className="px-4 py-2 border-gray-400 rounded">
          <Select
            instanceId="sort-select"
            options={sortOptions}
            value={sortBy}
            onChange={(selected) => setSortBy(selected as any)}
            isSearchable={false}
            classNames={{
              control: () =>
                "!rounded-xl !border-gray-200 !bg-white !text-sm !min-h-[40px] !cursor-pointer",
              option: (state) =>
                `!text-sm !cursor-pointer ${state.isSelected ? "!bg-[#1a3c6e]" : "hover:!bg-blue-50"}`,
              singleValue: () => "!text-gray-700 !text-sm",
            }}
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading jobs...</div>
      )}

      {/* Jobs list */}
      {!isLoading && jobs.length === 0 && (
        <div className="text-center text-gray-400 py-20">No jobs found</div>
      )}

      <div>
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="w-full flex rounded-2xl border border-gray-200 mb-3 p-4 hover:shadow-md transition"
          >
            {/* Logo */}
            <div className="flex justify-center items-center rounded-xl border p-2 border-gray-200 h-11 w-11 mr-4 shrink-0">
              <HiOfficeBuilding size={20} color="#1a3c6e" />
            </div>

            <div className="w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-md font-semibold font-heading">
                    {job.title}
                  </div>
                  <span className="text-sm text-gray-400 mr-2">
                    <HiOfficeBuilding className="inline mr-1" />
                    {job.employer_id?.name ?? "Company"}
                  </span>
                  <span className="text-sm text-gray-400 mr-2">
                    <MdLocationOn className="inline mr-1" />
                    {job.location}
                  </span>
                  <span className="text-sm text-gray-400 mr-2">
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

              <p className="text-sm text-gray-400 mb-3">{job.description}</p>

              <div className="flex justify-between items-center w-full">
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
                <button className="px-4 py-1 rounded-2xl bg-[#1a3c6e] text-white hover:cursor-pointer hover:bg-blue-950 transition">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
