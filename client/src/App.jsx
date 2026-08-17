import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Compass, Home } from 'lucide-react'

function LandingPlaceholder() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl space-y-6"
      >
        <div className="flex items-center justify-center gap-3">
          <Building2 className="w-10 h-10 text-amber-500" />
          <Compass className="w-10 h-10 text-amber-400" />
          <Home className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Advith Projects
        </h1>
        <p className="text-slate-400 text-lg">
          Construction • Architecture • Interior Design
        </p>
        <div className="inline-block px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300">
          Environment initialized & ready for development
        </div>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Marketing Routes */}
        <Route path="/" element={<LandingPlaceholder />} />

        {/* Future Owner Workspace / Dashboard Routes can be appended here */}
      </Routes>
    </Router>
  )
}

export default App
