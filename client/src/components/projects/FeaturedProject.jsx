import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler, Compass, Building2, Layers } from 'lucide-react'
import {
  getProjectTitle,
  getProjectArea,
  getProjectCover,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
} from './projectHelpers'
import ArchitecturalBlueprintCanvas from './ArchitecturalBlueprintCanvas'

const EXPO = [0.16, 1, 0.3, 1]

const CATEGORY_ICONS = {
  architecture: Compass,
  construction: Building2,
  interiors: Layers,
}

function FeaturedProject({ project }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  if (!project) return null

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const coverImg = getProjectCover(project)
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category
  const isCompleted = project.status === 'completed'
  const CategoryIcon = CATEGORY_ICONS[project.category] || Building2

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EXPO }}
      className="bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 mb-14 sm:mb-20 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Top Architectural Registry Plate Header ── */}
      <div className="px-6 py-3.5 bg-[#F9FAFB] border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-bold text-red-600 tracking-wider uppercase text-[11px]">
            FEATURED COMMISSION
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-bold text-slate-900 tracking-wider uppercase text-[11px]">
            {project.id.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isCompleted
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
                }`}
            />
            {isCompleted ? 'COMPLETED' : 'ONGOING'}
          </span>
        </div>
      </div>

      {/* ── Asymmetric Showcase: LEFT (Dominant Image) + RIGHT (Technical Dossier) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT COLUMN: Dominant 16:9 Architectural Photography (7 cols) */}
        <Link
          to={`/projects/${project.id}`}
          className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[340px] lg:min-h-[460px] overflow-hidden bg-slate-950 block border-b lg:border-b-0 lg:border-r border-slate-200"
          aria-label={`View featured project dossier for ${title}`}
        >
          {coverImg ? (
            <motion.img
              src={coverImg}
              alt={`${title} — ${project.location}`}
              className="w-full h-full object-cover"
              animate={isHovered && !shouldReduceMotion ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: EXPO }}
              loading="eager"
            />
          ) : (
            <ArchitecturalBlueprintCanvas project={project} />
          )}

          {/* Blueprint subtle overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-90' : 'opacity-60'
              }`}
          />

          {/* Technical Corner Badge */}
          <div className="absolute top-4 left-5 flex items-center gap-2 px-3 py-1 bg-slate-950/85 backdrop-blur-sm border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>{project.id.toUpperCase()}</span>
          </div>

          {/* Floating Hover Indicator on Desktop */}
          <div
            className={`absolute bottom-4 right-4 hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-slate-950 text-xs font-mono font-bold tracking-wider uppercase shadow-lg transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100 bg-red-600 text-white' : 'translate-y-1 opacity-90'
              }`}
          >
            <span>VIEW PROJECT DOSSIER</span>
            <ArrowRight
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''
                }`}
            />
          </div>
        </Link>

        {/* RIGHT COLUMN: Technical Project Information (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Category Eyebrow & Project ID */}
            <div className="flex items-center justify-between text-xs font-mono pb-2.5 border-b border-slate-100 mb-4">
              <span className="text-red-600 font-bold uppercase tracking-widest text-[11px]">
                {CATEGORY_SHORT[project.category] || project.category} COMMISSION
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {project.id.toUpperCase()}
              </span>
            </div>

            {/* Main Project Name */}
            <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] font-bold tracking-tight text-slate-900 mb-4 group-hover:text-red-600 transition-colors duration-200 leading-[1.18]">
              <Link to={`/projects/${project.id}`}>{title}</Link>
            </h2>

            {/* Architectural Specs Ribbon: Location, Area, Discipline */}
            <div className="space-y-2 p-4 bg-[#F8F9FA] border border-slate-200 rounded-none text-xs font-mono mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">LOCATION</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  {project.location}
                </span>
              </div>
              <div className="h-px bg-slate-200/80" />
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">COVERED AREA</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  {area}
                </span>
              </div>
              <div className="h-px bg-slate-200/80" />
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">DISCIPLINE</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <CategoryIcon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Short Project Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6 line-clamp-3">
              {project.description}
            </p>

            {/* Key Deliverables Bullet Points */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2 mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                  COMMISSION HIGHLIGHTS
                </div>
                {project.highlights.slice(0, 3).map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              ACCOUNTABILITY: SINGLE TEAM
            </span>
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-slate-950 group-hover:text-red-600 transition-colors"
            >
              <span>VIEW PROJECT DOSSIER</span>
              <ArrowRight
                className={`w-4 h-4 text-red-600 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''
                  }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(FeaturedProject)
