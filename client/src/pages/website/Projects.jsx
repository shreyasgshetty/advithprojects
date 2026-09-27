import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects, filterProjects } from '../../data/projects'
import ProjectsHero from '../../components/projects/ProjectsHero'
import ProjectArchiveRegister from '../../components/projects/ProjectArchiveRegister'
import ProjectStats from '../../components/projects/ProjectStats'
import FeaturedProject from '../../components/projects/FeaturedProject'
import ProjectCatalogueItem from '../../components/projects/ProjectCatalogueItem'
import ProjectProcessConnection from '../../components/projects/ProjectProcessConnection'

const EXPO = [0.16, 1, 0.3, 1]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const shouldReduceMotion = useReducedMotion()

  // Filter projects by category or status
  const filtered = useMemo(() => filterProjects(activeFilter), [activeFilter])

  // Lead project for the 'all' view
  const featured = useMemo(() => {
    if (activeFilter === 'all' && filtered.length > 0) {
      return filtered[0]
    }
    return null
  }, [activeFilter, filtered])

  // Remaining projects for the 2-column catalogue grid
  const gridProjects = useMemo(() => {
    if (activeFilter === 'all' && filtered.length > 0) {
      return filtered.slice(1)
    }
    return filtered
  }, [activeFilter, filtered])

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ── 1. Architectural Hero with Dynamic Live Metrics ───────────── */}
      <ProjectsHero />

      {/* ── 2. Architectural Register Navigation Index ────────────────── */}
      <ProjectArchiveRegister activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

      {/* ── 3. Technical Portfolio Register Metrics Block ────────────── */}
      <ProjectStats />

      {/* ── 4. Structured Construction Portfolio Catalogue ───────────── */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Active Classification Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-3.5 border-b border-slate-200">
            <div>
              <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-1">
                {activeFilter === 'all' ? 'PORTFOLIO ARCHIVE' : `${activeFilter.toUpperCase()} COMMISSIONS`}
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                {activeFilter === 'all'
                  ? 'All Documented Commissions'
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Commissions`}
              </h2>
            </div>

            <div className="text-xs font-mono text-slate-500">
              CATALOGUED{' '}
              <span className="font-bold text-slate-900">
                {filtered.length < 10 ? `0${filtered.length}` : filtered.length}
              </span>{' '}
              OF{' '}
              <span className="font-bold text-slate-900">
                {projects.length < 10 ? `0${projects.length}` : projects.length}
              </span>{' '}
              REGISTERED COMMISSIONS
            </div>
          </div>

          {/* ── Lead Featured Project Plate (Visible on 'All') ────────── */}
          {featured && (
            <FeaturedProject project={featured} />
          )}

          {/* ── 2-Column Architectural Portfolio Catalogue Grid ──────── */}
          <AnimatePresence mode="popLayout">
            {gridProjects.length > 0 ? (
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12 sm:gap-y-16"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EXPO }}
              >
                {gridProjects.map((project, idx) => (
                  <ProjectCatalogueItem
                    key={project.id}
                    project={project}
                    index={activeFilter === 'all' ? idx + 1 : idx}
                    priority={idx < 2}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20 border border-dashed border-slate-300 bg-slate-50/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  NO MATCHING RECORDS FOUND
                </p>
                <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6 font-light">
                  No project entries found for the selected classification. Please select another discipline or view all commissions.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-6 py-3 bg-slate-900 text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer"
                >
                  View All Commissions
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Architectural Drawing Sheet Footer Note */}
          <div className="mt-16 sm:mt-20 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>ADVITH PROJECTS · ARCHITECTURAL &amp; CIVIL ARCHIVE</span>
            </div>
            <span>REGISTERED ENGINEERING &amp; CONSTRUCTION DATA</span>
          </div>
        </div>
      </section>

      {/* ── 5. 'From Drawing to Delivery' Process Transition Bridge ───── */}
      <ProjectProcessConnection />

      {/* ── 6. Premium Architectural Consultation Call-to-Action ──────── */}
      <section className="py-20 sm:py-24 bg-[#0A0F1D] text-white relative overflow-hidden border-t border-slate-800">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-red-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>COMMISSION CONSULTATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Have a project in mind?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            Bring us the brief. We&apos;ll take it from planning to execution with single-team
            accountability and craftsmanship that endures.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 px-8 py-4 border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono font-medium text-xs uppercase tracking-wider transition-all"
            >
              <span>View Services</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
