import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Home,
  Sparkles,
  Wrench,
  CheckCircle2,
  Maximize2,
  ChevronRight,
  Compass,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const GRID_DARK = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
}

// 5 Architectural Project Types Blueprint Schematics & Built-Form Geometry
// ViewBox: 0 0 800 520
const PROJECT_SCHEMATICS = [
  {
    id: 'new-home-const',
    icon: Home,
    code: 'TYP-01',
    typology: 'Residential Villa / Custom Home',
    footprint: '3,200 sq.ft Total Floor Plate',
    scale: 'SCALE 1 : 100 · METRIC',
    structuralSystem: 'RCC Framed with Central Courtyard',
    zones: [
      { name: 'Master Suite Wing', area: '480 sq.ft' },
      { name: 'Central Living & Atrium', area: '720 sq.ft' },
      { name: 'Guest & Family Quarters', area: '640 sq.ft' },
      { name: 'Service & Kitchen Yard', area: '380 sq.ft' },
    ],
    // 2D Floor Plan Perimeter + Rooms
    plan2D: {
      outer: 'M 180 120 L 620 120 L 620 400 L 180 400 Z',
      partitions: [
        'M 180 240 L 420 240 L 420 120',
        'M 420 240 L 620 240',
        'M 300 240 L 300 400',
        'M 480 240 L 480 400',
      ],
      columns: [
        { x: 180, y: 120 }, { x: 420, y: 120 }, { x: 620, y: 120 },
        { x: 180, y: 240 }, { x: 300, y: 240 }, { x: 420, y: 240 }, { x: 620, y: 240 },
        { x: 180, y: 400 }, { x: 300, y: 400 }, { x: 480, y: 400 }, { x: 620, y: 400 },
      ],
      openings: [
        { x: 360, y: 400, w: 40, h: 6, label: 'ENTRY' },
        { x: 180, y: 160, w: 6, h: 40, label: 'W1' },
        { x: 620, y: 160, w: 6, h: 40, label: 'W2' },
        { x: 620, y: 300, w: 6, h: 50, label: 'W3' },
      ],
      dimensions: {
        top: { x1: 180, y1: 90, x2: 620, y2: 90, label: '14.80 m' },
        side: { x1: 140, y1: 120, x2: 140, y2: 400, label: '9.40 m' },
      },
    },
    // 2.5D Axonometric Built Form
    axonometric: {
      roof: 'M 220 90 L 400 40 L 660 70 L 480 120 Z',
      walls: [
        'M 220 90 L 220 260 L 480 300 L 480 120 Z',
        'M 480 120 L 480 300 L 660 240 L 660 70 Z',
      ],
      canopy: 'M 320 280 L 440 300 L 440 320 L 320 300 Z',
      ridge: 'M 400 40 L 480 120',
    },
  },
  {
    id: 'row-houses',
    icon: Building2,
    code: 'TYP-02',
    typology: 'Row Houses / Multi-Unit Enclave',
    footprint: '4,800 sq.ft (3 Synchronized Units)',
    scale: 'SCALE 1 : 125 · METRIC',
    structuralSystem: 'Shared Shear Party Walls with Modular Bays',
    zones: [
      { name: 'Unit 01 (Left Duplex)', area: '1,500 sq.ft' },
      { name: 'Unit 02 (Center Duplex)', area: '1,500 sq.ft' },
      { name: 'Unit 03 (Right Duplex)', area: '1,500 sq.ft' },
      { name: 'Shared Green Verandah', area: '300 sq.ft' },
    ],
    plan2D: {
      outer: 'M 140 140 L 660 140 L 660 380 L 140 380 Z',
      partitions: [
        'M 313 140 L 313 380', // Party wall 1
        'M 486 140 L 486 380', // Party wall 2
        'M 140 260 L 313 260',
        'M 313 260 L 486 260',
        'M 486 260 L 660 260',
      ],
      columns: [
        { x: 140, y: 140 }, { x: 313, y: 140 }, { x: 486, y: 140 }, { x: 660, y: 140 },
        { x: 140, y: 260 }, { x: 313, y: 260 }, { x: 486, y: 260 }, { x: 660, y: 260 },
        { x: 140, y: 380 }, { x: 313, y: 380 }, { x: 486, y: 380 }, { x: 660, y: 380 },
      ],
      openings: [
        { x: 200, y: 380, w: 40, h: 6, label: 'ENTRY 1' },
        { x: 375, y: 380, w: 40, h: 6, label: 'ENTRY 2' },
        { x: 550, y: 380, w: 40, h: 6, label: 'ENTRY 3' },
      ],
      dimensions: {
        top: { x1: 140, y1: 100, x2: 660, y2: 100, label: '18.60 m MODULAR FRONT' },
        side: { x1: 100, y1: 140, x2: 100, y2: 380, label: '8.20 m' },
      },
    },
    axonometric: {
      roof: 'M 180 110 L 320 60 L 690 90 L 550 140 Z',
      walls: [
        'M 180 110 L 180 280 L 330 310 L 330 140 Z',
        'M 330 140 L 330 310 L 470 300 L 470 130 Z',
        'M 470 130 L 470 300 L 620 270 L 620 100 Z',
        'M 620 100 L 620 270 L 690 230 L 690 90 Z',
      ],
      canopy: 'M 200 290 L 300 310 L 300 320 L 200 300 Z',
      ridge: 'M 320 60 L 550 140',
    },
  },
  {
    id: 'commercial-const',
    icon: Building2,
    code: 'TYP-03',
    typology: 'Commercial Complex / Retail & Offices',
    footprint: '6,400 sq.ft Clear Column Grid',
    scale: 'SCALE 1 : 150 · METRIC',
    structuralSystem: 'Heavy-Duty Post-Tensioned Clear Span Beams',
    zones: [
      { name: 'Showroom & Retail Floor', area: '2,400 sq.ft' },
      { name: 'Open Office Workspace', area: '2,200 sq.ft' },
      { name: 'Reinforced Service Core', area: '900 sq.ft' },
      { name: 'Circulation & Escalators', area: '900 sq.ft' },
    ],
    plan2D: {
      outer: 'M 160 110 L 640 110 L 640 390 L 160 390 Z',
      partitions: [
        'M 360 210 L 440 210 L 440 290 L 360 290 Z', // Service core
        'M 160 250 L 360 250',
        'M 440 250 L 640 250',
      ],
      columns: [
        { x: 160, y: 110 }, { x: 320, y: 110 }, { x: 480, y: 110 }, { x: 640, y: 110 },
        { x: 160, y: 250 }, { x: 320, y: 250 }, { x: 480, y: 250 }, { x: 640, y: 250 },
        { x: 160, y: 390 }, { x: 320, y: 390 }, { x: 480, y: 390 }, { x: 640, y: 390 },
      ],
      openings: [
        { x: 220, y: 390, w: 80, h: 6, label: 'GLASS FAÇADE 1' },
        { x: 500, y: 390, w: 80, h: 6, label: 'GLASS FAÇADE 2' },
      ],
      dimensions: {
        top: { x1: 160, y1: 80, x2: 640, y2: 80, label: '24.00 m CLEAR SPAN' },
        side: { x1: 120, y1: 110, x2: 120, y2: 390, label: '14.00 m' },
      },
    },
    axonometric: {
      roof: 'M 200 120 L 380 70 L 670 100 L 490 150 Z',
      walls: [
        'M 200 120 L 200 320 L 490 370 L 490 150 Z',
        'M 490 150 L 490 370 L 670 300 L 670 100 Z',
      ],
      canopy: 'M 300 340 L 450 365 L 450 380 L 300 355 Z',
      ridge: 'M 200 220 L 490 260 L 670 200', // Mid floor line
    },
  },
  {
    id: 'renovation',
    icon: Wrench,
    code: 'TYP-04',
    typology: 'Adaptive Renovation & Retrofitting',
    footprint: '2,800 sq.ft Restructured Envelope',
    scale: 'SCALE 1 : 100 · METRIC',
    structuralSystem: 'Zero-Vibration Underpinning & Steel Retrofit',
    zones: [
      { name: 'Preserved Structural Envelope', area: '1,600 sq.ft' },
      { name: 'Reconfigured Open Plan Core', area: '800 sq.ft' },
      { name: 'Reinforced Foundation Underpinning', area: '400 sq.ft' },
    ],
    plan2D: {
      outer: 'M 180 130 L 620 130 L 620 390 L 180 390 Z',
      partitions: [
        'M 180 260 L 340 260', // Preserved
        'M 460 260 L 620 260', // Preserved
        'M 340 130 L 340 390', // Steel column retrofit
        'M 460 130 L 460 390', // Steel column retrofit
      ],
      columns: [
        { x: 180, y: 130 }, { x: 340, y: 130 }, { x: 460, y: 130 }, { x: 620, y: 130 },
        { x: 180, y: 260 }, { x: 340, y: 260 }, { x: 460, y: 260 }, { x: 620, y: 260 },
        { x: 180, y: 390 }, { x: 340, y: 390 }, { x: 460, y: 390 }, { x: 620, y: 390 },
      ],
      openings: [
        { x: 360, y: 390, w: 80, h: 6, label: 'NEW ENTRY' },
      ],
      dimensions: {
        top: { x1: 180, y1: 95, x2: 620, y2: 95, label: 'RETROFIT ZONE: 14.0 m' },
        side: { x1: 140, y1: 130, x2: 140, y2: 390, label: '8.60 m' },
      },
    },
    axonometric: {
      roof: 'M 220 100 L 380 60 L 640 85 L 480 130 Z',
      walls: [
        'M 220 100 L 220 280 L 480 320 L 480 130 Z',
        'M 480 130 L 480 320 L 640 260 L 640 85 Z',
      ],
      canopy: 'M 320 290 L 440 310 L 440 325 L 320 305 Z',
      ridge: 'M 380 60 L 480 130',
    },
  },
  {
    id: 'turnkey',
    icon: Sparkles,
    code: 'TYP-05',
    typology: 'Turnkey Master Project Delivery',
    footprint: '5,200 sq.ft Master Compound & Pavilion',
    scale: 'SCALE 1 : 125 · METRIC',
    structuralSystem: 'End-to-End Architectural, Civil, MEP & Finishes',
    zones: [
      { name: 'Primary Residence Pavilion', area: '3,200 sq.ft' },
      { name: 'Ancillary Service & MEP Wing', area: '1,100 sq.ft' },
      { name: 'Integrated Landscape Porch', area: '900 sq.ft' },
    ],
    plan2D: {
      outer: 'M 150 120 L 650 120 L 650 390 L 150 390 Z',
      partitions: [
        'M 150 250 L 420 250 L 420 120',
        'M 420 250 L 650 250',
        'M 500 250 L 500 390',
      ],
      columns: [
        { x: 150, y: 120 }, { x: 420, y: 120 }, { x: 650, y: 120 },
        { x: 150, y: 250 }, { x: 300, y: 250 }, { x: 420, y: 250 }, { x: 500, y: 250 }, { x: 650, y: 250 },
        { x: 150, y: 390 }, { x: 300, y: 390 }, { x: 500, y: 390 }, { x: 650, y: 390 },
      ],
      openings: [
        { x: 340, y: 390, w: 60, h: 6, label: 'MASTER ENTRY' },
        { x: 150, y: 170, w: 6, h: 40, label: 'GARDEN DECK' },
      ],
      dimensions: {
        top: { x1: 150, y1: 85, x2: 650, y2: 85, label: '20.00 m MASTER COMPOUND' },
        side: { x1: 110, y1: 120, x2: 110, y2: 390, label: '11.20 m' },
      },
    },
    axonometric: {
      roof: 'M 200 90 L 380 40 L 670 70 L 490 120 Z',
      walls: [
        'M 200 90 L 200 280 L 490 320 L 490 120 Z',
        'M 490 120 L 490 320 L 670 260 L 670 70 Z',
      ],
      canopy: 'M 320 290 L 450 310 L 450 325 L 320 305 Z',
      ridge: 'M 380 40 L 490 120',
    },
  },
]

