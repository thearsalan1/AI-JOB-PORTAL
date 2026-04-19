import Link from "next/link";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";

const Page = () => {
  return (
    <div className="bg-gray-100 font-heading min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="w-full px-4 sm:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-9 bg-[#1a3c6e] flex items-center justify-center rounded-lg">
            <FiBriefcase color="white" size={18} />
          </div>
          <h1 className="text-base sm:text-lg text-[#1a3c6e] font-bold">
            HireHub WebApp
          </h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl relative overflow-hidden py-8 px-5 sm:px-8">
          
          {/* Top Accent */}
          <div className="absolute w-full h-[4px] bg-[#00a896] top-0 left-0" />

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Join HireHub
          </h1>
          <p className="text-xs sm:text-sm opacity-60 text-center mb-6">
            Get started with your free account today.
          </p>

          {/* Role Switch */}
          <div className="w-full rounded-2xl bg-gray-100 p-1 text-sm flex">
            <button className="flex-1 font-semibold p-2 bg-white rounded-2xl">
              <IoPersonOutline className="inline mr-1" />
              Job Seeker
            </button>
            <button className="flex-1 font-semibold p-2 rounded-2xl">
              <FiBriefcase className="inline mr-1" />
              Employer
            </button>
          </div>

          {/* FORM */}
          <form className="w-full mt-6">
            
            {/* Email */}
            <label className="font-semibold text-sm">Email address</label>
            <div className="relative w-full mb-4">
              <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="name@company.com"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sm">Password</label>
              <Link href={"/forget-password"} className="text-xs sm:text-sm text-[#00a897]">
                Forgot?
              </Link>
            </div>

            <div className="relative w-full mb-3">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
              <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            <hr className="mb-3 opacity-60" />

            <p className="text-[11px] sm:text-xs opacity-60 mb-4">
              * Must be at least 8 characters with a mix of letters and numbers.
            </p>

            {/* Confirm Password */}
            <label className="font-semibold text-sm">
              Confirm Password
            </label>

            <div className="relative w-full mb-4">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
              <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="w-4 h-4 mt-1" />
              <span className="text-xs sm:text-sm opacity-60">
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </div>

            {/* Button */}
            <button className="w-full rounded-xl bg-[#1a3c6e] py-3 text-white font-semibold mb-6">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-5">
            <hr className="flex-1" />
            <p className="text-sm">OR</p>
            <hr className="flex-1" />
          </div>

          {/* Footer */}
          <p className="text-sm text-center opacity-60">
            Already have an account?{" "}
            <Link href="sign-in" className="text-[#00a897] font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </main>

      {/* BOTTOM LINKS */}
      <section className="p-4 flex flex-wrap justify-center text-xs opacity-60 gap-4">
        <Link href="#">Secure SSL Encryption</Link>
        <Link href="#">Privacy Guaranteed</Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-4 sm:px-10 py-5">
        <p className="opacity-60 text-xs text-center">
          © 2026 HireHub WebApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Page;