import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler, CheckCircle2, Clock } from 'lucide-react'
import { getProjectTitle, getProjectArea, CATEGORY_LABELS } from './projectHelpers'
import ArchitecturalBlueprintCanvas from './ArchitecturalBlueprintCanvas'

const EXPO = [0.16, 1, 0.3, 1]

export default function FeaturedProject({ project }) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  if (!project) return null

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category
  const isCompleted = project.status === 'completed'

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EXPO }}
      className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-12 sm:mb-16 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Top Header Strip ── */}
      <div className="px-5 py-3 bg-[#F8F9FA] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-bold text-red-600">FEATURED COMMISSION // 01</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800 uppercase">{project.id.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 uppercase hidden sm:inline">{categoryLabel}</span>
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
              <Clock className="w-3 h-3 text-amber-600" />
            )}
            {project.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Visual Viewport — Large image / CAD Canvas (7 cols on lg) */}
        <Link
          to={`/projects/${project.id}`}
          className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-slate-950 block order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-slate-200"
          aria-label={`View featured project ${title}`}
        >
          {project.coverImage ? (
            <motion.img
              src={project.coverImage}
              alt={`${title} — ${project.location}`}
              className="w-full h-full object-cover"
              animate={isHovered && !shouldReduceMotion ? { scale: 1.03 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: EXPO }}
              loading="eager"
            />
          ) : (
            <ArchitecturalBlueprintCanvas project={project} />
          )}

          {/* Blueprint subtle overlay & coordinates */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Corner crosshairs */}
          <div className="absolute top-3 left-3 text-white/40 text-xs font-mono select-none">+</div>
          <div className="absolute top-3 right-3 text-white/40 text-xs font-mono select-none">+</div>

          {/* Technical Corner Badge */}
          <div className="absolute top-4 left-6 flex items-center gap-2 px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono tracking-widest uppercase text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            SITE RECORD // {project.id.toUpperCase()}
          </div>

          {/* Floating Hover Indicator on Desktop */}
          <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded text-xs font-mono font-bold tracking-wider text-slate-900 shadow-md group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
            <span>EXPLORE COMMISSION</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Editorial Information Sheet (5 cols on lg) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between order-2 lg:order-1 bg-white">
          <div>
            {/* Category eyebrow */}
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              COMMISSION ARCHIVE // {project.category.toUpperCase()}
            </p>

            {/* Main Project Title */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4 group-hover:text-red-600 transition-colors duration-200">
              <Link to={`/projects/${project.id}`}>{title}</Link>
            </h2>

            {/* Architectural specs: Location & Area */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F8F9FA] border border-slate-200/80 rounded-lg text-xs font-mono mb-5">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase tracking-wider mb-0.5">LOCATION</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                  {project.location}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase tracking-wider mb-0.5">COVERED AREA</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-red-600 shrink-0" />
                  {area}
                </span>
              </div>
            </div>

            {/* Narrative description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </p>

            {/* Key highlights checklist */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2 mb-6">
                {project.highlights.slice(0, 3).map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              DISCIPLINE: {project.services?.join(' + ').toUpperCase()}
            </span>
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-900 group-hover:text-red-600 transition-colors"
            >
              <span>Explore Dossier</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
