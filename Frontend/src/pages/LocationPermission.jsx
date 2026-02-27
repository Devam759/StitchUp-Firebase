import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PrimaryButton from '../components/ui/PrimaryButton'
import MapPlaceholder from '../components/MapPlaceholder'
import { FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LocationPermission = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center px-4 py-10">
        <div className="card w-full max-w-md p-6 text-center">
          <div className="relative mx-auto h-24 w-24">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: [0.95, 1, 0.95], opacity: 1 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-[color:var(--color-primary)]/15"
            />
            <motion.div
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: [6, 0, 6], opacity: 1 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 h-24 w-24 grid place-items-center text-[color:var(--color-primary)]"
            >
              <FiMapPin className="text-5xl" />
            </motion.div>
          </div>
          <h1 className="text-xl font-semibold mt-4">Allow location to find nearby tailors</h1>
          <p className="text-neutral-600 mt-1">We use your location to show trusted tailors closest to you.</p>
          <div className="mt-4">
            <PrimaryButton className="w-full" onClick={()=> navigate('/find')}>Enable Location</PrimaryButton>
            <button className="mt-2 text-sm text-neutral-600 hover:text-[color:var(--color-primary)]" onClick={()=> navigate('/')}>Skip for now</button>
          </div>
          <div className="mt-6">
            <MapPlaceholder className="h-40" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LocationPermission


