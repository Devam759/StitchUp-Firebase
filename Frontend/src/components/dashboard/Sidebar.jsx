import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiList, FiDollarSign, FiUser } from 'react-icons/fi'

const NavItem = ({ to, icon, label }) => (
  <NavLink to={to} className={({isActive}) => [
    'flex items-center gap-2 px-3 py-2 rounded-lg',
    isActive ? 'bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]' : 'hover:bg-neutral-100'
  ].join(' ')}>
    {icon}
    <span>{label}</span>
  </NavLink>
)

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 border-r border-neutral-200 bg-white">
      <div className="p-4 w-full">
        <div className="grid gap-1">
          <NavItem to="/tailor/dashboard" icon={<FiHome/>} label="Home" />
          <NavItem to="/tailor/orders" icon={<FiList/>} label="Orders" />
          <NavItem to="/tailor/earnings" icon={<FiDollarSign/>} label="Earnings" />
          <NavItem to="/tailor/profile" icon={<FiUser/>} label="Profile" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


