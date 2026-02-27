import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-dvh grid md:grid-cols-[16rem_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminTopbar />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout


