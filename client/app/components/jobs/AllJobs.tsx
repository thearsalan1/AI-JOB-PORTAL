import React from 'react'

const jobs =[
  {
    "id": 1,
    "title": "Senior Product Designer",
    "company": "Stripe",
    "location": "Remote (Global)",
    "posted": "2h ago",
    "experience": "5+ years",
    "employmentType": "Full-time",
    "salary": "$140k - $180k",
    "description": "Lead the design of next-generation payment infrastructure products and create intuitive user experiences.",
    "featured": true,
    "logo": "/logos/stripe.png"
  },
  {
    "id": 2,
    "title": "Full Stack Engineer (React/Go)",
    "company": "Discord",
    "location": "San Francisco, CA",
    "posted": "5h ago",
    "experience": "3+ years",
    "employmentType": "Full-time",
    "salary": "$160k - $210k",
    "description": "Build highly scalable messaging features and backend services for millions of users.",
    "featured": false,
    "logo": "/logos/discord.png"
  },
  {
    "id": 3,
    "title": "Marketing Growth Specialist",
    "company": "Airbnb",
    "location": "London, UK",
    "posted": "1d ago",
    "experience": "2+ years",
    "employmentType": "Contract",
    "salary": "$65k - $90k",
    "description": "Drive user acquisition through data-driven marketing campaigns and growth experiments.",
    "featured": false,
    "logo": "/logos/airbnb.png"
  },
  {
    "id": 4,
    "title": "Frontend Developer",
    "company": "Spotify",
    "location": "Stockholm, Sweden",
    "posted": "3h ago",
    "experience": "2+ years",
    "employmentType": "Full-time",
    "salary": "$90k - $130k",
    "description": "Develop responsive web applications and improve user engagement across platforms.",
    "featured": false,
    "logo": "/logos/spotify.png"
  },
  {
    "id": 5,
    "title": "Backend Engineer",
    "company": "Uber",
    "location": "New York, NY",
    "posted": "8h ago",
    "experience": "4+ years",
    "employmentType": "Full-time",
    "salary": "$150k - $200k",
    "description": "Design distributed systems and APIs that power critical transportation services.",
    "featured": true,
    "logo": "/logos/uber.png"
  },
  {
    "id": 6,
    "title": "DevOps Engineer",
    "company": "Netflix",
    "location": "Los Angeles, CA",
    "posted": "6h ago",
    "experience": "3+ years",
    "employmentType": "Remote",
    "salary": "$130k - $190k",
    "description": "Maintain cloud infrastructure and automate deployment pipelines at scale.",
    "featured": false,
    "logo": "/logos/netflix.png"
  },
  {
    "id": 7,
    "title": "Data Scientist",
    "company": "Google",
    "location": "Bangalore, India",
    "posted": "12h ago",
    "experience": "3+ years",
    "employmentType": "Full-time",
    "salary": "$110k - $170k",
    "description": "Build machine learning models and derive insights from large datasets.",
    "featured": false,
    "logo": "/logos/google.png"
  },
  {
    "id": 8,
    "title": "UI/UX Designer",
    "company": "Figma",
    "location": "Remote",
    "posted": "4h ago",
    "experience": "2+ years",
    "employmentType": "Full-time",
    "salary": "$95k - $140k",
    "description": "Create user-centered designs and collaborate closely with product teams.",
    "featured": false,
    "logo": "/logos/figma.png"
  },
  {
    "id": 9,
    "title": "Mobile App Developer",
    "company": "TikTok",
    "location": "Singapore",
    "posted": "10h ago",
    "experience": "3+ years",
    "employmentType": "Full-time",
    "salary": "$120k - $180k",
    "description": "Develop and optimize mobile applications used by millions of users worldwide.",
    "featured": true,
    "logo": "/logos/tiktok.png"
  },
  {
    "id": 10,
    "title": "Cloud Solutions Architect",
    "company": "Microsoft",
    "location": "Seattle, WA",
    "posted": "1d ago",
    "experience": "5+ years",
    "employmentType": "Full-time",
    "salary": "$170k - $240k",
    "description": "Design enterprise cloud architectures and guide customers on Azure adoption.",
    "featured": false,
    "logo": "/logos/microsoft.png"
  }
]

const AllJobs = () => {
  return (
    <div className='bg-white min-h-screen w-full rounded-2xl p-5'>
      <div className='ml-5 mb-4'>
        <h1 className='text-[#1a3c6e] font-bold text-4xl font-heading'>All Jobs</h1>
      <p className='text-sm mt-2 text-gray-700'>
        Showing 548 open roles across all categories
      </p>
      </div>
      {jobs.map((job)=>(
        <div
        key={job.id}
        className='w-full rounded-2xl border-gray-600 border mb-3'
        >
          
        </div>
      ))}
    </div>
  )
}

export default AllJobs