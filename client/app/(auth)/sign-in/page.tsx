import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiBriefcase } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import SingInDesign from "@/app/components/auth/SingInDesign";

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">

      {/* LEFT SECTION */}
      <section className="relative overflow-hidden w-full lg:w-1/2 py-10 px-6 sm:px-10 bg-[#1a3c6e] text-white flex flex-col justify-between">
        <SingInDesign/>
      </section>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 py-10 px-4">

        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-10 shadow-lg">
          
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl mb-2">
            Welcome back
          </h1>

          <p className="text-sm opacity-60 mb-6">
            Enter your professional details to access your account.
          </p>

          <form>
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
              <Link href="#" className="text-sm text-[#00a897]">
                Forgot?
              </Link>
            </div>

            <div className="relative w-full mb-6">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
              <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm opacity-60">
                Remember me for 30 days
              </span>
            </div>

            {/* Button */}
            <button className="w-full rounded-xl bg-[#1a3c6e] py-3 text-white font-semibold mb-6">
              Sign in
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
            Don't have an account?{" "}
            <Link href="#" className="text-[#00a897] font-bold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;