import React from 'react'

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, helperText, left, right, ...rest }) => {
  return (
    <div className="grid gap-1.5">
      {label ? <label className="text-sm font-medium" htmlFor={name}>{label}</label> : null}
      <div className={["flex items-center gap-2 rounded-xl border px-3 py-2 bg-white", error ? 'border-red-400' : 'border-neutral-200'].join(' ')}>
        {left ? <span className="text-neutral-500 text-lg">{left}</span> : null}
        <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="flex-1 outline-none bg-transparent" {...rest} />
        {right ? <span className="text-neutral-500 text-lg">{right}</span> : null}
      </div>
      {error ? <div className="text-red-600 text-xs">{error}</div> : helperText ? <div className="text-neutral-500 text-xs">{helperText}</div> : null}
    </div>
  )
}

export default Input


