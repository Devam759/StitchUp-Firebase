import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import Topbar from '../components/dashboard/Topbar'

const TailorLayout = ({ children }) => {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 grid md:grid-cols-[16rem_1fr]">
        <Sidebar />
        <div className="flex flex-col bg-white">
          <Topbar />
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TailorLayout


