import React from 'react'

const Toast = ({ open, type = 'success', message }) => {
  if (!open) return null
  const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-neutral-800'
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className={["text-white px-4 py-2 rounded-xl shadow-lg", bg].join(' ')}>
        {message}
      </div>
    </div>
  )
}

export default Toast


