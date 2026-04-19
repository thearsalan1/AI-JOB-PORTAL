import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaEye, FaShieldAlt } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-heading relative">

      {/* Top Background */}
      <div className="absolute top-0 left-0 w-full h-[25vh] bg-gray-100 z-0" />

      {/* HEADER */}
      <header className="px-4 sm:px-10 py-6 flex items-center justify-center gap-3 text-[#1a3c6e]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a3c6e] rounded-full flex items-center justify-center">
          <FiBriefcase color="white" size={18} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">HireHub</h1>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl relative overflow-hidden py-6 sm:py-8 px-4 sm:px-8 flex flex-col items-center gap-5">

          {/* Icon */}
          <div className="flex items-center justify-center h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-gray-100 border border-gray-300">
            <FaShieldAlt size={22} className="sm:text-[30px]" color="#1a3c6e" />
          </div>

          {/* Heading */}
          <h1 className="text-lg sm:text-2xl font-bold text-center">
            Create New Password
          </h1>

          <p className="text-xs sm:text-sm opacity-60 text-center max-w-sm">
            Your new password must be different from previously used passwords.
          </p>

          {/* FORM */}
          <form className="w-full">

            {/* Password */}
            <label className="font-semibold text-sm">Password</label>
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

            <div className="relative w-full mb-5">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
              />
              <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            {/* Button */}
            <button className="w-full rounded-xl bg-[#1a3c6e] py-3 text-white font-semibold flex items-center justify-center gap-2 mb-4">
              Update Password
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

      {/* LINKS */}
      <section className="w-full text-xs sm:text-sm opacity-60 flex flex-wrap items-center justify-center gap-4 sm:gap-10 py-4 px-4 text-center">
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
        <Link href="#">Contact Support</Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full p-4 sm:p-5 bg-white text-xs sm:text-sm opacity-60 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-center sm:text-left">
          © 2026 HireHub. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default Page;