import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { calculateProjectStats } from './projectHelpers'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectsHero() {
  const shouldReduceMotion = useReducedMotion()
  const stats = calculateProjectStats(projects)

  const anim = (delay = 0, y = 20) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  return (
    <section className="relative overflow-hidden bg-[#0A0F1D] text-white pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-800 selection:bg-red-600 selection:text-white">
      {/* ── 1. Architectural Drafting Paper Grid (Very low opacity) ── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric depth vignette & red discipline accent glow */}
      <div
        className="absolute -top-32 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, rgba(10,15,29,0) 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />



      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb Navigation & Register Identifier */}
        <motion.nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-slate-400 mb-6"
          {...anim(0.05, 10)}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">
              Advith Projects
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-300">Project Archive</span>
            <span className="text-slate-600">/</span>
            <span className="text-red-400 font-semibold">{stats.total} Documented</span>
          </div>

        </motion.nav>

        {/* ── Signature Architectural Drawing Construction Line ── */}
        <div className="relative mb-8 sm:mb-10">
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
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
            {/* Active red indicator pip traversing on the drafting line */}
            <motion.circle
              cx="0"
              cy="1"
              r="2"
              fill="#DC2626"
              initial={{ cx: '0%' }}
              animate={{ cx: '18%' }}
              transition={{ duration: 1.1, delay: 0.3, ease: EXPO }}
            />
          </svg>
        </div>

        {/* Main Architectural Statement & Technical Project Metadata Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left Column: Eyebrow, Large Editorial Title, Narrative */}
          <div className="lg:col-span-7">
            {/* Top technical metadata */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-red-400 mb-5"
              {...anim(0.12, 12)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>ADVITH PROJECTS / PROJECT ARCHIVE</span>
            </motion.div>

            {/* Large editorial headline */}
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6"
              {...anim(0.2, 24)}
            >
              Selected Work.{' '}
              <span className="text-red-500 block sm:inline">
                Built With Intent.
              </span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl"
              {...anim(0.3, 16)}
            >
              A documented archive of civil construction, architectural design, and turnkey
              interior commissions executed by Advith Projects across Karnataka — engineered with
              precision and single-team accountability.
            </motion.p>
          </div>

          {/* Right Column: Architectural Register Schedule Specification */}
          <motion.div
            className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 sm:p-7 rounded-none font-mono text-xs relative"
            {...anim(0.38, 16)}
          >
            {/* CAD Corner tick */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-700" />

            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <span className="text-red-400 font-bold">AP-SPEC 2026</span>
            </div>

            <div className="space-y-3 text-slate-300 divide-y divide-slate-800/60">
              <div className="flex justify-between items-center pt-2 first:pt-0">
                <span className="text-slate-400 uppercase tracking-wider text-[11px]">PROJECTS</span>
                <span className="text-white font-bold text-sm tracking-wide">
                  {stats.total} Commissions
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400 uppercase tracking-wider text-[11px]">COMPLETED</span>
                <span className="text-emerald-400 font-bold tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {stats.completed} Handed Over
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400 uppercase tracking-wider text-[11px]">ONGOING</span>
                <span className="text-amber-400 font-bold tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {stats.ongoing} Active Sites
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400 uppercase tracking-wider text-[11px]">LOCATIONS</span>
                <span className="text-white font-medium text-right text-[11px]">
                  {stats.regionsCount} ({stats.locationsList})
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>ONE TEAM RESPONSIBILITY</span>
              <span className="text-red-400 font-semibold uppercase tracking-wider">
                100% TURNKEY DIRECT
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectsHero)
