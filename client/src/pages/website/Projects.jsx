import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Layers, ArrowRight, PhoneCall, Sparkles } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const sampleCategories = [
  { name: 'Residential Villas', count: '80+ Completed' },
  { name: 'Commercial Complexes', count: '45+ Completed' },
  { name: 'Turnkey Luxury Interiors', count: '120+ Delivered' },
  { name: 'Bespoke Architectural Blueprints', count: '200+ Drafted' },
]

export default function Projects() {
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

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
          >
            Our Landmark <br />
            <span className="text-red-600">Projects &amp; Creations</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
          >
            Explore our curated gallery of structural builds, bespoke architectural blueprints,
            and luxury interior transformations across residential and commercial sectors.
          </motion.p>
        </div>

        {/* Project categories preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
          {sampleCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-red-100 hover:shadow-md transition-all flex items-center justify-between"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: EXPO }}
            >
              <div>
                <h3 className="font-semibold text-slate-900 text-base">{cat.name}</h3>
                <p className="text-xs text-red-600 font-medium mt-0.5">{cat.count}</p>
              </div>
              <Sparkles className="w-4 h-4 text-slate-300" />
            </motion.div>
          ))}
        </div>

        {/* Informational notification card */}
        <motion.div
          className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 backdrop-blur-sm max-w-2xl mx-auto text-sm text-slate-500 space-y-2"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6, ease: EXPO }}
        >
          <p className="font-semibold text-slate-800">
            Interactive Portfolio Gallery Coming in Step 2
          </p>
          <p>
            High-resolution photography, virtual walkthroughs, floor plan blueprints, and client case
            studies will be integrated in the next release.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EXPO }}
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-red-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Enquire for Your Project</span>
          </Link>
          <Link
            to="/services"
            className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm rounded-xl transition-all bg-white"
          >
            <span>View Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
