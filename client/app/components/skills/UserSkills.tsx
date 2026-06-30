"use client";

import { useGetUserSkills } from "@/app/hooks/skill/useSkill";

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

const UserSkills = () => {
  const { data = [], isLoading } = useGetUserSkills() as {
    data: UserSkill[];
    isLoading: boolean;
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {data.map((skill) => (
        <div
          key={skill._id}
          className="rounded-xl bg-[#1a3c6e] text-white px-4 py-2"
        >
          <p className="font-semibold">{skill.skill_id.name}</p>
          <p className="text-xs">
            Level: {skill.level} • {skill.years_experience} years
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserSkills;
