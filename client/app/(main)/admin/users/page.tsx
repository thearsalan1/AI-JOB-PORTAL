"use client";
import { useState } from "react";
import {
  useGetAllUsers,
  useToggleUserBan,
  useUpdateUserRole,
} from "@/app/hooks/admin/useAdminUser";
import { FiUsers } from "react-icons/fi";

const roleFilters = [
  { label: "All", value: "" },
  { label: "Seekers", value: "seeker" },
  { label: "Employers", value: "employer" },
  { label: "Admins", value: "admin" },
];

const UsersPage = () => {
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllUsers(roleFilter, search);
  const toggleBan = useToggleUserBan();
  const updateRole = useUpdateUserRole();

  const users = data?.users ?? [];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold font-heading text-[#1a3c6e] mb-6 flex items-center gap-2">
        <FiUsers /> User Management
      </h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name/email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e] flex-1 min-w-[200px]"
        />
        {roleFilters.map((r) => (
          <button
            key={r.value}
            onClick={() => setRoleFilter(r.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              roleFilter === r.value
                ? "bg-[#1a3c6e] text-white"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      <div className="space-y-3">
        {users.map((u: any) => (
          <div
            key={u._id}
            className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-700">{u.name}</p>
                {u.isBanned && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                    Banned
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{u.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={u.role}
                onChange={(e) =>
                  updateRole.mutate({ id: u._id, role: e.target.value })
                }
                disabled={updateRole.isPending}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#1a3c6e]"
              >
                <option value="seeker">Seeker</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => toggleBan.mutate(u._id)}
                disabled={toggleBan.isPending}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition disabled:opacity-50 ${
                  u.isBanned
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                {u.isBanned ? "Unban" : "Ban"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
