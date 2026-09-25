import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Ruler,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Compass,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { getProject, projects } from '../../data/projects'
import {
  getProjectTitle,
  getProjectArea,
  getProjectCover,
  CATEGORY_LABELS,
  CATEGORY_SHORT,
} from '../../components/projects/projectHelpers'
import ArchitecturalBlueprintCanvas from '../../components/projects/ArchitecturalBlueprintCanvas'
import ProjectCatalogueItem from '../../components/projects/ProjectCatalogueItem'

const EXPO = [0.16, 1, 0.3, 1]

const SERVICE_LABELS = {
  construction: 'Civil Construction',
  architecture: 'Architecture & Planning',
  interiors: 'Turnkey Interior Design',
}

const CATEGORY_ICONS = {
  architecture: Compass,
  construction: Building2,
  interiors: Layers,
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProject(id)
  const shouldReduceMotion = useReducedMotion()
  const [selectedImg, setSelectedImg] = useState(null)

  if (!project) return <Navigate to="/projects" replace />

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const coverImg = getProjectCover(project)
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category
  const isCompleted = project.status === 'completed'
  const CategoryIcon = CATEGORY_ICONS[project.category] || Building2

  const galleryImages = (project.images && project.images.length > 0)
    ? project.images
    : [coverImg].filter(Boolean)

  // Related projects in the same discipline or other high-priority works
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.status === 'completed'))
    .slice(0, 3)

  const rev = (delay = 0, y = 16) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: shouldReduceMotion ? 0.25 : 0.55, delay: shouldReduceMotion ? 0 : delay, ease: EXPO },
  })

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ── 1. Project Documentation Cover Hero (Section 19) ───────── */}
      <section className="pt-24 pb-8 sm:pt-28 sm:pb-10 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Top Breadcrumb & Technical Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <Link to="/projects" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Project Archive</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-red-600 font-bold">{project.id.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>PROJECT DOSSIER // ADVITH RECORD</span>
            </div>
          </div>

          {/* Project Documentation Cover Header */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono">
              <span className="px-2.5 py-0.5 bg-red-50 border border-red-200 text-red-700 font-bold uppercase tracking-wider">
                {project.id.toUpperCase()}
              </span>
              <span className="text-slate-600 uppercase tracking-wider font-semibold">
                {categoryLabel}
              </span>
              <span className="text-slate-300">/</span>
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold font-mono text-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-red-600' : 'bg-red-500 animate-pulse'}`} />
                <span>{isCompleted ? 'COMPLETED' : 'ONGOING'}</span>
              </span>
            </div>

            {/* Hairline Divider */}
            <div className="h-px bg-slate-200 w-full mb-6" />

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-5 leading-[1.12]">
              {title}
            </h1>

            {/* Engineering Specs Ribbon */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-slate-600 mb-6 pb-6 border-b border-slate-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {project.location}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-red-600" />
                {area}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <CategoryIcon className="w-3.5 h-3.5 text-red-600" />
                {CATEGORY_SHORT[project.category] || project.category}
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Primary Showcase Photographic Plate (Section 19: [ LARGE PROJECT IMAGE ]) ── */}
      <section className="py-8 sm:py-10 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden border border-slate-200/90 bg-slate-900 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.2/1] shadow-sm">
            <img
              src={coverImg}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Subtle Technical Corner Stamp */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-slate-950/85 backdrop-blur-sm text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>{project.id.toUpperCase()} // ADVITH MASTER RECORD</span>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-slate-900 font-mono text-[10px] uppercase tracking-wider font-semibold pointer-events-none">
              {project.location}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Technical Dossier & Scope Specifications ───────────────── */}
      <section className="py-14 sm:py-18 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Architectural Scope */}
              <motion.div {...rev(0)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Engineering Scope &amp; Methodology</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                  Execution Framework
                </h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
                  {project.scope}
                </p>
              </motion.div>

              {/* Commission Highlights & Engineering Deliverables */}
              <motion.div {...rev(0.08)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Technical Specifications</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-5">
                  Key Commission Deliverables
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.highlights?.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-[#F8F9FA] border border-slate-200/90 rounded-lg flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-xs sm:text-sm font-medium leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery Section */}
              <motion.div {...rev(0.12)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Visual Documentation</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-5">
                  Project Gallery
                </h2>

                {galleryImages && galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.map((src, i) => (
                      <div
                        key={i}
                        className="overflow-hidden bg-slate-900 aspect-[16/10] border border-slate-200 group cursor-pointer relative"
                        onClick={() => setSelectedImg(src)}
                      >
                        <img
                          src={src}
                          alt={`${title} — Record ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400"
                        />
                        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono uppercase tracking-widest">
                          Expand View ↗
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-slate-200 overflow-hidden aspect-[16/10]">
                    <ArchitecturalBlueprintCanvas project={project} />
                  </div>
                )}
              </motion.div>

              {/* Disciplines Integrated */}
              <motion.div {...rev(0.16)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Disciplines Delivered</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                  Integrated Capabilities Applied
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.services?.map((s) => (
                    <Link
                      key={s}
                      to={`/services/${s}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FA] border border-slate-200 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-slate-800 hover:text-red-600 hover:border-red-200 transition-all"
                    >
                      <span>{SERVICE_LABELS[s] || s}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Architectural Dossier Sidebar Specification Sheet (5 cols) */}
            <div className="lg:col-span-5">
              <motion.aside
                className="bg-[#F8F9FA] border border-slate-200/90 rounded-xl p-5 sm:p-7 sticky top-28 space-y-6"
                {...rev(0.1)}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    PROJECT SPECIFICATION DOSSIER
                  </div>
                  <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-mono font-bold uppercase">
                    {project.id.toUpperCase()}
                  </span>
                </div>

                {/* Technical Specification Table */}
                <div className="space-y-3.5 text-xs font-mono divide-y divide-slate-200/80">
                  <div className="flex justify-between items-start pt-2 first:pt-0">
                    <span className="text-slate-400 uppercase tracking-wider">PROJECT</span>
                    <span className="text-slate-900 font-semibold text-right max-w-[200px]">{title}</span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">DISCIPLINE</span>
                    <span className="text-slate-900 font-semibold text-right capitalize">{project.category}</span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">LOCATION</span>
                    <span className="text-slate-900 font-semibold text-right">{project.location}</span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">COVERED AREA</span>
                    <span className="text-slate-900 font-semibold text-right">{area}</span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">EXECUTION STATUS</span>
                    <span
                      className={`inline-flex items-center gap-1 font-bold uppercase ${
                        isCompleted ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                      {project.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">ACCOUNTABILITY</span>
                    <span className="text-slate-900 font-semibold text-right">Single Coordinated Team</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-mono text-slate-500 leading-relaxed mb-4">
                    Inquire about architectural planning, civil construction, or turnkey interior execution for your site:
                  </p>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md shadow-red-600/20"
                  >
                    <span>Inquire About Similar Commission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Parallel Commissions Archive Section ──────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#F8F9FA] border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-slate-200">
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                  PORTFOLIO ARCHIVE // PARALLEL COMMISSIONS
                </p>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Related Projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
              >
                <span>Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p, idx) => (
                <ProjectCatalogueItem key={p.id} project={p} index={idx} isLead={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Bottom Navigation Return Strip ────────────────────────── */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Project Archive</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/services"
              className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all"
            >
              Explore Disciplines
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all"
            >
              Initiate Commission
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Images */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedImg}
              alt="Expanded documentation record"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-mono uppercase tracking-wider rounded border border-white/20"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
