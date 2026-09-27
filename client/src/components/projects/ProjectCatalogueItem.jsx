import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler } from 'lucide-react'
import {
  getProjectTitle,
  getProjectCover,
  getProjectArea,
  CATEGORY_SHORT,
  CATEGORY_ACCENTS,
} from './projectHelpers'
import ArchitecturalBlueprintCanvas from './ArchitecturalBlueprintCanvas'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectCatalogueItem({ project, index = 0, priority = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const categoryShort = CATEGORY_SHORT[project.category] || project.category
  const accent = CATEGORY_ACCENTS[project.category] || CATEGORY_ACCENTS.construction
  const isCompleted = project.status === 'completed'
  const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`
  const coverImg = getProjectCover(project)

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.25),
        ease: EXPO,
      }}
      className="group flex flex-col bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── TOP: Architectural Registration Header ── */}
      <div className="px-5 py-3 bg-[#F9FAFB] border-b border-slate-200 flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-[11px]">{indexStr}</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900 tracking-wider uppercase text-[11px]">
            {project.id.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
              }`}
            />
            {isCompleted ? 'COMPLETED' : 'ONGOING'}
          </span>
        </div>
      </div>

      {/* ── CENTER: Large Project Image ── */}
      <Link
        to={`/projects/${project.id}`}
        className="relative overflow-hidden bg-slate-950 block aspect-[16/10] border-b border-slate-200"
        aria-label={`View project dossier for ${title}`}
      >
        {coverImg ? (
          <motion.img
            src={coverImg}
            alt={`${title} — ${project.location}`}
            className="w-full h-full object-cover"
            animate={isHovered && !shouldReduceMotion ? { scale: 1.035 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: EXPO }}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <ArchitecturalBlueprintCanvas project={project} />
        )}

        {/* Subtle Dark Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-90' : 'opacity-40'
          }`}
        />

        {/* Technical Corner Stamp */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-slate-950/85 backdrop-blur-sm text-white font-mono text-[9px] uppercase tracking-widest pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>{project.id.toUpperCase()}</span>
        </div>

        {/* Hover Action Pill */}
        <div
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md transition-all duration-200 pointer-events-none ${
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          }`}
        >
          <span>View Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>

      {/* ── BOTTOM: Architectural Metadata Sheet ── */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Discipline Category Line */}
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${accent.text}`}>
              {categoryShort}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {project.year || '2024'}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-red-600 transition-colors duration-200 tracking-tight leading-snug mb-3">
            <Link to={`/projects/${project.id}`}>{title}</Link>
          </h3>

          {/* Location & Covered Area Specs */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-600 mb-3 pb-3 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>{project.location}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>{area}</span>
            </span>
          </div>

          {/* Short Narrative Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        {/* Minimal Bottom Action Link with hairline trace */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            SINGLE ACCOUNTABILITY
          </span>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors"
          >
            <span>VIEW DOSSIER</span>
            <ArrowRight
              className={`w-3.5 h-3.5 text-red-600 transition-transform duration-200 ${
                isHovered ? 'translate-x-1' : ''
              }`}
            />
          </Link>
        </div>
      </div>

      {/* Thin Active Border Highlight on Card Hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.article>
  )
}

export default memo(ProjectCatalogueItem)
