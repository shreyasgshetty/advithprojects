import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Building2, Compass, Layers, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { getService } from '../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

const iconMap = { building2: Building2, compass: Compass, layers: Layers }

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  const Icon = iconMap[service.icon] ?? Building2

  return (
    <div className="antialiased">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 65%)' }} />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-widest flex-wrap"
            {...rev(0)}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">{service.title}</span>
          </motion.div>

          <motion.div
            className={`inline-flex items-center gap-2 w-14 h-14 rounded-2xl justify-center ${service.bgClass} ${service.textClass} mb-6`}
            {...rev(0.05)}
          >
            <Icon className="w-7 h-7" />
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4"
            {...rev(0.1)}
          >
            {service.title}
          </motion.h1>

          <motion.p
            className={`text-lg font-light mb-6 ${service.textClass.replace('text-', 'text-').replace('600', '400')}`}
            {...rev(0.15)}
          >
            {service.tagline}
          </motion.p>

          <motion.p
            className="text-slate-300 font-light leading-relaxed max-w-2xl mb-10"
            {...rev(0.2)}
          >
            {service.heroDescription}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" {...rev(0.27)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all"
            >
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-14 max-w-2xl" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Our {service.shortTitle} Capabilities
            </h2>
            <p className="text-slate-500 leading-relaxed">
              A comprehensive range of {service.title.toLowerCase()} services delivered with consistent standards and clear accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.capabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EXPO }}
              >
                <CheckCircle2 className="w-5 h-5 text-red-500 mb-3" />
                <h3 className="font-bold text-slate-900 text-sm mb-2">{cap.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Our Process</h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-red-200 via-red-100 to-transparent" />

            <div className="space-y-6">
              {service.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: EXPO }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white border-2 border-red-100 flex items-center justify-center relative z-10 shadow-sm">
                    <span className="text-sm font-bold text-red-600">{step.step}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles or Philosophy or Styles ────────────────────────── */}
      {(service.principles || service.philosophy || service.styles) && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-14" {...rev(0)}>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                {service.principles ? 'Our Commitments' : service.philosophy ? 'Design Philosophy' : 'Design Directions'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(service.principles || service.philosophy || service.styles || []).map((item, i) => (
                <motion.div
                  key={item.title || item.label || item.name}
                  className="p-7 bg-slate-50 rounded-2xl border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EXPO }}
                >
                  <div className={`text-3xl font-black mb-3 ${service.textClass} opacity-20`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title || item.label || item.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Deliverables (Architecture) or Material Focus (Interiors) ── */}
      {(service.deliverables || service.materialFocus) && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div className="text-center mb-12" {...rev(0)}>
              <h2 className="text-3xl font-bold text-slate-900">
                {service.deliverables ? 'What You Receive' : 'Material & Detail'}
              </h2>
            </motion.div>

            {service.deliverables && (
              <div className="flex flex-wrap gap-3 justify-center">
                {service.deliverables.map((d, i) => (
                  <motion.span
                    key={d}
                    className={`px-5 py-2.5 rounded-full border ${service.borderClass} ${service.bgClass} ${service.textClass} text-sm font-semibold`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: EXPO }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            )}

            {service.materialFocus && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {service.materialFocus.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: EXPO }}
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{item.label}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Project Types (Construction) ─────────────────────────────── */}
      {service.projectTypes && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <motion.h2 className="text-3xl font-bold text-slate-900 mb-8" {...rev(0)}>
              Project Types We Handle
            </motion.h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {service.projectTypes.map((type, i) => (
                <motion.span
                  key={type}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: EXPO }}
                >
                  {type}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Navigation to other services ─────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8" {...rev(0)}>
            Also Explore
          </motion.p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { slug: 'construction', label: 'Civil Construction', path: '/services/construction' },
              { slug: 'architecture', label: 'Architecture', path: '/services/architecture' },
              { slug: 'interiors', label: 'Interior Design', path: '/services/interiors' },
            ]
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to={s.path}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 font-medium text-sm rounded-xl transition-all"
                >
                  {s.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-4xl font-bold text-white mb-4" {...rev(0)}>
            {service.slug === 'construction' && 'Planning a construction project?'}
            {service.slug === 'architecture' && 'Ready to start your design?'}
            {service.slug === 'interiors' && 'Ready to create your interior?'}
          </motion.h2>
          <motion.p className="text-slate-300 font-light mb-10" {...rev(0.1)}>
            Tell us about your project and we will be in touch to discuss the brief.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.18)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all"
            >
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
