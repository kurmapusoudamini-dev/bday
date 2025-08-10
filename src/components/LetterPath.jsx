import React, { useMemo, useState } from 'react'
import { useAppState } from '../context/AppState.jsx'

// Defines connections (by index) for each letter so the drawn lines match the intended glyph
const CONNECTIONS = {
  A: [
    [0, 1], // left leg
    [1, 2], // right leg
    [0, 3], // left leg to crossbar start
    [3, 4], // crossbar
    [4, 2], // crossbar end to right leg
  ],
  P: [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // loop
    [4, 5],                                     // stem extension
  ],
  R: [
    [0, 1], [1, 2], [2, 4], [4, 3], [3, 0], // upper loop
    [4, 5], [5, 6],                           // diagonal + leg
  ],
  N: [
    [0, 1], [1, 2], [2, 3],
  ],
  J: [
    [0, 1], [1, 2], [2, 3],
  ],
  I: [[0, 1]],
  T: [
    [0, 2], [1, 2], [2, 3],
  ],
  H: [
    [0, 1],       // left vertical
    [2, 3],       // right vertical
    [4, 5],       // crossbar
    [0, 4],       // link top-left to crossbar
    [1, 4],       // link bottom-left to crossbar
    [2, 5],       // link top-right to crossbar
    [3, 5],       // link bottom-right to crossbar
  ],
};



function LetterPath() {
  const {
    currentLetter,
    currentStarIndex,
    visitedStars,
    actions,
  } = useAppState()

  const [wrongTap, setWrongTap] = useState(false)

  const linePoints = useMemo(() => {
    const pts = visitedStars.map((i) => currentLetter.points[i])
    return pts.length ? pts.map((p) => `${p.x},${p.y}`).join(' ') : ''
  }, [visitedStars, currentLetter])

  // Helper sets for quick look-ups
  const visitedSet = useMemo(() => new Set(visitedStars), [visitedStars])
  const connections = useMemo(() => CONNECTIONS[currentLetter.char] || [], [currentLetter])

  const handleStarClick = (index) => {
    if (index === currentStarIndex) {
      // correct star tapped
      if (currentStarIndex + 1 >= currentLetter.points.length) {
        actions.completeLetter()
      } else {
        actions.visitStar()
      }
      setWrongTap(false)
    } else {
      setWrongTap(true)
      setTimeout(() => setWrongTap(false), 600)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '60vh' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        {/* connecting lines */}
        {connections.map(([a, b], idx) => {
          if (!visitedSet.has(a) || !visitedSet.has(b)) return null
          const pa = currentLetter.points[a]
          const pb = currentLetter.points[b]
          return (
            <line
              key={idx}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="#FFD27D"
              strokeWidth={1.5}
            />
          )
        })}
        {currentLetter.points.map((p, i) => {
          const isVisited = visitedStars.includes(i)
          const isActive = i === currentStarIndex
          return (
            <polygon
              key={i}
              points={getStarPoints(p.x, p.y, 5, isActive ? 3 : 2, isActive ? 1.5 : 1)}
              fill={isVisited ? '#FFD27D' : '#fff'}
              stroke={isActive ? '#FF8AAE' : 'transparent'}
              strokeWidth={isActive ? 0.6 : 0}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                filter: isVisited
                  ? 'drop-shadow(0 0 3px #FFD27D)'
                  : 'drop-shadow(0 0 2px #fff)',
              }}
              onClick={() => handleStarClick(i)}
            />
          )
        })}
      </svg>
      {wrongTap && (
        <div
          aria-live="assertive"
          style={{
            position: 'absolute',
            bottom: '10%',
            width: '100%',
            color: '#FF6B6B',
            textAlign: 'center',
            fontSize: '1rem',
          }}
        >
          That star isn’t ours, my love—touch the glowing one.
        </div>
      )}
    </div>
  )
}

export default LetterPath

// Add helper to compute a star polygon
function getStarPoints(cx, cy, spikes = 5, outerR = 2, innerR = 1) {
  const step = Math.PI / spikes;
  const pts = [];
  let rot = (Math.PI / 2) * 3;
  for (let i = 0; i < spikes; i++) {
    const xOuter = cx + Math.cos(rot) * outerR;
    const yOuter = cy + Math.sin(rot) * outerR;
    pts.push(`${xOuter},${yOuter}`);
    rot += step;
    const xInner = cx + Math.cos(rot) * innerR;
    const yInner = cy + Math.sin(rot) * innerR;
    pts.push(`${xInner},${yInner}`);
    rot += step;
  }
  return pts.join(' ');
}