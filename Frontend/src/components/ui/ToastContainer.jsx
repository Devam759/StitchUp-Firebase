import React from 'react'

// toasts: [{ id, type: 'success'|'error'|'info', message }]
const ToastContainer = ({ toasts = [], onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 grid gap-2 w-80 max-w-[90vw]">
      {toasts.map(t => {
        const bg = t.type === 'success' ? 'bg-emerald-600' : t.type === 'error' ? 'bg-red-600' : 'bg-neutral-800'
        return (
          <div key={t.id} className={["text-white px-4 py-2 rounded-xl shadow-lg flex items-center justify-between", bg].join(' ')}>
            <span>{t.message}</span>
            {onDismiss ? <button onClick={()=>onDismiss(t.id)} className="ml-3 text-white/80 hover:text-white">×</button> : null}
          </div>
        )
      })}
    </div>
  )
}

export default ToastContainer


