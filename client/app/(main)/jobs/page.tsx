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
    <div className=" flex min-w-full min-h-screen">
      <div className="w-1/3">
        <FilterJobs onApplyFilters={handleFilters} />
      </div>
      <div className="min-w-2/3">
        <AllJobs filters={filters} />
      </div>
    </div>
  );
};

export default page;
