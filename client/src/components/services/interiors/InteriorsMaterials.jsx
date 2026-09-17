import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../../../data/services'
import { Sparkles } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function InteriorsMaterials() {
  const shouldReduceMotion = useReducedMotion()

  const intService = services.find((s) => s.slug === 'interiors')
  const materialFocus = intService?.materialFocus ?? []

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
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E7E5E0]" id="materials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#E11D48] mb-3">
            <span>04</span>
            <span className="text-slate-300">/</span>
            <span>Material & Detail Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Tactile Quality & Material Harmony
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Every interior scheme combines tactile variety and durability. We evaluate materials together under both natural and artificial light to guarantee balanced visual warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialFocus.map((item, idx) => (
            <motion.div
              key={item.label}
              className="bg-[#FBFBFA] border border-[#E7E5E0] rounded-xl p-7 flex flex-col justify-between hover:border-slate-400 transition-colors shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
              {...anim(idx * 0.06)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#E11D48] bg-rose-50 border border-rose-100 rounded px-2 py-0.5">
                    FOCUS 0{idx + 1}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#E11D48]" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                  {item.label}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E7E5E0] text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Advith Interior Standard
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
