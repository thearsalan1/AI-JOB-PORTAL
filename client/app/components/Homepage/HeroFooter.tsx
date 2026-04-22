import React from "react";
import { FaChartLine, FaUserTie } from "react-icons/fa";
import { GrCloudComputer } from "react-icons/gr";
import { LuGlobe } from "react-icons/lu";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiVuetify } from "react-icons/si";

const HeroFooter = () => {
  return (
    <section className="w-full bg-gray-100 py-8 px-4 text-center font-heading">

      {/* Text */}
      <p className="text-sm sm:text-base text-gray-500 font-semibold">
        Trusted by 5,000+ world-class companies
      </p>

      {/* Icons */}
      <div className="mt-6 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10">

        <LuGlobe className="text-gray-400 text-2xl sm:text-3xl rotate-12" />
        <RiTailwindCssFill className="text-gray-400 text-2xl sm:text-3xl rotate-90" />
        <SiVuetify className="text-gray-400 text-2xl sm:text-3xl" />
        <FaUserTie className="text-gray-400 text-2xl sm:text-3xl" />
        <GrCloudComputer className="text-gray-400 text-2xl sm:text-3xl" />
        <FaChartLine className="text-gray-400 text-2xl sm:text-3xl" />

      </div>
    </section>
  );
};

export default HeroFooter;