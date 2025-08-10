import React from 'react'

/**
 * Finale screen: shows completion message, replay button, and wallpaper export.
 * Props:
 * - onReplay: callback to restart experience
 */
function Finale({ onReplay = () => {} }) {
  const handleExport = () => {
    const canvas = document.getElementById('starfield')
    if (!canvas) return
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
      <h2 style={{ margin: 0 }}>Constellation Complete!</h2>
      <p style={{ maxWidth: 260 }}>
        You can download this starry wallpaper or replay the adventure.
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