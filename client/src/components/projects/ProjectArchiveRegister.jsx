import { memo, useRef, useEffect, useState } from 'react'
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
  const scrollContainerRef = useRef(null)
  const activeBtnRef = useRef(null)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  // Track scroll direction to sync sticky position with the auto-hiding main navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollY <= 40) {
        setNavVisible(true)
      } else if (currentScrollY > lastScrollY.current + 8) {
        setNavVisible(false)
      } else if (currentScrollY < lastScrollY.current - 8) {
        setNavVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll active filter button into view on mobile
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [activeFilter])

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
      if (rect.top < 60) {
        const targetY = window.scrollY + rect.top - 120
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
      className={`sticky z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-2xs select-none transition-all duration-300 ${
        navVisible ? 'top-20' : 'top-0'
      }`}
      aria-label="Project category filter"
    >
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Subtle horizontal gradient fades on mobile to indicate scrollability */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent lg:hidden z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent lg:hidden z-10"
          aria-hidden="true"
        />

        {/* Responsive Bar: Smooth horizontal scroll on mobile/tablet, full 6-col grid on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 lg:grid lg:grid-cols-6 lg:gap-2.5 w-full"
          role="tablist"
        >
          {REGISTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id
            const count = getCount(cat.id)
            const countStr = count < 10 ? `0${count}` : `${count}`
            const Icon = cat.icon

            if (isActive) {
              return (
                <button
                  key={cat.id}
                  ref={activeBtnRef}
                  onClick={() => handleSelect(cat.id)}
                  role="tab"
                  aria-selected="true"
                  className="shrink-0 lg:w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-2.5 py-1.5 sm:py-2 rounded-full bg-slate-950 text-white shadow-sm font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-transform active:scale-[0.98]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <Icon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="font-semibold text-white tracking-tight text-xs sm:text-[13px]">
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
                className="shrink-0 lg:w-full group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-2.5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-slate-950 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all shadow-2xs hover:shadow-xs active:scale-[0.98]"
              >
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-500 font-medium shrink-0">
                  {cat.num}
                </span>

                <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor} shrink-0`} />

                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors" />

                <span className="text-slate-700 group-hover:text-slate-900 tracking-tight text-xs sm:text-[13px]">
                  {cat.label}
                </span>

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
