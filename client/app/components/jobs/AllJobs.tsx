"use client";
import  { useState } from "react";
import Select from "react-select";
import { useJobs } from "@/app/hooks/jobs/useJobs";
import JobCard from "@/app/components/jobs/jobCards";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary_high", label: "Salary: High to Low" },
  { value: "salary_low", label: "Salary: Low to High" },
];

const AllJobs = ({ filters }: { filters: any }) => {
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const { data, isLoading } = useJobs({
    location: filters?.selectedLocation,
    skills: filters?.selectedSkills?.map((s: any) => s.value).join(","),
    salary_min: filters?.salary ? filters.salary * 1000 : undefined,
    remote: filters?.workMode === "Remote",
    job_type: filters?.jobType,
    experience_level: filters?.experience,
    sort: sortBy.value,
  });

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

      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading jobs...</div>
      )}

      {!isLoading && jobs.length === 0 && (
        <div className="text-center text-gray-400 py-20">No jobs found</div>
      )}

      <div>
        {jobs.map((job: any) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
