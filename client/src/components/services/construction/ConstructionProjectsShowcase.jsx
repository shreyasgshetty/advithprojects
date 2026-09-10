import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { projects } from '../../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

const GRADIENTS = {
  red: 'from-slate-900 via-slate-900 to-red-950/80',
  amber: 'from-slate-900 via-slate-900 to-amber-950/80',
  rose: 'from-slate-900 via-slate-900 to-rose-950/80',
}

export default function ConstructionProjectsShowcase() {
  const shouldReduceMotion = useReducedMotion()

  const anim = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  // Filter real projects from projects.js with construction service
  const constructionProjects = projects.filter((p) => p.services.includes('construction'))

  return (
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0]" id="projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div className="max-w-2xl" {...anim(0)}>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
              <span>07</span>
              <span className="text-slate-300">/</span>
              <span>Portfolio Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Selected Civil Construction Projects
            </h2>
          </motion.div>
          <motion.div {...anim(0.1)}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700 transition-colors"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Project Cards: Editorial Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {constructionProjects.map((project, idx) => {
            const gradient = GRADIENTS[project.color] || GRADIENTS.red

            return (
              <motion.article
                key={project.id}
                className="group bg-white border border-[#E7E5E0] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:border-slate-400 hover:shadow-lg transition-all flex flex-col justify-between"
                {...anim(idx * 0.08)}
              >
                {/* Visual Header Block */}
                <div className={`h-48 bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between relative text-white border-b border-slate-100`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm text-[11px] font-mono uppercase tracking-wider text-slate-200">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono mb-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{project.location}</span>
                      {project.area && <span>· {project.area}</span>}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-3 mb-6">
                    {project.scope}
                  </p>

                  <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] group-hover:text-red-700 transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                    <span className="font-mono text-xs text-slate-400">
                      {project.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
