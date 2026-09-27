import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Ruler, ShieldCheck, Hammer, Layers } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const QUALITY_PILLARS = [
  {
    icon: Ruler,
    title: 'IS-456 Structural Discipline',
    desc: 'Concrete mix designs, steel reinforcement spacing, and curing protocols executed strictly to Indian structural codes.',
  },
  {
    icon: ShieldCheck,
    title: 'Material Verification',
    desc: 'Only vetted aggregates, branded 53/43 grade cement, high-yield TMT rebar, and verified waterproofing compounds are used.',
  },
  {
    icon: Hammer,
    title: 'Daily Site Engineer Supervision',
    desc: 'On-site engineering oversight ensures shuttering alignment, plinth level checks, and column plumbness prior to every pour.',
  },
  {
    icon: Layers,
    title: 'Architectural-Grade Interior Joinery',
    desc: 'Seamless transition into joinery, acoustic detailing, and stone finishes coordinated with the civil team from the start.',
  },
]

function HomeQualityCraft() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
              CRAFT &amp; ENGINEERING RIGOR
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            Designed Carefully. Built Properly.
          </h2>
          <p className="text-base text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            A beautiful architectural blueprint is only as good as the site execution behind it.
            We treat every foundation, masonry joint, and interior transition with uncompromised engineering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className="p-6 bg-white border border-slate-200/90 shadow-2xs rounded-lg flex flex-col justify-between"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EXPO }}
              >
                <div>
                  <div className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>STANDARD</span>
                  <span className="text-slate-900 font-semibold">VERIFIED</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(HomeQualityCraft)
