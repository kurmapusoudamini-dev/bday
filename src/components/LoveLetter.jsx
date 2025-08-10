import React from 'react'

function LoveLetter({ onStart }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        zIndex: 10,
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          background: 'rgba(29, 10, 40, 0.9)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          padding: '2rem 2.5rem',
          textAlign: 'center',
          fontFamily: 'serif',
        }}
      >
        <h2 style={{ margin: '0 0 1rem', color: '#ff8ec7', fontSize: '1.8rem' }}>My Dearest Star</h2>
        <p style={{ margin: '0 0 1rem', lineHeight: 1.6, color: '#f5e4ff' }}>
          In every corner of the night sky, I find whispers of you—each sparkle a memory, every constellation a promise.
          Tonight, I have traced our love in stars, letter by letter, waiting for your gentle touch to bring them alive.
        </p>
        <p style={{ margin: '0 0 2rem', lineHeight: 1.6, color: '#f5e4ff' }}>
          Will you join me under this velvet dusk and light our story together?
        </p>
        <button
          onClick={onStart}
          style={{
            background: 'linear-gradient(90deg,#ff4f9a 0%,#ff9f62 100%)',
            border: 'none',
            borderRadius: '999px',
            padding: '0.75rem 2rem',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
        >
          Light the Constellation
        </button>
      </div>
    </div>
  )
}

export default LoveLetter