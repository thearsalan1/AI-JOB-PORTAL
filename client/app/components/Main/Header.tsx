import Image from "next/image";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full bg-white px-4 sm:px-6 lg:px-10 py-3 font-heading">
      <div className="flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="p-2 rounded-lg bg-[#1a3c6e]">
            <FiBriefcase size={16} className="text-white" />
          </div>

          <h1 className="text-lg sm:text-xl text-[#1a3c6e] font-bold">
            HireHub
          </h1>

          {/* Search (hidden on small) */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full ml-4 w-64 lg:w-80">
            <FaSearch className="text-gray-500 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Search jobs, companies..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Search icon (mobile only) */}
          <FaSearch className="text-gray-500 md:hidden" />

          {/* Notification */}
          <FaBell className="text-gray-500 text-lg cursor-pointer hover:text-black transition" />

          {/* Profile */}
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