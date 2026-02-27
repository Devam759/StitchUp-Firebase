import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon, title, subtitle }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -3 }} transition={{ duration: 0.25 }} className="card p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-xl">
          {icon}
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-neutral-600 text-sm">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard


