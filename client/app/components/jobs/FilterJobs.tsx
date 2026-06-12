import React from 'react'
import { FaFilter } from 'react-icons/fa'

const FilterJobs = () => {
  return (
    <div className='p-2'>
      <div className='flex justify-between items-center border-b border-gray-300 px-6 py-6'>
       <div className='flex gap-2 items-center'>
          <FaFilter color='#1a3c6e'/>
          <h1 className='font-semibold font-heading text-xl'>Filters</h1>
       </div>
      <span className='text-sm text-[#1a3c6e] font-semibold cursor-pointer'>Clear all</span>
      </div>
    </div>
  )
}

export default FilterJobs