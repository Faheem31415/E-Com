import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <img
        className="w-36 h-auto cursor-pointer"
        src={assets.logo}
        alt="App Logo"
      />

      {/* Logout Button */}
      <button onClick={()=>setToken("")}
        className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-semibold 
                   hover:bg-slate-800 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
