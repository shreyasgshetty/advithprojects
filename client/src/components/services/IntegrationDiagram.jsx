import { motion, useReducedMotion } from 'framer-motion'
import { Building2, Compass, Layers, ArrowDown } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

function rev(delay = 0, distance = 16, shouldReduceMotion = false) {
  return {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.5,
      delay: shouldReduceMotion ? delay * 0.5 : delay,
      ease: EXPO,
    },
  }
}

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

const SPECIALTIES = [
  {
    icon: Compass,
    title: 'Architecture & Planning',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    icon: Building2,
    title: 'Construction',
    color: 'text-red-600 bg-red-50 border-red-100',
  },
  {
    icon: Layers,
    title: 'Interiors',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
  },
]

/**
 * IntegrationDiagram — "How Advith Projects Works"
 * Clean, focused structural diagram showing one point of contact (Puneeth)
 * coordinating with the appropriate specialists for each project.
 */
export default function IntegrationDiagram() {
  const shouldReduceMotion = useReducedMotion()
  const r = (delay, dist) => rev(delay, dist, shouldReduceMotion)

  return (
    <section className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={GRID_BG} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center max-w-xl mx-auto mb-12 sm:mb-14" {...r(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Structure
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            How Advith Projects Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            One point of contact, with the right specialists brought in for your project.
          </p>
        </motion.div>

        {/* ── Structural Flow Diagram ── */}
        <div className="max-w-xl mx-auto">
          {/* LEVEL 1: Client */}
          <motion.div className="flex flex-col items-center" {...r(0.08)}>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-semibold uppercase tracking-widest text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
              Client
            </div>

            {/* Connecting line down */}
            <div className="flex flex-col items-center py-2.5" aria-hidden="true">
              <div className="w-px h-5 bg-slate-300" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>
          </motion.div>

          {/* LEVEL 2: Advith Projects / Puneeth / Single Point of Contact */}
          <motion.div
            className="relative w-full max-w-sm mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-lg text-center"
            {...r(0.18)}
          >
            {/* Red top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              aria-hidden="true"
            />

            <h3 className="text-xl font-bold tracking-tight text-white">
              Advith Projects
            </h3>

            <p className="mt-1 text-base font-semibold text-slate-200">
              Puneeth
            </p>

            <div className="mt-3 pt-3 border-t border-slate-800/90">
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-semibold uppercase tracking-wider">
                Single Point of Contact
              </span>
            </div>
          </motion.div>

          {/* LEVEL 3 Connectors: Desktop horizontal branch lines */}
          <div className="hidden md:flex flex-col items-center my-6" aria-hidden="true">
            <div className="w-px h-5 bg-slate-300" />
            <div className="w-3/4 flex justify-between relative border-t-2 border-slate-300">
              <div className="w-px h-5 bg-slate-300 -mt-0.5" />
              <div className="w-px h-5 bg-slate-300 -mt-0.5" />
              <div className="w-px h-5 bg-slate-300 -mt-0.5" />
            </div>
            <div className="w-3/4 flex justify-between relative -mt-1 text-slate-400">
              <ArrowDown className="w-3.5 h-3.5 -ml-1.5" />
              <ArrowDown className="w-3.5 h-3.5" />
              <ArrowDown className="w-3.5 h-3.5 -mr-1.5" />
            </div>
          </div>

          {/* LEVEL 3 Connectors: Mobile vertical connector */}
          <div className="flex md:hidden flex-col items-center my-3" aria-hidden="true">
            <div className="w-px h-5 bg-slate-300" />
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
          </div>

          {/* LEVEL 3: Three Specialist Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
            {SPECIALTIES.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="flex items-center md:flex-col justify-center gap-3 p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-center"
                  {...r(0.26 + idx * 0.07)}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      Specialists
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Supporting Line */}
          <motion.p
            className="text-center text-xs sm:text-sm text-slate-400 mt-10 max-w-md mx-auto leading-relaxed"
            {...r(0.4)}
          >
            Architecture, construction and interiors — coordinated through one point of contact.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
