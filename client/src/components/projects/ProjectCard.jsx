import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler } from 'lucide-react'
import { getProjectTitle, getProjectArea, CATEGORY_SHORT, CATEGORY_ACCENTS } from './projectHelpers'
import ArchitecturalBlueprintCanvas from './ArchitecturalBlueprintCanvas'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectCard({ project, index = 0, priority = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const categoryShort = CATEGORY_SHORT[project.category] || project.category
  const accents = CATEGORY_ACCENTS[project.category] || CATEGORY_ACCENTS.architecture
  const isCompleted = project.status === 'completed'
  const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : 0.5,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.25),
        ease: EXPO,
      }}
      className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:border-slate-400/80 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Top Architectural Header Bar ── */}
      <div className="px-4 py-2.5 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold tracking-wider">{indexStr}</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 tracking-wider uppercase">
            {project.id.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${
              isCompleted ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
              }`}
            />
            {project.status}
          </span>
        </div>
      </div>

      {/* ── Image Viewport / Architectural CAD Plinth ── */}
      <Link
        to={`/projects/${project.id}`}
        className="relative aspect-[16/10] overflow-hidden bg-slate-950 block border-b border-slate-100"
        aria-label={`View project ${title}`}
      >
        {project.coverImage ? (
          <motion.img
            src={project.coverImage}
            alt={`${title} — ${project.location}`}
            className="w-full h-full object-cover"
            animate={isHovered && !shouldReduceMotion ? { scale: 1.03 } : { scale: 1 }}
            transition={{ duration: 0.45, ease: EXPO }}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <ArchitecturalBlueprintCanvas project={project} />
        )}

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Discipline Tag Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${accents.badge} border backdrop-blur-md`}>
            {categoryShort}
          </span>
        </div>

        {/* Hover Action Indicator in bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200 shadow-sm">
          <span>View</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* ── Architectural Information Sheet ── */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Typology and Location Ribbon */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              {project.category.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Ruler className="w-3 h-3 text-slate-400" />
              {area}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-red-600 transition-colors duration-200">
            <Link to={`/projects/${project.id}`}>{title}</Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{project.location}</span>
          </div>

          {/* Scope / Description Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-normal">
            {project.description}
          </p>
        </div>

        {/* Bottom Technical Specs Divider */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            {project.services?.join(' · ').toUpperCase() || 'TURNKEY'}
          </span>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-wider"
          >
            <span>Dossier</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ProjectCard)
