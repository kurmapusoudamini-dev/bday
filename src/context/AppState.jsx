/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect } from 'react'

// All 10 letters of the name 'APARANJITHA'
const DEFAULT_LETTERS = 'APARANJITHA'.split('')
// Note: There are 11 LETTER_DEFINITIONS (with an extra 'A' at the end) but only 10 in DEFAULT_LETTERS

// Quotes to show after each letter completion
const LETTER_QUOTES = [
  { text: "A thousand stars align whenever I think of you.", author: "" },      // A
  { text: "Precious is every moment spent beneath your galaxy-lit eyes.", author: "" }, // P
  { text: "Adoring you is my favourite constellation adventure.", author: "" }, // A
  { text: "Radiant is the glow of your love guiding my heart.", author: "" },   // R
  { text: "Always and forever, my love orbits around you.", author: "" },       // A
  { text: "Nothing shines brighter than your smile in my universe.", author: "" },// N
  { text: "Jubilant galaxies dance whenever you laugh.", author: "" },          // J
  { text: "Infinite is my love, stretching farther than the skies.", author: "" }, // I
  { text: "Together we paint the heavens with our shared dreams.", author: "" }, // T
  { text: "Holding you feels like cradling the entire cosmos.", author: "" },   // H
  { text: "As this constellation completes, Happy Birthday my shining star—may our love keep lighting the heavens.", author: "" }, // Final A & celebration
]

// Define star coordinates for each letter
const LETTER_DEFINITIONS = [
  // A
  {
    char: 'A',
    points: [
      { x: 10, y: 80 }, // bottom left
      { x: 50, y: 20 }, // top
      { x: 90, y: 80 }, // bottom right
      { x: 30, y: 50 }, // crossbar left
      { x: 70, y: 50 }, // crossbar right
    ],
  },
  // P
  {
    char: 'P',
    points: [
      { x: 20, y: 20 }, // top left
      { x: 60, y: 20 }, // top right
      { x: 70, y: 40 }, // middle right
      { x: 60, y: 60 }, // bottom right curve
      { x: 20, y: 60 }, // bottom left curve
      { x: 20, y: 80 }, // extension down
    ],
  },
  // A
  {
    char: 'A',
    points: [
      { x: 10, y: 80 }, // bottom left
      { x: 50, y: 20 }, // top
      { x: 90, y: 80 }, // bottom right
      { x: 30, y: 50 }, // crossbar left
      { x: 70, y: 50 }, // crossbar right
    ],
  },
  // R
  {
    char: 'R',
    points: [
      { x: 20, y: 20 }, // top left
      { x: 60, y: 20 }, // top right
      { x: 70, y: 40 }, // middle right curve
      { x: 20, y: 50 }, // middle left
      { x: 60, y: 50 }, // middle right
      { x: 80, y: 80 }, // bottom right diagonal
      { x: 20, y: 80 }, // bottom left
    ],
  },
  // A
  {
    char: 'A',
    points: [
      { x: 10, y: 80 }, // bottom left
      { x: 50, y: 20 }, // top
      { x: 90, y: 80 }, // bottom right
      { x: 30, y: 50 }, // crossbar left
      { x: 70, y: 50 }, // crossbar right
    ],
  },
  // N
  {
    char: 'N',
    points: [
      { x: 20, y: 80 }, // bottom left
      { x: 20, y: 20 }, // top left
      { x: 80, y: 80 }, // bottom right
      { x: 80, y: 20 }, // top right
    ],
  },
  // J
  {
    char: 'J',
    points: [
      { x: 60, y: 20 }, // top
      { x: 60, y: 60 }, // middle
      { x: 50, y: 80 }, // bottom curve
      { x: 30, y: 70 }, // left curve
    ],
  },
  // I
  {
    char: 'I',
    points: [
      { x: 50, y: 20 }, // top
      { x: 50, y: 80 }, // bottom
    ],
  },
  // T
  {
    char: 'T',
    points: [
      { x: 20, y: 20 }, // top left
      { x: 80, y: 20 }, // top right
      { x: 50, y: 20 }, // top middle
      { x: 50, y: 80 }, // bottom
    ],
  },
  // H
  {
    char: 'H',
    points: [
      { x: 20, y: 20 }, // top left
      { x: 20, y: 80 }, // bottom left
      { x: 80, y: 20 }, // top right
      { x: 80, y: 80 }, // bottom right
      { x: 20, y: 50 }, // middle left
      { x: 80, y: 50 }, // middle right
    ],
  },
  // A (final)
  {
    char: 'A',
    points: [
      { x: 10, y: 80 }, // bottom left
      { x: 50, y: 20 }, // top
      { x: 90, y: 80 }, // bottom right
      { x: 30, y: 50 }, // crossbar left
      { x: 70, y: 50 }, // crossbar right
    ],
  },
]

