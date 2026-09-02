import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Home,
  Boxes,
  Wrench,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const GRID_DARK = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
}

// 5 Architectural Typology Geometries for the Blueprint Scanner
const PROJECT_TYPES_DATA = [
  {
    id: 'new-home-const',
    code: 'TYP-01',
    typology: 'Residential Villa / Custom Home',
    icon: Home,
    scale: '1 : 100',
    gridModule: '4,500 mm × 4,500 mm',
    floorArea: '4,200 sq.ft',
    spatialZones: ['Double-Height Entrance Foyer', 'Central Light Courtyard', 'Master Suite Wing', 'Outdoor Verandah'],
    technicalSpecs: [
      'Isolated Column Foundation Grid',
      'Monolithic RCC Floor Slabs',
      'Bespoke Architectural Fenestrations',
      'Integrated Substructure Waterproofing',
    ],
  },
  {
    id: 'row-houses',
    code: 'TYP-02',
    typology: 'Row Houses / Multi-Unit Complex',
    icon: Boxes,
    scale: '1 : 150',
    gridModule: '3,600 mm × 7,200 mm',
    floorArea: '8,600 sq.ft (3 Units)',
    spatialZones: ['Unit 01 Private Entry', 'Acoustic Party Shear Walls', 'Unit 02 Central Core', 'Unit 03 End Terrace'],
    technicalSpecs: [
      'Continuous Grade-Tied Plinth Beams',
      'Acoustically Isolated Shared Partitions',
      'Symmetrical MEP Stack Risers',
      'Standardized Pre-Engineered Modules',
    ],
  },
  {
    id: 'commercial-const',
    code: 'TYP-03',
    typology: 'Commercial & Mixed-Use Complex',
    icon: Building2,
    scale: '1 : 200',
    gridModule: '8,000 mm × 8,000 mm',
    floorArea: '18,500 sq.ft',
    spatialZones: ['Column-Free Open Floorplate', 'Central Dual Elevator Core', 'Glazed Perimeter Envelope', 'Service Risers'],
    technicalSpecs: [
      'Heavy-Span Post-Tensioned Beams',
      'Reinforced Seismic Core Shear Walls',
      'High-Load Commercial Floor Capacity',
      'Integrated HVAC & Fire Suppression Chases',
    ],
  },
  {
    id: 'renovation',
    code: 'TYP-04',
    typology: 'Structural Renovation & Retrofit',
    icon: Wrench,
    scale: '1 : 100',
    gridModule: 'Existing Structural Datum',
    floorArea: '3,800 sq.ft Refit',
    spatialZones: ['Retained Structural Perimeter', 'Surgical Wall Reconfiguration', 'New Steel Extension Wing', 'Terrace Upgrade'],
    technicalSpecs: [
      'Micro-Concrete Column Jacketing',
      'Zero-Vibration Wall Saw-Cutting',
      'Carbon-Fiber Composite Reinforcement',
      'Substructure Damp-Proof Tanking',
    ],
  },
  {
    id: 'turnkey',
    code: 'TYP-05',
    typology: 'Turnkey Master Requirements',
    icon: Sparkles,
    scale: '1 : 100',
    gridModule: 'Comprehensive Master Grid',
    floorArea: 'Full Turnkey Execution',
    spatialZones: ['Procurement Staging Zone', 'Integrated MEP Corridor', 'Architectural Finishes Zone', 'Handover Checkpoint'],
    technicalSpecs: [
      'Single-Point Accountability & PMO',
      'Milestone-Linked QA Inspections',
      'Direct Material Sourcing Protocols',
      'Comprehensive Handover Dossier & Warranties',
    ],
  },
]

