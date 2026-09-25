import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getProjectTitle, getProjectCover, CATEGORY_SHORT } from './projectHelpers'
import ArchitecturalBlueprintCanvas from './ArchitecturalBlueprintCanvas'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectCatalogueItem({ project, index = 0, isLead = false, priority = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const title = getProjectTitle(project)
  const categoryShort = CATEGORY_SHORT[project.category] || project.category
  const isCompleted = project.status === 'completed'
  const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`

  const coverImg = getProjectCover(project)

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.2),
        ease: EXPO,
      }}
      className={`group select-none ${isLead ? 'col-span-full mb-12 sm:mb-16' : 'flex flex-col'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── 1. Photography / Architectural Visual ── */}
      <Link
        to={`/projects/${project.id}`}
        className={`relative overflow-hidden bg-slate-950 block border border-slate-200/80 ${
          isLead ? 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1]' : 'aspect-[16/10]'
        }`}
        aria-label={`View project ${title}`}
      >
        {coverImg ? (
          <motion.img
            src={coverImg}
            alt={`${title} — ${project.location}`}
            className="w-full h-full object-cover"
            animate={isHovered && !shouldReduceMotion ? { scale: 1.025 } : { scale: 1 }}
            transition={{ duration: 0.4, ease: EXPO }}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <ArchitecturalBlueprintCanvas project={project} />
        )}

        {/* Subtle dark gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-slate-950/20 transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Technical Corner Stamp */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-slate-950/85 text-white font-mono text-[10px] uppercase tracking-widest pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>{project.id.toUpperCase()}</span>
        </div>

        {/* Hover Action Pill */}
        <div
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          <span>View Project</span>
          <ArrowRight className="w-3.5 h-3.5 text-red-600" />
        </div>
      </Link>

      {/* ── 2. Information Sheet (Unboxed, line-separated) ── */}
      <div className="pt-4 sm:pt-5">
        {/* Top Identification Line */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">{indexStr}</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900 tracking-wider uppercase">
              {project.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 uppercase text-[10px] font-mono tracking-wider text-slate-600">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? 'bg-red-600' : 'bg-red-500 animate-pulse'
              }`}
            />
            <span className="font-semibold text-slate-900">
              {isCompleted ? 'COMPLETED' : 'ONGOING'}
            </span>
          </div>
        </div>

        {/* 1. PROJECT NAME */}
        <h3
          className={`font-bold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors duration-200 mt-3 mb-1.5 ${
            isLead ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}
        >
          <Link to={`/projects/${project.id}`}>{title}</Link>
        </h3>

        {/* 2. DISCIPLINE & 3. LOCATION & 4. AREA */}
        <div className="space-y-1 text-xs font-mono text-slate-600 uppercase mb-3">
          <div className="text-slate-500 font-medium tracking-wider">
            {categoryShort}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-700">
            <span>{project.location}</span>
            {project.area && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-900 font-semibold">{project.area}</span>
              </>
            )}
          </div>
        </div>

        {/* Scope / Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal mb-4">
          {project.description}
        </p>

        {/* Minimal Bottom Action Link */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 group-hover:text-red-600 transition-colors"
          >
            <span>VIEW PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] font-mono text-slate-400">
            AP // {project.id.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ProjectCatalogueItem)
