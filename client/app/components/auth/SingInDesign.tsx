import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FiBriefcase } from 'react-icons/fi'

const SingInDesign = () => {
  return (
    <>
      <Image
          src="/login-bg.png"
          alt="background"
          fill
          className="absolute -top-40 -left-10 opacity-70 object-cover pointer-events-none"
        />

        {/* Logo */}
        <div className="z-10 flex items-center gap-3 text-lg sm:text-xl font-heading font-semibold text-[#0b336d]">
          <FiBriefcase size={20} color="white" />
          <h1>HireHub WebApp</h1>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-10 lg:mt-0">

          {/* Badge */}
          <div className="bg-white/10 rounded-full px-4 py-2 flex gap-2 items-center w-fit mb-5 text-sm">
            <FiBriefcase size={16} color="#00a897" />
            <p className="font-semibold font-heading">
              Trusted by 50,000+ companies
            </p>
          </div>

          {/* Heading */}
          <div className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-5">
            <h1>Find your next</h1>
            <h1>career</h1>
            <h1>
              <span className="font-heading text-[#00a897] italic">
                milestone
              </span>{" "}
              with us
            </h1>
          </div>

          {/* Description */}
          <p className="opacity-60 text-sm sm:text-base max-w-md mb-10">
            Connect with top-tier employers, access exclusive job opportunities,
            and accelerate your professional growth in minutes.
          </p>

          {/* Stats */}
          <div className="border-t border-white/50 py-6 flex flex-col sm:flex-row gap-6 sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">12k+</h1>
              <span className="opacity-40 text-sm">
                Active Job Postings
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">850+</h1>
              <span className="opacity-40 text-sm">
                Fortune 500 Partners
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="opacity-40 mt-6 text-sm flex gap-6 flex-wrap">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of services</Link>
          </div>
        </div>
    </>
  )
}

export default SingInDesign