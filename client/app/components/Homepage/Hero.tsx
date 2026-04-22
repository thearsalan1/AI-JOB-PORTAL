import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 sm:py-16 bg-[#244373] text-white gap-6">

      {/* Badge */}
      <div className="bg-white/10 rounded-full px-4 py-2 w-fit text-xs sm:text-sm">
        🚀 Over 50,000+ jobs added this week
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">
          Find Your Dream
        </h1>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold">
          Job,
        </h1>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#00a897] font-heading">
          Faster.
        </h1>
      </div>

      {/* Description */}
      <p className="opacity-70 text-sm sm:text-base lg:text-lg max-w-xl">
        Connect with top-tier companies. Explore thousands of opportunities
        across technology, design, business, and more.
      </p>

      {/* Search Bar */}
      <div className="bg-white flex flex-col sm:flex-row gap-2 sm:gap-0 p-2 rounded-xl w-full max-w-2xl">

        <input
          type="text"
          placeholder="Job Title, Keywords..."
          className="flex-1 px-4 py-2 text-sm text-black placeholder:text-gray-400 outline-none"
        />

        <div className="hidden sm:block w-[1px] h-6 bg-gray-300"></div>

        <input
          type="text"
          placeholder="Location"
          className="flex-1 px-4 py-2 text-sm text-black placeholder:text-gray-400 outline-none"
        />

        <button className="px-6 py-2 rounded-lg bg-[#00a897] font-bold text-white hover:bg-[#028d7f] transition">
          Search
        </button>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
        <button className="px-5 py-2 rounded-full font-bold text-sm bg-white text-black hover:bg-gray-100">
          I'm a job seeker
        </button>
        <button className="px-5 py-2 rounded-full font-bold text-sm bg-white text-black hover:bg-gray-100">
          I'm an employer
        </button>
      </div>
    </section>
  );
};

export default Hero;