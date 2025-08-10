import React, { useEffect, useRef } from 'react'

const STAR_COUNT = 300 // denser night sky
const STAR_COLORS = ['#ffffff', '#ffd6f9', '#ffb3c1', '#ffe5f7'] // soft starlight palette
const SHOOTING_STAR_CHANCE = 0.002 // per frame

function StarfieldCanvas() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const starsRef = useRef([])
  const shootingStarRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // generate stars once
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() < 0.7 ? 0.4 + Math.random() * 0.8 : 1.1 + Math.random() * 1.0,
      twinkle: Math.random() < 0.4,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }))
    starsRef.current = stars

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lastTime = performance.now()
    const animate = (time) => {
      const dt = time - lastTime
      lastTime = time
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      drawStars(ctx, stars, time)
      updateAndDrawShootingStar(ctx, dt)
      // maybe spawn new shooting star
      if (!shootingStarRef.current && Math.random() < SHOOTING_STAR_CHANCE) {
        launchShootingStar()
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    const drawStars = (c, arr, t) => {
      arr.forEach((s) => {
        let alpha = 1
        if (s.twinkle && !prefersReduce) {
          alpha = 0.4 + 0.6 * Math.sin(t * 0.002 + s.phase)
        }
        c.globalAlpha = alpha
        c.fillStyle = s.color
        c.shadowBlur = 8
        c.shadowColor = s.color
        c.beginPath()
        c.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        c.fill()
        c.shadowBlur = 0
      })
      c.globalAlpha = 1
    }

    const updateAndDrawShootingStar = (c, delta) => {
      const s = shootingStarRef.current
      if (!s) return
      s.x += s.vx * delta
      s.y += s.vy * delta
      s.life -= delta
      if (s.life <= 0) {
        shootingStarRef.current = null
        return
      }
      c.strokeStyle = '#FF5A8A'
      c.lineWidth = 2
      c.globalAlpha = Math.max(s.life / 1000, 0)
      c.beginPath()
      c.moveTo(s.x, s.y)
      c.lineTo(s.x - s.vx * 0.1, s.y - s.vy * 0.1)
      c.stroke()
      c.globalAlpha = 1
    }

    const launchShootingStar = () => {
      const angle = (-Math.PI / 2) + (Math.random() * 0.4 - 0.2) // mostly left->right downward
      const speed = 0.6 + Math.random() * 0.4 // px per ms
      shootingStarRef.current = {
        x: Math.random() * window.innerWidth * 0.5,
        y: -20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1000 + Math.random() * 400,
      }
    }

    if (!prefersReduce) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // static draw without animation
      drawStars(ctx, stars, 0)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      id="starfield"
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'linear-gradient(180deg,#2d004d 0%, #55064f 60%, #12041e 100%)' }}
    />
  )
}

export default StarfieldCanvas