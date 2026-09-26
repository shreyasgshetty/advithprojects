import { useState, memo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Building2, Layers, Check } from 'lucide-react'
import { services } from '../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

const SERVICE_META = {
  architecture: {
    num: '01',
    title: 'Architecture & Planning',
    shortTitle: 'Architecture',
    accent: 'text-amber-600',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
    dot: 'bg-amber-500',
    icon: Compass,
    image: '/projects/architecture/ap-ckm2025-01/cover.jpeg',
    path: '/services/architecture',
    capabilities: [
      'Site Analysis & Spatial Layouts',
      'Structural Drawing Coordination',
      'High-Precision 3D Visualization',
      'Statutory & Local Council Approvals',
    ],
  },
  construction: {
    num: '02',
    title: 'Civil Construction',
    shortTitle: 'Construction',
    accent: 'text-red-600',
    bgLight: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-900 border-red-300',
    btnBg: 'bg-red-600 hover:bg-red-700',
    dot: 'bg-red-600',
    icon: Building2,
    image: '/projects/construction/ap-ckm2024-01/cover.jpeg',
    path: '/services/construction',
    capabilities: [
      'RCC Foundation & Structural Framing',
      'IS-456 Concrete & Reinforcement Standards',
      'Brick Masonry & Precision Plastering',
      'Turnkey Site Management & Quality Audits',
    ],
  },
  interiors: {
    num: '03',
    title: 'Turnkey Interior Design',
    shortTitle: 'Interiors',
    accent: 'text-rose-600',
    bgLight: 'bg-rose-50',
    border: 'border-rose-200',
    badge: 'bg-rose-100 text-rose-900 border-rose-300',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
    dot: 'bg-rose-500',
    icon: Layers,
    image: '/projects/interior/ap-ckm2025-02/cover.jpeg',
    path: '/services/interiors',
    capabilities: [
      'Bespoke Woodwork & Custom Joinery',
      'Architectural & Layered Lighting Design',
      'Stone, Tile & Palette Selection',
      'Turnkey Execution & Furnishing Polish',
    ],
  },
}

function HomeServices() {
  const [activeSlug, setActiveSlug] = useState('construction')
  const shouldReduceMotion = useReducedMotion()

  const currentMeta = SERVICE_META[activeSlug]
  const currentData = services.find((s) => s.slug === activeSlug) || services[0]

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB] border-b border-slate-200 select-none relative overflow-hidden">
      {/* Background linework */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                WHAT WE DO
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              From First Sketch to Final Handover.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-light max-w-md">
            Three distinct engineering practices, united by a single project governance standard. Select
            any discipline to view technical capabilities.
          </p>
        </div>

        {/* Editorial Composition: Left Tab Selectors, Right Deep Architectural Feature Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Discipline Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {Object.keys(SERVICE_META).map((slug) => {
              const item = SERVICE_META[slug]
              const isActive = activeSlug === slug
              const Icon = item.icon

              return (
                <div
                  key={slug}
                  onClick={() => setActiveSlug(slug)}
                  onMouseEnter={() => setActiveSlug(slug)}
                  className={`p-5 sm:p-6 transition-all duration-300 border cursor-pointer relative group ${
                    isActive
                      ? 'bg-white border-slate-900 shadow-md translate-x-1'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Left accent bar when active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceIndicator"
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        slug === 'architecture'
                          ? 'bg-amber-500'
                          : slug === 'construction'
                          ? 'bg-red-600'
                          : 'bg-rose-500'
                      }`}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      DISCIPLINE {item.num}
                    </span>
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${item.bgLight} ${item.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold tracking-tight transition-colors mb-2 ${
                    isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                    {slug === 'architecture'
                      ? 'Architectural planning, concept development, and complete working drawing sets.'
                      : slug === 'construction'
                      ? 'Civil engineering, structural RCC framing, and robust site execution to IS standards.'
                      : 'Curated material specification, bespoke furniture, and complete turnkey interior fit-outs.'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] uppercase text-slate-400">
                      {isActive ? 'ACTIVE SPECIFICATION' : 'CLICK TO EXPAND'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive ? 'text-slate-900 translate-x-1' : 'text-slate-300 group-hover:text-slate-600'
                    }`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expanded Discipline Feature Showcase (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlug}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EXPO }}
                className="bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Top Spec Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${currentMeta.dot}`} />
                      <span className="font-bold text-slate-900 uppercase">
                        {currentMeta.title}
                      </span>
                    </div>
                    <span className="text-slate-400">TURNKEY DELIVERY</span>
                  </div>

                  {/* Representative Photography with Drafting Frame */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950 mb-6 border border-slate-200 group">
                    <img
                      src={currentMeta.image}
                      alt={currentMeta.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                      <p className="text-[10px] text-slate-300 uppercase tracking-widest">
                        COMMISSION DOCUMENTATION
                      </p>
                      <p className="font-bold text-sm">{currentMeta.title}</p>
                    </div>
                  </div>

                  {/* Narrative Scope */}
                  <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-6">
                    {currentData.heroDescription || currentData.navDescription}
                  </p>

                  {/* Technical Capabilities Checklist */}
                  <div className="mb-6">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                      PRACTICE CAPABILITIES & DELIVERABLES
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentMeta.capabilities.map((cap) => (
                        <div
                          key={cap}
                          className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded text-xs text-slate-700 font-medium"
                        >
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${currentMeta.accent}`} />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Comprehensive scope from initial brief to handover
                  </span>
                  <Link
                    to={currentMeta.path}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm ${currentMeta.btnBg}`}
                  >
                    <span>EXPLORE {currentMeta.shortTitle.toUpperCase()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeServices)
