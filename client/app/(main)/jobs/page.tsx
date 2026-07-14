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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-80">
        <FilterJobs onApplyFilters={handleFilters} />
      </div>

      <div className="flex-1 min-w-0">
        <AllJobs filters={filters} />
      </div>
    </div>
  );
};

export default page;
