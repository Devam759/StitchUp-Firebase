import React from 'react'
import { FiSearch } from 'react-icons/fi'

const AdminTopbar = () => {
  return (
    <div className="sticky top-0 z-30 h-14 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-neutral-200 px-3 py-2 w-full max-w-lg">
          <FiSearch className="text-neutral-500" />
          <input placeholder="Search..." className="flex-1 outline-none bg-transparent" />
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}

export default AdminTopbar


