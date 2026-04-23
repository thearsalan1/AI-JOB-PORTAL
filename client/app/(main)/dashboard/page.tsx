import Link from "next/link";
import React from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRight, FaRegEye } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";

const stats = [
  {
    title: "Applications Sent",
    value: "24",
    icon: <FiBriefcase />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Profile Views",
    value: "58",
    icon: <FaRegEye />,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Saved Jobs",
    value: "10",
    icon: <FiBriefcase />,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
];

const recommendedJobs = [
  {
    role: "Senior Frontend Engineer",
    company: "TechFlow Systems",
    match: 98,
    location: "Remote, USA",
    type: "Full-time",
    salary: "$140k - $180k",
    posted: "2 hours ago",
  },
  {
    role: "UX UI Designer",
    company: "CloudScale AI",
    match: 94,
    location: "San Francisco, CA",
    type: "Hybrid",
    salary: "$110k - $150k",
    posted: "5 hours ago",
  },
  {
    role: "Product Manager",
    company: "Innovate Health",
    match: 89,
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $170k",
    posted: "Yesterday",
  },
  {
    role: "Backend Developer",
    company: "NextGen Solutions",
    match: 92,
    location: "Austin, TX",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "Today",
  },
  {
    role: "Data Scientist",
    company: "Vision Analytics",
    match: 95,
    location: "Remote, Europe",
    type: "Contract",
    salary: "€90k - €120k",
    posted: "3 days ago",
  },
  {
    role: "DevOps Engineer",
    company: "CloudWorks",
    match: 87,
    location: "Seattle, WA",
    type: "Hybrid",
    salary: "$115k - $145k",
    posted: "1 week ago",
  },
  {
    role: "Mobile App Developer",
    company: "Appify Labs",
    match: 90,
    location: "Toronto, Canada",
    type: "Full-time",
    salary: "CAD 100k - CAD 130k",
    posted: "4 days ago",
  },
  {
    role: "AI Research Engineer",
    company: "DeepMind Innovations",
    match: 97,
    location: "London, UK",
    type: "Full-time",
    salary: "£120k - £160k",
    posted: "Today",
  },
];

const Page = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Good Morning, Alex!
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          You have new job matches based on your profile today.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {stats.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition"
    >
      {/* Icon */}
      <div className={`p-3 rounded-xl text-2xl ${item.bg} ${item.color}`}>
        {item.icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-gray-500 text-sm">{item.title}</p>
        <h2 className="text-2xl font-bold">{item.value}</h2>
      </div>
    </div>
  ))}
</div>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT (Jobs) */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <BsStars className="text-[#00a897]" />
              Recommended For You
            </h1>

            <Link
              href="/recommendations"
              className="text-[#1a3c6e] font-medium hover:underline flex items-center gap-1"
            >
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {recommendedJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="font-semibold text-gray-800">{job.role}</h2>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>

                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                    {job.match}% Match
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {job.salary}
                  </span>
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Posted {job.posted}</span>

                  <button className="text-[#1a3c6e] font-medium hover:underline flex items-center gap-1">
                    View Details <FaArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (optional later) */}
        <div className="hidden lg:block">
          {/* You can add activity / profile / suggestions here */}
        </div>
      </div>
    </div>
  );
};

export default Page;
