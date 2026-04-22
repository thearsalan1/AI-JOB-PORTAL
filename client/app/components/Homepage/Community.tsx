import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SiComma } from "react-icons/si";

const communities = [
  {
    para:
      "HireHub completely changed my job search experience. The AI recommendations were spot on and I landed my dream role within two weeks!",
    name: "Sarah Jenkins",
    role: "Senior Developer at Google",
  },
  {
    para:
      "As an employer, finding qualified candidates used to be a headache. Now, it's our primary source for top-tier engineering talent.",
    name: "Marcus Chen",
    role: "Head of Talent at StartupX",
  },
  {
    para:
      "The interface is so clean and easy to use. I love how I can track all my applications and get instant feedback on my resume status.",
    name: "Elena Rodriguez",
    role: "Product Manager",
  },
];

const Community = () => {
  return (
    <section className="w-full py-26 px-4 sm:px-10 ">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          What Our Community Says
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mb-12">
          Join thousands of professionals who found their next career step with us.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">

          {communities.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="flex text-gray-300 mb-4 text-lg">
                <SiComma />
                <SiComma />
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 mb-6 italic">
                {item.para}
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <FaRegUserCircle className="text-gray-400 text-3xl" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Community;