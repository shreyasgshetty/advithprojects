import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionOverview() {
  const shouldReduceMotion = useReducedMotion()

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

  const executionPillars = [
    {
      title: 'Site Preparation & Ground Realities',
      desc: 'Accurate site assessment, boundary verification, and soil-specific excavation to establish a dependable foundation.',
    },
    {
      title: 'Structural Integrity & Framing',
      desc: 'Reinforced cement concrete (RCC) works, column alignments, formwork shuttering, and slab casting executed strictly to approved drawings.',
    },
    {
      title: 'Multidisciplinary Coordination',
      desc: 'Seamless coordination between architectural layouts, structural requirements, electrical/plumbing conduits, and on-site trade specialists.',
    },
    {
      title: 'Material Verification & Oversight',
      desc: 'Careful sourcing of specified cement, aggregates, rebar, and finishing materials verified before incorporation on site.',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0] relative" id="overview">
      {/* Draftsman Grid Linework */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Statement & In-depth Editorial Content */}
          <motion.div className="lg:col-span-6" {...anim(0)}>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
              <span>01</span>
              <span className="text-slate-300">/</span>
              <span>Execution Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Construction That Turns Plans Into Built Reality
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                At Advith Projects, civil construction is treated as a rigorous technical discipline. Moving from architectural blueprints to a completed physical structure demands meticulous site planning, strict adherence to structural details, and uncompromising workmanship.
              </p>
              <p>
                We bridge the gap between design intent and physical execution. By coordinating directly across structural drawings, trade specialists, and material suppliers, we eliminate ambiguities on site and ensure structural longevity for every square foot built.
              </p>
              <p>
                Whether building a bespoke private villa, a commercial facility, or a multi-unit residential project, our focus remains on structural fidelity, disciplined scheduling, and transparent client reporting from ground-breaking through to formal handover.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Methodology</span>
                <span className="font-semibold text-slate-800">Turnkey Execution</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Supervision</span>
                <span className="font-semibold text-slate-800">On-Site Dedicated Oversight</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <Link
                  to="/about"
                  className="text-[#DC2626] hover:text-red-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  About Our Team <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Execution Pillars (Clean specification style, no generic cards) */}
          <div className="lg:col-span-6 space-y-4">
            {executionPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                className="p-6 bg-white border border-[#E7E5E0] rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:border-[#DC2626]/40 transition-colors"
                {...anim(idx * 0.08)}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded px-2 py-1 shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
