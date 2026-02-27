import React from 'react'

const Card = ({ children, className = '', ...rest }) => {
  return (
    <div className={["card p-4", className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export default Card


