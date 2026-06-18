"use client";
import useRegister from "@/app/hooks/auth/useRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import { MdBusiness, MdPerson } from "react-icons/md";

const Page = () => {
  const [focus, setFocus] = useState("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const registerationMutation = useRegister();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

    try {
      const response = await registerationMutation.mutateAsync({
        email,
        name,
        password,
        role,
      });

      console.log(response);
      toast.success("Account Created");
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    }
  };

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
          <div className="w-full rounded-2xl bg-gray-50  p-1 text-sm flex">
            <button
              className={`flex-1 font-semibold p-2 rounded-2xl transition-all duration-300 ${focus === "seeker" ? "bg-gray-200" : ""}`}
              onClick={() => {
                setFocus("seeker");
                setRole("seeker");
              }}
            >
              <IoPersonOutline className="inline mr-1" />
              Job Seeker
            </button>
            <button
              className={`flex-1 font-semibold p-2 rounded-2xl transition-all duration-300 ${focus === "employeer" ? "bg-gray-200" : ""}`}
              onClick={() => {
                setFocus("employeer");
                setRole("employeer");
              }}
            >
              <MdBusiness className="inline mr-1" />
              Employeer
            </button>
          </div>

          {/* FORM */}
          <form className="w-full mt-6" onSubmit={handleSubmit}>
            {/* Name */}
            <label className="font-semibold text-sm">Full Name</label>
            <div className="relative w-full mb-4">
              <MdPerson
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Name"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email */}
            <label className="font-semibold text-sm">Email address</label>
            <div className="relative w-full mb-4">
              <CiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="email"
                placeholder="name@company.com"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sm">Password</label>
              <Link
                href={"/forget-password"}
                className="text-xs sm:text-sm text-[#00a897]"
              >
                Forgot?
              </Link>
            </div>

            <div className="relative w-full mb-3">
              <IoLockClosedOutline
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>

            <hr className="mb-3 opacity-60" />

            <p className="text-[11px] sm:text-xs opacity-60 mb-4">
              * Must be at least 8 characters with a mix of letters and numbers.
            </p>

            {/* Confirm Password */}
            <label className="font-semibold text-sm">Confirm Password</label>

            <div className="relative w-full mb-4">
              <IoLockClosedOutline
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="password"
                placeholder="********"
                className="pl-10 p-2 border rounded-xl w-full mt-2 bg-gray-50 text-sm"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(
                    password !== e.target.value ? "Passwords do not match" : "",
                  );
                }}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              <FaEye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="w-4 h-4 mt-1" />
              <span className="text-xs sm:text-sm opacity-60">
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </div>

            {/* Button */}
            <button
              disabled={registerationMutation.isPending}
              className="w-full rounded-xl bg-[#1a3c6e] py-3 text-white font-semibold mb-6 disabled:opacity-50"
            >
              {registerationMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
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
