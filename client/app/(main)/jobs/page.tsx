"use client";
import AllJobs from "@/app/components/jobs/AllJobs";
import FilterJobs from "@/app/components/jobs/FilterJobs";
import React, { useState } from "react";

const page = () => {
  const [filters, setFilters] = useState<any>(null);
  const handleFilters = (filters: any) => {
    setFilters(filters);
  };
  return (
    <div className="flex flex-col lg:flex-row min-w-full min-h-screen gap-4 sm:gap-6 px-3 sm:px-6 lg:px-0 py-4 sm:py-0">
      <div className="w-full lg:w-1/3 shrink-0">
        <FilterJobs onApplyFilters={handleFilters} />
      </div>
      <div className="w-full lg:min-w-2/3">
        <AllJobs filters={filters} />
      </div>
    </div>
  );
};

export default page;
