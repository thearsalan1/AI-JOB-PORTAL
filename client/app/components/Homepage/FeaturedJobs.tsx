import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

const FeaturedJobs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?limit=6`, {
    cache: "no-cache",
  });
  const data = await res.json();

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-10 font-heading">
      <div className="max-w-7xl px-10 py-20 mx-auto text-center bg-white rounded-2xl">
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          Job Spotlight
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold mt-5 text-gray-800 font-heading">
          Featured Job Openings
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-5 mb-12">
          Opportunities you don't want to miss from verified employers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {data.jobs.map((job: any) => (
            <div
              key={job._id}
              className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company_name || "Company"}
                    </p>
                  </div>
                  <span className="text-xs opacity-60 font-semibold px-2 py-1 bg-gray-100 rounded-full">
                    {job.job_type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAttachMoney />
                    {job.salary_min?.toLocaleString()} -{" "}
                    {job.salary_max?.toLocaleString()}
                  </div>
                </div>
              </div>
              <hr className="opacity-60 mt-5" />
              <div className="flex justify-between items-center mt-6">
                <span className="text-xs text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={`/jobs/${job._id}`}
                  className="text-xs px-3 py-1 border rounded-full hover:bg-gray-100 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/jobs"
          className="inline-block mt-10 px-6 py-3 bg-[#1a3c6e] text-white rounded-xl font-semibold hover:bg-[#142f55] transition"
        >
          Browse All Jobs
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobs;
