import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects, filterProjects } from '../../data/projects'
import ProjectsHero from '../../components/projects/ProjectsHero'
import ProjectArchiveRegister from '../../components/projects/ProjectArchiveRegister'
import ProjectCatalogueItem from '../../components/projects/ProjectCatalogueItem'
import ProjectProcessConnection from '../../components/projects/ProjectProcessConnection'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

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
      {/* ── 1. Restrained Architectural Construction Hero ─────────────── */}
      <ProjectsHero totalProjects={projects.length < 10 ? `0${projects.length}` : `${projects.length}`} />

      {/* ── 2. Company Project Register Index (No Pill Buttons) ───────── */}
      <ProjectArchiveRegister activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

      {/* ── 3. Structured Construction Portfolio Catalogue ───────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Active Register Classification Status */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-3 border-b border-slate-200">
            <div>
              <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-1">
                REGISTER INDEX // {activeFilter.toUpperCase()}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {activeFilter === 'all'
                  ? 'All Documented Commissions'
                  : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Commissions`}
              </h2>
            </div>

            <div className="text-xs font-mono text-slate-500">
              CATALOGUED <span className="font-bold text-slate-900">{filtered.length < 10 ? `0${filtered.length}` : filtered.length}</span> OF{' '}
              <span className="font-bold text-slate-900">{projects.length < 10 ? `0${projects.length}` : projects.length}</span> REGISTERED COMMISSIONS
            </div>
          </div>

          {/* Lead Project Plate (Prominent 16:9 / 21:9 unboxed presentation on 'All') */}
          {featured && (
            <div className="mb-14 sm:mb-16">
              <ProjectCatalogueItem
                key={featured.id}
                project={featured}
                index={0}
                isLead={true}
                priority={true}
              />
            </div>
          )}

          {/* 2-Column Construction Portfolio Grid */}
          <AnimatePresence mode="popLayout">
            {gridProjects.length > 0 ? (
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-12 sm:gap-y-16"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {gridProjects.map((project, idx) => (
                  <ProjectCatalogueItem
                    key={project.id}
                    project={project}
                    index={activeFilter === 'all' ? idx + 1 : idx}
                    isLead={false}
                    priority={idx < 2}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20 border border-dashed border-slate-200 bg-slate-50/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  No Matching Records Found
                </p>
                <p className="text-slate-600 text-sm max-w-sm mx-auto mb-5 font-light">
                  No project entries found for the selected classification. Please reset or choose another discipline.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer"
                >
                  View All Commissions
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Architectural Drawing Sheet Footer Note */}
          <div className="mt-16 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>ADVITH PROJECTS // ARCHITECTURAL &amp; CIVIL ARCHIVE 2026</span>
            </div>
            <span>REGISTERED ENGINEERING &amp; CONSTRUCTION DATA</span>
          </div>
        </div>
      </section>

      {/* ── 4. 'How We Build' Process Transition Connection ─────────── */}
      <ProjectProcessConnection />

      {/* ── 5. Professional Construction Call-to-Action ───────────────── */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-red-400 mb-2.5">
            HAVE A PROJECT IN MIND?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Let&apos;s discuss how we can design, build and deliver it.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-8">
            From structural civil execution to architectural planning and turnkey interiors,
            our single team provides complete accountability across every stage.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono font-semibold text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 px-7 py-3.5 border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono font-medium text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore Disciplines</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