// Initial app state
const initialState = {
  currentLetterIndex: 0,  // Which letter we're on
  currentStarIndex: 0,    // Which star in the current letter
  visitedStars: [],       // Stars visited in current letter
  completedLetters: 0,    // How many letters completed
  showQuote: false,       // Whether to show quote card
  currentQuote: null,     // Current quote to display
  isFinished: false,      // Whether the experience is complete
  freeRoamUnlocked: false, // Whether free roam is unlocked
}

// Action types
const actions = {
  VISIT_STAR: 'VISIT_STAR',
  COMPLETE_LETTER: 'COMPLETE_LETTER',
  HIDE_QUOTE: 'HIDE_QUOTE',
  SHOW_FINALE: 'SHOW_FINALE',
  RESET_GAME: 'RESET_GAME',
  SET_FREE_ROAM: 'SET_FREE_ROAM',
  LOAD_STATE: 'LOAD_STATE',
}

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case actions.VISIT_STAR:
      return {
        ...state,
        currentStarIndex: state.currentStarIndex + 1,
        visitedStars: [...state.visitedStars, state.currentStarIndex],
      }

    case actions.COMPLETE_LETTER: {
      const nextLetterIndex = state.currentLetterIndex + 1
      const isFinished = nextLetterIndex >= LETTER_DEFINITIONS.length
      return {
        ...state,
        currentLetterIndex: isFinished ? state.currentLetterIndex : nextLetterIndex,
        currentStarIndex: 0,
        visitedStars: [],
        completedLetters: state.completedLetters + 1,
        showQuote: true,
        currentQuote: LETTER_QUOTES[state.currentLetterIndex],
        isFinished,
        freeRoamUnlocked: isFinished ? true : state.freeRoamUnlocked,
      }
    }

    case actions.HIDE_QUOTE:
      return {
        ...state,
        showQuote: false,
      }

    case actions.SHOW_FINALE:
      return {
        ...state,
        isFinished: true,
      }

    case actions.RESET_GAME:
      return {
        ...initialState,
        freeRoamUnlocked: state.freeRoamUnlocked, // Preserve free roam status
      }

    case actions.SET_FREE_ROAM:
      return {
        ...state,
        freeRoamUnlocked: action.payload,
      }

    case actions.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

// Create context
const AppStateContext = createContext()

// Context provider
export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('aparanjithaGameState')
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: actions.LOAD_STATE, payload: parsedState })
      }
    } catch (error) {
      console.error('Failed to load saved state:', error)
      // If there's an error, we'll start fresh
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('aparanjithaGameState', JSON.stringify({
        completedLetters: state.completedLetters,
        isFinished: state.isFinished,
        freeRoamUnlocked: state.freeRoamUnlocked || state.isFinished,
        // We don't save the current letter progress, only completed ones
      }))
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }, [state.completedLetters, state.isFinished, state.freeRoamUnlocked])

  // Action creators
  const visitStar = () => dispatch({ type: actions.VISIT_STAR })
  const completeLetter = () => dispatch({ type: actions.COMPLETE_LETTER })
  const hideQuote = () => dispatch({ type: actions.HIDE_QUOTE })
  const showFinale = () => dispatch({ type: actions.SHOW_FINALE })
  const resetGame = () => dispatch({ type: actions.RESET_GAME })
  const setFreeRoam = (value) => dispatch({ type: actions.SET_FREE_ROAM, payload: value })

  // Derived data
  const currentLetter = LETTER_DEFINITIONS[state.currentLetterIndex] || LETTER_DEFINITIONS[0]
  const letters = LETTER_DEFINITIONS.map(l => l.char)

  // The value we provide to consumers
  const value = {
    ...state,
    currentLetter,
    letters,
    actions: {
      visitStar,
      completeLetter,
      hideQuote,
      showFinale,
      resetGame,
      setFreeRoam,
    },
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

// Custom hook for using the context
export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}

// Export the letter definitions for use elsewhere
export { LETTER_DEFINITIONS }