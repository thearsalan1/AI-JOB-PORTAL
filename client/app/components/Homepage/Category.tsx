import React from "react";
import {
  FaCode,
  FaPalette,
  FaChartBar,
  FaHeartbeat,
  FaHome,
  FaWallet,
  FaBolt,
  FaBalanceScale,
} from "react-icons/fa";

const categories = [
  { icon: <FaCode />, title: "Engineering", jobs: "12,540 Open Positions" },
  { icon: <FaPalette />, title: "Design & Creative", jobs: "8,210 Open Positions" },
  { icon: <FaChartBar />, title: "Business", jobs: "15,300 Open Positions" },
  { icon: <FaHeartbeat />, title: "Healthcare", jobs: "6,450 Open Positions" },
  { icon: <FaHome />, title: "Real Estate", jobs: "3,120 Open Positions" },
  { icon: <FaWallet />, title: "Finance", jobs: "9,800 Open Positions" },
  { icon: <FaBolt />, title: "Marketing", jobs: "11,400 Open Positions" },
  { icon: <FaBalanceScale />, title: "Legal", jobs: "2,840 Open Positions" },
];

const Categories = () => {
  return (
    <section className="bg-gray-100 py-25 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-15 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-5 font-bold text-gray-800">
              Popular Job Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Explore roles across different industries and specialties.
            </p>
          </div>

          <button className="px-4 py-2 bg-white font-semibold border-gray-400 outline-none cursor-pointer rounded-full border text-sm hover:bg-gray-50 transition">
            View All Categories →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#00a897]/10 text-[#00a897] text-xl mb-4">
                {cat.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-800">
                {cat.title}
              </h3>

              {/* Jobs */}
              <p className="text-sm text-gray-500 mt-1">
                {cat.jobs}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Categories;