export default function ProjectTypesBlueprintScanner({ whoFor = [] }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [activeIdx, setActiveIdx] = useState(0)
  const [localScanX, setLocalScanX] = useState(0) // 0 to 1000 inside the active blueprint

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.0005,
  })

  // Scrub active project type and the scanner beam strictly to scroll
  useEffect(() => {
    if (shouldReduceMotion) return

    const unsubscribe = smoothProgress.on('change', (v) => {
      const progress = Math.max(0, Math.min(1, v))

      // Total items = 5. Each gets a 0.20 interval.
      const count = whoFor.length || 5
      const segmentSize = 1 / count
      const currentSegment = Math.min(count - 1, Math.floor(progress / segmentSize))
      setActiveIdx(currentSegment)

      // Local progress within current project type: 0 to 1
      const segmentStart = currentSegment * segmentSize
      const localP = Math.max(0, Math.min(1, (progress - segmentStart) / segmentSize))

      // Scan beam sweeps from X = 80 to X = 920 across the 1000px wide blueprint canvas
      const beamX = 80 + localP * (920 - 80)
      setLocalScanX(beamX)
    })

    return () => unsubscribe()
  }, [smoothProgress, shouldReduceMotion, whoFor.length])

  const activeItem = whoFor[activeIdx] || whoFor[0] || { label: 'Residential Construction', desc: '' }
  const activeMeta = PROJECT_TYPES_DATA[activeIdx] || PROJECT_TYPES_DATA[0]
  const ActiveIcon = activeMeta.icon

  // ── REDUCED MOTION ACCESSIBLE FALLBACK ─────────────────────────────
  if (shouldReduceMotion) {
    return (
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2 font-mono">
              Section 02 · Project Typologies
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Who Is This Service For?
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Tailored civil construction for residential villas, multi-unit complexes, commercial developments, and turnkey requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoFor.map((item, i) => {
              const meta = PROJECT_TYPES_DATA[i] || PROJECT_TYPES_DATA[0]
              const Icon = meta.icon
              return (
                <div
                  key={item.id || i}
                  className="p-8 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
                        {meta.code}
                      </span>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-700 space-y-1.5">
                    {meta.technicalSpecs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{spec}</span>
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

  // ── CINEMATIC BLUEPRINT SCANNER SCROLL EXPERIENCE ───────────────────
  return (
    <div
      ref={containerRef}
      className="relative bg-slate-900 text-white"
      style={{ height: '380vh' }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 lg:py-10 select-none">
        {/* Subtle Architectural Blueprint Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={GRID_DARK}
          aria-hidden="true"
        />

        {/* Ambient Corner Atmosphere Glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-600/10 pointer-events-none blur-3xl"
          aria-hidden="true"
        />

        {/* ── 1. TOP HUD STATUS & METADATA BAR ───────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
                Section 02 · Project Typologies
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Blueprint Scanner Analysis
            </h2>
          </div>

          {/* Active Project Index & Scan Percentage */}
          <div className="shrink-0 flex flex-col items-end font-mono">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400 uppercase">Analysis</span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                0{activeIdx + 1}
              </span>
              <span className="text-xs text-slate-500">/ 0{whoFor.length || 5}</span>
            </div>
            <div className="w-28 sm:w-36 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-red-600 rounded-full origin-left"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>

        {/* ── 2. CENTER STAGE: EDITORIAL DOSSIER + BLUEPRINT CANVAS ──── */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Project Type Dossier & Editorial Index */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem ? activeItem.id || activeIdx : 'pt-0'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Accent Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

                {/* Header: Typology Code & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-800/50 flex items-center justify-center text-red-400">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-red-400">
                        {activeMeta.code} · {activeMeta.scale}
                      </p>
                      <span className="text-xs text-slate-400 font-mono">
                        Grid: {activeMeta.gridModule}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-red-900/40 text-red-300 border border-red-800/40">
                    Active Typology
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  {activeItem.label}
                </h3>

                {/* Description from services.js */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeItem.desc}
                </p>

                {/* Technical Specifications */}
                <div className="pt-4 border-t border-slate-700/80 space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Key Execution Specifications:
                  </p>
                  {activeMeta.technicalSpecs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Editorial Compact Project-Type Index */}
            <div className="hidden sm:flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 font-mono text-[11px]">
              {whoFor.map((item, idx) => {
                const isActive = activeIdx === idx
                return (
                  <div
                    key={item.id || idx}
                    className={`flex items-center gap-1.5 transition-colors ${isActive ? 'text-white font-bold' : 'text-slate-500'
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500' : 'bg-slate-700'
                        }`}
                    />
                    <span>0{idx + 1}</span>
                    <span className="hidden md:inline truncate max-w-[80px]">
                      {item.label.split(' ')[0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Hero Blueprint Canvas + Laser Scanner Beam */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center">
            <div className="w-full relative aspect-[1000/600] max-h-[380px] sm:max-h-[460px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full overflow-hidden"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Definitions: Masks, Gradients, and Filters */}
                <defs>
                  {/* Clip-Path for the Scanned / Resolved Region (0 to localScanX) */}
                  <clipPath id="scannedRegionClip">
                    <rect x="0" y="0" width={localScanX} height="600" />
                  </clipPath>

                  {/* Clip-Path for the Unscanned / Wireframe Region (localScanX to 1000) */}
                  <clipPath id="unscannedRegionClip">
                    <rect x={localScanX} y="0" width={1000 - localScanX} height="600" />
                  </clipPath>

                  {/* Vertical Scanner Laser Beam Gradient */}
                  <linearGradient id="scannerBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                    <stop offset="20%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="80%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                  </linearGradient>

                  {/* Scanner Soft Area Glow Gradient */}
                  <linearGradient id="scannerSoftField" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
                    <stop offset="70%" stopColor="#ef4444" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>

                  <filter id="laserBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── A. BACKGROUND BLUEPRINT STRUCTURAL GRID & AXES ─────── */}
                <g stroke="rgba(51, 65, 85, 0.4)" strokeWidth="1" strokeDasharray="3 6">
                  {/* Vertical Column Grid Lines */}
                  {[120, 240, 360, 480, 600, 720, 840].map((gx) => (
                    <line key={`gx-${gx}`} x1={gx} y1="40" x2={gx} y2="560" />
                  ))}
                  {/* Horizontal Grid Lines */}
                  {[100, 200, 300, 400, 500].map((gy) => (
                    <line key={`gy-${gy}`} x1="80" y1={gy} x2="920" y2={gy} />
                  ))}
                </g>

                {/* Grid Datum Axis Labels */}
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((label, idx) => (
                  <text
                    key={label}
                    x={120 + idx * 120}
                    y="32"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-500 font-bold"
                  >
                    AXIS {label}
                  </text>
                ))}

                {/* ── B. UNSCANNED LAYER (Faint Muted Wireframe Drawing) ── */}
                <g clipPath="url(#unscannedRegionClip)" opacity="0.45">
                  {renderBlueprintGeometry(activeIdx, false)}
                </g>

                {/* ── C. SCANNED / RESOLVED ARCHITECTURAL LAYER ──────────── */}
                <g clipPath="url(#scannedRegionClip)">
                  {renderBlueprintGeometry(activeIdx, true)}
                </g>

                {/* ── D. THE VERTICAL SCANNER BEAM ASSEMBLY ──────────────── */}
                <g transform={`translate(${localScanX}, 0)`}>
                  {/* 1. Soft Translucent Scan Field */}
                  <rect
                    x="-40"
                    y="40"
                    width="40"
                    height="520"
                    fill="url(#scannerSoftField)"
                  />

                  {/* 2. Primary Red Laser Beam */}
                  <line
                    x1="0"
                    y1="40"
                    x2="0"
                    y2="560"
                    stroke="url(#scannerBeamGrad)"
                    strokeWidth="2.5"
                    filter="url(#laserBeamGlow)"
                  />

                  {/* 3. Horizontal Registration Cross Ticks */}
                  {[100, 200, 300, 400, 500].map((ty) => (
                    <g key={`tick-${ty}`}>
                      <line x1="-8" y1={ty} x2="8" y2={ty} stroke="#ef4444" strokeWidth="1.5" />
                      <circle cx="0" cy={ty} r="2" fill="#ffffff" />
                    </g>
                  ))}

                  {/* 4. Top & Bottom Precision Alignment Arrowheads */}
                  <polygon points="0,38 -5,30 5,30" fill="#ef4444" />
                  <polygon points="0,562 -5,570 5,570" fill="#ef4444" />

                  {/* 5. Scanner HUD Optical Badge */}
                  <g transform="translate(10, 60)">
                    <rect
                      x="0"
                      y="0"
                      width="92"
                      height="22"
                      rx="6"
                      fill="rgba(15, 23, 42, 0.9)"
                      stroke="#ef4444"
                      strokeWidth="1"
                    />
                    <text
                      x="46"
                      y="14"
                      textAnchor="middle"
                      className="text-[9px] font-mono fill-red-400 font-bold uppercase tracking-wider"
                    >
                      SCAN / 0{activeIdx + 1}
                    </text>
                  </g>
                </g>

                {/* ── E. FIXED BLUEPRINT HUD CORNER ANNOTATIONS ──────────── */}
                <g className="font-mono text-[9px] fill-slate-500">
                  <text x="90" y="580">SCALE {activeMeta.scale}</text>
                  <text x="500" y="580" textAnchor="middle">ADVITH STRUCTURAL BLUEPRINT · {activeMeta.code}</text>
                  <text x="910" y="580" textAnchor="end">PRECISION SCANNER</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM HUD FOOTER CONTROLS ──────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-red-500 font-semibold uppercase tracking-wider">
              {activeMeta.typology}
            </span>
            <span className="text-slate-600">·</span>
            {/* <span className="text-slate-400 hidden sm:inline">
              Scroll down to scan architectural floorplates & structural massing
            </span> */}
          </div>

          {/* <div className="flex items-center gap-2 font-mono text-slate-400">
            <span>
              {activeIdx === whoFor.length - 1 ? 'All Typologies Scanned ★' : 'Scanning architectural space'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

/**
 * Helper to render distinct architectural blueprint geometry for all 5 project types.
 * @param {number} typeIdx - Index of project type (0 to 4)
 * @param {boolean} isResolved - True for scanned resolved layer, False for unscanned wireframe
 */
function renderBlueprintGeometry(typeIdx, isResolved) {
  const strokeColor = isResolved ? '#38bdf8' : '#64748b'
  const strokeWidth = isResolved ? '2.5' : '1.5'
  const wallFill = isResolved ? 'rgba(56, 189, 248, 0.08)' : 'none'
  const columnFill = isResolved ? '#38bdf8' : 'none'
  const columnStroke = isResolved ? '#f8fafc' : '#64748b'
  const accentRed = isResolved ? '#ef4444' : '#64748b'

  switch (typeIdx) {
    // ── 01. NEW HOME / RESIDENTIAL VILLA BLUEPRINT ─────────────────────
    case 0:
    default:
      return (
        <g>
          {/* Main Outer Villa Boundary */}
          <rect
            x="140"
            y="100"
            width="680"
            height="380"
            fill={wallFill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Internal Room Partitions */}
          {/* Master Bedroom Suite (Left Wing) */}
          <rect x="140" y="100" width="220" height="200" fill={wallFill} stroke={strokeColor} strokeWidth="2" />
          <line x1="250" y1="100" x2="250" y2="170" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Central Open Light Courtyard */}
          <rect x="400" y="150" width="160" height="150" fill={isResolved ? 'rgba(239, 68, 68, 0.08)' : 'none'} stroke={accentRed} strokeWidth="2" strokeDasharray="4 4" />

          {/* Living & Verandah Lounge (Right Wing) */}
          <rect x="600" y="100" width="220" height="240" fill={wallFill} stroke={strokeColor} strokeWidth="2" />

          {/* Kitchen & Dining Wing (Lower Left) */}
          <rect x="140" y="300" width="220" height="180" fill={wallFill} stroke={strokeColor} strokeWidth="2" />

          {/* Family Lounge (Lower Right) */}
          <rect x="560" y="340" width="260" height="140" fill={wallFill} stroke={strokeColor} strokeWidth="2" />

          {/* Structural Column Nodes at 4.5m Grid Intersections */}
          {[
            [140, 100], [360, 100], [600, 100], [820, 100],
            [140, 300], [360, 300], [600, 340], [820, 340],
            [140, 480], [360, 480], [560, 480], [820, 480],
          ].map(([cx, cy], i) => (
            <g key={`col-${i}`}>
              <rect
                x={cx - 6}
                y={cy - 6}
                width="12"
                height="12"
                fill={columnFill}
                stroke={columnStroke}
                strokeWidth="1.5"
              />
              {isResolved && <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} stroke="#0f172a" strokeWidth="1" />}
            </g>
          ))}

          {/* Scanned-Only Rich Annotations & Spatial Labels */}
          {isResolved && (
            <g className="font-mono">
              <text x="250" y="195" textAnchor="middle" className="text-[11px] font-bold fill-white">
                MASTER SUITE
              </text>
              <text x="480" y="230" textAnchor="middle" className="text-[11px] font-bold fill-red-400">
                LIGHT COURTYARD
              </text>
              <text x="710" y="210" textAnchor="middle" className="text-[11px] font-bold fill-white">
                VERANDAH LOUNGE
              </text>
              <text x="250" y="395" textAnchor="middle" className="text-[11px] font-bold fill-slate-300">
                KITCHEN / DINING
              </text>
              <text x="690" y="420" textAnchor="middle" className="text-[11px] font-bold fill-slate-300">
                FAMILY LIVING
              </text>

              {/* Dimension Strings */}
              <g opacity="0.7">
                <line x1="140" y1="75" x2="820" y2="75" stroke="#38bdf8" strokeWidth="1" />
                <line x1="140" y1="70" x2="140" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="820" y1="70" x2="820" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="480" y="70" textAnchor="middle" className="text-[9px] fill-sky-300">
                  18,400 mm OVERALL VILLA WIDTH
                </text>
              </g>
            </g>
          )}
        </g>
      )

    // ── 02. ROW HOUSES / MULTI-UNIT LINEAR PLAN ───────────────────────
    case 1:
      return (
        <g>
          {/* Main Triple Row-House Envelope */}
          <rect x="120" y="110" width="720" height="360" fill={wallFill} stroke={strokeColor} strokeWidth={strokeWidth} />

          {/* Acoustic Shared Party Walls */}
          <line x1="360" y1="110" x2="360" y2="470" stroke={accentRed} strokeWidth="3" />
          <line x1="600" y1="110" x2="600" y2="470" stroke={accentRed} strokeWidth="3" />

          {/* Unit 01 Internal Layout */}
          <rect x="120" y="110" width="240" height="180" fill={wallFill} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="150" y="190" width="60" height="80" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />

          {/* Unit 02 Internal Layout */}
          <rect x="360" y="110" width="240" height="180" fill={wallFill} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="390" y="190" width="60" height="80" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />

          {/* Unit 03 Internal Layout */}
          <rect x="600" y="110" width="240" height="180" fill={wallFill} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="630" y="190" width="60" height="80" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />

          {/* Front Entrance Thresholds */}
          <line x1="200" y1="470" x2="280" y2="470" stroke={accentRed} strokeWidth="3" />
          <line x1="440" y1="470" x2="520" y2="470" stroke={accentRed} strokeWidth="3" />
          <line x1="680" y1="470" x2="760" y2="470" stroke={accentRed} strokeWidth="3" />

          {/* Column Nodes */}
          {[120, 360, 600, 840].flatMap((cx) =>
            [110, 290, 470].map((cy) => (
              <rect key={`rh-${cx}-${cy}`} x={cx - 6} y={cy - 6} width="12" height="12" fill={columnFill} stroke={columnStroke} strokeWidth="1.5" />
            ))
          )}

          {isResolved && (
            <g className="font-mono">
              <text x="240" y="155" textAnchor="middle" className="text-[12px] font-bold fill-white">UNIT 01</text>
              <text x="480" y="155" textAnchor="middle" className="text-[12px] font-bold fill-white">UNIT 02</text>
              <text x="720" y="155" textAnchor="middle" className="text-[12px] font-bold fill-white">UNIT 03</text>
              <text x="360" y="95" textAnchor="middle" className="text-[9px] fill-red-400 font-bold">ACOUSTIC PARTY WALL</text>
              <text x="600" y="95" textAnchor="middle" className="text-[9px] fill-red-400 font-bold">ACOUSTIC PARTY WALL</text>
              <text x="240" y="380" textAnchor="middle" className="text-[10px] fill-slate-300">LIVING / ENTRY</text>
              <text x="480" y="380" textAnchor="middle" className="text-[10px] fill-slate-300">LIVING / ENTRY</text>
              <text x="720" y="380" textAnchor="middle" className="text-[10px] fill-slate-300">LIVING / ENTRY</text>
            </g>
          )}
        </g>
      )

    // ── 03. COMMERCIAL & MIXED-USE FLOORPLATE ─────────────────────────
    case 2:
      return (
        <g>
          {/* Main High-Span Perimeter */}
          <rect x="100" y="90" width="760" height="400" rx="8" fill={wallFill} stroke={strokeColor} strokeWidth={strokeWidth} />

          {/* Central Structural Core & Lift Shafts */}
          <rect x="400" y="190" width="160" height="200" fill={isResolved ? 'rgba(239, 68, 68, 0.12)' : 'none'} stroke={accentRed} strokeWidth="3" />
          <line x1="480" y1="190" x2="480" y2="390" stroke={accentRed} strokeWidth="1.5" />
          <line x1="400" y1="290" x2="560" y2="290" stroke={accentRed} strokeWidth="1.5" />

          {/* High-Span Heavy Columns (8m spacing) */}
          {[160, 320, 640, 800].flatMap((cx) =>
            [140, 290, 440].map((cy) => (
              <g key={`comm-${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="8" fill={columnFill} stroke={columnStroke} strokeWidth="2" />
                {isResolved && <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#0f172a" strokeWidth="1.5" />}
              </g>
            ))
          )}

          {isResolved && (
            <g className="font-mono">
              <text x="240" y="240" textAnchor="middle" className="text-[11px] font-bold fill-white">OPEN-SPAN OFFICE ZONE A</text>
              <text x="720" y="240" textAnchor="middle" className="text-[11px] font-bold fill-white">OPEN-SPAN OFFICE ZONE B</text>
              <text x="480" y="245" textAnchor="middle" className="text-[10px] font-bold fill-red-400">ELEVATOR CORE</text>
              <text x="480" y="345" textAnchor="middle" className="text-[10px] font-bold fill-red-400">STAIR SHAFT</text>
              <text x="480" y="460" textAnchor="middle" className="text-[10px] fill-slate-300">CURTAIN WALL PERIMETER</text>
            </g>
          )}
        </g>
      )

    // ── 04. STRUCTURAL RENOVATION & RETROFIT ─────────────────────────
    case 3:
      return (
        <g>
          {/* Retained Existing Structure (Muted Dashed) */}
          <rect x="140" y="110" width="440" height="360" fill={wallFill} stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

          {/* New Architectural Extension Wing (Solid Vibrant) */}
          <rect x="580" y="110" width="260" height="360" fill={isResolved ? 'rgba(56, 189, 248, 0.12)' : 'none'} stroke={strokeColor} strokeWidth="3" />

          {/* Surgical Demolition / Reconfiguration Zones */}
          <line x1="280" y1="110" x2="280" y2="470" stroke={accentRed} strokeWidth="2" strokeDasharray="2 2" />
          <line x1="420" y1="110" x2="420" y2="350" stroke={accentRed} strokeWidth="2" strokeDasharray="2 2" />

          {/* Column Reinforcement Jackets */}
          {[140, 280, 420, 580, 840].flatMap((cx) =>
            [110, 290, 470].map((cy) => (
              <g key={`ren-${cx}-${cy}`}>
                <rect x={cx - 8} y={cy - 8} width="16" height="16" fill="none" stroke={accentRed} strokeWidth="1.5" strokeDasharray="2 2" />
                <rect x={cx - 4} y={cy - 4} width="8" height="8" fill={columnFill} stroke={columnStroke} strokeWidth="1" />
              </g>
            ))
          )}

          {isResolved && (
            <g className="font-mono">
              <text x="280" y="240" textAnchor="middle" className="text-[11px] font-bold fill-slate-300">EXISTING RETENTION</text>
              <text x="710" y="240" textAnchor="middle" className="text-[11px] font-bold fill-sky-300">NEW EXTENSION WING</text>
              <text x="280" y="380" textAnchor="middle" className="text-[10px] fill-red-400 font-bold">RECONFIGURED SPATIAL LAYOUT</text>
              <text x="710" y="380" textAnchor="middle" className="text-[10px] fill-white">DOUBLE-HEIGHT LIVING</text>
            </g>
          )}
        </g>
      )

    // ── 05. TURNKEY MASTER EXECUTION PLAN ─────────────────────────────
    case 4:
      return (
        <g>
          {/* Full Turnkey Master Compound Boundary */}
          <rect x="100" y="90" width="760" height="400" rx="12" fill={wallFill} stroke={strokeColor} strokeWidth={strokeWidth} />

          {/* Integrated Zone Corridors */}
          <rect x="140" y="130" width="280" height="160" fill={wallFill} stroke={strokeColor} strokeWidth="2" />
          <rect x="460" y="130" width="360" height="160" fill={wallFill} stroke={strokeColor} strokeWidth="2" />
          <rect x="140" y="320" width="360" height="140" fill={wallFill} stroke={strokeColor} strokeWidth="2" />
          <rect x="540" y="320" width="280" height="140" fill={isResolved ? 'rgba(239, 68, 68, 0.15)' : 'none'} stroke={accentRed} strokeWidth="2" />

          {/* Central Quality Control Verification Axis */}
          <line x1="440" y1="90" x2="440" y2="490" stroke={accentRed} strokeWidth="2" strokeDasharray="4 4" />

          {isResolved && (
            <g className="font-mono">
              <text x="280" y="215" textAnchor="middle" className="text-[11px] font-bold fill-white">STRUCTURAL SECTOR A</text>
              <text x="640" y="215" textAnchor="middle" className="text-[11px] font-bold fill-white">ARCHITECTURAL SECTOR B</text>
              <text x="320" y="395" textAnchor="middle" className="text-[11px] font-bold fill-slate-300">MEP INTEGRATION STACK</text>
              <text x="680" y="395" textAnchor="middle" className="text-[11px] font-bold fill-red-400 font-bold">FINAL HANDOVER STAGE</text>
              <text x="440" y="75" textAnchor="middle" className="text-[9px] fill-red-400 font-bold">TURNKEY QUALITY AXIS</text>
            </g>
          )}
        </g>
      )
  }
}
