import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone, Compass, Layers } from 'lucide-react'
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY } from '../../../config/contact'
import { services } from '../../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionCTASection() {
  const shouldReduceMotion = useReducedMotion()
  const [stickyVisible, setStickyVisible] = useState(false)

  const otherServices = services.filter((s) => s.slug !== 'construction')

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <>
      {/* ── CROSS-DISCIPLINARY EXPLORATION ──────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-2 block">
              Integrated Practice
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Our Other Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
              Construction operates in synergy with our in-house architectural design and interior teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherServices.map((svc) => {
              const OtherIcon = svc.icon === 'compass' ? Compass : Layers
              const isArch = svc.slug === 'architecture'

              return (
                <Link
                  key={svc.slug}
                  to={svc.path}
                  className="group flex items-start gap-5 p-7 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-slate-400 transition-all shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
                >
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      isArch ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}
                  >
                    <OtherIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#DC2626] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light mb-3 line-clamp-2">
                      {svc.navDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC2626] group-hover:gap-2 transition-all">
                      <span>Explore {svc.shortTitle}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── GROUNDED FINAL CONVERSION CTA ──────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#0B0F17] text-white relative overflow-hidden">
        {/* Subtle Draftsman Grid Linework */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...anim(0)}>
            <span className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-700/60 text-red-400 font-mono text-xs uppercase tracking-wider mb-6">
              Initiate Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Planning a Construction Project?
            </h2>
            <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Share your project requirements, site location, and execution scope with our team to discuss how we can assist from ground-breaking through to handover.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center mb-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-600/25 transition-all active:scale-[0.98]"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all hover:bg-slate-800/50"
                aria-label="Inquire via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={TEL_URL}
                className="inline-flex items-center gap-2 px-6 py-4 text-slate-400 hover:text-slate-200 font-mono text-xs transition-colors"
                aria-label={`Call us at ${PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>

            <div className="text-xs font-mono text-slate-500">
              Advith Projects · Civil Construction & Structural Execution
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA (RESTRICTED TO MOBILE VIEWPORT) ───────── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: EXPO }}
            aria-label="Quick action drawer"
          >
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                aria-label="Contact via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
