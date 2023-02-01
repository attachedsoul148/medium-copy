/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Footer = () => {
  return (
    <footer className="px-5 py-5 bg-yellow-500">
      <div className="flex justify-between max-w-7xl mx-auto items-center space-x-2">
        <img
          className="object-contain h-12"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png"
          alt="logo"
        />
        <p className='text-sm'>Copyright @2023 by Pavlo Kozak</p>
      </div>
    </footer>
  )
}

export default Footer
