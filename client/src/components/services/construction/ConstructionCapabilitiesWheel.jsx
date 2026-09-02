import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  ChevronRight,
  Building2,
  Layers,
  Ruler,
  HardHat,
  Sparkles,
  ShieldCheck,
  Wrench,
  Boxes,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const GRID_DARK = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
  backgroundSize: '36px 36px',
}

// Exact normalized progress anchors corresponding to the 8 construction capability nodes along the house route
const CAPABILITY_ANCHORS = [
  0.000, // 01 Residential Construction · Foundation Datum (160, 540)
  0.125, // 02 Commercial Construction · Plinth & Column Base (320, 540)
  0.242, // 03 RCC & Structural Works · Ground Columns Upright (320, 370)
  0.492, // 04 Masonry & Brickwork · Mid-Floor Slab & Beam (680, 370)
  0.589, // 05 Waterproofing & Damp-proofing · Superstructure Columns (680, 230)
  0.838, // 06 Plastering & Finishing Works · Eaves Tie Girder (320, 230)
  0.919, // 07 Renovation & Refurbishment · Roof Rafter Pitch (410, 155)
  1.000, // 08 Turnkey Construction · Completed Crown & Handover (500, 80)
]

// Technical scope annotations and phase labels for all 8 capabilities
const CAPABILITY_SPECS = [
  {
    icon: Building2,
    stageTag: 'PHASE 01 · FOUNDATION DATUM',
    phaseName: 'Foundation & Soil Engineering',
    category: 'Residential Typology',
    elevation: '±0.000 Ground Datum',
    highlights: ['Soil Bearing Analysis & Deep Trench Excavation', 'Sub-base Compaction & Moisture Barriers', 'Ground Beam & Footing Reinforcement'],
  },
  {
    icon: Boxes,
    stageTag: 'PHASE 02 · COLUMN FOOTINGS',
    phaseName: 'Plinth Ties & Column Anchors',
    category: 'Commercial Typology',
    elevation: '+0.450 Plinth Level',
    highlights: ['Cast-in-Place Column Starter Cages', 'Heavy-Load Plinth Beam Tie Slabs', 'Substructure Anti-Capillary Barrier'],
  },
  {
    icon: Ruler,
    stageTag: 'PHASE 03 · VERTICAL RCC FRAMING',
    phaseName: 'Structural RCC Columns',
    category: 'Core Engineering',
    elevation: '+3.700 Slab Level 01',
    highlights: ['Engineered Vertical Column Formwork', 'High-Tensile TMT Steel Alignment', 'Monolithic RCC Curing Protocols'],
  },
  {
    icon: HardHat,
    stageTag: 'PHASE 04 · FLOOR SLAB & MASONRY',
    phaseName: 'Level 1 Slab & Perimeter Walls',
    category: 'Masonry & Partitions',
    elevation: '+3.700 Intermediate Beam',
    highlights: ['Engineered Two-Way Floor Slab Pour', 'Precision Solid Block Masonry Joints', 'Horizontal Lintel Tie Bands'],
  },
  {
    icon: ShieldCheck,
    stageTag: 'PHASE 05 · SUPERSTRUCTURE ENVELOPE',
    phaseName: 'Upper Structure & Weather Sealing',
    category: 'Protection & Insulation',
    elevation: '+6.500 Superstructure Level',
    highlights: ['Level 2 Structural Column Extensions', 'Multi-Layer Membrane Damp-Proofing', 'Exterior Weather Cladding Substrates'],
  },
  {
    icon: Layers,
    stageTag: 'PHASE 06 · CEILING BEAM & FINISHES',
    phaseName: 'Eaves Tie Girders & Leveling',
    category: 'Architectural Finishes',
    elevation: '+6.500 Ceiling Level',
    highlights: ['Monolithic Ceiling Slab Framing', 'Laser-Leveled Interior Plaster Screeds', 'Architectural Aperture Reinforcements'],
  },
  {
    icon: Wrench,
    stageTag: 'PHASE 07 · ROOF TRUSS & RAFTERS',
    phaseName: 'Structural Gable & Rafter Pitch',
    category: 'Restoration & Refit',
    elevation: '+7.800 Roof Pitch',
    highlights: ['Diagonal Rafter Angle Positioning', 'Gable Truss Collar Tie Connections', 'Thermal & Acoustic Insulation Layers'],
  },
  {
    icon: Sparkles,
    stageTag: 'PHASE 08 · COMPLETED STRUCTURE',
    phaseName: 'Ridge Apex Crown & Turnkey Handover',
    category: 'End-to-End Delivery',
    elevation: '+9.200 Ridge Apex',
    highlights: ['Final Structural Quality Certification', 'Turnkey MEP & Finishing Integration', 'Structured Project Handover Dossier'],
  },
]

