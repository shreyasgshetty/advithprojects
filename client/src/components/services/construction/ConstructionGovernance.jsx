import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../../../data/services'
import { CheckCircle2 } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionGovernance() {
  const shouldReduceMotion = useReducedMotion()

  const constructionService = services.find((s) => s.slug === 'construction')
  const principles = constructionService?.principles ?? []

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
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0]" id="governance">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
            <span>04</span>
            <span className="text-slate-300">/</span>
            <span>Site Governance & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Every Stage Controlled. Every Detail Accounted For.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Quality in civil construction comes from disciplined, repeatable site governance. We maintain verified standards for materials, workmanship, and progress tracking across each active site.
          </p>
        </div>

        {/* 6 Pillars in Clean 3x2 Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.title}
              className="bg-white border border-[#E7E5E0] rounded-xl p-7 flex flex-col justify-between shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-slate-400 transition-colors"
              {...anim(idx * 0.07)}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                  {principle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {principle.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E5E0] text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Verified Practice</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
