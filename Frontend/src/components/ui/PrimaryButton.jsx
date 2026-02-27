import React from 'react'
import { motion } from 'framer-motion'

const PrimaryButton = ({ children, className = '', variant = 'primary', ...rest }) => {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline'
  return (
    <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className={[base, className].join(' ')} {...rest}>
      {children}
    </motion.button>
  )
}

export default PrimaryButton


