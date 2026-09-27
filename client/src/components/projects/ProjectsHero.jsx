import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function ProjectsHero({ totalProjects = '06' }) {
  const shouldReduceMotion = useReducedMotion()

  const anim = (delay = 0, y = 16) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.25 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-20 border-b border-slate-800">
      {/* ── 1. Architectural Drafting Paper Grid (0.2s fade-in) ── */}
      <motion.div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.5, ease: EXPO }}
      />

      {/* Atmospheric depth vignette */}
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-slate-400 mb-6"
          {...anim(0.05, 10)}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Advith Projects
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-red-400 font-semibold">Commissions</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{totalProjects} Documented</span>
          </div>
        </motion.div>

        {/* ── Signature Architectural Drawing Line ── */}
        <div className="relative mb-8">
          <svg className="w-full h-2 overflow-visible" aria-hidden="true">
            <motion.line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EXPO }}
            />
            {/* Active red indicator pip on the line */}
            <motion.circle
              cx="0"
              cy="1"
              r="2"
              fill="#DC2626"
              initial={{ cx: '0%' }}
              animate={{ cx: '24%' }}
              transition={{ duration: 1, delay: 0.3, ease: EXPO }}
            />
          </svg>
        </div>

        {/* Main Architectural Statement & Technical Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.div
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-red-400 mb-4"
              {...anim(0.12, 12)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>PROJECT ARCHIVE</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6"
              {...anim(0.2, 24)}
            >
              Spaces built with{' '}
              <span className="text-red-500 block sm:inline">
                precision and purpose.
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl"
              {...anim(0.3, 16)}
            >
              A documented selection of civil construction, architectural design, and turnkey interior
              commissions executed by Advith Projects across Karnataka.
            </motion.p>
          </div>

          {/* Construction Schedule Specification Card */}
          <motion.div
            className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-xl font-mono text-xs"
            {...anim(0.38, 16)}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <span className="text-slate-300 font-semibold">SPECIFICATIONS</span>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">REGION</span>
                <span className="text-white font-medium">Karnataka, India</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">DISCIPLINES</span>
                <span className="text-white font-medium">03 Integrated</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">EXECUTION MODEL</span>
                <span className="text-emerald-400 font-medium">Turnkey Civil &amp; Build</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">STANDARDS</span>
                <span className="text-slate-300 font-medium">IS-456 RCC &amp; NBC</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>SINGLE ACCOUNTABILITY</span>
              <span className="text-emerald-400 font-semibold">● ACTIVE SITES</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
