"use client";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";
import { useEmployerDashboard } from "@/app/hooks/dashboard/useEmployerDashboard";
import { FiBriefcase, FiUsers, FiTrendingUp } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const EmployerDashboard = () => {
  const { user } = useAuthStore();
  const { data, isLoading } = useEmployerDashboard();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const statCards = [
    {
      title: "Total Jobs Posted",
      value: data?.total_jobs ?? 0,
      icon: <FiBriefcase />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Total Applications",
      value: data?.total_applications ?? 0,
      icon: <FiUsers />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Hired",
      value: data?.hired ?? 0,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Hire Rate",
      value: data?.hire_rate ?? "0%",
      icon: <FiTrendingUp />,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          {greeting}, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Your job posting listed here
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
                {isLoading ? "—" : item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl sm:text-2xl font-semibold">Recent Jobs</h1>
          <Link
            href="/my-jobs"
            className="text-[#1a3c6e] font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {isLoading && (
          <div className="text-center text-gray-400 py-10">Loading...</div>
        )}

        {!isLoading && (data?.recent_jobs?.length ?? 0) === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
            Koi job post nahi ki abhi tak.{" "}
            <Link href="/post-job" className="text-[#1a3c6e] underline">
              Pehli job post karo
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {data?.recent_jobs?.map((job: any) => (
            <Link
              key={job._id}
              href={`/my-jobs/${job._id}/applicants`}
              className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">{job.title}</p>
                <p className="text-xs text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                {job.applications_count ?? 0} applications
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
