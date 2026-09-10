import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionWhyUs() {
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

  const differentiators = [
    {
      num: '01',
      title: 'Engineering-Led Execution',
      desc: 'Construction decisions are approached with structural discipline and fidelity to approved drawings, preventing on-site improvisations.',
    },
    {
      num: '02',
      title: 'End-to-End Coordination',
      desc: 'Architectural, structural, and interior requirements are harmonized throughout the project lifecycle under one unified umbrella.',
    },
    {
      num: '03',
      title: 'Quality-Focused Workmanship',
      desc: 'We emphasize construction precision, proper curing timelines, and clean joinery rather than rushing stages.',
    },
    {
      num: '04',
      title: 'Project Accountability',
      desc: 'Transparent management with clear responsibility for site coordination, procurement, and scheduled milestones.',
    },
    {
      num: '05',
      title: 'Detail-Oriented Finishing',
      desc: 'The same standard of precision applied to underground footings and RCC frames continues through final plastering and paint coats.',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E7E5E0]" id="why-us">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Context */}
          <motion.div className="lg:col-span-5" {...anim(0)}>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
              <span>06</span>
              <span className="text-slate-300">/</span>
              <span>Why Advith Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              A Disciplined Approach to Civil Construction
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8">
              Building a lasting structure requires more than basic masonry. It demands continuous alignment between technical blueprints and site trades. Here is how we ensure that alignment on every project.
            </p>
            <div className="p-6 bg-[#F7F7F5] border border-[#E7E5E0] rounded-xl text-xs font-mono text-slate-600 space-y-2">
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">Commitment</div>
              <div className="font-semibold text-slate-900 text-sm">Clear Execution & Accountable Delivery</div>
              <p className="text-slate-500 font-sans text-xs leading-normal">
                Direct engagement from project kickoff to completion without fragmented handoffs.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="text-[#DC2626] hover:text-red-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  Discuss Project Brief <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Numbered List of Verified Differentiators */}
          <div className="lg:col-span-7 space-y-6">
            {differentiators.map((item, idx) => (
              <motion.div
                key={item.num}
                className="flex items-start gap-6 pb-6 border-b border-[#E7E5E0] last:border-b-0"
                {...anim(idx * 0.08)}
              >
                <span className="font-mono text-2xl font-black text-slate-300 shrink-0 select-none">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
