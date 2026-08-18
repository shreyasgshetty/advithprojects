import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Compass, Layers, ArrowRight, ChevronRight } from 'lucide-react'
import { services } from '../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

const iconMap = { building2: Building2, compass: Compass, layers: Layers }

function useScrollReveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

export default function ServicesPage() {
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
            className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-widest"
            {...useScrollReveal(0)}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Services</span>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-800/40 bg-red-900/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6"
            {...useScrollReveal(0.05)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            What We Do
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            {...useScrollReveal(0.1)}
          >
            Building What <br />
            <span className="text-red-400">Matters.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-10"
            {...useScrollReveal(0.18)}
          >
            Advith Projects brings together civil construction, architectural design, and interior
            execution under one coordinated team — ensuring quality, continuity, and accountability
            across every phase of your project.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" {...useScrollReveal(0.25)}>
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

      {/* ── Service Cards ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-16" {...useScrollReveal(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Three Disciplines. One Team.</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Unified expertise across construction, design, and interiors.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Building2
              return (
                <motion.div
                  key={service.slug}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-slate-200 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: EXPO }}
                >
                  <div className="p-8 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.bgClass} ${service.textClass} mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.heroDescription}</p>

                    <ul className="space-y-2">
                      {service.capabilities.slice(0, 4).map((cap) => (
                        <li key={cap.id} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {cap.title}
                        </li>
                      ))}
                      {service.capabilities.length > 4 && (
                        <li className="text-xs text-slate-400 pl-3.5">
                          +{service.capabilities.length - 4} more capabilities
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className={`px-8 py-5 border-t border-slate-50 bg-slate-50/50`}>
                    <Link
                      to={service.path}
                      className={`flex items-center gap-2 text-sm font-semibold ${service.textClass} hover:underline group-hover:gap-3 transition-all`}
                    >
                      Explore {service.shortTitle}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why Integrated ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-slate-900 mb-4"
            {...useScrollReveal(0)}
          >
            Why a Single Integrated Team?
          </motion.h2>
          <motion.p
            className="text-slate-500 text-lg font-light leading-relaxed mb-14 max-w-2xl mx-auto"
            {...useScrollReveal(0.1)}
          >
            When your architect, builder, and interior designer speak the same language, your project benefits from seamless coordination, fewer errors, and faster delivery.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Seamless Coordination', desc: 'One team manages design, structure, and fit-out — no gaps, no conflicts.' },
              { title: 'Single Accountability', desc: 'A unified point of responsibility across all project phases.' },
              { title: 'Consistent Quality', desc: 'Standards, materials, and workmanship remain consistent across every discipline.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-7 bg-white rounded-2xl border border-slate-100 shadow-sm text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <span className="text-xs font-bold text-red-600">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-4xl font-bold text-slate-900 mb-4" {...useScrollReveal(0)}>
            Ready to start your project?
          </motion.h2>
          <motion.p className="text-slate-500 mb-8 text-lg font-light" {...useScrollReveal(0.1)}>
            Share your brief with our team and receive a tailored response.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...useScrollReveal(0.2)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm rounded-2xl transition-all bg-white"
            >
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
