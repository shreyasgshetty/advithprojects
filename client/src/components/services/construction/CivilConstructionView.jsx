import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2,
  Compass,
  Layers,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  MapPin,
} from 'lucide-react'
import { projects } from '../../../data/projects'
import { services } from '../../../data/services'
import { WHATSAPP_URL } from '../../../config/contact'
import ScrollHorizontalSection from './ScrollHorizontalSection'
import ConstructionCapabilitiesWheel from './ConstructionCapabilitiesWheel'
import ProjectTypesBlueprint from './ProjectTypesBlueprint'

const EXPO = [0.16, 1, 0.3, 1]

const HERO_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

const RED_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

const PROJ_GRADIENTS = {
  red: 'from-red-950 via-slate-900 to-slate-950',
  amber: 'from-amber-950 via-slate-900 to-slate-950',
  rose: 'from-rose-950 via-slate-900 to-slate-950',
}

/**
 * CivilConstructionView
 * Cinematic, scroll-driven horizontal storytelling experience exclusively for
 * `/services/construction`.
 *
 * Sequence:
 * 1. Hero (Vertical)
 * 2. At-a-Glance Strip (Vertical)
 * 3. Section 01: Construction Capabilities (Pinned Horizontal · 8 items)
 * 4. Section 02: Who Is This For (Pinned Horizontal · 5 items)
 * 5. Section 03: Our Process Journey (Pinned Horizontal · 7 stages)
 * 6. Section 04: Deliverables & Specifications (Pinned Horizontal · 6 items)
 * 7. Section 05: Construction Commitments (Pinned Horizontal · 6 items)
 * 8. Section 06: Related Construction Projects (Pinned Horizontal · dynamic)
 * 9. Other Services (Vertical)
 * 10. Final CTA (Vertical)
 * 11. Mobile Sticky CTA
 */
