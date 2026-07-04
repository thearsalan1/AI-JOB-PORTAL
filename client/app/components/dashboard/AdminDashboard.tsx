"use client";
import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import {
  useAdminDashboard,
  usePlatformStats,
  useCreateSkillAdmin,
} from "@/app/hooks/admin/useAdminDashboard";
import { FiUsers, FiBriefcase, FiTrendingUp, FiActivity } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const categoryOptions = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Language",
  "Artificial Intelligence",
  "MlOps",
  "Other",
];

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { data, isLoading } = useAdminDashboard();
  const { data: platform } = usePlatformStats();
  const createSkill = useCreateSkillAdmin();

  const [skillForm, setSkillForm] = useState({ name: "", category: "Other" });

  const statCards = [
    {
      title: "Total Users",
      value: data?.total_users,
      icon: <FiUsers />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Total Jobs",
      value: data?.total_jobs,
      icon: <FiBriefcase />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Active Employers",
      value: data?.active_employers,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Avg Match Score",
      value: `${data?.avg_match_score ?? 0}%`,
      icon: <FiTrendingUp />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Daily Active Users",
      value: platform?.daily_active_users,
      icon: <FiActivity />,
      bg: "bg-pink-100",
      color: "text-pink-600",
    },
  ];

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) return;
    await createSkill.mutateAsync(skillForm);
    setSkillForm({ name: "", category: "Other" });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        Admin Panel — {user?.name} 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <div className={`p-3 rounded-xl text-2xl ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">
                {isLoading ? "—" : (item.value ?? 0)}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Top Skills */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Demanded Skills
          </h2>
          {data?.top_skills?.length > 0 ? (
            <div className="space-y-2">
              {data.top_skills.map((s: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm border border-gray-100 rounded-lg px-3 py-2"
                >
                  <span className="font-medium text-gray-700">
                    {s.skill_name}
                  </span>
                  <span className="text-gray-400">{s.count} jobs</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Abhi data nahi hai</p>
          )}
        </div>

        {/* Add Skill Form — seed script ka replacement */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Master Skill List mein Naya Skill Add Karo
          </h2>
          <form onSubmit={handleAddSkill} className="space-y-3">
            <input
              type="text"
              value={skillForm.name}
              onChange={(e) =>
                setSkillForm({ ...skillForm, name: e.target.value })
              }
              placeholder="e.g. Kubernetes"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
            />
            <select
              value={skillForm.category}
              onChange={(e) =>
                setSkillForm({ ...skillForm, category: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1a3c6e]"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={createSkill.isPending}
              className="w-full bg-[#1a3c6e] text-white py-2 rounded-xl font-semibold hover:bg-blue-950 transition disabled:opacity-50"
            >
              {createSkill.isPending ? "Adding..." : "Add Skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
