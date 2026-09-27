import { memo, useRef } from 'react'
import {
  LayoutGrid,
  Compass,
  Building2,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { projects } from '../../data/projects'

const REGISTER_CATEGORIES = [
  {
    id: 'all',
    num: '01',
    label: 'All Projects',
    icon: LayoutGrid,
    dotColor: 'bg-red-500',
  },
  {
    id: 'architecture',
    num: '02',
    label: 'Architecture',
    icon: Compass,
    dotColor: 'bg-amber-500',
  },
  {
    id: 'construction',
    num: '03',
    label: 'Construction',
    icon: Building2,
    dotColor: 'bg-red-500',
  },
  {
    id: 'interiors',
    num: '04',
    label: 'Interiors',
    icon: Layers,
    dotColor: 'bg-rose-500',
  },
  {
    id: 'completed',
    num: '05',
    label: 'Completed',
    icon: CheckCircle2,
    dotColor: 'bg-emerald-500',
  },
  {
    id: 'ongoing',
    num: '06',
    label: 'Ongoing',
    icon: Clock,
    dotColor: 'bg-amber-500',
  },
]

function ProjectArchiveRegister({ activeFilter, onSelectFilter }) {
  const containerRef = useRef(null)

  // Dynamically calculate counts per filter
  const getCount = (id) => {
    if (id === 'all') return projects.length
    if (id === 'completed' || id === 'ongoing') {
      return projects.filter((p) => p.status === id).length
    }
    return projects.filter((p) => p.category === id).length
  }

  const handleSelect = (id) => {
    onSelectFilter(id)

    // If user is scrolled down deep, keep them focused right at the project catalogue
    const catalogueEl = document.getElementById('project-catalogue')
    if (catalogueEl) {
      const rect = catalogueEl.getBoundingClientRect()
      // If catalogue top is above viewport (user scrolled down), gently scroll to catalogue start
      if (rect.top < 60) {
        const targetY = window.scrollY + rect.top - 140
        if (window.__lenis) {
          window.__lenis.scrollTo(targetY, { duration: 0.6 })
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <nav
      ref={containerRef}
      className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-2xs select-none transition-shadow"
      aria-label="Project category filter"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Single row: 6 columns guaranteed in one line */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 lg:gap-2.5 w-full">
          {REGISTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id
            const count = getCount(cat.id)
            const countStr = count < 10 ? `0${count}` : `${count}`
            const Icon = cat.icon

            if (isActive) {
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  role="tab"
                  aria-selected="true"
                  className="w-full flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 px-1.5 sm:px-2.5 lg:px-3.5 py-1.5 rounded-full bg-slate-950 text-white shadow-sm font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-transform active:scale-[0.98]"
                >
                  {/* Subtle red accent pip matching screenshot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <Icon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="font-semibold text-white tracking-tight text-xs sm:text-[13px] truncate">
                    {cat.label}
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold rounded-full bg-slate-800 text-slate-100 ml-0.5 shrink-0">
                    {countStr}
                  </span>
                </button>
              )
            }

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                role="tab"
                aria-selected="false"
                className="w-full group flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 px-1.5 sm:px-2.5 lg:px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-slate-950 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all shadow-2xs hover:shadow-xs active:scale-[0.98]"
              >
                {/* Number index prefix */}
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-500 font-medium shrink-0">
                  {cat.num}
                </span>

                {/* Status Dot */}
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor} shrink-0`} />

                {/* Category Icon */}
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors" />

                {/* Category Label */}
                <span className="text-slate-700 group-hover:text-slate-900 tracking-tight text-xs sm:text-[13px] truncate">
                  {cat.label}
                </span>

                {/* Counter Badge */}
                <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-800 transition-colors ml-0.5 shrink-0">
                  {countStr}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default memo(ProjectArchiveRegister)
