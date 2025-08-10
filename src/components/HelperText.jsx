import React, { useEffect, useState } from 'react'

function HelperText({ text = '', duration = 3000 }) {
  const [visible, setVisible] = useState(Boolean(text))

  useEffect(() => {
    if (!text) return
    setVisible(true)
    if (duration === null) return
    const id = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(id)
  }, [text, duration])

  if (!visible) return null

  return (
    <p
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '20%',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#fff',
        pointerEvents: 'none',
        transition: 'opacity 0.4s',
        opacity: visible ? 1 : 0,
      }}
    >
      {text}
    </p>
  )
}

export default HelperText