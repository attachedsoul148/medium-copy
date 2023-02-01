/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="px-5 py-5 bg-yellow-500">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              className="object-contain h-12"
              src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-5 text-sm">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Sign In</h3>
          <h3 className="text-white bg-black px-4 py-2 rounded-full cursor-pointer hover:opacity-90">
            Get Started
          </h3>
        </div>
      </div>
    </header>
  )
}

export default Header
