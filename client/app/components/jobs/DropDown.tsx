"use client";
import Select from "react-select";
import { useSkills } from "@/app/hooks/jobs/useJobs";
import { useState } from "react";

interface DropDownPage {
  onSkillsChange?: (skills: any[]) => void;
}
const DropDown = ({ onSkillsChange }: DropDownPage) => {
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const { data: skillsData, isLoading } = useSkills();

  // react-select format mein convert karo
  const skillOptions =
    skillsData?.map((skill: any) => ({
      value: skill._id,
      label: skill.name,
    })) ?? [];

  const handleChange = (selected: any) => {
    setSelectedSkills(selected as any[]);
    onSkillsChange?.(selected as any[]); // ← parent ko bhi bata do
  };

  return (
    <div>
      <Select
        instanceId="skills-select"
        isMulti
        isSearchable
        isLoading={isLoading}
        options={skillOptions}
        value={selectedSkills}
        placeholder="Search skills..."
        onChange={handleChange}
        classNames={{
          control: () =>
            "!rounded-xl !border-gray-200 !bg-gray-50 !text-sm !min-h-[42px]",
          option: () => "!text-sm",
          multiValue: () => "!bg-[#1a3c6e] !rounded-lg",
          multiValueLabel: () => "!text-white !text-xs",
          multiValueRemove: () => "!text-white hover:!bg-red-500 !rounded-r-lg",
        }}
      />
    </div>
  );
};

export default DropDown;
