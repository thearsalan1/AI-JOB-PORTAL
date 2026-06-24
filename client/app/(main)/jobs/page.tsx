import AllJobs from '@/app/components/jobs/AllJobs'
import FilterJobs from '@/app/components/jobs/FilterJobs'
import React from 'react'

const page = () => {
  return (
    <div className=' flex min-w-full min-h-screen'>
      <div className='w-1/3'>
        <FilterJobs/>
      </div>
      <div className='min-w-2/3'>
        <AllJobs/>
      </div>
    </div>
  )
}

export default page