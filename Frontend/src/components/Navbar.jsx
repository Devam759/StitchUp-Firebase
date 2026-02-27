import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiBell, FiPackage, FiMessageCircle, FiShoppingCart } from 'react-icons/fi'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ hideUntilScroll = false }) => {
  const { user, signOut: authSignOut, updateProfile } = useAuth()
  const [isVisible, setIsVisible] = useState(!hideUntilScroll)
  const [scrolled, setScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [pendingOrders, setPendingOrders] = useState([])
  const [newEnquiries, setNewEnquiries] = useState([])
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const toggleAvailability = async () => {
    if (!user || updatingStatus) return
    setUpdatingStatus(true)
    const newStatus = !(user.isAvailable ?? true)
    await updateProfile({ isAvailable: newStatus })
    setUpdatingStatus(false)
  }

  // Scroll visibility
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      if (hideUntilScroll) setIsVisible(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hideUntilScroll])

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false)
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setShowNotifications(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Tailor notifications
  useEffect(() => {
    if (!user?.role || user.role !== 'tailor') return
    const tailorId = user.id || user.uid
    if (!tailorId) return

    const qOrders = query(collection(db, 'orders'), where('tailorId', '==', tailorId))
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setPendingOrders(orders.filter(o => o.status === 'Request' || o.status === 'Pending'))
    })

    const qEnquiries = query(collection(db, 'enquiries'), where('tailorId', '==', tailorId))
    const unsubEnquiries = onSnapshot(qEnquiries, (snap) => {
      const enqs = snap.docs.map(d => d.data())
      setNewEnquiries(enqs.filter(e => {
        if (!e.messages?.length) return false
        const last = e.messages[e.messages.length - 1]
        return last.from === 'customer' || last.from === 'user'
      }))
    })

    return () => { unsubOrders(); unsubEnquiries() }
  }, [user])

  const handleLogout = async () => {
    try {
      await authSignOut()
      // Clear cookie
      document.cookie = "st_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    } catch { }
    navigate('/')
  }

  const positionClass = hideUntilScroll ? 'fixed' : 'sticky'
  const navBg = hideUntilScroll
    ? (scrolled ? 'bg-white shadow-sm border-b border-neutral-200' : 'bg-transparent')
    : 'bg-white shadow-sm border-b border-neutral-200'
  const textColor = hideUntilScroll && !scrolled ? 'text-white' : 'text-neutral-800'
  const visible = isVisible || !hideUntilScroll

  const notifCount = pendingOrders.length + newEnquiries.length

  return (
    <header className={`${positionClass} top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${navBg} ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="mx-auto w-full max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {(!hideUntilScroll || scrolled) && (
            <img src="/logo2.png" alt="StitchUp" className="h-10 w-auto object-contain" />
          )}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Tailor online toggle */}
              {user.role === 'tailor' && (
                <div className="flex items-center gap-2 mr-3 px-3 py-1.5 rounded-xl bg-neutral-100/50">
                  <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${user.isAvailable ?? true ? 'text-green-600' : 'text-neutral-400'}`}>
                    {user.isAvailable ?? true ? 'Online' : 'Offline'}
                  </span>
                  <button
                    onClick={toggleAvailability}
                    disabled={updatingStatus}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${user.isAvailable ?? true ? 'bg-green-500' : 'bg-neutral-300'}`}
                  >
                    <motion.div
                      animate={{ x: (user.isAvailable ?? true) ? 22 : 2 }}
                      initial={false}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              )}

              {/* Customer cart */}
              {user.role === 'customer' && (
                <Link to="/cart" className={`p-2 rounded-lg hover:bg-neutral-100 transition-colors ${textColor}`} title="Cart">
                  <FiShoppingCart className="w-5 h-5" />
                </Link>
              )}

              {/* Tailor notifications */}
              {user.role === 'tailor' && (
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-lg hover:bg-neutral-100 transition-colors relative ${textColor}`}
                  >
                    <FiBell className="w-5 h-5" />
                    {notifCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 max-h-96 overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-neutral-50 bg-neutral-50/50">
                        <div className="font-bold text-neutral-900 uppercase tracking-tight">Notifications</div>
                      </div>
                      <div className="overflow-y-auto flex-1 p-2">
                        {notifCount === 0 ? (
                          <div className="p-8 text-center text-neutral-400 text-sm italic">No new notifications</div>
                        ) : (
                          <>
                            {pendingOrders.slice(0, 5).map(order => (
                              <Link key={order.id} to="/tailor/orders" onClick={() => setShowNotifications(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FiPackage className="w-4 h-4" /></div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-neutral-900 truncate">{order.customerName || 'Customer'} • {order.service}</div>
                                  <div className="text-[10px] text-neutral-400 font-bold uppercase">{order.id}</div>
                                </div>
                              </Link>
                            ))}
                            {newEnquiries.slice(0, 5).map((enq, i) => (
                              <Link key={i} to="/tailor/enquiries" onClick={() => setShowNotifications(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600"><FiMessageCircle className="w-4 h-4" /></div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-neutral-900 truncate">{enq.customerName || 'Customer'}</div>
                                  <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-green-600">New Message</div>
                                </div>
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setShowUserMenu(!showUserMenu)} className={`p-2 rounded-lg hover:bg-neutral-100 transition-colors ${textColor}`}>
                  <FiUser className="w-5 h-5" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 py-2">
                    <div className="px-4 py-4 border-b border-neutral-50 bg-neutral-50/30">
                      <p className="text-sm font-bold text-neutral-900 truncate">{user.name || user.fullName || 'User'}</p>
                      <p className="text-[10px] font-black text-[#305cde] uppercase tracking-widest mt-1 opacity-70">{user.role}</p>
                    </div>
                    <div className="p-2">
                      {user.role === 'customer' ? (
                        <>
                          <Link to="/customer/account" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">My Account</Link>
                          <Link to="/customer/orders" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Orders</Link>
                          <Link to="/enquiries" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Enquiries</Link>
                        </>
                      ) : (
                        <>
                          <Link to="/tailor/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Dashboard</Link>
                          <Link to="/tailor/profile" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Profile / Rates</Link>
                          <Link to="/tailor/orders" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Manage Orders</Link>
                          <Link to="/tailor/enquiries" onClick={() => setShowUserMenu(false)} className="flex items-center px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">Enquiries Chat</Link>
                        </>
                      )}
                      <div className="h-px bg-neutral-100 my-2 mx-2" />
                      <button onClick={() => { setShowUserMenu(false); handleLogout() }} className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className={`px-5 py-2 text-sm font-bold rounded-xl hover:bg-neutral-100 transition-colors ${textColor}`}>Log In</Link>
              <Link to="/signup" className="px-6 py-2.5 text-sm font-black uppercase tracking-widest rounded-xl bg-[#305cde] text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
