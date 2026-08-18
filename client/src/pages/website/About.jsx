import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, ArrowRight, Home as HomeIcon } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function About() {
  return (
    <div className="relative overflow-hidden py-20 lg:py-28">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>About Advith Projects</span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
        >
          Crafting Enduring Spaces with <br />
          <span className="text-red-600">Integrity &amp; Artistry</span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
        >
          Advith Projects is a premier construction, architectural design, and turnkey interior firm. 
          Our comprehensive company history, team philosophy, and leadership profiles are being curated 
          and will be launched in the next phase.
        </motion.p>

        <motion.div
          className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 backdrop-blur-sm max-w-xl mx-auto text-sm text-slate-500"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: EXPO }}
        >
          <p className="font-medium text-slate-800 mb-1">Active Foundation Phase</p>
          <p>
            Detailed company profiles, key architects, certifications, and our design methodology 
            will be available shortly.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: EXPO }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all shadow-md"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 font-medium text-sm rounded-xl transition-all bg-white hover:bg-red-50/30"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
