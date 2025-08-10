import './App.css'
import { useState } from 'react'

import StarfieldCanvas from './components/StarfieldCanvas.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import LetterPath from './components/LetterPath.jsx'
import QuoteCard from './components/QuoteCard.jsx'
import ProgressRibbon from './components/ProgressRibbon.jsx'
import Finale from './components/Finale.jsx'
import HelperText from './components/HelperText.jsx'

import { useAppState } from './context/AppState.jsx'

function App() {
  const {
    currentLetterIndex,
    completedLetters,
    letters,
    showQuote,
    currentQuote,
    isFinished,
    actions,
  } = useAppState()
  const [started, setStarted] = useState(false)

  return (
    <>
      <StarfieldCanvas />
      {!started && <LoveLetter onStart={() => setStarted(true)} />}
      {started && (
        <>
          <ProgressRibbon activeIndex={currentLetterIndex} completedCount={completedLetters} letters={letters} />
          {!isFinished && <LetterPath />}
          {showQuote && (
            <QuoteCard quote={currentQuote?.text} onClose={actions.hideQuote} duration={isFinished ? null : undefined} />
          )}
          <HelperText text="Touch the twinkling star, my love." />
          {isFinished && <Finale onReplay={actions.resetGame} />}
        </>
      )}
    </>
  )
}

export default App
