import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler } from 'lucide-react'
import { projects } from '../../data/projects'
import {
  getProjectTitle,
  getProjectArea,
  getProjectCover,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
  calculateProjectStats,
} from '../projects/projectHelpers'

function HomeFeaturedProjects() {
  const [hoveredId, setHoveredId] = useState(null)

  const stats = calculateProjectStats(projects)

  // Curate 3 prominent projects representing the disciplines: AP-004 (Construction), AP-001 (Architecture), AP-007 (Interiors)
  const primaryProject = projects.find((p) => p.id === 'ap-004') || projects[0]
  const secondaryProjects = projects.filter((p) => p.id === 'ap-001' || p.id === 'ap-007')

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                SELECTED WORK
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Spaces We've Built With Purpose.
            </h2>
          </div>

          {/* Dynamic Technical Ledger Pill & View All link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded">
              <span className="text-red-600 font-bold">PROJECT ARCHIVE:</span>{' '}
              <span className="font-bold text-slate-900">{stats.total} COMMISSIONS</span>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
            >
              <span>VIEW FULL REGISTER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Magazine-Style Asymmetric Composition: Large Lead Project + 2 Secondary Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* ── 1. PRIMARY FEATURED COMMISSION (7 Columns) ── */}
          {primaryProject && (
            <div
              className="lg:col-span-7 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 group relative"
              onMouseEnter={() => setHoveredId(primaryProject.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Technical Registry Top Bar */}
              <div className="px-6 py-3 bg-[#F9FAFB] border-b border-slate-200 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-bold text-slate-900 uppercase">
                    FEATURED COMMISSION · {primaryProject.id.toUpperCase()}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase">
                  COMPLETED
                </span>
              </div>

              {/* Large Image with Blueprint Overlay */}
              <Link
                to={`/projects/${primaryProject.id}`}
                className="relative aspect-[16/10] overflow-hidden bg-slate-950 block border-b border-slate-200"
              >
                <img
                  src={getProjectCover(primaryProject)}
                  alt={getProjectTitle(primaryProject)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Fixed high-contrast hover pill (NO white-on-white bug) */}
                <div
                  className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md transition-all duration-200 pointer-events-none ${
                    hoveredId === primaryProject.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                  }`}
                >
                  <span>View Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Project Metadata */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-red-600 font-bold uppercase tracking-wider">
                    {CATEGORY_LABELS[primaryProject.category] || primaryProject.category}
                  </span>
                  <span className="text-slate-400">KARNATAKA</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-red-600 transition-colors">
                  <Link to={`/projects/${primaryProject.id}`}>
                    {getProjectTitle(primaryProject)}
                  </Link>
                </h3>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600 mb-4 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{primaryProject.location}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{getProjectArea(primaryProject)}</span>
                  </span>
                </div>

                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  {primaryProject.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    SINGLE ACCOUNTABILITY
                  </span>
                  <Link
                    to={`/projects/${primaryProject.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors"
                  >
                    <span>EXPLORE PROJECT DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── 2. TWO SUPPORTING PROJECTS (5 Columns) ── */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {secondaryProjects.map((project) => {
              const title = getProjectTitle(project)
              const area = getProjectArea(project)
              const coverImg = getProjectCover(project)
              const categoryShort = CATEGORY_SHORT[project.category] || project.category

              return (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 group"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-0 items-stretch">
                    {/* Image Column */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-950 block border-b sm:border-b-0 sm:border-r border-slate-200"
                    >
                      <img
                        src={coverImg}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/90 text-white font-mono text-[9px] uppercase tracking-wider">
                        {project.id.toUpperCase()}
                      </div>
                    </Link>

                    {/* Metadata Column */}
                    <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                          <span className="font-bold text-red-600 uppercase">
                            {categoryShort}
                          </span>
                          <span className="text-emerald-700 font-semibold text-[10px]">
                            COMPLETED
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
                          <Link to={`/projects/${project.id}`}>{title}</Link>
                        </h4>

                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 mb-2">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span>{project.location.split(',')[0]}</span>
                          <span className="text-slate-300">·</span>
                          <span>{area}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors"
                        >
                          <span>VIEW DOSSIER</span>
                          <ArrowRight className="w-3 h-3 text-red-600" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Technical Footer Bar for Selected Work */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>DISCIPLINES REPRESENTED:</span>
            <span className="font-bold text-slate-900">01 ARCHITECTURE · 03 CONSTRUCTION · 02 INTERIORS</span>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-bold text-red-600 hover:text-red-700"
          >
            <span>ACCESS COMPLETE PROJECT CATALOGUE ({stats.total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeFeaturedProjects)
