import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  Building2,
  Compass,
  Layers,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Users,
  Package,
} from 'lucide-react'
import { getService, services } from '../../data/services'
import { projects } from '../../data/projects'
import { WHATSAPP_URL } from '../../config/contact'
import CivilConstructionView from '../../components/services/construction/CivilConstructionView'

const EXPO = [0.16, 1, 0.3, 1]

const iconMap = { building2: Building2, compass: Compass, layers: Layers }

/**
 * Static class lookups for Tailwind v4 scanning.
 * Complete class strings only — no dynamic partial concatenation.
 */
const HERO_GLOW = {
  construction: 'rgba(239,68,68,0.12)',
  architecture: 'rgba(245,158,11,0.1)',
  interiors: 'rgba(244,63,94,0.1)',
}

const CAP_NUM_CLASS = {
  construction: 'text-red-600',
  architecture: 'text-amber-600',
  interiors: 'text-rose-600',
}

const PROCESS_DOT = {
  construction: 'bg-red-600',
  architecture: 'bg-amber-500',
  interiors: 'bg-rose-500',
}

const PROCESS_LINE = {
  construction: 'from-red-200 via-red-100',
  architecture: 'from-amber-200 via-amber-100',
  interiors: 'from-rose-200 via-rose-100',
}

const DELIV_BG = {
  construction: 'bg-red-50',
  architecture: 'bg-amber-50',
  interiors: 'bg-rose-50',
}

const DELIV_TEXT = {
  construction: 'text-red-700',
  architecture: 'text-amber-700',
  interiors: 'text-rose-700',
}

const DELIV_DOT = {
  construction: 'bg-red-500',
  architecture: 'bg-amber-500',
  interiors: 'bg-rose-500',
}

const PROJ_GRADIENT = {
  red: 'from-red-900 to-slate-900',
  amber: 'from-amber-900 to-slate-900',
  rose: 'from-rose-900 to-slate-900',
}

const PROJ_CAT_BG = {
  residential: 'bg-red-900/60',
  commercial: 'bg-amber-900/60',
  architecture: 'bg-amber-900/60',
  interiors: 'bg-rose-900/60',
}

const OTHER_SERVICE_TEXT = {
  construction: 'text-red-600',
  architecture: 'text-amber-600',
  interiors: 'text-rose-600',
}

const OTHER_SERVICE_BORDER = {
  construction: 'hover:border-red-200',
  architecture: 'hover:border-amber-200',
  interiors: 'hover:border-rose-200',
}

const STATUS_BADGE = {
  completed: 'bg-emerald-900/60 text-emerald-300',
  ongoing: 'bg-amber-900/60 text-amber-300',
}

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

const HERO_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

const DARK_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

