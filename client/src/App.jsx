import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LayoutGroup, AnimatePresence } from 'framer-motion'
import CinematicIntro from './components/intro/CinematicIntro'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/website/Home'
import About from './pages/website/About'
import Services from './pages/website/Services'
import Projects from './pages/website/Projects'
import Contact from './pages/website/Contact'

function App() {
  // Plays on every full page refresh — preserved behavior
  const [showIntro, setShowIntro] = useState(true)

  return (
    // LayoutGroup enables the shared layoutId logo transition between
    // CinematicIntro (center, large) → Navbar (top-left, small).
    <LayoutGroup>
      <div className="bg-white min-h-screen font-sans selection:bg-red-500 selection:text-white">
        <AnimatePresence mode="sync">
          {showIntro ? (
            <CinematicIntro key="intro" onComplete={() => setShowIntro(false)} />
          ) : (
            <Routes key="routes">
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}

export default App
