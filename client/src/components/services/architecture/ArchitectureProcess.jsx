import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

export default function ArchitectureProcess() {
  const shouldReduceMotion = useReducedMotion()

  const archService = services.find((s) => s.slug === 'architecture')
  const stages = archService?.process ?? []

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
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0]" id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#D97706] mb-3">
            <span>03</span>
            <span className="text-slate-300">/</span>
            <span>Design Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            A Linear 6-Stage Design Workflow
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Every architectural project moves through structured iterations, ensuring that concept exploration matures into clear, buildable documentation without ambiguity.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-[#E7E5E0] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.step}
              className="relative group"
              {...anim(idx * 0.06)}
            >
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#D97706] group-hover:scale-110 transition-transform" />

              <div className="bg-white border border-[#E7E5E0] rounded-xl p-6 sm:p-7 hover:border-slate-400 transition-colors shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#D97706] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                      PHASE {stage.step}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                    Design Stage 0{idx + 1}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
