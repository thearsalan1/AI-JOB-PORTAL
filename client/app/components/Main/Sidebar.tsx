"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiUser } from "react-icons/ci";
import { FaBookmark, FaSearch, FaStar } from "react-icons/fa";
import {
  IoDocumentTextOutline,
  IoExitOutline,
  IoHomeOutline,
} from "react-icons/io5";

const Navigates = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IoHomeOutline />,
  },
  {
    label: "Browse Jobs",
    href: "/jobs",
    icon: <FaSearch />,
  },
  {
    label: "My Applications",
    href: "/my-applications",
    icon: <IoDocumentTextOutline />,
  },
  {
    label: "Recommendations",
    href: "/recommendations",
    icon: <FaStar />,
  },
  {
    label: "Saved Jobs",
    href: "/saved-jobs",
    icon: <FaBookmark />,
  },
  {
    label: "My Profile",
    href: "/my-profile",
    icon: <CiUser />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col justify-between h-full p-4 font-heading">

      {/* Top Links */}
      <div className="space-y-2">
        {Navigates.map((item) => {
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
      <button className="w-full rounded-xl px-4 py-2 bg-[#1a3c6e] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#142f55] transition">
        <IoExitOutline size={18} />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;