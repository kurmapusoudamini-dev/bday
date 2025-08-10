import React, { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Accessible quote bottom-sheet that slides up from bottom.
 * Props:
 * - quote: string
 * - duration: ms before auto-dismiss (default 6000, null disables)
 * - onClose: callback when dismissed
 */
function QuoteCard({ quote = 'Quote placeholder', duration = 6000, onClose = () => {} }) {
  // reference for animation
  const cardRef = useRef(null)
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    // wait for animation completion
    setTimeout(() => onClose(), 300)
  }, [onClose])

  // auto-dismiss
  useEffect(() => {
    if (duration === null) return
    const id = setTimeout(() => handleClose(), duration)
    return () => clearTimeout(id)
  }, [duration, handleClose])

  return (
    <div
      role="dialog"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          padding: '1.5rem 2rem',
          borderRadius: '12px',
          maxWidth: '80%',
          textAlign: 'center',
          transform: closing ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          userSelect: 'none',
          cursor: 'pointer',
        }}
      >
        {quote}
      </div>
    </div>
  )
}

export default QuoteCard