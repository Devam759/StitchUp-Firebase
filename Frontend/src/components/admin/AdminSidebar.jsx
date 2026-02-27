import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiGrid, FiUsers, FiList, FiCheckSquare } from 'react-icons/fi'

const Item = ({ to, icon, label }) => (
  <NavLink to={to} className={({isActive}) => [
    'flex items-center gap-2 px-3 py-2 rounded-lg',
    isActive ? 'bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]' : 'hover:bg-neutral-100'
  ].join(' ')}>
    {icon}
    <span>{label}</span>
  </NavLink>
)

const AdminSidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 border-r border-neutral-200 bg-white">
      <div className="p-4 w-full">
        <div className="flex items-center gap-2 font-semibold px-1">
          <span className="h-6 w-6 rounded-md bg-[color:var(--color-primary)]" />
          Admin
        </div>
        <div className="mt-4 grid gap-1">
          <Item to="/admin" icon={<FiGrid/>} label="Dashboard" />
          <Item to="/admin/tailors" icon={<FiCheckSquare/>} label="Tailor Approvals" />
          <Item to="/admin/users" icon={<FiUsers/>} label="Users" />
          <Item to="/admin/orders" icon={<FiList/>} label="Orders" />
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar


