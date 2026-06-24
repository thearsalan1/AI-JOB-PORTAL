"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import DropDown from "@/app/components/jobs/DropDown";

const workModes = ["In-office", "Remote"];
const jobType = ["Part-time", "Full-time", "Contract"];
const ExperienceLevel = ["senior", "mid", "junior"];

const FilterJobs = () => {
  const [selectedWorkMode, setSelectedWorkMode] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [salary, setSalary] = useState(50);
  return (
    <div className="p-2  h-full ">
      <div className="flex justify-between items-center border-b-2 border-gray-300  px-6 py-6 mb-5">
        <div className="flex gap-2 items-center">
          <FaFilter color="#1a3c6e" />
          <h1 className="font-semibold font-heading text-xl">Filters</h1>
        </div>
        <span
          className="text-sm text-[#1a3c6e] font-semibold cursor-pointer"
          onClick={() => {
            setSelectedWorkMode(null);
            setSelectedJobType(null);
            setSelectedExperience(null);
            setSalary(50);
            setSelectedSkills([]);
          }}
        >
          Clear all
        </span>
      </div>
      {/* Skills dropdown */}
      <div className="mb-3">
        <div>
          <h3 className="font-semibold text-[#1a3c6e] mb-3 text-md">Skills</h3>
          <DropDown onSkillsChange={(skills) => setSelectedSkills(skills)} />
        </div>
      </div>
      {/* work mode */}
      <div className="mb-3">
        <h3 className="font-semibold text-[#1a3c6e] mb-3 text-md">Work Mode</h3>
        <div className="space-y-2 text-sm">
          {workModes.map((mode) => (
            <label
              key={mode}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedWorkMode === mode}
                onChange={() => {
                  setSelectedWorkMode(selectedWorkMode === mode ? null : mode);
                }}
                className="h-4 w-4 rounded border-gray-300 text-[#1a3c6e] focus:ring-[#1a3c6e]"
              />
              <span className="text-gray-600">{mode}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Job type */}
      <div className="mb-3">
        <h3 className="font-semibold text-[#1a3c6e] mb-3 text-md">Job Type</h3>
        <div className="space-y-2 text-sm">
          {jobType.map((type) => (
            <label
              key={type}
              className="flex  items-center gap-2 cursor-pointer "
            >
              <input
                type="checkbox"
                checked={selectedJobType === type}
                onChange={() =>
                  setSelectedJobType(selectedJobType === type ? null : type)
                }
                className="h-4 w-4 rounded border-gray-300 text-[#1a3c6e] focus:ring-[#1a3c6e]"
              />
              <span className="text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Experience */}
      <div>
        <h3 className="text-[#1a3c6e] font-semibold text-md mb-3">
          Experience Level
        </h3>
        <div className="text-sm flex gap-7 items-center">
          {ExperienceLevel.map((exp) => (
            <label
              key={exp}
              className="flex  items-center gap-2 cursor-pointer "
            >
              <input
                type="checkbox"
                checked={selectedExperience === exp}
                onChange={() =>
                  setSelectedExperience(selectedExperience === exp ? null : exp)
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="capitalize text-gray-600">{exp}</span>
            </label>
          ))}
        </div>
      </div>
      {/* range */}
      <div className="p-4">
        <h3 className="font-semibold text-[#1a3c6e] mb-3 text-md">
          Salary Range
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <span className="text-gray-600 font-medium">{salary}k</span>
        </div>
      </div>
      <button className="w-full bg-[#1a3c6e] rounded-2xl py-2 text-white font font-semibold font-sans mt-5 hover:cursor-pointer hover:bg-blue-950 tracking-wide">
        Apply
      </button>
    </div>
  );
};

export default FilterJobs;
