import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Building2, Layers, CheckCircle2 } from 'lucide-react'
import { projects } from '../../data/projects'
import { calculateProjectStats } from '../projects/projectHelpers'

const EXPO = [0.16, 1, 0.3, 1]

const DISCIPLINES = [
  {
    num: '01',
    title: 'Architecture',
    icon: Compass,
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Site-responsive planning, conceptual blueprints, structural coordination, and 3D visualization.',
  },
  {
    num: '02',
    title: 'Civil Construction',
    icon: Building2,
    accent: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    desc: 'RCC structural execution, IS-456 standards, foundation engineering, and rigorous daily site supervision.',
  },
  {
    num: '03',
    title: 'Turnkey Interiors',
    icon: Layers,
    accent: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    desc: 'Bespoke joinery, architectural lighting, material curation, custom furniture, and precision fit-out.',
  },
]

function HomeTrustStrip() {
  const shouldReduceMotion = useReducedMotion()
  const stats = calculateProjectStats(projects)

  return (
    <section id="trust-strip" className="relative bg-white border-b border-slate-200 py-12 sm:py-16 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Eyebrow & Headline Statement */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
              INTEGRATED PRACTICE MODEL
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            One Team. Three Disciplines.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            From initial concept to final handover, every discipline stays coordinated under one team —
            eliminating miscommunication, conflicting specifications, and costly construction delays.
          </p>
        </div>

        {/* 3 Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {DISCIPLINES.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="p-6 bg-[#FAFAFA] border border-slate-200/90 hover:border-slate-300 transition-all duration-200 relative group flex flex-col justify-between"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EXPO }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-red-600 transition-colors">
                      {item.num}
                    </span>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${item.bg} ${item.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coordinated Delivery</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Live Derived Portfolio Ledger Strip */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-lg flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">PORTFOLIO AUDIT:</span>
            <span className="font-bold text-white tracking-wider">{stats.total} COMMISSIONS DOCUMENTED</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>{stats.completed} COMPLETED</span>
            <span className="text-slate-600">·</span>
            <span>{stats.ongoing} ONGOING</span>
            <span className="text-slate-600">·</span>
            <span className="text-red-400 font-semibold">{stats.regionsCount} REGIONS (KARNATAKA)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeTrustStrip)
