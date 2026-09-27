import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Brief',
    tagline: 'Site & Goal Evaluation',
    desc: 'Understanding land topography, municipal constraints, and spatial functional requirements.',
  },
  {
    step: '02',
    title: 'Design',
    tagline: 'Concept & Architecture',
    desc: 'BIM modeling, structural feasibility analysis, and complete architectural documentation.',
  },
  {
    step: '03',
    title: 'Plan',
    tagline: 'Technical Specifications',
    desc: 'BOQ calculation, milestone scheduling, material grade selection, and contract finalization.',
  },
  {
    step: '04',
    title: 'Build',
    tagline: 'Civil Execution',
    desc: 'Foundation to roof-slab construction supervised by certified site engineers.',
  },
  {
    step: '05',
    title: 'Deliver',
    tagline: 'Turnkey Handover',
    desc: 'Interior fit-out, joinery detailing, snag list rectification, and key handover.',
  },
]

function ProjectProcessConnection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0B1220] text-white border-y border-slate-800 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] border border-white/10 text-red-400 font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>PROJECT METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              From Drawing to Delivery.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl">
              One unified team guiding your space through every critical milestone — no gaps,
              no finger-pointing, and complete quality control.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            <span>Explore All Disciplines</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-500" />
          </Link>
        </div>

        {/* ── Horizontal Architectural Process Line (5 Stages) ── */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-px bg-slate-800 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-rose-600"
              initial={shouldReduceMotion ? { width: '100%' } : { width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.1, ease: EXPO }}
            />
          </div>

          {/* Process Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                className="bg-slate-900/90 border border-slate-800 p-5 rounded-none flex flex-col justify-between hover:border-slate-700 transition-colors"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-slate-800 border border-slate-700 text-red-400 font-mono font-bold text-xs">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      STAGE {i + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                    {s.title}
                  </h3>
                  <div className="text-xs font-mono text-red-400/90 mb-3 uppercase tracking-wider">
                    {s.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>DISCIPLINE</span>
                  <span className="text-slate-400 font-semibold uppercase">VERIFIED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accountability Tagline Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-white font-semibold">ONE TEAM. COMPLETE RESPONSIBILITY.</span>
          </div>
          <span className="text-slate-500">
            ADVITH PROJECTS · INTEGRATED ARCHITECTURE &amp; CIVIL
          </span>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectProcessConnection)