// Continuous architectural inspection route through the rising house structure:
// Ground Entry (140, 540) -> Footing (320, 540) -> Column 1 Upright (320, 370)
// -> Level 1 Slab Traverse (680, 370) -> Column 2 Upright (680, 230)
// -> Level 2 Eaves Traverse (320, 230) -> Left Rafter Pitch (410, 155) -> Ridge Apex (500, 80)
const HOUSE_PATH_D =
  'M 140 540 L 320 540 L 320 370 L 680 370 L 680 230 L 320 230 L 410 155 L 500 80'

// Utility to normalize value between start and end [0, 1]
const getProgressRatio = (current, start, end) => {
  if (current <= start) return 0
  if (current >= end) return 1
  return (current - start) / (end - start)
}

/**
 * ConstructionCapabilitiesWheel
 *
 * True Scroll-Driven House Construction Experience.
 * As the user scrolls:
 * 1. The building visibly constructs itself layer by layer:
 *    Foundation -> Vertical Columns -> Mid-Slab -> Superstructure Walls -> Eaves Beam -> Roof Rafters -> Completed Apex.
 * 2. The precision wheel travels through the construction, leading the building progression.
 * 3. The red thread traces the continuous execution route.
 * 4. At 50% distance to the next node, the next ring begins glowing with increasing intensity.
 * 5. Text updates strictly when the wheel physically arrives at each node.
 * 6. Symmetrically deconstructs in reverse on upward scroll.
 */
