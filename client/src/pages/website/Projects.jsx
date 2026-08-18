import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler, CheckCircle2 } from 'lucide-react'
import { projects, filterProjects } from '../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

const CATEGORY_COLORS = {
  residential: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
  commercial: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  architecture: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  interiors: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
}

const PLACEHOLDER_GRADIENTS = [
  'from-slate-800 to-slate-900',
  'from-slate-700 to-slate-800',
  'from-red-900 to-slate-900',
  'from-amber-900 to-slate-900',
  'from-rose-900 to-slate-900',
  'from-slate-800 to-red-900',
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'completed', label: 'Completed' },
  { id: 'ongoing', label: 'Ongoing' },
]

function ProjectCard({ project, index }) {
  const colorKey = project.category in CATEGORY_COLORS ? project.category : 'residential'
  const colors = CATEGORY_COLORS[colorKey]
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EXPO }}
      className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-200 transition-all"
    >
      {/* Image / Placeholder */}
      <div className={`h-52 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {/* Architectural grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-0.5 bg-white/20 rounded" />
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">{project.category}</p>
          <div className="w-8 h-0.5 bg-white/20 rounded" />
        </div>

        {/* Status badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          project.status === 'completed'
            ? 'bg-emerald-500/90 text-white'
            : 'bg-amber-500/90 text-white'
        }`}>
          {project.status}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-red-600 transition-colors">
            {project.title}
          </h3>
          <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="w-3 h-3" />
            {project.area}
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
          {project.description}
        </p>

        <Link
          to={`/projects/${project.slug}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          View Project
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filtered = filterProjects(activeFilter)

  return (
    <div className="antialiased">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-800/40 bg-red-900/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Portfolio
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
          >
            Our Projects &amp; <br /><span className="text-red-400">Creations</span>
          </motion.h1>
          <motion.p
            className="text-lg text-slate-300 font-light max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
          >
            A representative selection of construction, architectural, and interior design work
            spanning residential and commercial sectors.
          </motion.p>
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeFilter === f.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {f.label}
                {activeFilter === f.id && (
                  <span className="ml-2 text-xs opacity-70">({filtered.length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-slate-400 text-lg">No projects found for this filter.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data note */}
          <motion.p
            className="text-center text-xs text-slate-400 mt-12 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The portfolio above shows representative project categories. A full interactive gallery
            with real photography and detailed case studies will be published in the next release.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Have a project in mind?
          </motion.h2>
          <motion.div
            className="flex flex-wrap gap-4 justify-center mt-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm rounded-2xl transition-all bg-white"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
