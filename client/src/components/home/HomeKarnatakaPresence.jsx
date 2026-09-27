import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const EXPO = [0.16, 1, 0.3, 1]

const HUBS = [
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    role: 'Central Studio & Operations Hub',
    focus: 'Residential Villas, Commercial Architecture & Turnkey Corporate Interiors',
    x: '75%',
    y: '70%',
  },
  {
    id: 'mysuru',
    city: 'Mysuru',
    role: 'Heritage & Commercial Corridor',
    focus: 'Civil Construction, Commercial Shells & High-Spec Residential Projects',
    x: '62%',
    y: '85%',
  },
  {
    id: 'chikkamagaluru',
    city: 'Chikkamagaluru',
    role: 'Active Build Sites & Hill Topography',
    focus: 'Homestays, Contemporary Row Houses, Luxury Residential & Civil Works',
    x: '38%',
    y: '42%',
  },
  {
    id: 'hassan',
    city: 'Hassan',
    role: 'Regional Site Link',
    focus: 'Civil Structural Frameworks, Planning & Material Procurement Linkage',
    x: '48%',
    y: '65%',
  },
]

function HomeKarnatakaPresence() {
  const [activeHub, setActiveHub] = useState('bengaluru')
  const shouldReduceMotion = useReducedMotion()

  const current = HUBS.find((h) => h.id === activeHub) || HUBS[0]

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Regional Strategy Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                REGIONAL FOOTPRINT
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Working Across Karnataka.
            </h2>

            <p className="text-base text-slate-600 font-light leading-relaxed">
              Advith Projects operates actively across South Karnataka. Our on-site coordination
              ensures dependable execution whether we are pouring multi-floor RCC frames in Mysuru,
              constructing bespoke homes in Chikkamagaluru, or delivering turnkey interiors in Bengaluru.
            </p>

            {/* Hub Selector List */}
            <div className="space-y-2 pt-2">
              {HUBS.map((hub) => {
                const isSelected = activeHub === hub.id
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub.id)}
                    className={`w-full p-3.5 text-left rounded-lg transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-white border-slate-900 shadow-xs'
                        : 'bg-transparent hover:bg-white border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-red-600' : 'bg-slate-300'}`} />
                      <h4 className="font-bold text-sm text-slate-900">{hub.city}</h4>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {isSelected ? 'ACTIVE HUB' : 'VIEW'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Architectural Regional Schematic Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 shadow-md p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              {/* Drafting Marks */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 font-mono text-xs text-slate-400">
                <span className="text-slate-900 font-bold">REGIONAL COVERAGE · KARNATAKA</span>
                <span>KARNATAKA, INDIA</span>
              </div>

              {/* Schematic Map Representation */}
              <div className="relative aspect-[16/10] bg-[#F7F9FB] border border-slate-200 rounded-xl overflow-hidden mb-6 p-6 flex items-center justify-center">
                {/* Lat/Long Grid overlay */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }}
                />

                {/* SVG Connecting Vectors Between Cities */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  <line x1="38%" y1="42%" x2="48%" y2="65%" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="48%" y1="65%" x2="62%" y2="85%" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="48%" y1="65%" x2="75%" y2="70%" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="62%" y1="85%" x2="75%" y2="70%" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {/* City Nodes on the Schematic Canvas */}
                {HUBS.map((hub) => {
                  const isSelected = activeHub === hub.id
                  return (
                    <div
                      key={hub.id}
                      onClick={() => setActiveHub(hub.id)}
                      style={{ left: hub.x, top: hub.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        {isSelected && (
                          <div className="absolute w-8 h-8 rounded-full bg-red-600/20 animate-ping" />
                        )}
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                            isSelected
                              ? 'bg-red-600 border-white shadow-md scale-125'
                              : 'bg-slate-700 border-white hover:bg-red-500'
                          }`}
                        />
                      </div>
                      <span
                        className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded shadow-2xs ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 group-hover:bg-slate-900 group-hover:text-white'
                        }`}
                      >
                        {hub.city}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Selected Hub Technical Context Plate */}
              <motion.div
                key={activeHub}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EXPO }}
                className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl"
              >
                <div className="mb-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {current.city} — {current.role}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {current.focus}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeKarnatakaPresence)
