import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1]

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'BRIEF',
    subtitle: 'Discovery & Parameters',
    desc: 'Detailed review of spatial goals, site context, soil conditions, budget parameters, and regulatory requirements.',
    detail: 'Site Survey & Zoning Analysis',
  },
  {
    step: '02',
    title: 'DESIGN',
    subtitle: 'Architecture & 3D',
    desc: 'Developing cohesive floor plans, structural layouts, elevations, and high-fidelity 3D visual models.',
    detail: 'Complete Drawing Set',
  },
  {
    step: '03',
    title: 'PLAN',
    subtitle: 'Engineering & Materials',
    desc: 'Translating design intent into IS-456 structural schedules, bill of quantities (BOQ), and procurement milestones.',
    detail: 'Milestone Execution Schedule',
  },
  {
    step: '04',
    title: 'BUILD',
    subtitle: 'Civil Execution',
    desc: 'Site excavation, RCC structural framework, masonry, services plumbing, electrical, and continuous quality checks.',
    detail: 'Daily On-Site Engineer Supervision',
  },
  {
    step: '05',
    title: 'DELIVER',
    subtitle: 'Handover & Polish',
    desc: 'Turnkey interior installation, architectural finishes, defect snag resolution, and formal project commissioning.',
    detail: 'Comprehensive Warranty & Handover',
  },
]

function HomeProcess() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden select-none border-b border-slate-800">
      {/* Drafting grid backdrop */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-400">
              HOW WE WORK
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            From Brief to Built.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            A disciplined, linear methodology designed to remove uncertainty from custom construction.
            Each milestone is validated before advancing to the next phase.
          </p>
        </div>

        {/* Timeline Graphic & Steps */}
        <div className="relative">
          {/* Continuous Architectural Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-px bg-slate-800 pointer-events-none" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500"
              initial={shouldReduceMotion ? { width: '100%' } : { width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: EXPO }}
            />
          </div>

          {/* 5 Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STAGES.map((s, idx) => (
              <motion.div
                key={s.step}
                className="relative bg-slate-900/90 border border-slate-800 p-6 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-all duration-300 shadow-sm"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EXPO }}
              >
                <div>
                  {/* Step Node indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                      {s.step}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      STAGE {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[11px] font-mono text-red-400 uppercase tracking-wider mb-3">
                    {s.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500 block">DELIVERABLE:</span>
                  <span className="text-[11px] font-mono text-slate-300 font-medium">
                    {s.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Bottom Specs */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>PROGRESS TRACKING: STAGE-WISE INSPECTION CHECKLISTS</span>
          </div>
          <div>
            <span>METHODOLOGY: PRE-CONSTRUCTION ENGINEERING &amp; LIVE SITE AUDITS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeProcess)
