import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { calculateProjectStats } from './projectHelpers'
import { projects } from '../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectStats() {
  const shouldReduceMotion = useReducedMotion()
  const stats = calculateProjectStats(projects)

  const METRICS = [
    {
      num: stats.total,
      unit: 'Commissions',
      label: 'Portfolio Archive',
      detail: `${stats.completed} Completed · ${stats.ongoing} Ongoing`,
      borderClass: 'border-slate-950',
    },
    {
      num: stats.disciplines,
      unit: 'Disciplines',
      label: 'Integrated Scope',
      detail: 'Architecture · Civil · Interiors',
      borderClass: 'border-slate-300',
    },
    {
      num: stats.regionsCount,
      unit: 'Districts',
      label: 'Active Geography',
      detail: stats.locationsList || 'Karnataka State',
      borderClass: 'border-slate-300',
    },
    {
      num: '100%',
      unit: 'Direct',
      label: 'Accountability Model',
      detail: 'Single Coordinated Team',
      borderClass: 'border-red-600',
    },
  ]

  return (
    <section className="bg-white border-b border-slate-200 py-7 sm:py-8 select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS.map((item, i) => (
            <motion.div
              key={item.label}
              className={`border-l-2 ${item.borderClass} pl-4 sm:pl-5`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: EXPO }}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                {item.label}
              </span>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 font-sans">
                  {item.num}
                </span>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {item.unit}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-sans leading-normal font-normal">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectStats)
