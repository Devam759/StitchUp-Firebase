import React from 'react'
import Card from './ui/Card'
import PrimaryButton from './ui/PrimaryButton'
import { motion } from 'framer-motion'

const TailorCard = ({ name, distanceKm, rating, reviewCount, priceFrom, photoUrl, onBook }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25 }}>
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="w-[72px] h-[72px] rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
            {photoUrl ? <img src={photoUrl} alt={name} className="w-full h-full object-cover" /> : null}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="m-0 font-semibold">{name}</h3>
              <div className="text-neutral-600 font-semibold">{rating} ★ ({reviewCount})</div>
            </div>
            <div className="flex gap-3 mt-1 text-neutral-600">
              <span>{distanceKm} km</span>
              <span>From ₹{priceFrom}</span>
            </div>
            <div className="mt-3">
              <PrimaryButton onClick={onBook}>Book now</PrimaryButton>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default TailorCard


