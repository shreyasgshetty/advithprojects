import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/projects'

const REGISTER_CATEGORIES = [
  { id: 'all', num: '01', label: 'All', dotColor: 'bg-red-500' },
  { id: 'architecture', num: '02', label: 'Architecture', dotColor: 'bg-amber-500' },
  { id: 'construction', num: '03', label: 'Construction', dotColor: 'bg-red-600' },
  { id: 'interiors', num: '04', label: 'Interiors', dotColor: 'bg-rose-500' },
  { id: 'completed', num: '05', label: 'Completed', dotColor: 'bg-emerald-500' },
  { id: 'ongoing', num: '06', label: 'Ongoing', dotColor: 'bg-amber-400 animate-pulse' },
]

function ProjectArchiveRegister({ activeFilter, onSelectFilter }) {
  const shouldReduceMotion = useReducedMotion()

  // Dynamically calculate counts per filter
  const getCount = (id) => {
    if (id === 'all') return projects.length
    if (id === 'completed' || id === 'ongoing') {
      return projects.filter((p) => p.status === id).length
    }
    return projects.filter((p) => p.category === id).length
  }

  return (
    <nav
      aria-label="Project classifications"
      className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md select-none sticky top-16 z-30 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        {/* Full-width responsive segmented dock with zero horizontal scroll */}
        <div className="w-full">
          <div
            role="tablist"
            aria-label="Project classifications"
            className="w-full grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 p-1.5 bg-[#F3F4F6] border border-slate-200/90 rounded-2xl shadow-inner"
          >
            {REGISTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id
              const count = getCount(cat.id)
              const countStr = count < 10 ? `0${count}` : `${count}`

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectFilter(cat.id)}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-controls={`panel-${cat.id}`}
                  aria-selected={isActive}
                  tabIndex={0}
                  className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-sans font-medium transition-colors duration-200 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  {/* Sliding Dark Pill Active Background */}
                  {isActive && (
                    <motion.div
                      layoutId={shouldReduceMotion ? undefined : 'activeFilterPill'}
                      className="absolute inset-0 bg-[#0B1220] rounded-xl shadow-md z-0"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Active Crimson Top Accent Pip */}
                  {isActive && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 sm:w-6 h-0.5 bg-red-500 rounded-full z-10" />
                  )}

                  {/* Content layer above sliding pill */}
                  <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 w-full">
                    {/* Discipline Color Dot Indicator */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cat.dotColor} shrink-0 transition-transform ${
                        isActive ? 'scale-125' : ''
                      }`}
                    />

                    {/* Category Label */}
                    <span className="truncate tracking-normal">
                      {cat.label}
                    </span>

                    {/* Count Pill Badge */}
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all shrink-0 ${
                        isActive
                          ? 'bg-white/15 text-white border border-white/10'
                          : 'bg-white text-slate-600 border border-slate-200/90 group-hover:border-slate-300'
                      }`}
                    >
                      {countStr}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default memo(ProjectArchiveRegister)
