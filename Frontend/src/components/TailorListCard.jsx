import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

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
    priceFrom = 0
  } = tailor

  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      
      // Check if item already exists in cart
      const existingItem = cart.find(item => item.tailorId === id)
      
      if (existingItem) {
        // Item already in cart, maybe show a message
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
        return
      }
      
      // Add new item to cart
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
      
      // Dispatch event to notify other components (like navbar cart count)
      window.dispatchEvent(new Event('cartUpdate'))
      
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleEnquireNow = (e) => {
    e.stopPropagation()
    // Navigate to enquiries page with tailor info
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
      className="card overflow-hidden"
    >
      {/* Big Image */}
      <div className="w-full h-48 bg-neutral-100 overflow-hidden">
        {shopPhotoUrl ? (
          <img src={shopPhotoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">No photo</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <div className="font-semibold text-xl mb-2">{name}</div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
          <span className="font-medium">⭐ {rating.toFixed(1)}</span>
          <span>({reviews} reviews)</span>
        </div>

        {/* Other Info */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center justify-between">
            <span className="text-neutral-600">Distance</span>
            <span className="font-medium">{distanceKm} km away</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-600">Price From</span>
            <span className="font-medium">₹{priceFrom}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-600">Current Customers</span>
            <span className="font-medium">{currentOrders}</span>
          </div>
        </div>

        {/* Availability and Action Button */}
        <div className="flex items-center justify-between gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
            {isAvailable ? 'Online' : 'Offline'}
          </div>
          {isQuickFix ? (
            <button 
              onClick={handleEnquireNow}
              className="btn-primary flex-1"
            >
              Enquire Now
            </button>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`btn-primary flex-1 ${addedToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TailorListCard


