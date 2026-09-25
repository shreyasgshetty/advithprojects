import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

const REGISTER_CATEGORIES = [
  { id: 'all', num: '01', label: 'All Projects' },
  { id: 'architecture', num: '02', label: 'Architecture' },
  { id: 'construction', num: '03', label: 'Construction' },
  { id: 'interiors', num: '04', label: 'Interiors' },
  { id: 'completed', num: '05', label: 'Completed' },
  { id: 'ongoing', num: '06', label: 'Ongoing' },
]

export default function ProjectArchiveRegister({ activeFilter, onSelectFilter }) {
  // Dynamically calculate counts per filter
  const getCount = (id) => {
    if (id === 'all') return projects.length
    if (id === 'completed' || id === 'ongoing') {
      return projects.filter((p) => p.status === id).length
    }
    return projects.filter((p) => p.category === id).length
  }

  return (
    <div className="border-b border-slate-200 bg-white select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 sm:py-6">
        {/* Top Header of the Register */}
        <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-slate-200 mb-4 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            <span className="font-bold text-slate-900 uppercase tracking-widest">
              PROJECT ARCHIVE
            </span>
          </div>
          <span className="text-slate-500 tracking-wider font-mono text-xs">
            2021 — 2026
          </span>
        </div>

        {/* Tabular Register Links (No Pill Buttons) */}
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-1">
          {REGISTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id
            const count = getCount(cat.id)
            const countStr = count < 10 ? `0${count}` : `${count}`

            return (
              <button
                key={cat.id}
                onClick={() => onSelectFilter(cat.id)}
                role="tab"
                aria-selected={isActive}
                className={`group relative flex items-center gap-2 pb-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer text-left ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <span className={isActive ? 'text-red-600 font-bold' : 'text-slate-400'}>
                  {cat.num}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-red-600 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  [{countStr}]
                </span>

                {/* Minimal Crimson Underline Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="registerActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
