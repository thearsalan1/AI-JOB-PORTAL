import Link from "next/link";
import React from "react";

const Adver = () => {
  return (
    <section className="w-full px-4 sm:px-10 py-16 bg-gray-100 relative overflow-hidden">

      {/* Background circles */}
      <div className="hidden sm:block w-40 h-40 rounded-full bg-white opacity-20 absolute left-10 top-10 blur-2xl"></div>
      <div className="hidden sm:block w-72 h-72 rounded-full bg-[#00a897] opacity-10 absolute right-10 bottom-0 blur-3xl"></div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto bg-[#1a3c6e] rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center text-white shadow-xl">

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
          Ready to take the next step
          <br className="hidden sm:block" />
          in your career?
        </h2>

        {/* Description */}
        <p className="mt-6 text-sm sm:text-lg text-white/70 max-w-2xl mx-auto">
          Join our community of over 2 million professionals and discover
          opportunities that match your passion and skills.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            href="/sign-up"
            className="px-6 py-3 rounded-xl bg-[#00a897] text-white font-semibold hover:bg-[#028d7f] transition"
          >
            Create Free Account
          </Link>

          <Link
            href="/jobs"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition"
          >
            Browse Jobs
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Adver;