import Link from "next/link";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">

      {/* HEADER */}
      <header className="w-full px-4 sm:px-10 py-5 font-heading">
        <div className="flex items-center justify-center gap-3">
          <div className="h-8 w-9 bg-[#1a3c6e] flex items-center justify-center rounded-lg">
            <FiBriefcase color="white" size={18} />
          </div>
          <h1 className="text-base sm:text-lg text-[#1a3c6e] font-bold">
            HireHub
          </h1>
        </div>
      </header>

      {/* DECORATION (hidden on small screens) */}
      <CiMail
        size={200}
        className="hidden md:block absolute opacity-5 -bottom-20 left-0 rotate-12"
      />
      <IoBagOutline
        size={200}
        className="hidden md:block absolute opacity-5 -bottom-20 right-10 -rotate-12"
      />
      <LuShieldCheck
        size={200}
        className="hidden md:block absolute opacity-5 top-20 right-20 rotate-12"
      />

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 font-heading">
        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl relative overflow-hidden py-8 px-5 sm:px-8 flex flex-col items-center gap-5">

          {/* Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#42047E] to-[#07F49E]" />

          {/* Icon */}
          <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gray-100 border border-gray-300">
            <FaShieldAlt size={24} className="sm:text-[30px]" color="#1a3c6e" />
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Forgot password?
          </h1>

          <p className="text-xs sm:text-sm opacity-60 text-center max-w-sm">
            No worries, it happens to the best of us. Enter your email and we'll
            send you a reset link.
          </p>

          {/* FORM */}
          <form className="w-full">
            <label className="font-semibold text-sm">
              Email address
            </label>

            <div className="relative w-full mb-4">
              <CiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="email"
                placeholder="name@company.com"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
            </div>

            <button className="w-full rounded-xl bg-[#1a3c6e] py-3 text-white font-semibold flex items-center justify-center gap-2 mb-4">
              Send Reset Link
              <FaArrowRight />
            </button>
          </form>

          {/* Back */}
          <Link
            href="/sign-in"
            className="text-sm opacity-60 hover:opacity-100 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back To Login
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs sm:text-sm opacity-60 px-4 pb-6">
        <p>If you no longer have access to this email, please</p>
        <p className="mb-3">
          contact our support team for identity verification.
        </p>

        <div className="flex justify-center gap-4 text-xs">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of services</Link>
        </div>
      </footer>
    </div>
  );
};

export default Page;