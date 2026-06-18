import React from 'react'
import { FaFilter } from 'react-icons/fa'

const workModes = ["Full-time", "Part-time", "Contract", "Remote"];
const Exprience = ["Entry Level","Mid Level","Senior Level","Director/VP"];

const FilterJobs = () => {
  return (
    <div className='p-2'>
      <div className='flex justify-between items-center border-b-2 border-gray-300  px-6 py-6 mb-5'>
       <div className='flex gap-2 items-center'>
          <FaFilter color='#1a3c6e'/>
          <h1 className='font-semibold font-heading text-xl'>Filters</h1>
       </div>
      <span className='text-sm text-[#1a3c6e] font-semibold cursor-pointer'>Clear all</span>
      </div>
      <div className="w-48">
    </div>
    <div>
      <h3 className="font-semibold text-gray-700 mb-3 text-md">Work Mode</h3>
      <div className="space-y-2 text-sm">
        {workModes.map((mode) => (
          <label
            key={mode}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600">{mode}</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-700 mb-3 mt-5 text-md">Expirence Level</h3>
      <div className="space-y-2 text-sm">
        {Exprience.map((exp) => (
          <label
            key={exp}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600">{exp}</span>
          </label>
        ))}
      </div>
    </div>
      <div></div>
    </div>
  )
}

export default FilterJobs