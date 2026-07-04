"use client";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import {
  useGetEmployerProfile,
  useCreateEmployerProfile,
  useUpdateEmployerProfile,
} from "@/app/hooks/employer/useEmployerProfile";
import { MdEdit, MdSave, MdCancel, MdVerified } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Manufacturing",
  "Other",
];

const Page = () => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useGetEmployerProfile();
  const createProfile = useCreateEmployerProfile();
  const updateProfile = useUpdateEmployerProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    industry: "Technology",
    company_size: 0,
    description: "",
    website: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        company_name: profile.company_name ?? "",
        industry: profile.industry ?? "Technology",
        company_size: profile.company_size ?? 0,
        description: profile.description ?? "",
        website: profile.website ?? "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (profile) {
      await updateProfile.mutateAsync(form);
    } else {
      await createProfile.mutateAsync(form);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <div className="text-center text-gray-400 py-20">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-heading text-[#1a3c6e]">
          Company Profile
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition"
          >
            <MdEdit size={16} /> {profile ? "Edit" : "Create Profile"}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={createProfile.isPending || updateProfile.isPending}
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

      {!profile && !isEditing && (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <FiBriefcase size={50} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-4">No company profile created</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 rounded-xl bg-[#1a3c6e] text-white font-semibold hover:bg-blue-950 transition"
          >
            Create Profile
          </button>
        </div>
      )}

      {(profile || isEditing) && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Contact Person
              </label>
              <p className="text-gray-700 mt-1 font-medium">{user?.name}</p>
            </div>
            {profile?.verified && (
              <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                <MdVerified size={14} /> Verified
              </span>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold">
              Company Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
                required
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                placeholder="e.g. DevWorks Inc"
              />
            ) : (
              <p className="text-gray-700 mt-1 font-medium">
                {profile?.company_name || "—"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Industry
              </label>
              {isEditing ? (
                <select
                  value={form.industry}
                  onChange={(e) =>
                    setForm({ ...form, industry: e.target.value })
                  }
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                >
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-700 mt-1">{profile?.industry || "—"}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold">
                Company Size (employees)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min={1}
                  value={form.company_size}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      company_size: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                />
              ) : (
                <p className="text-gray-700 mt-1">
                  {profile?.company_size ?? "—"}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 font-semibold">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                  placeholder="https://yourcompany.com"
                />
              ) : (
                <p className="text-gray-700 mt-1">
                  {profile?.website ? (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a3c6e] hover:underline"
                    >
                      {profile.website}
                    </a>
                  ) : (
                    "—"
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e] resize-none"
                placeholder="Tell us about your company..."
              />
            ) : (
              <p className="text-gray-700 mt-1 text-sm">
                {profile?.description || "—"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
