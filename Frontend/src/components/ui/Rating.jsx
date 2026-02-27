import React from 'react'
import { FiStar } from 'react-icons/fi'

const Rating = ({ value = 0, count, size = 'md' }) => {
  const stars = [0,1,2,3,4]
  const starSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base'
  return (
    <div className="inline-flex items-center gap-1">
      {stars.map((i) => (
        <FiStar key={i} className={[starSize, i < Math.round(value) ? 'text-[color:var(--color-primary)]' : 'text-neutral-300'].join(' ')} />
      ))}
      {typeof count !== 'undefined' ? <span className="text-sm text-neutral-600">({count})</span> : null}
    </div>
  )
}

export default Rating


