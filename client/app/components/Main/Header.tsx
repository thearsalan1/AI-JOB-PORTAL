"use client";
import { useJobs } from "@/app/hooks/jobs/useJobs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import {
  useGetNotifications,
  useMarkNotificationRead,
} from "@/app/hooks/notifiaction/useNotification";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifWrapperRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [] } = useGetNotifications();
  const markRead = useMarkNotificationRead();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading } = useJobs(
    { page: 1, limit: 5, search: debouncedTerm },
    debouncedTerm.length > 1,
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        notifWrapperRef.current &&
        !notifWrapperRef.current.contains(e.target as Node)
      ) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white px-4 sm:px-6 lg:px-10 py-3 font-heading">
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1a3c6e]">
            <FiBriefcase size={16} className="text-white" />
          </div>
          <h1 className="text-lg sm:text-xl text-[#1a3c6e] font-bold">
            HireHub
          </h1>

          {/* Search (hidden on small) */}
          <div ref={wrapperRef} className="relative hidden md:block ml-4">
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full w-64 lg:w-80">
              <FaSearch className="text-gray-500 mr-2 text-sm" />
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

            {/* Dropdown with results */}
            {showDropdown && debouncedTerm.length > 1 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                {isLoading && (
                  <p className="text-sm text-gray-400 px-4 py-3">
                    Searching...
                  </p>
                )}

                {!isLoading && data?.jobs?.length === 0 && (
                  <p className="text-sm text-gray-400 px-4 py-3">Not found</p>
                )}

                {!isLoading &&
                  data?.jobs?.map((job: any) => (
                    <Link
                      key={job._id}
                      href={`/jobs/${job._id}`}
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {job.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {job.company_name} • {job.location}
                      </p>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <FaSearch className="text-gray-500 md:hidden" />
          {/* Notification */}
          <div ref={notifWrapperRef} className="relative">
            <button onClick={() => setShowNotifDropdown((prev) => !prev)}>
              <FaBell className="text-gray-500 text-lg cursor-pointer hover:text-black transition" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
                    No notificaitons
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
          <div className="w-8 h-8 rounded-full overflow-hidden relative">
            <Image
              src="/profile.png"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
