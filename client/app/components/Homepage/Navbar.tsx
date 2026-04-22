import Link from "next/link";
import React from "react";
import { FaBriefcase } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full px-4 sm:px-8 lg:px-12 py-4 flex justify-between items-center bg-white shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 bg-[#1a3c6e] flex items-center justify-center rounded-lg">
          <FaBriefcase size={18} className="sm:text-[22px]" color="white" />
        </div>
        <h1 className="text-lg sm:text-xl lg:text-2xl text-[#1a3c6e] font-heading font-semibold">
          HireHub
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href={"/sign-in"} className="px-3 sm:px-5 py-2 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium hover:bg-gray-100 transition">
          Log in
        </Link>

        <Link href={"/sign-up"} className="px-3 sm:px-5 py-2 rounded-xl sm:rounded-2xl bg-[#00a897] text-white text-sm sm:text-base font-medium hover:bg-[#028d7f] transition">
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;