const LIGHT_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const shouldReduceMotion = useReducedMotion()

  // Sticky mobile CTA — show after scrolling past hero
  const [stickyVisible, setStickyVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!service) return <Navigate to="/services" replace />

  // Dedicated scroll-driven horizontal experience exclusively for Civil Construction
  if (slug === 'construction') {
    return <CivilConstructionView service={service} />
  }

  /**
   * Hero entrance helper — uses `animate` (not whileInView) since this is above-fold.
   * Staged sequence: grid → breadcrumb → icon → h1 → tagline → body → CTAs
   */
  const heroMk = (delay, y = 24) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.7,
      delay: shouldReduceMotion ? delay * 0.3 : delay,
      ease: EXPO,
    },
  })

  const Icon = iconMap[service.icon] ?? Building2

  // Dynamic related projects from project data
  const relatedProjects = projects.filter((p) => p.services.includes(slug)).slice(0, 3)

  // Other services for cross-navigation
  const otherServices = services.filter((s) => s.slug !== slug)

  const glowColor = HERO_GLOW[slug] || HERO_GLOW.construction
  const capNumClass = CAP_NUM_CLASS[slug] || 'text-red-600'
  const processDot = PROCESS_DOT[slug] || 'bg-red-600'
  const processLine = PROCESS_LINE[slug] || 'from-red-200 via-red-100'
  const delivBg = DELIV_BG[slug] || 'bg-red-50'
  const delivText = DELIV_TEXT[slug] || 'text-red-700'
  const delivDot = DELIV_DOT[slug] || 'bg-red-500'

  return (
    <div className="antialiased">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-32">
        {/* Blueprint grid fades in first */}
        <motion.div
          className="absolute inset-0"
          style={HERO_GRID_BG}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.9, ease: EXPO }}
        />
        {/* Service-specific color glow — drifts in from top-right */}
        <motion.div
          className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 63%)` }}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, delay: 0.1, ease: EXPO }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb — first content to appear */}
          <motion.nav
            className="flex items-center gap-2 text-xs text-slate-400 mb-7 uppercase tracking-widest flex-wrap"
            aria-label="Breadcrumb"
            {...heroMk(0.05, 12)}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-slate-300" aria-current="page">{service.title}</span>
          </motion.nav>

          {/* Service icon */}
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.bgClass} ${service.textClass} mb-7`}
            aria-hidden="true"
            {...heroMk(0.15, 16)}
          >
            <Icon className="w-7 h-7" />
          </motion.div>

          {/* Title — most visual weight */}
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4"
            {...heroMk(0.25, 32)}
          >
            {service.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={`text-lg font-medium mb-5 ${service.textClass}`}
            style={{ filter: 'brightness(1.4)' }}
            {...heroMk(0.35, 20)}
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-slate-300 font-light leading-relaxed max-w-2xl mb-10"
            {...heroMk(0.43, 18)}
          >
            {service.heroDescription}
          </motion.p>

          {/* CTAs — last to appear */}
          <motion.div className="flex flex-wrap gap-4" {...heroMk(0.55, 14)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE AT A GLANCE ──────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-slate-100" aria-label="Service at a glance">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x-0 lg:divide-x divide-y lg:divide-y-0 divide-slate-100"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            {/* Best For */}
            <div className="px-0 lg:px-8 py-5 lg:py-0 first:pl-0 lg:first:pl-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Best for
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.atAGlance.bestFor.join(' · ')}
              </p>
            </div>

            {/* Core Focus */}
            <div className="px-4 lg:px-8 py-5 lg:py-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Core focus
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.atAGlance.coreFocus.join(' · ')}
              </p>
            </div>

            {/* Scope */}
            <div className="px-0 lg:px-8 py-5 lg:py-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Typical scope
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.atAGlance.typicalScope.join(' · ')}
              </p>
            </div>

            {/* Process + CTA */}
            <div className="px-4 lg:px-8 py-5 lg:py-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Process
                </p>
                <p className="text-sm text-slate-700">
                  {service.atAGlance.processStageCount} stages
                </p>
              </div>
              <Link
                to="/contact"
                className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                aria-label="Discuss your project with us"
              >
                Discuss Your Project
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={LIGHT_GRID_BG} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-14 max-w-2xl" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              {service.shortTitle} capabilities
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm">
              A comprehensive range of {service.title.toLowerCase()} services delivered with
              consistent quality and clear accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.capabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                className={`group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-default`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: EXPO }}
                /* Subtle elevation on hover — no scale, mobile-safe */
                whileHover={shouldReduceMotion ? {} : {
                  y: -2,
                  boxShadow: '0 8px 24px -6px rgba(15,23,42,0.10)',
                  transition: { duration: 0.2, ease: EXPO }
                }}
              >
                {/* Number badge */}
                <p
                  className={`text-2xl font-black mb-3 ${capNumClass} opacity-20 group-hover:opacity-40 transition-opacity`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{cap.title}</h3>
                {/* Description always visible — essential info never hidden behind hover */}
                <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-12 max-w-xl" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Ideal For
            </p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Who is this service for?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.whoFor.map((item, i) => (
              <motion.div
                key={item.id}
                className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${service.bgClass} ${service.textClass}`}
                  aria-hidden="true"
                >
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={DARK_GRID_BG} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              How We Work
            </p>
            <h2 className="text-4xl font-bold text-white tracking-tight">Our process</h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div
              className={`hidden lg:block absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b ${processLine} to-transparent`}
              aria-hidden="true"
            />

            <ol className="space-y-5">
              {service.process.map((step, i) => (
                <motion.li
                  key={step.step}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.6, ease: EXPO }}
                >
                  {/* Step number */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl border-2 border-slate-700 flex items-center justify-center relative z-10 ${processDot} shadow-sm`}
                  >
                    <span className="text-sm font-bold text-white" aria-hidden="true">{step.step}</span>
                  </div>
                  <div className="pt-2 pb-4">
                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-12 max-w-xl" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              What You Receive
            </p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Deliverables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={item.label}
                className={`p-6 ${delivBg} rounded-2xl border border-slate-100`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-2 h-2 rounded-full ${delivDot} shrink-0`} aria-hidden="true" />
                  <h3 className={`font-bold text-sm ${delivText}`}>{item.label}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE-SPECIFIC SECTION ─────────────────────────────── */}

      {/* Construction: Principles / Commitments */}
      {service.principles && (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={LIGHT_GRID_BG} />
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-12" {...rev(0)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Our Standards
              </p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Construction commitments
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.principles.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-7">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture: Design Philosophy */}
      {service.philosophy && (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={LIGHT_GRID_BG} />
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-12" {...rev(0)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Our Approach
              </p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Design philosophy
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {service.philosophy.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm text-center"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}
                >
                  <p className="text-3xl font-black text-amber-600 opacity-15 mb-3" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{item.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interiors: Design Directions + Material Focus */}
      {service.styles && (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={LIGHT_GRID_BG} />
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            {/* Design Directions */}
            <motion.div className="mb-12" {...rev(0)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Design Directions
              </p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
                Styles we work in
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {service.styles.map((style, i) => (
                  <motion.div
                    key={style.name}
                    className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: EXPO }}
                  >
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{style.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{style.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Material Focus */}
            <motion.div {...rev(0.1)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Material & Detail Focus
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {service.materialFocus.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="p-5 bg-white rounded-2xl border border-rose-100 shadow-sm text-center"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EXPO }}
                  >
                    <Package className="w-5 h-5 text-rose-400 mx-auto mb-3" aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-xs mb-1.5">{item.label}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── RELATED PROJECTS ────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div className="flex items-end justify-between mb-12 gap-4 flex-wrap" {...rev(0)}>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Our Work
                </p>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Related projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors shrink-0"
                aria-label="View all projects"
              >
                All Projects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project, i) => {
                const gradient = PROJ_GRADIENT[project.color] || 'from-slate-800 to-slate-900'
                const catBg =
                  PROJ_CAT_BG[project.category] || 'bg-slate-700/60'
                const statusClass = STATUS_BADGE[project.status] || 'bg-slate-700 text-slate-300'
                return (
                  <motion.article
                    key={project.id}
                    className="group"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.58, ease: EXPO }}
                    whileHover={shouldReduceMotion ? {} : {
                      y: -3,
                      transition: { duration: 0.22, ease: EXPO }
                    }}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all"
                      aria-label={`View project: ${project.title}`}
                    >
                      {/* Gradient thumbnail */}
                      <div
                        className={`h-44 bg-gradient-to-br ${gradient} relative flex items-end p-4`}
                      >
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${catBg} text-white capitalize`}>
                            {project.category}
                          </span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusClass} capitalize`}>
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 bg-white group-hover:bg-slate-50/50 transition-colors">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-red-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3">{project.location}</p>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {project.scope}
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER SERVICES ───────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={LIGHT_GRID_BG} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-10" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Also Explore
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherServices.map((svc, i) => {
              const OtherIcon = iconMap[svc.icon] ?? Building2
              const textClass = OTHER_SERVICE_TEXT[svc.slug] || 'text-red-600'
              const borderHover = OTHER_SERVICE_BORDER[svc.slug] || 'hover:border-red-200'
              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EXPO }}
                >
                  <Link
                    to={svc.path}
                    className={`group flex items-center gap-5 p-6 bg-white rounded-2xl border border-slate-100 ${borderHover} hover:shadow-sm transition-all`}
                  >
                    <div
                      className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${svc.bgClass} ${svc.textClass}`}
                      aria-hidden="true"
                    >
                      <OtherIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{svc.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {svc.navDescription}
                      </p>
                    </div>
                    <div className={`shrink-0 flex items-center gap-1 text-xs font-semibold ${textClass} group-hover:gap-2 transition-all`}>
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={DARK_GRID_BG} />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)` }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-4xl font-bold text-white mb-4 tracking-tight" {...rev(0)}>
            {slug === 'construction' && 'Planning a construction project?'}
            {slug === 'architecture' && 'Ready to start your architectural design?'}
            {slug === 'interiors' && 'Ready to design your interior?'}
          </motion.h2>
          <motion.p className="text-slate-300 font-light mb-10 max-w-lg mx-auto leading-relaxed" {...rev(0.1)}>
            Tell us about your project and we will be in touch to discuss the brief, scope, and
            possibilities together.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.18)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ────────────────────────────────────── */}
      {/* Appears only on small screens after scrolling past hero. */}
      {/* pb-20 on page wrapper is not needed — fixed element sits above content. */}
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
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
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
