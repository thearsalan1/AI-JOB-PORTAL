"use client";
import { useJobs } from "@/app/hooks/jobs/useJobs";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
  useGetNotifications,
  useMarkNotificationRead,
} from "@/app/hooks/notifiaction/useNotification";
import { useAuthStore } from "@/app/store/authStore";

const roleBadge: Record<string, { label: string; color: string }> = {
  seeker: { label: "Job Seeker", color: "bg-blue-100 text-blue-600" },
  employer: { label: "Employer", color: "bg-purple-100 text-purple-600" },
  admin: { label: "Admin", color: "bg-red-100 text-red-600" },
};

const Header = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const notifWrapperRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [] } = useGetNotifications();
  const markRead = useMarkNotificationRead();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sirf seeker ke liye search relevant hai
  const isSeeker = user?.role === "seeker";
  const { data, isLoading } = useJobs(
    { page: 1, limit: 5, search: debouncedTerm },
    isSeeker && debouncedTerm.length > 1,
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setShowDropdown(false);
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      )
        setShowMobileSearch(false);
      if (
        notifWrapperRef.current &&
        !notifWrapperRef.current.contains(e.target as Node)
      )
        setShowNotifDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const badge = user?.role ? roleBadge[user.role] : null;

  const SearchResults = () => (
    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
      {isLoading && (
        <p className="text-sm text-gray-400 px-4 py-3">Searching...</p>
      )}
      {!isLoading && data?.jobs?.length === 0 && (
        <p className="text-sm text-gray-400 px-4 py-3">No results found</p>
      )}
      {!isLoading &&
        data?.jobs?.map((job: any) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            onClick={() => {
              setShowDropdown(false);
              setShowMobileSearch(false);
              setSearchTerm("");
            }}
            className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
          >
            <p className="text-sm font-medium text-gray-700">{job.title}</p>
            <p className="text-xs text-gray-400">
              {job.company_name} • {job.location}
            </p>
          </Link>
        ))}
    </div>
  );

  return (
    <header className="w-full bg-white px-4 sm:px-6 lg:px-10 py-3 font-heading">
      <div className="flex items-center justify-between gap-4">
        {/* Left — logo + search */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-2 rounded-lg bg-[#1a3c6e]">
              <FiBriefcase size={16} className="text-white" />
            </div>
            <h1 className="text-lg sm:text-xl text-[#1a3c6e] font-bold">
              HireHub
            </h1>
          </div>

          {/* Desktop search — sirf seeker ke liye */}
          {isSeeker && (
            <div ref={wrapperRef} className="relative hidden md:block ml-4">
              <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full w-64 lg:w-80">
                <FaSearch className="text-gray-500 mr-2 text-sm shrink-0" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="bg-transparent outline-none text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => searchTerm && setShowDropdown(true)}
                />
              </div>
              {showDropdown && debouncedTerm.length > 1 && <SearchResults />}
            </div>
          )}

          {/* Employer / Admin heading */}
          {user?.role === "employer" && (
            <span className="hidden md:block text-sm text-gray-500 ml-4">
              Manage your job postings
            </span>
          )}
          {user?.role === "admin" && (
            <span className="hidden md:block text-sm text-gray-500 ml-4">
              Admin Control Panel
            </span>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile search toggle — sirf seeker ke liye */}
          {isSeeker && (
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              onClick={() => setShowMobileSearch((p) => !p)}
            >
              {showMobileSearch ? (
                <MdClose size={20} />
              ) : (
                <FaSearch size={16} />
              )}
            </button>
          )}

          {/* Notifications */}
          <div ref={notifWrapperRef} className="relative">
            <button
              onClick={() => setShowNotifDropdown((p) => !p)}
              className="relative p-1.5"
            >
              <FaBell className="text-gray-500 text-lg hover:text-black transition" />
              {notifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length > 9 ? "9+" : notifications.length}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">
                    Notifications
                  </p>
                </div>
                {notifications.length === 0 && (
                  <p className="text-sm text-gray-400 px-4 py-4 text-center">
                    No notifications
                  </p>
                )}
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => markRead.mutate(notif.id)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                    >
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User info + avatar */}
          <div className="flex items-center gap-2">
            {/* Role badge — desktop only */}
            {badge && (
              <span
                className={`hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}
              >
                {badge.label}
              </span>
            )}

            {/* Name — desktop only */}
            {user?.name && (
              <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                {user.name}
              </span>
            )}

            {/* Avatar with initials */}
            <div className="w-8 h-8 rounded-full bg-[#1a3c6e] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar — sirf seeker ke liye */}
      {isSeeker && showMobileSearch && (
        <div ref={mobileSearchRef} className="relative mt-3 md:hidden">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl">
            <FaSearch className="text-gray-500 mr-2 text-sm shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search jobs, companies..."
              className="bg-transparent outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
            />
          </div>
          {showDropdown && debouncedTerm.length > 1 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <SearchResults />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