export default function CivilConstructionView({ service }) {
  const shouldReduceMotion = useReducedMotion()
  const [stickyVisible, setStickyVisible] = useState(false)

  // Dynamic related projects filtered from projects data
  const relatedProjects = projects.filter((p) => p.services.includes('construction'))
  const otherServices = services.filter((s) => s.slug !== 'construction')

  // Mobile sticky CTA visibility
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 350)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Staged entrance helper for Hero
  const heroMk = (delay, y = 24) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.7,
      delay: shouldReduceMotion ? delay * 0.3 : delay,
      ease: EXPO,
    },
  })

  return (
    <div className="antialiased selection:bg-red-500 selection:text-white">
      {/* ── 1. HERO (VERTICAL) ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-36 text-white border-b border-slate-800">
        <motion.div
          className="absolute inset-0"
          style={HERO_GRID_BG}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.9, ease: EXPO }}
        />

        {/* Structural Blueprint Glow */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 65%)' }}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, delay: 0.1, ease: EXPO }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-widest flex-wrap"
            aria-label="Breadcrumb"
            {...heroMk(0.05, 12)}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-red-400 font-semibold" aria-current="page">Civil Construction</span>
          </motion.nav>

          {/* Icon Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8"
            {...heroMk(0.12, 16)}
          >
            <Building2 className="w-4 h-4 text-red-500" />
            <span>Structural Engineering & Construction</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl"
            {...heroMk(0.22, 32)}
          >
            Built to last.{' '}
            <span className="text-red-500">Delivered with precision.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mb-10"
            {...heroMk(0.35, 20)}
          >
            {service.heroDescription}
          </motion.p>

          {/* Hero CTAs */}
          <motion.div className="flex flex-wrap gap-4 items-center" {...heroMk(0.48, 16)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/25 transition-all"
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 border border-white/20 hover:border-white text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. AT A GLANCE STRIP (VERTICAL) ───────────────────────── */}
      <section className="py-8 bg-white border-b border-slate-100" aria-label="Civil Construction at a glance">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="pt-3 lg:pt-0 first:pt-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Best For
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {service.atAGlance.bestFor.join(' · ')}
              </p>
            </div>
            <div className="pt-3 lg:pt-0 lg:pl-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Core Focus
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {service.atAGlance.coreFocus.join(' · ')}
              </p>
            </div>
            <div className="pt-3 lg:pt-0 lg:pl-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Typical Scope
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {service.atAGlance.typicalScope.join(' · ')}
              </p>
            </div>
            <div className="pt-3 lg:pt-0 lg:pl-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Process Stages
              </p>
              <p className="text-sm font-semibold text-red-600">
                {service.atAGlance.processStageCount} Coordinated Stages →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SECTION 01 — CAPABILITIES (SCROLL-DRIVEN WHEEL + HOUSE BLUEPRINT) ── */}
      <ConstructionCapabilitiesWheel capabilities={service.capabilities} />

      {/* ── 4. SECTION 02 — WHO IS THIS FOR (BLUEPRINT → BUILT FORM TABLE) ── */}
      <ProjectTypesBlueprint projectTypes={service.whoFor} />

      {/* ── 5. SECTION 03 — OUR PROCESS (STANDARD ARCHITECTURAL TIMELINE · READY FOR FUTURE ANIMATION) ── */}
      <ScrollHorizontalSection
        subtitle="Section 03 · Execution Timeline"
        title="Our Construction Process"
        description="A rigorous 7-stage engineering methodology from initial site assessment to final keys handover."
        totalItems={service.process.length}
        theme="dark"
      >
        {service.process.map((step, i) => (
          <article
            key={step.step}
            className="w-[85vw] sm:w-[440px] lg:w-[480px] h-[460px] sm:h-[480px] shrink-0 p-8 sm:p-10 rounded-3xl bg-slate-800 border border-slate-700/80 shadow-2xl flex flex-col justify-between hover:border-red-500 transition-all select-none relative overflow-hidden group"
          >
            {/* Top Stage Progression Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-sm font-bold text-white">
                  {step.step}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  Stage {step.step} of 07
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-red-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* Bottom Technical Milestone */}
            <div className="pt-6 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Milestone</span>
              </span>
              <span className="font-mono text-slate-500">
                {i === service.process.length - 1 ? 'Project Completion' : 'Next Stage Ready →'}
              </span>
            </div>
          </article>
        ))}
      </ScrollHorizontalSection>

      {/* ── 6. SECTION 04 — DELIVERABLES (PINNED HORIZONTAL · 6 ITEMS) ── */}
      <ScrollHorizontalSection
        subtitle="Section 04 · Scope & Handover"
        title="What You Receive / Deliverables"
        description="Tangible documentation, structural guarantees, and turnkey handover packages for every build."
        totalItems={service.deliverables.length}
        theme="light"
      >
        {service.deliverables.map((item, i) => (
          <article
            key={item.label}
            className="w-[85vw] sm:w-[420px] lg:w-[460px] h-[460px] sm:h-[480px] shrink-0 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-red-300 transition-all select-none relative"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-200">
                  #{String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                {item.label}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-red-500" /> Complete Documentation
              </span>
              <span className="font-mono uppercase text-slate-400">Handover Package</span>
            </div>
          </article>
        ))}
      </ScrollHorizontalSection>

      {/* ── 7. SECTION 05 — COMMITMENTS (PINNED HORIZONTAL · 6 ITEMS) ── */}
      <ScrollHorizontalSection
        subtitle="Section 05 · Quality & Trust"
        title="Construction Commitments"
        description="Our uncompromised standards in materials, site safety, schedule adherence, and structural integrity."
        totalItems={service.principles.length}
        theme="light"
      >
        {service.principles.map((item, i) => (
          <article
            key={item.title}
            className="w-[85vw] sm:w-[420px] lg:w-[460px] h-[460px] sm:h-[480px] shrink-0 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-red-200 transition-all select-none relative"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-300">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-red-600 font-semibold">
                ★ Guaranteed Standard
              </span>
              <span className="font-mono uppercase text-slate-400">Site Governance</span>
            </div>
          </article>
        ))}
      </ScrollHorizontalSection>

      {/* ── 8. SECTION 06 — RELATED PROJECTS (PINNED HORIZONTAL · REAL DATA) ── */}
      {relatedProjects.length > 0 && (
        <ScrollHorizontalSection
          subtitle="Section 06 · Portfolio"
          title="Related Construction Projects"
          description="A selection of residential and commercial structural commissions executed by Advith Projects."
          totalItems={relatedProjects.length}
          theme="dark"
        >
          {relatedProjects.map((project, i) => {
            const gradient = PROJ_GRADIENTS[project.color] || PROJ_GRADIENTS.red
            return (
              <article
                key={project.id}
                className="w-[88vw] sm:w-[500px] lg:w-[540px] h-[480px] sm:h-[500px] shrink-0 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between hover:border-red-500 transition-all group select-none"
              >
                {/* Gradient Visual Header */}
                <div className={`h-52 bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-black/40 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-700/40">
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{project.location}</span>
                      {project.area && <span>· {project.area}</span>}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-slate-800">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {project.scope}
                  </p>

                  <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-xs text-slate-500 font-mono">0{i + 1} / 0{relatedProjects.length}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </ScrollHorizontalSection>
      )}

      {/* ── 9. OTHER SERVICES (VERTICAL) ───────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Integrated Capabilities
            </p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Explore Our Other Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherServices.map((svc) => {
              const OtherIcon = svc.icon === 'compass' ? Compass : Layers
              const isArch = svc.slug === 'architecture'
              return (
                <Link
                  key={svc.slug}
                  to={svc.path}
                  className="group flex items-start gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all"
                >
                  <div
                    className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${isArch ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                      }`}
                  >
                    <OtherIcon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                      {svc.navDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 group-hover:gap-2.5 transition-all">
                      Explore {svc.shortTitle} →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA (VERTICAL) ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-red-600 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-100" style={RED_GRID_BG} aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Planning a Construction Project?
          </h2>
          <p className="text-red-100 font-light text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            From initial site consultation to full structural execution, let's discuss your project brief, scope, and timeline.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-red-50 text-red-600 font-bold text-sm rounded-2xl shadow-xl transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/40 hover:border-white text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. MOBILE STICKY CTA ──────────────────────────────────── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-3"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: EXPO }}
            aria-label="Quick action"
          >
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
