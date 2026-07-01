"use client";

import { useGetUserSkills, useRemoveSkill } from "@/app/hooks/skill/useSkill";
import { MdDelete } from "react-icons/md";

interface UserSkill {
  _id: string;
  userId: string;
  skill_id: {
    _id: string;
    name: string;
    category: string;
  };
  level: number;
  years_experience: number;
}

interface UserSkillsProps {
  showDelete?: boolean;
}

const UserSkills = ({ showDelete = false }: UserSkillsProps) => {
  const { data = [], isLoading } = useGetUserSkills() as {
    data: UserSkill[];
    isLoading: boolean;
  };
  const removeSkill = useRemoveSkill();
  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {data.map((skill) => (
        <div
          key={skill._id}
          className="relative rounded-xl bg-[#1a3c6e] text-white px-4 py-2"
        >
          <p className="font-semibold">{skill.skill_id.name}</p>
          <p className="text-xs">
            Level: {skill.level} • {skill.years_experience} years
          </p>

          {showDelete && (
            <button
              onClick={() => removeSkill.mutate(skill._id)}
              disabled={removeSkill.isPending}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
            >
              <MdDelete size={14} className="text-red-500" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserSkills;
