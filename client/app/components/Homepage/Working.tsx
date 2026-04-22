import React from "react";
import { FaUser, FaFileAlt, FaTrophy } from "react-icons/fa";

const steps = [
  {
    icon: <FaUser />,
    title: "Create Account",
    desc: "Sign up in seconds and build a personalized profile that highlights your unique skills.",
  },
  {
    icon: <FaFileAlt />,
    title: "Upload Resume",
    desc: "Upload your CV or use our AI-powered builder to create a resume that stands out to recruiters.",
  },
  {
    icon: <FaTrophy />,
    title: "Get Hired",
    desc: "Apply to your favorite roles with a single click and manage all your interviews in one place.",
  },
];

const Working = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-10 w-full">
      
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          How HireHub Works
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-3 mb-12">
          Getting started is easy. Whether you're looking for your next career move
          or your next star hire, we've got you covered.
        </p>

        {/* Steps */}
        <div className="relative">

          {/* Line */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gray-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 relative z-10">

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transition hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1a3c6e] text-white text-lg shadow-md mb-4">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-800">
                  <span className="text-[#1a3c6e] font-bold">
                    {String(index + 1).padStart(2, "0")}.
                  </span>{" "}
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Working;