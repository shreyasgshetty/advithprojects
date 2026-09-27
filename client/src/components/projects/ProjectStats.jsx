import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { calculateProjectStats } from './projectHelpers'
import { projects } from '../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

function ProjectStats() {
  const shouldReduceMotion = useReducedMotion()
  const stats = calculateProjectStats(projects)

  const STATS_DATA = [
    {
      label: 'TOTAL COMMISSIONS',
      value: stats.total,
      unit: 'Projects',
      detail: `${stats.completed} Completed · ${stats.ongoing} Ongoing`,
    },
    {
      label: 'CORE DISCIPLINES',
      value: stats.disciplines,
      unit: 'Practices',
      detail: 'Architecture · Civil · Interiors',
    },
    {
      label: 'REGIONAL FOOTPRINT',
      value: stats.regionsCount,
      unit: 'Key Regions',
      detail: 'Karnataka Service Corridor',
    },
    {
      label: 'DELIVERY MODEL',
      value: '100%',
      unit: 'Turnkey',
      detail: 'Single Accountability Model',
    },
  ]

  return (
    <div className="bg-[#F8F9FA] border-b border-slate-200 relative select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 py-5 sm:py-6">
          {STATS_DATA.map((item, i) => (
            <motion.div
              key={item.label}
              className={`flex flex-col justify-center ${
                i % 2 === 0 ? 'pr-4 sm:pr-6' : 'pl-4 sm:pl-6'
              } ${i >= 2 ? 'pt-4 md:pt-0' : 'pb-4 md:pb-0'} ${
                i > 0 ? 'md:pl-8' : ''
              } ${i < STATS_DATA.length - 1 ? 'md:pr-8' : ''}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: EXPO }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-sans mb-1.5">
                {item.label}
              </span>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-500 font-sans">
                  {item.unit}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-sans leading-normal">
                {item.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectStats)
