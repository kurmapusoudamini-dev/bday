import React from 'react'

function ProgressRibbon({ activeIndex = 0, completedCount = 0, letters = 'APARANJITHA'.split('') }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 'env(safe-area-inset-top,8px) 8px',
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        fontSize: '14px',
        color: '#fff',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {letters.map((l, i) => {
        const isCompleted = i < completedCount
        const isActive = i === activeIndex
        const style = {
          opacity: isActive || isCompleted ? 1 : 0.4,
          color: isCompleted ? '#FFD27D' : '#fff',
          transform: isActive ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.3s',
        }
        return (
          <span key={i} style={style} aria-current={isActive ? 'step' : undefined}>
            {l}
          </span>
        )
      })}
    </div>
  )
}

export default ProgressRibbon