import React from "react";
import { FiBriefcase } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full bg-[#244373] text-white px-6 sm:px-10 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/10 p-2 rounded-md">
                <FiBriefcase size={20} />
              </div>
              <h1 className="text-lg font-semibold">HireHub</h1>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Connecting talent with opportunity since 2024. Your journey to a
              dream career starts here.
            </p>
          </div>

          {/* Candidates */}
          <div>
            <h3 className="font-semibold mb-4">For Candidates</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Browse Jobs</li>
              <li className="hover:text-white cursor-pointer">Applied Jobs</li>
              <li className="hover:text-white cursor-pointer">Job Alerts</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Safety</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* Bottom */}
        <div className="text-sm text-white/60">
          © 2026 HireHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;