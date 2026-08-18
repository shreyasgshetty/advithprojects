import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, MapPin, Ruler, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react'
import { getProject } from '../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

const PLACEHOLDER_GRADIENTS = {
  residential: 'from-red-900 to-slate-900',
  commercial: 'from-amber-900 to-slate-900',
  architecture: 'from-blue-900 to-slate-900',
  interiors: 'from-rose-900 to-slate-900',
}

const SERVICE_LABELS = {
  construction: 'Civil Construction',
  architecture: 'Architecture',
  interiors: 'Interior Design',
}

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay, ease: EXPO },
  }
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to="/projects" replace />

  const gradient = PLACEHOLDER_GRADIENTS[project.category] ?? 'from-slate-800 to-slate-900'

  return (
    <div className="antialiased">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-24 lg:py-36`}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div {...rev(0)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${
              project.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
            {...rev(0.05)}
          >
            <CheckCircle2 className="w-3 h-3" />
            {project.status}
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            {...rev(0.1)}
          >
            {project.title}
          </motion.h1>

          <motion.div className="flex flex-wrap items-center gap-5 text-sm text-white/60 mb-8" {...rev(0.18)}>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4" />
              {project.area}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
          </motion.div>

          <motion.p className="text-lg text-white/70 font-light leading-relaxed max-w-2xl" {...rev(0.22)}>
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ── Project Details ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Scope */}
              <motion.div {...rev(0)}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Scope</h2>
                <p className="text-slate-600 leading-relaxed text-base">{project.scope}</p>
              </motion.div>

              {/* Highlights */}
              <motion.div {...rev(0.1)}>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Project Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-base">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services used */}
              <motion.div {...rev(0.18)}>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Services Delivered</h2>
                <div className="flex flex-wrap gap-3">
                  {project.services.map((s) => (
                    <Link
                      key={s}
                      to={`/services/${s}`}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-700 hover:text-red-600 hover:border-red-100 transition-all"
                    >
                      {SERVICE_LABELS[s] ?? s}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 sticky top-28 space-y-6"
                {...rev(0.12)}
              >
                <h3 className="font-bold text-slate-900">Project Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-slate-700 font-medium">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Area</p>
                    <p className="text-slate-700 font-medium">{project.area}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Category</p>
                    <p className="text-slate-700 font-medium capitalize">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      project.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                      }`} />
                      {project.status}
                    </span>
                  </div>
                </div>

                <hr className="border-slate-200" />
                <div>
                  <p className="text-xs text-slate-500 mb-4">Interested in a similar project?</p>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-red-500/20"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
