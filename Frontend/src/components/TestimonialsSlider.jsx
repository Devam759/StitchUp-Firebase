import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const TestimonialsSlider = ({ items = [] }) => {
  const [index, setIndex] = useState(0)
  const total = items.length
  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  if (!total) return null

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">{items[index].name}</div>
              <div>{items[index].stars}</div>
            </div>
            <p className="text-neutral-600 mt-2">{items[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <button aria-label="Prev" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white border border-neutral-200 shadow-sm">
        <FiChevronLeft />
      </button>
      <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-full bg-white border border-neutral-200 shadow-sm">
        <FiChevronRight />
      </button>
      <div className="flex justify-center gap-1 mt-3">
        {items.map((_, i) => (
          <span key={i} className={["h-1.5 w-1.5 rounded-full", i === index ? 'bg-[color:var(--color-primary)]' : 'bg-neutral-300'].join(' ')} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSlider


