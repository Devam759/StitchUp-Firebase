import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'

const Tag = ({ children }) => (
  <span className="px-2 py-0.5 rounded-full text-xs border border-neutral-200 bg-neutral-50">{children}</span>
)

const TailorListCard = ({ tailor, onHover, onLeave, isQuickFix = false }) => {
  const navigate = useNavigate()
  const {
    id,
    name,
    shopPhotoUrl,
    isAvailable = true,
    currentOrders = 0,
    distanceKm = 0,
    rating = 0,
    reviews = 0,
    priceFrom = 0,
    heavyTasks = 0,
    lightTasks = 0
  } = tailor

  // ETA Formula: (heavy task * 3 days) + (Light task * 4 hours)
  const calculateETA = () => {
    const heavyTime = heavyTasks * 72 // 72 hours per heavy task
    const lightTime = lightTasks * 4 // 4 hours per light task
    const totalHours = heavyTime + lightTime

    if (totalHours === 0) return 'Ready Now'
    if (totalHours < 24) return `${totalHours} hours`
    const days = Math.floor(totalHours / 24)
    const extraHours = totalHours % 24
    return extraHours > 0 ? `${days}d ${extraHours}h` : `${days} days`
  }

  const eta = calculateETA()

  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      // Check if item already exists in cart
      const existingItem = cart.find(item => item.tailorId === id)

      if (existingItem) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
        return
      }

      const cartItem = {
        tailorId: id,
        tailorName: name,
        tailorImage: shopPhotoUrl,
        priceFrom: priceFrom,
        distanceKm: distanceKm,
        rating: rating,
        addedAt: new Date().toISOString()
      }

      cart.push(cartItem)
      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('cartUpdate'))

      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleEnquireNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/enquiries?tailorId=${id}&tailorName=${encodeURIComponent(name)}&isOnline=${isAvailable}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      onMouseEnter={() => onHover?.(tailor)}
      onMouseLeave={() => onLeave?.(tailor)}
      className="card overflow-hidden group"
    >
      <Link to={`/tailor/${id}`} className="block">
        {/* Big Image */}
        <div className="w-full h-48 bg-neutral-100 overflow-hidden relative">
          {shopPhotoUrl ? (
            <img src={shopPhotoUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400 font-bold uppercase tracking-widest text-[#305cde]">StitchUp</div>
          )}
          <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm text-neutral-800">
            {distanceKm} km
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="font-bold text-xl mb-1 text-neutral-900 group-hover:text-[#305cde] transition-colors">{name}</div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2 font-medium">
            <span className="text-amber-500 font-bold">⭐ {rating.toFixed(1)}</span>
            <span className="text-neutral-400">({reviews} reviews)</span>
          </div>

          {/* Other Info */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Starting from</span>
              <span className="font-bold text-neutral-900">₹{priceFrom}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Waiting List</span>
              <span className="font-bold text-neutral-900">{currentOrders} items</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-blue-50/50 rounded-xl border border-blue-100/50">
              <span className="text-blue-800 text-[10px] font-black uppercase tracking-wider">Est. Completion</span>
              <span className="font-bold text-[#305cde]">{eta}</span>
            </div>
          </div>

          {/* Availability and Action Button */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
              {isAvailable ? 'Online' : 'Offline'}
            </div>
            {isQuickFix ? (
              <button
                onClick={handleEnquireNow}
                className="bg-[#305cde] text-white font-bold py-2 px-4 rounded-xl text-xs hover:shadow-lg transition-all"
              >
                Message
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`bg-[#305cde] text-white font-bold py-2 px-4 rounded-xl text-xs hover:shadow-lg transition-all ${addedToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {addedToCart ? 'Added ✓' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default TailorListCard
