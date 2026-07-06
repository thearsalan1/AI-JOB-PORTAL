"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import {
  useGetProfile,
  useUpdateProfile,
  useCreateProfile,
} from "@/app/hooks/user/useProfile";
import { MdEdit, MdSave, MdCancel, MdAdd, MdDelete } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import UserSkills from "@/app/components/skills/UserSkills";
import DropDown from "@/app/components/jobs/DropDown";
import { useAddSkills } from "@/app/hooks/skill/useSkill";
import toast from "react-hot-toast";
import ResumeManager from "@/app/components/resume/ResumeManager";

type SelectedSkill = {
  value: string;
  label: string;
  category: string;
  level: number;
  years_experience: number;
};

const Page = () => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const createProfile = useCreateProfile();
  const addSkills = useAddSkills();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    current_role: "",
    experience_years: 0,
    preferred_salary: 0,
    preferred_location: "",
    bio: "",
    education: [] as { degree: string; year: number }[],
    skills: [] as SelectedSkill[],
  });

  useEffect(() => {
    if (profile) {
      setForm({
        current_role: profile.current_role ?? "",
        experience_years: profile.experience_years ?? 0,
        preferred_salary: profile.preferred_salary ?? 0,
        preferred_location: profile.preferred_location ?? "",
        bio: profile.bio ?? "",
        education: profile.education ?? [],
        skills: [],
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (profile) {
      await updateProfile.mutateAsync(form);
    } else {
      await createProfile.mutateAsync(form);
    }

    let addedCount = 0;
    for (const skill of form.skills) {
      try {
        await addSkills.mutateAsync({
          skill_id: skill.value,
          level: skill.level,
          years_experience: skill.years_experience,
        });
        addedCount++;
      } catch (err: any) {}
    }

    if (addedCount > 0) {
      toast.success(`${addedCount} skill(s) saved`);
    }

    setIsEditing(false);
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", year: new Date().getFullYear() },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return <div className="text-center text-gray-400 py-20">Loading...</div>;
  }

  const handleApplyAIData = (data: {
    current_role?: string;
    experience_years?: number;
    skills: SelectedSkill[];
  }) => {
    setForm((prev) => {
      const mergedSkills = [...prev.skills];
      data.skills.forEach((newSkill) => {
        const alreadyExists = mergedSkills.some(
          (s) => s.value === newSkill.value,
        );
        if (!alreadyExists) {
          mergedSkills.push(newSkill);
        }
      });

      return {
        ...prev,
        current_role: data.current_role || prev.current_role,
        experience_years: data.experience_years ?? prev.experience_years,
        skills: mergedSkills,
      };
    });

    setIsEditing(true);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-heading text-[#1a3c6e]">
          My Profile
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition"
          >
            <MdEdit size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={updateProfile.isPending || createProfile.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              <MdSave size={16} /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
            >
              <MdCancel size={16} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* No profile yet */}
      {!profile && !isEditing && (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <BsPerson size={50} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-4">No profile created yet</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 rounded-xl bg-[#1a3c6e] text-white font-semibold hover:bg-blue-950 transition"
          >
            Create Profile
          </button>
        </div>
      )}

      {(profile || isEditing) && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BsPerson size={20} color="#1a3c6e" /> Basic Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name — from auth store */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Full Name
                </label>
                <p className="text-gray-700 mt-1 font-medium">{user?.name}</p>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Email
                </label>
                <p className="text-gray-700 mt-1">{user?.email}</p>
              </div>

              {/* Current Role */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Current Role
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={form.current_role}
                    onChange={(e) =>
                      setForm({ ...form, current_role: e.target.value })
                    }
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                    placeholder="e.g. Frontend Developer"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">
                    {profile?.current_role || "—"}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Experience (Years)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={form.experience_years}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience_years: Number(e.target.value),
                      })
                    }
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                    min={0}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">
                    {profile?.experience_years ?? "—"} years
                  </p>
                )}
              </div>

              {/* Preferred Location */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Preferred Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={form.preferred_location}
                    onChange={(e) =>
                      setForm({ ...form, preferred_location: e.target.value })
                    }
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                    placeholder="e.g. Remote, Lahore"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">
                    {profile?.preferred_location || "—"}
                  </p>
                )}
              </div>

              {/* Preferred Salary */}
              <div>
                <label className="text-xs text-gray-400 font-semibold">
                  Preferred Salary ($/year)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={form.preferred_salary}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        preferred_salary: Number(e.target.value),
                      })
                    }
                    className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                    min={0}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">
                    ${profile?.preferred_salary?.toLocaleString() || "—"}
                  </p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="text-xs text-gray-400 font-semibold">Bio</label>
              {isEditing ? (
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e] resize-none"
                  placeholder="Tell employers about yourself..."
                />
              ) : (
                <p className="text-gray-700 mt-1 text-sm">
                  {profile?.bio || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBriefcase size={18} color="#1a3c6e" /> Resume
            </h2>
            <ResumeManager onApplyToProfile={handleApplyAIData} />
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <HiAcademicCap size={20} color="#1a3c6e" /> Education
              </h2>
              {isEditing && (
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1 text-sm text-[#1a3c6e] font-semibold hover:underline"
                >
                  <MdAdd size={16} /> Add
                </button>
              )}
            </div>

            {form.education.length === 0 && (
              <p className="text-gray-400 text-sm">No education added</p>
            )}

            <div className="space-y-3">
              {form.education.map((edu, index) => (
                <div key={index} className="flex gap-3 items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...form.education];
                          updated[index].degree = e.target.value;
                          setForm({ ...form, education: updated });
                        }}
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                        placeholder="e.g. B.Tech Computer Science"
                      />
                      <input
                        type="number"
                        value={edu.year}
                        onChange={(e) => {
                          const updated = [...form.education];
                          updated[index].year = Number(e.target.value);
                          setForm({ ...form, education: updated });
                        }}
                        className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                        placeholder="Year"
                      />
                      <button onClick={() => removeEducation(index)}>
                        <MdDelete
                          size={18}
                          className="text-red-400 hover:text-red-600"
                        />
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        {edu.degree}
                      </span>
                      <span className="text-sm text-gray-400">{edu.year}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBriefcase size={18} color="#1a3c6e" /> Skills
            </h2>

            {/* Existing skills — edit mode mein delete button bhi dikhe */}
            <UserSkills showDelete={isEditing} />

            {/* Sirf edit mode mein add karne ka dropdown */}
            {isEditing && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Add more skills</p>
                <DropDown
                  onSkillsChange={(skills) =>
                    setForm((prev) => ({
                      ...prev,
                      skills: skills.map((s) => {
                        const existing = prev.skills.find(
                          (p) => p.value === s.value,
                        );
                        return {
                          ...s,
                          level: existing?.level ?? 1,
                          years_experience: existing?.years_experience ?? 0,
                        };
                      }),
                    }))
                  }
                />

                {form.skills.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {form.skills.map((skill, index) => (
                      <div
                        key={skill.value}
                        className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2"
                      >
                        <span className="flex-1 text-sm font-medium text-gray-700">
                          {skill.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-gray-400">Level</label>
                          <select
                            value={skill.level}
                            onChange={(e) => {
                              const updated = [...form.skills];
                              updated[index].level = Number(e.target.value);
                              setForm({ ...form, skills: updated });
                            }}
                            className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                          >
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-gray-400">Years</label>
                          <input
                            type="number"
                            min={0}
                            value={skill.years_experience}
                            onChange={(e) => {
                              const updated = [...form.skills];
                              updated[index].years_experience = Number(
                                e.target.value,
                              );
                              setForm({ ...form, skills: updated });
                            }}
                            className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