/**
 * ProjectTypesBlueprint
 *
 * Section 02 on `/services/construction`.
 * Interactive architectural blueprint table featuring:
 * - 2D Technical Floor Plan morphing into 2.5D Built Form Massing.
 * - Dynamic dimension lines and technical grid annotations.
 * - Vertical Project Type Navigator.
 * - Driven strictly by scroll without red threads or rolling wheels.
 */
export default function ProjectTypesBlueprint({ projectTypes = [] }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [activeIdx, setActiveIdx] = useState(0)
  const [localProgress, setLocalProgress] = useState(0) // 0 to 1 within the active project type

  // Track vertical scroll progress through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Spring physics for responsive, fluid scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.0005,
  })

  // Scrub active project type and 2D-to-Axonometric transition to scroll progress
  useEffect(() => {
    if (shouldReduceMotion) return

    const total = PROJECT_SCHEMATICS.length
    const unsubscribe = smoothProgress.on('change', (v) => {
      const progress = Math.max(0, Math.min(0.999, v))
      const rawIndex = progress * total
      const index = Math.floor(rawIndex)
      const local = rawIndex - index

      setActiveIdx(Math.min(total - 1, Math.max(0, index)))
      setLocalProgress(local)
    })

    return () => unsubscribe()
  }, [smoothProgress, shouldReduceMotion])

  const currentTypeData = projectTypes[activeIdx] || projectTypes[0]
  const currentSchematic = PROJECT_SCHEMATICS[activeIdx] || PROJECT_SCHEMATICS[0]
  const ActiveIcon = currentSchematic.icon

  // Calculate 2D Plan drawing vs. 3D Built Form Morph
  // Phase 1 (0.0 -> 0.45): 2D Plan draws with dimensions
  // Phase 2 (0.45 -> 0.85): 3D Built Form lifts & materializes
  // Phase 3 (0.85 -> 1.0): Prepares transition to next blueprint
  const planDrawProgress = Math.min(1, localProgress / 0.45)
  const builtFormOpacity = Math.max(0, Math.min(1, (localProgress - 0.40) / 0.35))
  const planOpacity = Math.max(0.2, 1 - builtFormOpacity * 0.75)

  // ── REDUCED MOTION ACCESSIBLE FALLBACK ─────────────────────────────
  if (shouldReduceMotion) {
    return (
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              Architectural Typologies
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Project Types We Execute
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              From bespoke private residences to modular row houses and high-span commercial structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((pt, i) => {
              const schematic = PROJECT_SCHEMATICS[i] || PROJECT_SCHEMATICS[0]
              const Icon = schematic.icon
              return (
                <div
                  key={pt.id}
                  className="p-7 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-red-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-[11px] font-mono uppercase text-red-400 mb-1">{schematic.code}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{pt.label}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{pt.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-400 font-mono">
                    <p>{schematic.typology}</p>
                    <p className="text-slate-500">{schematic.footprint}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ── CINEMATIC BLUEPRINT → BUILT FORM TABLE EXPERIENCE ─────────────
  return (
    <div
      ref={containerRef}
      className="relative bg-slate-900 text-white"
      style={{ height: '380vh' }}
    >
      {/* Pinned Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 lg:py-8 select-none">
        {/* Architectural Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={GRID_DARK}
          aria-hidden="true"
        />

        {/* ── 1. TOP HEADER HUD ──────────────────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
                Section 02 · Project Types & Applications
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Blueprint → Built Form Exploration
            </h2>
          </div>

          {/* Blueprint Drawing State HUD */}
          <div className="shrink-0 hidden md:flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span>{currentSchematic.scale}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
              <span className="text-slate-500">STATE: </span>
              <span className={builtFormOpacity > 0.5 ? 'text-emerald-400 font-bold' : 'text-sky-400 font-bold'}>
                {builtFormOpacity > 0.5 ? '3D AXONOMETRIC MASSING' : '2D SCHEMATIC FLOOR PLAN'}
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. CENTER STAGE: 3-COLUMN ARCHITECTURAL BLUEPRINT TABLE ── */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Project Type Dossier */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTypeData ? currentTypeData.id : 'pt-0'}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="p-6 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
                      <ActiveIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                      {currentSchematic.code}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800">
                    Type {String(activeIdx + 1).padStart(2, '0')} / 05
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                  {currentTypeData ? currentTypeData.label : ''}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {currentTypeData ? currentTypeData.desc : ''}
                </p>

                {/* Itemized Structural Zones */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5 mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Spatial Breakdown & Layout:
                  </p>
                  {currentSchematic.zones.map((zone) => (
                    <div key={zone.name} className="flex items-center justify-between text-xs text-slate-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{zone.name}</span>
                      </div>
                      <span className="text-slate-500 text-[11px]">{zone.area}</span>
                    </div>
                  ))}
                </div>

                {/* Structural System Badge */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{currentSchematic.structuralSystem}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Morphing Architectural Blueprint Canvas */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex items-center justify-center">
            <div className="w-full relative aspect-[800/520] max-h-[360px] sm:max-h-[440px] rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-2xl p-4 overflow-hidden backdrop-blur-sm">
              <svg
                viewBox="0 0 800 520"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Blueprint Background Grid & Origin Axes */}
                <line x1="80" y1="260" x2="720" y2="260" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="400" y1="40" x2="400" y2="480" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" strokeDasharray="4 8" />

                {/* ── 1. 2D FLOOR PLAN LAYER (With dynamic dimension lines) ── */}
                <g opacity={planOpacity} className="transition-opacity duration-300">
                  {/* Outer Walls Perimeter */}
                  <path
                    d={currentSchematic.plan2D.outer}
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1800,
                      strokeDashoffset: 1800 * (1 - planDrawProgress),
                      transition: 'stroke-dashoffset 0.05s linear',
                    }}
                  />

                  {/* Internal Room Partitions */}
                  {currentSchematic.plan2D.partitions.map((d, pIdx) => (
                    <path
                      key={pIdx}
                      d={d}
                      stroke="#0284c7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 900,
                        strokeDashoffset: 900 * (1 - planDrawProgress),
                      }}
                    />
                  ))}

                  {/* Structural Columns Matrix */}
                  {currentSchematic.plan2D.columns.map((col, cIdx) => (
                    <rect
                      key={cIdx}
                      x={col.x - 5}
                      y={col.y - 5}
                      width="10"
                      height="10"
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth="1"
                      opacity={planDrawProgress}
                    />
                  ))}

                  {/* Door & Window Apertures */}
                  {currentSchematic.plan2D.openings.map((op, oIdx) => (
                    <g key={oIdx} opacity={planDrawProgress}>
                      <rect
                        x={op.x}
                        y={op.y}
                        width={op.w}
                        height={op.h}
                        fill="#0f172a"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}

                  {/* Dynamic Dimension Lines */}
                  {planDrawProgress > 0.5 && (
                    <g opacity={planDrawProgress}>
                      {/* Top Dimension */}
                      <line
                        x1={currentSchematic.plan2D.dimensions.top.x1}
                        y1={currentSchematic.plan2D.dimensions.top.y1}
                        x2={currentSchematic.plan2D.dimensions.top.x2}
                        y2={currentSchematic.plan2D.dimensions.top.y1}
                        stroke="#94a3b8"
                        strokeWidth="1"
                      />
                      <line x1={currentSchematic.plan2D.dimensions.top.x1} y1={currentSchematic.plan2D.dimensions.top.y1 - 6} x2={currentSchematic.plan2D.dimensions.top.x1} y2={currentSchematic.plan2D.dimensions.top.y1 + 6} stroke="#94a3b8" strokeWidth="1" />
                      <line x1={currentSchematic.plan2D.dimensions.top.x2} y1={currentSchematic.plan2D.dimensions.top.y1 - 6} x2={currentSchematic.plan2D.dimensions.top.x2} y2={currentSchematic.plan2D.dimensions.top.y1 + 6} stroke="#94a3b8" strokeWidth="1" />
                      <text
                        x={(currentSchematic.plan2D.dimensions.top.x1 + currentSchematic.plan2D.dimensions.top.x2) / 2}
                        y={currentSchematic.plan2D.dimensions.top.y1 - 8}
                        textAnchor="middle"
                        className="text-[10px] font-mono fill-slate-300 font-semibold"
                      >
                        {currentSchematic.plan2D.dimensions.top.label}
                      </text>

                      {/* Side Dimension */}
                      <line
                        x1={currentSchematic.plan2D.dimensions.side.x1}
                        y1={currentSchematic.plan2D.dimensions.side.y1}
                        x2={currentSchematic.plan2D.dimensions.side.x1}
                        y2={currentSchematic.plan2D.dimensions.side.y2}
                        stroke="#94a3b8"
                        strokeWidth="1"
                      />
                      <line x1={currentSchematic.plan2D.dimensions.side.x1 - 6} y1={currentSchematic.plan2D.dimensions.side.y1} x2={currentSchematic.plan2D.dimensions.side.x1 + 6} y2={currentSchematic.plan2D.dimensions.side.y1} stroke="#94a3b8" strokeWidth="1" />
                      <line x1={currentSchematic.plan2D.dimensions.side.x1 - 6} y1={currentSchematic.plan2D.dimensions.side.y2} x2={currentSchematic.plan2D.dimensions.side.x1 + 6} y2={currentSchematic.plan2D.dimensions.side.y2} stroke="#94a3b8" strokeWidth="1" />
                      <text
                        x={currentSchematic.plan2D.dimensions.side.x1 - 10}
                        y={(currentSchematic.plan2D.dimensions.side.y1 + currentSchematic.plan2D.dimensions.side.y2) / 2}
                        textAnchor="end"
                        className="text-[10px] font-mono fill-slate-300 font-semibold"
                      >
                        {currentSchematic.plan2D.dimensions.side.label}
                      </text>
                    </g>
                  )}
                </g>

                {/* ── 2. 2.5D AXONOMETRIC BUILT-FORM MASSING LAYER ── */}
                <g opacity={builtFormOpacity} className="transition-opacity duration-300">
                  {/* Axonometric Wall Facades */}
                  {currentSchematic.axonometric.walls.map((wPath, wIdx) => (
                    <path
                      key={wIdx}
                      d={wPath}
                      fill="rgba(15, 23, 42, 0.75)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  ))}

                  {/* Axonometric Roof Plate */}
                  <path
                    d={currentSchematic.axonometric.roof}
                    fill="rgba(2, 132, 199, 0.2)"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {/* Canopy / Porch Projection */}
                  <path
                    d={currentSchematic.axonometric.canopy}
                    fill="rgba(239, 68, 68, 0.25)"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Ridge Line */}
                  <path
                    d={currentSchematic.axonometric.ridge}
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Built Form Elevation Tag */}
                  <g transform="translate(640, 60)">
                    <rect x="0" y="0" width="130" height="24" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
                    <text x="65" y="16" textAnchor="middle" className="text-[9px] font-mono fill-emerald-400 font-bold uppercase tracking-wider">
                      ● BUILT FORM 3D
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Vertical Project Type Navigator Index */}
          <div className="lg:col-span-2 order-3 flex flex-col gap-2.5">
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-1">
              Typology Index
            </p>
            {projectTypes.map((pt, idx) => {
              const isSelected = activeIdx === idx
              return (
                <div
                  key={pt.id}
                  className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-950 border-red-500/60 shadow-lg text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-red-400' : 'text-slate-600'}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold leading-tight line-clamp-1">
                      {pt.label}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 3. BOTTOM FOOTER HUD ───────────────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-red-500 font-semibold uppercase tracking-wider">
              {currentSchematic.typology}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">
              Scroll to morph between 2D technical floor plans and 3D architectural built massing
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span>
              {activeIdx === 4 ? 'All Project Types Explored' : 'Scroll to explore next typology'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
