import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

const FILTERS_CONFIG = [
  { id: 'all', num: '01', label: 'All Projects' },
  { id: 'architecture', num: '02', label: 'Architecture' },
  { id: 'construction', num: '03', label: 'Construction' },
  { id: 'interiors', num: '04', label: 'Interiors' },
  { id: 'completed', num: '05', label: 'Completed' },
  { id: 'ongoing', num: '06', label: 'Ongoing' },
]

export default function ProjectFilters({ activeFilter, onSelectFilter }) {
  // Dynamically count projects per filter option
  const getFilterCount = (id) => {
    if (id === 'all') return projects.length
    if (id === 'completed' || id === 'ongoing') {
      return projects.filter((p) => p.status === id).length
    }
    return projects.filter((p) => p.category === id).length
  }

  return (
    <div className="border-b border-slate-200 bg-white select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-1.5">

            {FILTERS_CONFIG.map((filter) => {
              const isActive = activeFilter === filter.id
              const count = getFilterCount(filter.id)
              const formattedCount = count < 10 ? `0${count}` : `${count}`

              return (
                <button
                  key={filter.id}
                  onClick={() => onSelectFilter(filter.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`group relative flex items-center gap-2 py-3 px-2.5 sm:px-3.5 text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${isActive
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                    }`}
                >
                  <span
                    className={`text-[10px] ${isActive ? 'text-red-600 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                  >
                    {filter.num}
                  </span>
                  <span>{filter.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isActive
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                  >
                    [{formattedCount}]
                  </span>

                  {/* Minimal Crimson Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick status count indicator on desktop */}
          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-slate-400 pl-4 border-l border-slate-200 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {getFilterCount('completed')} Completed
            </span>
            <span className="text-slate-300">/</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {getFilterCount('ongoing')} Ongoing
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
