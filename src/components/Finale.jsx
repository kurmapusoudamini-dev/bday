import React from 'react'
import { LETTER_DEFINITIONS } from '../context/AppState.jsx'

// Manual connection map so the rendered wallpaper draws correct letter shapes
const CONNECTIONS = {
  A: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2]],
  P: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5]],
  R: [[0, 1], [1, 2], [2, 4], [4, 3], [3, 0], [4, 5], [5, 6]],
  N: [[0, 1], [1, 2], [2, 3]],
  J: [[0, 1], [1, 2], [2, 3]],
  I: [[0, 1]],
  T: [[0, 2], [1, 2], [2, 3]],
  H: [
    [0, 1],
    [2, 3],
    [4, 5],
    [0, 4],
    [1, 4],
    [2, 5],
    [3, 5],
  ],
}

// Paint the entire constellation on an off-screen canvas
function drawConstellation(ctx, size = 1000) {
  const scale = size / 100
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#FFD27D'
  ctx.lineWidth = 2

  LETTER_DEFINITIONS.forEach((letter) => {
    const conns = CONNECTIONS[letter.char] || []

    // draw lines first
    conns.forEach(([a, b]) => {
      const pA = letter.points[a]
      const pB = letter.points[b]
      ctx.beginPath()
      ctx.moveTo(pA.x * scale, pA.y * scale)
      ctx.lineTo(pB.x * scale, pB.y * scale)
      ctx.stroke()
    })

    // draw stars afterwards so they sit above lines
    letter.points.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x * scale, p.y * scale, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  })
}

/**
 * Finale screen: shows completion message, replay button, and wallpaper export.
 * Props:
 *   onReplay – callback to restart the experience
 */
function Finale({ onReplay = () => { } }) {
  const handleExport = () => {
    // Create off-screen canvas and paint a 1k × 1k wallpaper
    const SIZE = 1000
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')

    // Background – keep same romantic gradient used in the live canvas
    const grad = ctx.createLinearGradient(0, 0, 0, SIZE)
    grad.addColorStop(0, '#2d004d')
    grad.addColorStop(0.6, '#55064f')
    grad.addColorStop(1, '#12041e')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, SIZE, SIZE)

    drawConstellation(ctx, SIZE)

    // Save as PNG
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'birthday-constellation.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        color: '#fff',
        zIndex: 20,
        padding: 'env(safe-area-inset-bottom,20px) 20px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ margin: 0 }}>
        Our Constellation of Love is Complete—and it glows for you.
      </h2>
      <p style={{ maxWidth: 320 }}>
        May this tapestry of stars forever remind you that my heart orbits yours.
        Download our sky, or replay and let’s trace it together once more.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleExport}
          style={{
            background: '#FFD27D',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Download PNG
        </button>
        <button
          onClick={onReplay}
          style={{
            background: 'transparent',
            color: '#fff',
            border: '1px solid #fff',
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Replay
        </button>
      </div>
    </div>
  )
}

export default Finale