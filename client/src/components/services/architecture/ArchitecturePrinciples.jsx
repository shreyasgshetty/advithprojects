import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../../../data/services'
import { CheckCircle2 } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function ArchitecturePrinciples() {
  const shouldReduceMotion = useReducedMotion()

  const archService = services.find((s) => s.slug === 'architecture')
  const philosophy = archService?.philosophy ?? []

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
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E7E5E0]" id="philosophy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#D97706] mb-3">
            <span>04</span>
            <span className="text-slate-300">/</span>
            <span>Design Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Core Architectural Standards
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Every architectural drawing produced in our studio adheres to five core principles that balance aesthetic expression with practical performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {philosophy.map((item, idx) => (
            <motion.div
              key={item.label}
              className="bg-[#FBFBFA] border border-[#E7E5E0] rounded-xl p-6 flex flex-col justify-between hover:border-slate-400 transition-colors shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
              {...anim(idx * 0.06)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#D97706] bg-amber-50 border border-amber-100 rounded px-2 py-0.5">
                    0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                  {item.label}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