export default function ConstructionCapabilitiesWheel({ capabilities = [] }) {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [activeIdx, setActiveIdx] = useState(0)
  const [nextRingIdx, setNextRingIdx] = useState(1)
  const [nextRingGlow, setNextRingGlow] = useState(0)
  const [totalPathLength, setTotalPathLength] = useState(1444.3)
  const [ringPositions, setRingPositions] = useState([])
  const [currentProgress, setCurrentProgress] = useState(0)

  const [wheelState, setWheelState] = useState({
    x: 140,
    y: 540,
    angle: 0,
    rollingAngle: 0,
    progress: 0,
  })

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

  // Measure path length and compute mathematically aligned ring positions
  useEffect(() => {
    if (!pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()
    setTotalPathLength(length)

    const positions = CAPABILITY_ANCHORS.map((anchor) => {
      const pt = path.getPointAtLength(anchor * length)
      return { x: pt.x, y: pt.y }
    })
    setRingPositions(positions)
  }, [])

  // Scrub construction layers, wheel, red thread, and 50% next-ring glow to scroll progress
  useEffect(() => {
    if (shouldReduceMotion) return

    const unsubscribe = smoothProgress.on('change', (v) => {
      const progress = Math.max(0, Math.min(1, v))
      setCurrentProgress(progress)

      // 1. Calculate which interval [A_i, A_{i+1}] the wheel is currently traversing
      let currentInterval = 0
      for (let i = 0; i < CAPABILITY_ANCHORS.length - 1; i++) {
        if (progress >= CAPABILITY_ANCHORS[i] && progress <= CAPABILITY_ANCHORS[i + 1]) {
          currentInterval = i
          break
        }
        if (progress > CAPABILITY_ANCHORS[CAPABILITY_ANCHORS.length - 1]) {
          currentInterval = CAPABILITY_ANCHORS.length - 2
        }
      }

      const aStart = CAPABILITY_ANCHORS[currentInterval]
      const aEnd = CAPABILITY_ANCHORS[currentInterval + 1]
      const localProgress = Math.max(0, Math.min(1, (progress - aStart) / (aEnd - aStart)))

      // 2. Active capability text updates ONLY when wheel reaches the ring
      if (progress >= 0.999) {
        setActiveIdx(CAPABILITY_ANCHORS.length - 1)
      } else {
        setActiveIdx(currentInterval)
      }

      // 3. Exact 50% Next-Ring Glow Rule:
      const nextTarget = currentInterval + 1
      setNextRingIdx(nextTarget)

      if (localProgress >= 0.5 && nextTarget < CAPABILITY_ANCHORS.length) {
        const intensity = (localProgress - 0.5) / 0.5
        setNextRingGlow(intensity)
      } else {
        setNextRingGlow(0)
      }

      // 4. Calculate exact point along SVG house path & tangent angle for the wheel
      if (pathRef.current) {
        const path = pathRef.current
        const length = path.getTotalLength()
        const currentDist = progress * length

        const delta = 2
        const p1 = path.getPointAtLength(Math.max(0, currentDist - delta))
        const p2 = path.getPointAtLength(Math.min(length, currentDist + delta))
        const dx = p2.x - p1.x
        const dy = p2.y - p1.y
        const tangentAngle = Math.atan2(dy, dx) * (180 / Math.PI)

        // Rolling rotation linked strictly to distance travelled
        const rolling = progress * 1440
        const pt = path.getPointAtLength(currentDist)

        setWheelState({
          x: pt.x,
          y: pt.y,
          angle: tangentAngle,
          rollingAngle: rolling,
          progress,
        })
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, shouldReduceMotion])

  const activeCapability = capabilities[activeIdx] || capabilities[0]
  const activeSpec = CAPABILITY_SPECS[activeIdx] || CAPABILITY_SPECS[0]
  const ActiveIcon = activeSpec.icon

  // ── LAYER PROGRESS CALCULATIONS FOR REAL BUILDING REVEAL ──────────
  // 1. Foundation & Footings: 0% -> 14%
  const foundationProgress = getProgressRatio(currentProgress, 0.00, 0.12)
  const soilHatchOpacity = getProgressRatio(currentProgress, 0.03, 0.12) * 0.4
  const footingPadOpacity = getProgressRatio(currentProgress, 0.06, 0.14)

  // 2. Ground Columns Rising Upward: 12% -> 26%
  const groundColumnsProgress = getProgressRatio(currentProgress, 0.12, 0.26)

  // 3. Level 1 Mid-Floor Slab & Cross-Beams: 24% -> 48%
  const slabLevel1Progress = getProgressRatio(currentProgress, 0.24, 0.48)
  const groundApertureOpacity = getProgressRatio(currentProgress, 0.36, 0.50) * 0.85

  // 4. Upper Superstructure Columns & Walls: 48% -> 65%
  const upperColumnsProgress = getProgressRatio(currentProgress, 0.48, 0.65)

  // 5. Level 2 Eaves Tie Beam & Ceiling: 65% -> 82%
  const eavesBeamProgress = getProgressRatio(currentProgress, 0.65, 0.82)
  const upperApertureOpacity = getProgressRatio(currentProgress, 0.70, 0.84) * 0.85

  // 6. Sloped Roof Rafters & King Post Pitch: 80% -> 96%
  const roofRaftersProgress = getProgressRatio(currentProgress, 0.80, 0.96)
  const collarTieProgress = getProgressRatio(currentProgress, 0.86, 0.96)
  const kingPostProgress = getProgressRatio(currentProgress, 0.88, 0.98)

  // 7. Completed Structure Finishes & Crown: 95% -> 100%
  const completionBadgeOpacity = getProgressRatio(currentProgress, 0.95, 1.00)

  // ── REDUCED MOTION ACCESSIBLE FALLBACK ─────────────────────────────
  if (shouldReduceMotion) {
    return (
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              Blueprint to Handover
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Construction Capabilities
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              From foundation excavation and RCC structural framing to waterproofing, architectural finishes, and turnkey delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => {
              const spec = CAPABILITY_SPECS[i] || CAPABILITY_SPECS[0]
              const Icon = spec.icon
              return (
                <div
                  key={cap.id}
                  className="p-7 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-red-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-[11px] font-mono uppercase text-red-400 mb-1">{spec.stageTag}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{cap.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 space-y-1.5">
                    {spec.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ── CINEMATIC PROGRESSIVE HOUSE CONSTRUCTION SCROLL EXPERIENCE ────
  return (
    <div
      ref={containerRef}
      className="relative bg-slate-950 text-white"
      style={{ height: '390vh' }}
    >
      {/* Pinned Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 lg:py-8 select-none">
        {/* Architectural Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={GRID_DARK}
          aria-hidden="true"
        />

        {/* Ambient Structural Red Glow following the construction height */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
          style={{
            top: `${50 - currentProgress * 40}%`,
            left: `${35 + (wheelState.x - 500) / 30}%`,
            background: 'radial-gradient(circle, rgba(239,68,68,0.35) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        {/* ── 1. TOP HUD STATUS BAR ──────────────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
                Section 01 · Construction Capabilities
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Progressive Construction Blueprint
            </h2>
          </div>

          {/* Active Node Counter + Construction Height HUD */}
          <div className="shrink-0 flex flex-col items-end">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xs uppercase text-slate-400">Node</span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-500">/ 08</span>
            </div>
            <div className="w-32 sm:w-40 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-red-600 rounded-full origin-left"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>

        {/* ── 2. CENTER STAGE: DOSSIER + PROGRESSIVE HOUSE BLUEPRINT ── */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Active Capability Technical Dossier */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability ? activeCapability.id : 'cap-0'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

                {/* Capability Header */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold">
                        {activeSpec.stageTag}
                      </p>
                      <span className="text-xs text-slate-400 font-mono">
                        Elevation: {activeSpec.elevation}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-red-900/40 text-red-300 border border-red-800/40">
                    Active Scope
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                  {activeCapability ? activeCapability.title : ''}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {activeCapability ? activeCapability.desc : ''}
                </p>

                {/* Itemized Technical Specifications */}
                <div className="pt-3.5 border-t border-slate-800 space-y-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Execution Highlights & Standards:
                  </p>
                  {activeSpec.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Progressive House Blueprint Drawing Canvas */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center">
            <div className="w-full relative aspect-[1000/620] max-h-[380px] sm:max-h-[460px]">
              <svg
                viewBox="0 0 1000 620"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── LAYER 0: FAINT BLUEPRINT GHOST GUIDES (Subtle context) ── */}
                <g opacity="0.08" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 6">
                  {/* Ghost Silhouette of the full house structure */}
                  <line x1="320" y1="540" x2="320" y2="230" />
                  <line x1="680" y1="540" x2="680" y2="230" />
                  <line x1="320" y1="370" x2="680" y2="370" />
                  <line x1="320" y1="230" x2="680" y2="230" />
                  <line x1="320" y1="230" x2="500" y2="80" />
                  <line x1="680" y1="230" x2="500" y2="80" />
                  <line x1="500" y1="80" x2="500" y2="540" />
                </g>

                {/* ── LAYER 1: FOUNDATION & GROUND LEVEL (0% -> 14%) ── */}
                {/* Ground Datum Line (Draws progressively from left to right) */}
                <line
                  x1="80"
                  y1="540"
                  x2="920"
                  y2="540"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 840,
                    strokeDashoffset: 840 * (1 - foundationProgress),
                  }}
                />

                {/* Foundation Soil Hatchings */}
                {[120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 880].map((hx) => (
                  <line
                    key={hx}
                    x1={hx}
                    y1="540"
                    x2={hx - 14}
                    y2="556"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    opacity={soilHatchOpacity}
                  />
                ))}

                {/* Left and Right Reinforced Concrete Footing Pads */}
                <g opacity={footingPadOpacity}>
                  <rect x="280" y="530" width="80" height="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <rect x="640" y="530" width="80" height="10" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Plinth Tie Beam */}
                  <line x1="360" y1="535" x2="640" y2="535" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
                </g>

                {/* Foundation Level Annotation */}
                <g opacity={foundationProgress}>
                  <text x="90" y="532" className="text-[10px] font-mono fill-slate-400 font-semibold">
                    ±0.000 FOUNDATION DATUM
                  </text>
                </g>

                {/* ── LAYER 2: VERTICAL RCC COLUMNS RISING UPWARD (12% -> 26%) ── */}
                {/* Left Column 1 (Grows bottom-up: 540 -> 370) */}
                <line
                  x1="320"
                  y1="540"
                  x2="320"
                  y2="370"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 170,
                    strokeDashoffset: 170 * (1 - groundColumnsProgress),
                  }}
                />
                {/* Right Column 1 (Grows bottom-up: 540 -> 370) */}
                <line
                  x1="680"
                  y1="540"
                  x2="680"
                  y2="370"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 170,
                    strokeDashoffset: 170 * (1 - groundColumnsProgress),
                  }}
                />
                {/* Center Support Column 1 */}
                <line
                  x1="500"
                  y1="540"
                  x2="500"
                  y2="370"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{
                    strokeDasharray: 170,
                    strokeDashoffset: 170 * (1 - groundColumnsProgress),
                  }}
                />

                {/* ── LAYER 3: MID-FLOOR SLAB & CROSS-BEAMS (24% -> 48%) ── */}
                {/* Level 1 Primary Slab (Draws across: 320 -> 680) */}
                <line
                  x1="320"
                  y1="370"
                  x2="680"
                  y2="370"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 360,
                    strokeDashoffset: 360 * (1 - slabLevel1Progress),
                  }}
                />
                {/* Level 1 Structural Beam Thickness */}
                <line
                  x1="305"
                  y1="360"
                  x2="695"
                  y2="360"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  style={{
                    strokeDasharray: 390,
                    strokeDashoffset: 390 * (1 - slabLevel1Progress),
                  }}
                />

                {/* Ground Floor Door / Window Architectural Apertures */}
                <g opacity={groundApertureOpacity}>
                  {/* Ground Entry Door Framing */}
                  <rect x="460" y="420" width="80" height="110" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="500" y1="420" x2="500" y2="530" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Ground Left Window Framing */}
                  <rect x="355" y="430" width="70" height="70" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 3" />
                  <line x1="390" y1="430" x2="390" y2="500" stroke="#0ea5e9" strokeWidth="1" />
                  {/* Ground Right Window Framing */}
                  <rect x="575" y="430" width="70" height="70" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 3" />
                  <line x1="610" y1="430" x2="610" y2="500" stroke="#0ea5e9" strokeWidth="1" />
                </g>

                {/* Mid-Floor Slab Level Annotation */}
                <g opacity={slabLevel1Progress}>
                  <text x="90" y="364" className="text-[10px] font-mono fill-sky-400 font-semibold">
                    +3.700 MID-SLAB LEVEL
                  </text>
                </g>

                {/* ── LAYER 4: UPPER SUPERSTRUCTURE WALLS & COLUMNS (48% -> 65%) ── */}
                {/* Left Upper Column (Grows bottom-up: 360 -> 230) */}
                <line
                  x1="320"
                  y1="360"
                  x2="320"
                  y2="230"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 130,
                    strokeDashoffset: 130 * (1 - upperColumnsProgress),
                  }}
                />
                {/* Right Upper Column (Grows bottom-up: 360 -> 230) */}
                <line
                  x1="680"
                  y1="360"
                  x2="680"
                  y2="230"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 130,
                    strokeDashoffset: 130 * (1 - upperColumnsProgress),
                  }}
                />
                {/* Center Upper Column */}
                <line
                  x1="500"
                  y1="360"
                  x2="500"
                  y2="230"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{
                    strokeDasharray: 130,
                    strokeDashoffset: 130 * (1 - upperColumnsProgress),
                  }}
                />

                {/* ── LAYER 5: LEVEL 2 EAVES TIE BEAM & CEILING (65% -> 82%) ── */}
                {/* Eaves Tie Beam (Draws across: 680 -> 320) */}
                <line
                  x1="680"
                  y1="230"
                  x2="320"
                  y2="230"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 360,
                    strokeDashoffset: 360 * (1 - eavesBeamProgress),
                  }}
                />
                {/* Ceiling Beam Overhangs */}
                <line
                  x1="305"
                  y1="220"
                  x2="695"
                  y2="220"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  style={{
                    strokeDasharray: 390,
                    strokeDashoffset: 390 * (1 - eavesBeamProgress),
                  }}
                />

                {/* Upper Floor Architectural Windows */}
                <g opacity={upperApertureOpacity}>
                  <rect x="360" y="260" width="100" height="70" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="410" y1="260" x2="410" y2="330" stroke="#0ea5e9" strokeWidth="1" />
                  <rect x="540" y="260" width="100" height="70" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="590" y1="260" x2="590" y2="330" stroke="#0ea5e9" strokeWidth="1" />
                </g>

                {/* Eaves Level Annotation */}
                <g opacity={eavesBeamProgress}>
                  <text x="90" y="224" className="text-[10px] font-mono fill-sky-400 font-semibold">
                    +6.500 EAVES LEVEL
                  </text>
                </g>

                {/* ── LAYER 6: ROOF RAFTERS, KING POST & GABLE PITCH (80% -> 96%) ── */}
                {/* Left Roof Rafter (Draws diagonally: (320, 230) -> (500, 80)) */}
                <line
                  x1="320"
                  y1="230"
                  x2="500"
                  y2="80"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 235,
                    strokeDashoffset: 235 * (1 - roofRaftersProgress),
                  }}
                />
                {/* Right Symmetrical Roof Rafter (Draws diagonally: (680, 230) -> (500, 80)) */}
                <line
                  x1="680"
                  y1="230"
                  x2="500"
                  y2="80"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 235,
                    strokeDashoffset: 235 * (1 - roofRaftersProgress),
                  }}
                />
                {/* Gable Collar Tie Beam */}
                <line
                  x1="375"
                  y1="180"
                  x2="625"
                  y2="180"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{
                    strokeDasharray: 250,
                    strokeDashoffset: 250 * (1 - collarTieProgress),
                  }}
                />
                {/* King Post Plumb Column (Draws from Ridge down to Tie Beam) */}
                <line
                  x1="500"
                  y1="80"
                  x2="500"
                  y2="230"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  style={{
                    strokeDasharray: 150,
                    strokeDashoffset: 150 * (1 - kingPostProgress),
                  }}
                />

                {/* Ridge Apex Level Annotation */}
                <g opacity={roofRaftersProgress}>
                  <text x="500" y="58" textAnchor="middle" className="text-[10px] font-mono fill-red-400 font-bold">
                    +9.200 RIDGE APEX
                  </text>
                </g>

                {/* ── LAYER 7: COMPLETED STRUCTURE CERTIFICATION BADGE (95% -> 100%) ── */}
                <g opacity={completionBadgeOpacity}>
                  <rect
                    x="100"
                    y="130"
                    width="260"
                    height="32"
                    rx="16"
                    fill="#0f172a"
                    stroke="#22c55eff"
                    strokeWidth="1.5"
                  />
                  <text
                    x="225"
                    y="150"
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-emerald-400 font-bold uppercase tracking-widest"
                  >
                    ★ STRUCTURE 100% COMPLETE
                  </text>
                </g>

                {/* ── LAYER 8: TECHNICAL DIMENSION ANNOTATIONS ── */}
                <g opacity={slabLevel1Progress * 0.7}>
                  {/* Building Span Dimension */}
                  <line x1="320" y1="580" x2="680" y2="580" stroke="#64748b" strokeWidth="1" />
                  <line x1="320" y1="574" x2="320" y2="586" stroke="#64748b" strokeWidth="1" />
                  <line x1="680" y1="574" x2="680" y2="586" stroke="#64748b" strokeWidth="1" />
                  <text x="500" y="594" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
                    4800 mm ENGINEERED COLUMN SPAN
                  </text>
                </g>

                {/* ── LAYER 9: MEASURED REFERENCE PATH ── */}
                <path
                  ref={pathRef}
                  d={HOUSE_PATH_D}
                  stroke="none"
                  fill="none"
                />

                {/* ── LAYER 10: ACTIVE RED THREAD (Traces the construction route) ── */}
                <path
                  d={HOUSE_PATH_D}
                  stroke="url(#houseActiveRedThreadGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: totalPathLength,
                    strokeDashoffset: totalPathLength * (1 - wheelState.progress),
                  }}
                />

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="houseActiveRedThreadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#dc2626" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f87171" stopOpacity="1" />
                  </linearGradient>

                  <filter id="constructionWheelGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── LAYER 11: 8 CAPABILITY STRUCTURAL NODES WITH 50% GLOW RULE ── */}
                {ringPositions.map((pos, idx) => {
                  const isCompleted = wheelState.progress >= CAPABILITY_ANCHORS[idx]
                  const isActive = activeIdx === idx
                  const isNextApproaching = nextRingIdx === idx && nextRingGlow > 0
                  const nodeNum = String(idx + 1).padStart(2, '0')

                  // Node label offset for optimal blueprint readability
                  let labelOffset = { x: 0, y: 26 }
                  if (idx === 0) labelOffset = { x: -24, y: -16 }
                  if (idx === 1) labelOffset = { x: -24, y: 24 }
                  if (idx === 2) labelOffset = { x: -26, y: -6 }
                  if (idx === 3) labelOffset = { x: 26, y: 6 }
                  if (idx === 4) labelOffset = { x: 26, y: -6 }
                  if (idx === 5) labelOffset = { x: -26, y: -6 }
                  if (idx === 6) labelOffset = { x: -22, y: -16 }
                  if (idx === 7) labelOffset = { x: 0, y: -24 }

                  return (
                    <g key={nodeNum} transform={`translate(${pos.x}, ${pos.y})`}>
                      {/* Approaching Ring Glow Halo (activates smoothly at >= 50% distance) */}
                      {isNextApproaching && (
                        <circle
                          r="28"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          opacity={nextRingGlow * 0.9}
                          style={{
                            transformOrigin: '0 0',
                            transform: `scale(${1 + nextRingGlow * 0.25})`,
                          }}
                        />
                      )}

                      {/* Active Ring Outer Ring */}
                      {isActive && (
                        <circle
                          r="26"
                          fill="none"
                          stroke="rgba(239, 68, 68, 0.6)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                      )}

                      {/* Main Node Ring */}
                      <circle
                        r={isActive ? '18' : isNextApproaching ? '15' : '12'}
                        className={`transition-all duration-300 ${isActive
                          ? 'fill-slate-900 stroke-red-500'
                          : isNextApproaching
                            ? 'fill-slate-900 stroke-red-500'
                            : isCompleted
                              ? 'fill-slate-950 stroke-red-700'
                              : 'fill-slate-950 stroke-slate-700'
                          }`}
                        strokeWidth={isActive || isNextApproaching ? '3' : '2'}
                      />

                      {/* Center Core Node */}
                      <circle
                        r={isActive ? '6' : isNextApproaching ? '5' : '4'}
                        className={`transition-colors duration-300 ${isActive
                          ? 'fill-red-500'
                          : isNextApproaching
                            ? 'fill-red-400'
                            : isCompleted
                              ? 'fill-red-600'
                              : 'fill-slate-600'
                          }`}
                      />

                      {/* Capability Ring Number Label */}
                      <text
                        x={labelOffset.x}
                        y={labelOffset.y}
                        textAnchor="middle"
                        className={`text-[12px] font-mono font-bold transition-all duration-300 ${isActive
                          ? 'fill-white'
                          : isNextApproaching
                            ? 'fill-red-400 font-bold'
                            : isCompleted
                              ? 'fill-red-400'
                              : 'fill-slate-500'
                          }`}
                      >
                        {nodeNum}
                      </text>
                    </g>
                  )
                })}

                {/* ── LAYER 12: PRECISION CONSTRUCTION WHEEL ── */}
                <g
                  transform={`translate(${wheelState.x}, ${wheelState.y}) rotate(${wheelState.angle})`}
                  filter="url(#constructionWheelGlow)"
                  className="cursor-pointer"
                >
                  {/* Forward Laser Guide Vector */}
                  <line
                    x1="0"
                    y1="0"
                    x2="28"
                    y2="0"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                    opacity="0.85"
                  />

                  {/* Outer Rolling Wheel Disc */}
                  <g transform={`rotate(${wheelState.rollingAngle})`}>
                    <circle
                      r="19"
                      fill="#0f172a"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    {/* Precision Dial Spoke Crosshairs */}
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#f87171" strokeWidth="1.5" />
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#f87171" strokeWidth="1.5" />
                    <line x1="-10" y1="-10" x2="10" y2="10" stroke="#fca5a5" strokeWidth="1" />
                    <line x1="-10" y1="10" x2="10" y2="-10" stroke="#fca5a5" strokeWidth="1" />
                  </g>

                  {/* Center Bearing Hub */}
                  <circle r="6.5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle r="2.5" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM HUD FOOTER & REVERSIBILITY CONTROLS ──────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-red-500 font-semibold uppercase tracking-wider">
              {activeSpec.stageTag} · Elevation {activeSpec.elevation}
            </span>
            <span className="text-slate-600">·</span>
            {/* <span className="text-slate-400 hidden sm:inline">
              Scroll down to construct building from Foundation → Columns → Slab → Envelope → Roof Apex
            </span> */}
          </div>

          <div className="flex items-center gap-2 font-mono text-slate-400">
            {/* <span>
              {activeIdx === 7 ? 'Structure Complete & Turnkey Ready ★' : 'Wheel leading construction build'}
            </span> */}
            <ChevronRight className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
