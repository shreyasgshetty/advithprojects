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
      detail: `${stats.completed} Completed · ${stats.ongoing} Ongoing`,
      index: '01',
    },
    {
      label: 'INTEGRATED DISCIPLINES',
      value: `${stats.disciplines} Disciplines`,
      detail: 'Architecture · Civil · Interiors',
      index: '02',
    },
    {
      label: 'REGIONAL FOOTPRINT',
      value: stats.regionsCount,
      detail: 'Karnataka Service Corridor',
      index: '03',
    },
    {
      label: 'RESPONSIBILITY MATRIX',
      value: '100% Turnkey',
      detail: 'Single Accountability Model',
      index: '04',
    },
  ]

  return (
    <div className="bg-[#F8F9FA] border-b border-slate-200 relative select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 py-5 sm:py-6">
          {STATS_DATA.map((item, i) => (
            <motion.div
              key={item.label}
              className={`flex flex-col justify-center ${
                i % 2 === 0 ? 'pr-4 sm:pr-6' : 'pl-4 sm:pl-6'
              } ${i >= 2 ? 'pt-4 md:pt-0' : 'pb-4 md:pb-0'} ${
                i > 0 ? 'md:pl-8' : ''
              } ${i < STATS_DATA.length - 1 ? 'md:pr-8' : ''}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EXPO }}
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                <span>{item.label}</span>
                <span className="text-red-600/70 font-bold hidden sm:inline">[{item.index}]</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-0.5 font-sans">
                {item.value}
              </div>
              <span className="text-[11px] font-mono text-slate-500">
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
