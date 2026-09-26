import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Ruler,
  ArrowLeft,
  Building2,
  Compass,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
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

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const title = getProjectTitle(project)
  const area = getProjectArea(project)
  const coverImg = getProjectCover(project)
  const categoryLabel = project ? (CATEGORY_LABELS[project.category] || project.category) : ''
  const isCompleted = project?.status === 'completed'
  const CategoryIcon = project ? (CATEGORY_ICONS[project.category] || Building2) : Building2

  // Gather all unique images for gallery & lightbox
  const galleryImages = useMemo(() => {
    if (!project) return []
    const list = []
    if (project.images && project.images.length > 0) {
      list.push(...project.images)
    } else if (coverImg) {
      list.push(coverImg)
    }
    // Deduplicate in case coverImage is also in images array
    return Array.from(new Set(list.filter(Boolean)))
  }, [project, coverImg])

  // Related projects in the same discipline or other completed commissions
  const relatedProjects = useMemo(() => {
    if (!project) return []
    return projects
      .filter((p) => p.id !== project.id && (p.category === project.category || p.status === 'completed'))
      .slice(0, 3)
  }, [project])

  // Lightbox navigation handlers
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const nextImage = useCallback(() => {
    if (lightboxIndex === null || galleryImages.length <= 1) return
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }, [lightboxIndex, galleryImages.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null || galleryImages.length <= 1) return
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [lightboxIndex, galleryImages.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, nextImage, prevImage])

  // Dynamic editorial breakdown for Structured Story
  const storyBlocks = useMemo(() => {
    if (!project) return []
    return [
      {
        tag: 'SITE CONDITIONS & CONTEXT',
        title: 'Site Analysis & Topography',
        content: `Located in ${project.location}, the site required a tailored architectural response addressing climate, natural solar orientation, and spatial orientation to ensure functional efficiency and environmental harmony.`,
      },
      {
        tag: 'DESIGN INTENT & MATERIALITY',
        title: 'Architectural Philosophy',
        content:
          project.scope ||
          'A balanced design approach emphasizing structural integrity, authentic materials, and cohesive spatial circulation that accommodates contemporary living patterns.',
      },
      {
        tag: 'EXECUTION & METHODOLOGY',
        title: 'Single-Team Delivery',
        content:
          project.description ||
          'Executed with rigorous site quality controls, integrated engineering schedules, and direct accountability from structural foundation through to interior detailing.',
      },
    ]
  }, [project])

  if (!project) return <Navigate to="/projects" replace />

  const rev = (delay = 0, y = 20) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.55,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-slate-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ── 1. Full-Width Cinematic Project Header (Dossier Header) ───── */}
      <section className="pt-24 pb-8 sm:pt-28 sm:pb-12 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Top Breadcrumb & Technical Dossier Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-950 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Project Archive</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-300" />
              <span className="text-red-600 font-bold">{project.id.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>PROJECT OVERVIEW</span>
              </span>
              <span>·</span>
              <span className="font-semibold text-slate-800">
                STATUS: {isCompleted ? 'COMPLETED' : 'ONGOING'}
              </span>
            </div>
          </div>

          {/* Dossier Code & Document Status */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
              <span className="px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 font-bold uppercase tracking-wider">
                PROJECT {project.id.toUpperCase()}
              </span>
              <span className="text-slate-600 uppercase tracking-wider font-semibold">
                {categoryLabel}
              </span>
              <span className="text-slate-300">/</span>
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold font-mono text-slate-700">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCompleted ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
                  }`}
                />
                <span>DOCUMENT STATUS: {isCompleted ? 'COMPLETED' : 'ONGOING'}</span>
              </span>
            </div>

            {/* Hairline Divider */}
            <div className="h-px bg-slate-200 w-full mb-6" />

            {/* Large Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 mb-6 leading-[1.12]">
              {title}
            </h1>

            {/* Technical Metadata Ribbon: Location, Area, Discipline, Status */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono text-slate-600 mb-6 pb-6 border-b border-slate-200">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="text-slate-400 text-[10px] uppercase">LOCATION:</span>
                <span className="font-semibold text-slate-900">{project.location}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-2">
                <Ruler className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="text-slate-400 text-[10px] uppercase">COVERED AREA:</span>
                <span className="font-semibold text-slate-900">{area}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-2">
                <CategoryIcon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="text-slate-400 text-[10px] uppercase">DISCIPLINE:</span>
                <span className="font-semibold text-slate-900">
                  {CATEGORY_SHORT[project.category] || project.category}
                </span>
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Primary Showcase Photographic Plate ────────────────────── */}
      <section className="py-8 sm:py-12 bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className="relative overflow-hidden border border-slate-300/80 bg-slate-950 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.2/1] shadow-sm group cursor-pointer"
            onClick={() => setLightboxIndex(0)}
          >
            {coverImg ? (
              <motion.img
                src={coverImg}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            ) : (
              <ArchitecturalBlueprintCanvas project={project} />
            )}

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Technical Corner Stamp */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-slate-950/85 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-widest pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>{project.id.toUpperCase()}</span>
            </div>

            {/* Expand Lightbox Button */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-1.5 bg-white text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand Plate</span>
            </div>

            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-wider pointer-events-none hidden sm:block">
              {project.location} · {area}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Technical Dossier, Structured Story & Specifications ───── */}
      <section className="py-14 sm:py-18 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-14">
              {/* Architectural Story: Two-Column / Structured Information Blocks */}
              <motion.div {...rev(0)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>PROJECT APPROACH</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  Engineering Scope &amp; Methodology
                </h2>

                <div className="space-y-6 text-slate-600">
                  {storyBlocks.map((block, idx) => (
                    <div
                      key={block.tag}
                      className="p-5 sm:p-6 bg-[#F9FAFB] border border-slate-200/90 rounded-none relative"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                        0{idx + 1} · {block.tag}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        {block.title}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed font-light text-slate-600">
                        {block.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Commission Highlights & Engineering Deliverables (Numbered 01, 02, 03...) */}
              <motion.div {...rev(0.08)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>TECHNICAL SPECIFICATIONS &amp; DELIVERABLES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  Key Commission Deliverables
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights?.map((h, i) => {
                    const numStr = i < 9 ? `0${i + 1}` : `${i + 1}`
                    return (
                      <div
                        key={i}
                        className="p-4 bg-[#F8F9FA] border border-slate-200 rounded-none flex items-start gap-3.5"
                      >
                        <span className="w-6 h-6 rounded-none bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {numStr}
                        </span>
                        <div>
                          <span className="text-slate-900 text-xs sm:text-sm font-medium leading-snug block">
                            {h}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-1">
                            QUALITY VERIFIED
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Asymmetric Editorial Project Gallery */}
              <motion.div {...rev(0.12)}>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span>PROJECT GALLERY</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {galleryImages.length} {galleryImages.length === 1 ? 'PLATE' : 'PLATES'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
                  Project Gallery
                </h2>

                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.map((src, i) => {
                      // Controlled asymmetry: First image is wide/featured if multiple exist
                      const isWide = i === 0 && galleryImages.length > 2
                      return (
                        <div
                          key={i}
                          className={`overflow-hidden bg-slate-950 border border-slate-200 group cursor-pointer relative ${
                            isWide ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[16/10]'
                          }`}
                          onClick={() => setLightboxIndex(i)}
                        >
                          <img
                            src={src}
                            alt={`${title} — Photographic Record ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono uppercase tracking-widest gap-2">
                            <Maximize2 className="w-4 h-4 text-red-400" />
                            <span>Expand Record [0{i + 1}]</span>
                          </div>
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white font-mono text-[9px] uppercase tracking-wider pointer-events-none">
                            RECORD 0{i + 1}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="border border-slate-200 overflow-hidden aspect-[16/10]">
                    <ArchitecturalBlueprintCanvas project={project} />
                  </div>
                )}
              </motion.div>

              {/* Disciplines Integrated */}
              <motion.div {...rev(0.16)}>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-600 mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>DISCIPLINES INTEGRATED</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                  Integrated Capabilities Applied
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.services?.map((s) => (
                    <Link
                      key={s}
                      to={`/services/${s}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F8F9FA] border border-slate-200 text-xs font-mono uppercase tracking-wider font-semibold text-slate-800 hover:text-red-600 hover:border-red-300 transition-all shadow-sm"
                    >
                      <span>{SERVICE_LABELS[s] || s}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Architectural Dossier Sidebar Specification Sheet (5 cols) */}
            <div className="lg:col-span-5">
              <motion.aside
                className="bg-[#F9FAFB] border border-slate-200 p-6 sm:p-8 sticky top-24 space-y-6"
                {...rev(0.1)}
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-700 font-bold">
                    SPECIFICATION DOSSIER
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-950 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    {project.id.toUpperCase()}
                  </span>
                </div>

                {/* Technical Specification Table */}
                <div className="space-y-3.5 text-xs font-mono divide-y divide-slate-200">
                  <div className="flex justify-between items-start pt-2 first:pt-0">
                    <span className="text-slate-400 uppercase tracking-wider">PROJECT</span>
                    <span className="text-slate-900 font-bold text-right max-w-[200px]">
                      {title}
                    </span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">DISCIPLINE</span>
                    <span className="text-slate-900 font-semibold text-right capitalize">
                      {categoryLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">LOCATION</span>
                    <span className="text-slate-900 font-semibold text-right">
                      {project.location}
                    </span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">COVERED AREA</span>
                    <span className="text-slate-900 font-semibold text-right">{area}</span>
                  </div>

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">EXECUTION STATUS</span>
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold uppercase ${
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

                  <div className="flex justify-between items-start pt-3">
                    <span className="text-slate-400 uppercase tracking-wider">ACCOUNTABILITY</span>
                    <span className="text-slate-900 font-semibold text-right">
                      Single Coordinated Team
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200">
                  <p className="text-xs font-mono text-slate-500 leading-relaxed mb-5">
                    Interested in architectural design, civil execution, or turnkey interiors for your space?
                  </p>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/20"
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

      {/* ── 4. Continue Through the Archive (Related Projects) ─────────── */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F8F9FA] border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-red-600 mb-1 font-semibold">
                  PARALLEL COMMISSIONS
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Continue Through the Archive
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors"
              >
                <span>Full Archive Register</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-600" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p, idx) => (
                <ProjectCatalogueItem key={p.id} project={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Bottom Navigation Return Strip ─────────────────────────── */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Project Archive</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/services"
              className="px-5 py-2.5 border border-slate-200 hover:border-slate-400 text-slate-800 text-xs font-mono font-semibold uppercase tracking-wider transition-all"
            >
              Explore Disciplines
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              Initiate Commission
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Fullscreen Lightbox Modal (Keyboard & Accessible) ──────── */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Top Control Bar */}
            <div
              className="absolute top-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="tracking-wider uppercase">
                  PLATE 0{lightboxIndex + 1} OF 0{galleryImages.length}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-red-600 text-white text-xs font-mono uppercase tracking-wider transition-colors border border-white/10 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <span>Close [ESC]</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div
              className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={galleryImages[lightboxIndex]}
                src={galleryImages[lightboxIndex]}
                alt={`${title} — Record ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EXPO }}
              />

              {/* Previous Image Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Image Button */}
              {galleryImages.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div
              className="absolute bottom-4 text-center text-white/60 font-mono text-[11px] tracking-wider uppercase"
              onClick={(e) => e.stopPropagation()}
            >
              {title} — {project.location} ({area})
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
