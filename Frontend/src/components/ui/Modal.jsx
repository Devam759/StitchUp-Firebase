import React from 'react'

const Modal = ({ open, title, onClose, children, footer }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="card w-full max-w-lg p-5 bg-white">
          {title ? <div className="text-lg font-semibold mb-2">{title}</div> : null}
          <div>{children}</div>
          {footer ? <div className="mt-4">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Modal


