import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

const jobs = [
  {
    title: "Senior Product Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$140k - $190k",
    type: "Full-time",
  },
  {
    title: "Lead Software Engineer",
    company: "Spotify",
    location: "Stockholm, Sweden",
    salary: "$110k - $160k",
    type: "Remote",
  },
  {
    title: "Marketing Strategist",
    company: "Netflix",
    location: "Los Angeles, CA",
    salary: "$90k - $130k",
    type: "Full-time",
  },
  {
    title: "Fullstack Developer",
    company: "Vercel",
    location: "Anywhere",
    salary: "$150k - $200k",
    type: "Remote",
  },
  {
    title: "Customer Success Lead",
    company: "Intercom",
    location: "Dublin, Ireland",
    salary: "$80k - $110k",
    type: "Hybrid",
  },
  {
    title: "Data Scientist",
    company: "Tesla",
    location: "Austin, TX",
    salary: "$130k - $180k",
    type: "Full-time",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-10 font-heading">
      <div className="max-w-7xl px-10 py-20 mx-auto text-center bg-white rounded-2xl">

        {/* Badge */}
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          Job Spotlight
        </span>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold mt-5 text-gray-800 font-heading">
          Featured Job Openings
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-500 mt-5 mb-12">
          Opportunities you don’t want to miss from verified employers.
        </p>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">

          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Top */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>

                  {/* Badge */}
                  <span className="text-xs opacity-60 font-semibold px-2 py-1 bg-gray-100 rounded-full">
                    {job.type}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAttachMoney />
                    {job.salary}
                  </div>
                </div>
              </div>
              <hr  className="opacity-60 mt-5"/>

              {/* Bottom */}
              <div className="flex justify-between items-center mt-6">
                <span className="text-xs text-gray-400">
                  Posted 2 days ago
                </span>

                <button className="text-xs px-3 py-1 border rounded-full hover:bg-gray-100 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <button className="mt-10 px-6 py-3 bg-[#1a3c6e] text-white rounded-xl font-semibold hover:bg-[#142f55] transition">
          Browse All 25,000+ Jobs
        </button>

      </div>
    </section>
  );
};

export default FeaturedJobs;