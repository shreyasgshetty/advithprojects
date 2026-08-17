import { useState } from 'react'
import { LayoutGroup, AnimatePresence } from 'framer-motion'
import CinematicIntro from './components/intro/CinematicIntro'
import Home from './pages/website/Home'

function App() {
  // Plays on every full page refresh — no sessionStorage.
  const [showIntro, setShowIntro] = useState(true)

  return (
    // LayoutGroup enables the shared layoutId logo transition between
    // CinematicIntro (center, large) → Home navbar (top-left, small).
    <LayoutGroup>
      <div className="bg-white min-h-screen font-sans selection:bg-red-500 selection:text-white">
        <AnimatePresence mode="sync">
          {showIntro
            ? <CinematicIntro key="intro" onComplete={() => setShowIntro(false)} />
            : <Home key="home" />
          }
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}

export default App
