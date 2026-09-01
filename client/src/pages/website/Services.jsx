import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Compass, Layers, ArrowRight, ChevronRight, MessageCircle } from 'lucide-react'
import { services } from '../../data/services'
import { WHATSAPP_URL } from '../../config/contact'
import IntegrationDiagram from '../../components/services/IntegrationDiagram'
import ServiceSelector from '../../components/services/ServiceSelector'
import ServiceFAQ from '../../components/services/ServiceFAQ'

const EXPO = [0.16, 1, 0.3, 1]

const iconMap = { building2: Building2, compass: Compass, layers: Layers }

/**
 * Static lookup tables — full class strings required for Tailwind v4 scanning.
 * Never construct class names from partial strings.
 */
const TOP_ACCENT_CLASS = {
  construction: 'bg-gradient-to-r from-transparent via-red-500 to-transparent',
  architecture: 'bg-gradient-to-r from-transparent via-amber-500 to-transparent',
  interiors: 'bg-gradient-to-r from-transparent via-rose-500 to-transparent',
}

const CAP_DOT_CLASS = {
  construction: 'bg-red-400',
  architecture: 'bg-amber-400',
  interiors: 'bg-rose-400',
}

const SERVICE_NUMBER = { construction: '01', architecture: '02', interiors: '03' }

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
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

const RED_GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

const HOW_STEPS = [
  {
    step: '01',
    title: 'Understand',
    desc: 'A direct conversation to understand your project requirements, site, and what you want to achieve.',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'We determine which disciplines are needed and how the project should be structured and scoped.',
  },
  {
    step: '03',
    title: 'Quote',
    desc: 'A project-specific quotation prepared from the actual scope of work — not a generic package.',
  },
  {
    step: '04',
    title: 'Execute',
    desc: 'Coordinated delivery with a single point of accountability across all relevant disciplines.',
  },
]

export default function ServicesPage() {
  return (
    <div className="antialiased">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-36">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-100" style={HERO_GRID_BG} />
        {/* Red glow — top right */}
        <div
          className="absolute -top-20 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.11) 0%, transparent 62%)' }}
        />
        {/* Red glow — bottom left */}
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-widest"
            aria-label="Breadcrumb"
            {...rev(0)}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-slate-300" aria-current="page">Services</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-800/40 bg-red-900/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-7"
            {...rev(0.05)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            Construction · Architecture · Interiors
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            {...rev(0.1)}
          >
            Design.{' '}
            <span className="text-red-400">Build.</span>{' '}
            Transform.
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-10"
            {...rev(0.18)}
          >
            From architectural planning to construction and interiors, Advith Projects brings the
            entire journey together under one coordinated team — ensuring quality, continuity, and
            accountability across every phase.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.26)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/projects"
              className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
            >
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE CARDS ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Three disciplines. Complete delivery.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Building2
              const accentClass = TOP_ACCENT_CLASS[service.slug]
              const dotClass = CAP_DOT_CLASS[service.slug]
              const num = SERVICE_NUMBER[service.slug]
              return (
                <motion.article
                  key={service.slug}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-slate-200 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: EXPO }}
                >
                  {/* Colored top accent line */}
                  <div className={`h-0.5 w-full ${accentClass} opacity-70`} aria-hidden="true" />

                  <div className="p-7 flex-1 flex flex-col">
                    {/* Icon + number row */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgClass} ${service.textClass}`}
                      >
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <span className={`text-3xl font-black ${service.textClass} opacity-10`} aria-hidden="true">
                        {num}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
                    <p className={`text-sm font-medium italic ${service.textClass} mb-4`}>
                      {service.tagline}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                      {service.heroDescription}
                    </p>

                    {/* Key capabilities list */}
                    <ul className="space-y-2 mb-7" aria-label={`${service.title} key capabilities`}>
                      {service.capabilities.slice(0, 5).map((cap) => (
                        <li key={cap.id} className="flex items-center gap-2.5 text-sm text-slate-600">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} aria-hidden="true" />
                          {cap.title}
                        </li>
                      ))}
                      {service.capabilities.length > 5 && (
                        <li className="text-xs text-slate-400 pl-4" aria-hidden="true">
                          +{service.capabilities.length - 5} more
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Footer CTA */}
                  <div className={`px-7 py-5 border-t ${service.borderClass} bg-slate-50/60`}>
                    <Link
                      to={service.path}
                      className={`flex items-center gap-2 text-sm font-semibold ${service.textClass} group-hover:gap-3 transition-all`}
                      aria-label={`Explore ${service.title}`}
                    >
                      Explore {service.shortTitle}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ONE TEAM DIAGRAM ─────────────────────────────────────── */}
      <IntegrationDiagram />

      {/* ── SERVICE SELECTOR ────────────────────────────────────── */}
      <ServiceSelector />

      {/* ── HOW EVERY PROJECT BEGINS ────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={DARK_GRID_BG} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              How every project begins
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                {/* Connector line (desktop) */}
                {i < HOW_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-5 h-px bg-slate-700 z-0"
                    style={{ left: 'calc(2.75rem + 12px)', right: '-16px' }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 p-5 bg-slate-800 rounded-2xl border border-slate-700 h-full">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                    <span className="text-xs font-bold text-white" aria-hidden="true">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" {...rev(0.35)}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Learn more about our approach
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <ServiceFAQ />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-100" style={RED_GRID_BG} />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
            {...rev(0)}
          >
            Have a project in mind?
          </motion.h2>
          <motion.p
            className="text-red-100 font-light text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            {...rev(0.1)}
          >
            Tell us what you are planning and let us understand the space, scope, and possibilities
            together.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.2)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-red-50 text-red-600 font-bold text-sm rounded-2xl shadow-lg transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 hover:border-white text-white font-medium text-sm rounded-2xl transition-all hover:bg-white/5"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
