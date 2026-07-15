"use client";

import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CiUser } from "react-icons/ci";
import { FaBookmark, FaSearch, FaStar, FaBriefcase } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import {
  IoDocumentTextOutline,
  IoExitOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { HiX } from "react-icons/hi";

const seekerNavigates = [
  { label: "Dashboard", href: "/dashboard", icon: <IoHomeOutline /> },
  { label: "Browse Jobs", href: "/jobs", icon: <FaSearch /> },
  {
    label: "My Applications",
    href: "/my-applications",
    icon: <IoDocumentTextOutline />,
  },
  { label: "Recommendations", href: "/recommendations", icon: <FaStar /> },
  { label: "Saved Jobs", href: "/saved-jobs", icon: <FaBookmark /> },
  { label: "My Profile", href: "/my-profile", icon: <CiUser /> },
];

const employerNavigates = [
  { label: "Dashboard", href: "/dashboard", icon: <IoHomeOutline /> },
  { label: "Post a Job", href: "/post-job", icon: <MdOutlinePostAdd /> },
  { label: "My Jobs", href: "/my-jobs", icon: <FaBriefcase /> },
  { label: "Company Profile", href: "/employer-profile", icon: <CiUser /> },
];

const adminNavigates = [
  { label: "Dashboard", href: "/dashboard", icon: <IoHomeOutline /> },
  { label: "User Management", href: "/admin/users", icon: <FiUsers /> },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    router.push("/sign-in");
  };

  const navigates =
    user?.role === "employer"
      ? employerNavigates
      : user?.role === "admin"
        ? adminNavigates
        : seekerNavigates;

  return (
    <div className="h-full flex flex-col p-4 font-heading bg-white w-full">
      {/* Mobile-only close button */}
      <div className="flex justify-end mb-2 md:hidden">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-[#1a3c6e]"
          aria-label="Close sidebar"
        >
          <HiX size={22} />
        </button>
      </div>

      <div className="mb-6 px-2">
        <span className="text-xl font-bold text-[#1a3c6e]">HireHub</span>
      </div>

      <aside className="flex flex-col justify-between flex-1">
        {/* Top Links */}
        <div className="space-y-2">
          {navigates.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition
                ${
                  isActive
                    ? "bg-[#1a3c6e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogOut}
          className="w-full rounded-xl px-4 py-2 bg-[#1a3c6e] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#142f55] transition"
        >
          <IoExitOutline size={18} />
          Log out
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;