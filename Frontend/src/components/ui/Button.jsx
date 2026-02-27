import React from 'react'

const Button = ({ children, variant = 'primary', size = 'md', iconLeft, iconRight, loading, className = '', ...rest }) => {
  const variantClass = variant === 'primary'
    ? 'btn-primary'
    : variant === 'outline'
    ? 'btn-outline'
    : 'btn-ghost'

  const sizeClass = size === 'sm' ? 'text-sm px-3 py-1.5' : size === 'lg' ? 'text-base px-5 py-3' : 'px-4 py-2'

  const cls = [variantClass, sizeClass, className].filter(Boolean).join(' ')

  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {iconLeft ? <span className="inline-flex items-center">{iconLeft}</span> : null}
      {loading ? 'Loading…' : children}
      {iconRight ? <span className="inline-flex items-center">{iconRight}</span> : null}
    </button>
  )
}

export default Button


