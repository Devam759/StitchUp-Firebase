import React from 'react'

const Timeline = ({ steps = [], currentIndex = 0 }) => {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {steps.map((s, i) => {
        const isActive = i === currentIndex
        const isDone = i < currentIndex
        const dotColor = isDone ? 'var(--c-primary)' : isActive ? 'var(--c-accent)' : 'var(--c-border)'
        const textColor = isDone || isActive ? 'var(--c-text)' : 'var(--c-muted)'
        return (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: dotColor }} />
              {i !== steps.length - 1 ? (
                <div style={{ width: 2, flex: 1, background: 'var(--c-border)', marginTop: 4, marginBottom: 4 }} />
              ) : null}
            </div>
            <div style={{ display: 'grid' }}>
              <div style={{ color: textColor, fontWeight: 600 }}>{s.label}</div>
              <div className="muted" style={{ fontSize: 12 }}>{s.time || '—'}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline


