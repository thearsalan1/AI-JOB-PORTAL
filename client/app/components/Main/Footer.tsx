import React from 'react'

const Footer = () => {
  return (
    <div className='p-5 flex justify-between'>
      <div className='text-xs text-gray-400 font-heading'>© 2026 HireHub. All rights reserved.</div>
      <div className='text-xs text-gray-400 font-heading flex gap-5'>
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
      </div>
    </div>
  )
}

export default Footer