import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  Ruler,
  HardHat,
  ShieldCheck,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ChevronRight,
  Compass,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const ROOM_GRID = {
  backgroundImage:
    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
  backgroundSize: '40px 40px, 40px 40px, 40px 40px',
}

// 7 Stage Metadata & Visual Configurations
const STAGE_CONFIGS = [
  {
    step: '01',
    code: 'STAGE-01',
    title: 'Requirement & Site Understanding',
    roomMood: 'Site Survey & Client Brief Studio',
    icon: Compass,
    accentColor: '#38bdf8',
    deliverables: [
      'Comprehensive Client Spatial Brief',
      'Boundary Topography & Soil Test Data',
      'Zoning, Setbacks & Bylaw Analysis',
    ],
    artifacts: [
      { title: 'Project Brief', desc: 'Living zones, bedroom count, and client lifestyle requirements.' },
      { title: 'Site Survey Matrix', desc: 'Soil bearing capacity and topographical datum analysis.' },
    ],
  },
  {
    step: '02',
    code: 'STAGE-02',
    title: 'Planning & Estimation',
    roomMood: 'Budgeting & Quantity Studio',
    icon: Calculator,
    accentColor: '#fbbf24',
    deliverables: [
      'Detailed Bill of Quantities (BOQ)',
      'Material Specification Schedule',
      'Cash Flow & Phased Cost Roadmap',
    ],
    artifacts: [
      { title: 'BOQ Line-Item Matrix', desc: 'Itemized material quantity and labor cost calculations.' },
      { title: 'Procurement Strategy', desc: 'Grade A steel, cement, and aggregate supplier scheduling.' },
    ],
  },
  {
    step: '03',
    code: 'STAGE-03',
    title: 'Structural & Execution Planning',
    roomMood: 'Engineering & Framing Studio',
    icon: Ruler,
    accentColor: '#60a5fa',
    deliverables: [
      'Engineered Structural Framing Drawings',
      'Bar Bending Schedule (BBS) Details',
      'RCC Column & Footing Pour Sequencing',
    ],
    artifacts: [
      { title: 'Structural CAD Model', desc: 'Primary column nodes, shear walls, and footing layout.' },
      { title: 'Bar Bending Schedules', desc: 'Fe550D TMT reinforcement cut and bend specifications.' },
    ],
  },
  {
    step: '04',
    code: 'STAGE-04',
    title: 'Construction',
    roomMood: 'Active Execution & Site Studio',
    icon: HardHat,
    accentColor: '#ef4444',
    deliverables: [
      'Monolithic RCC Floor Slabs & Uprights',
      'Precision Solid Block Masonry Walls',
      'Continuous On-Site Quality Supervision',
    ],
    artifacts: [
      { title: 'Live Site Pour Logs', desc: 'Concrete mix design and cube sample tracking.' },
      { title: 'Superstructure Framework', desc: 'Ground-to-terrace monolithic execution sequencing.' },
    ],
  },
  {
    step: '05',
    code: 'STAGE-05',
    title: 'Quality & Safety Checks',
    roomMood: 'Verification & Audit Studio',
    icon: ShieldCheck,
    accentColor: '#10b981',
    deliverables: [
      'Concrete Compressive Strength Cube Tests',
      'Laser Level & Plumb Alignment Checks (±2mm)',
      'Multi-Barrier Waterproof Tanking Verification',
    ],
    artifacts: [
      { title: 'Lab Test Reports', desc: '7-day & 28-day concrete strength verification.' },
      { title: 'Optical Laser Audit', desc: 'Precision verticality and floor screed alignment.' },
    ],
  },
  {
    step: '06',
    code: 'STAGE-06',
    title: 'Finishing',
    roomMood: 'Architectural Craft Studio',
    icon: Sparkles,
    accentColor: '#f472b6',
    deliverables: [
      'Precision Internal & External Plastering',
      'High-Performance Glazing & Fenestration Fit',
      'MEP & Sanitary Systems Commissioning',
    ],
    artifacts: [
      { title: 'Surface Finish Audit', desc: 'Level-5 smooth plaster and waterproof exterior cladding.' },
      { title: 'Services Commissioning', desc: 'Pressure testing of plumbing and electrical circuitry.' },
    ],
  },
  {
    step: '07',
    code: 'STAGE-07',
    title: 'Handover',
    roomMood: 'Final Presentation Gallery',
    icon: KeyRound,
    accentColor: '#f59e0b',
    deliverables: [
      'Comprehensive As-Built Drawings Dossier',
      'Manufacturer Warranties & Service Manuals',
      'Official Turnkey Keys Handover Protocol',
    ],
    artifacts: [
      { title: 'As-Built Documentation', desc: 'Complete structural and MEP lifecycle schematics.' },
      { title: 'Handover Certificate', desc: 'Final occupancy certification and owner handover.' },
    ],
  },
]

/**
 * ConstructionProcessRoom
 *
 * Immersive "Project Room" Scroll Experience for Section 03 (Our Process).
 * - ONE project remains in the center while the room environment and building model evolve through 7 stages.
 * - 100% scroll-driven and reversible in both directions.
 * - Stages:
 *   01. Requirement (Concept Wireframe & Briefs)
 *   02. Estimation (BOQ & Quantity Dimensions)
 *   03. Structural Planning (RCC Columns & Engineered Grids)
 *   04. Construction (Volumetric Massing, Slabs & Walls)
 *   05. Quality & Safety Checks (Active Inspection Nodes & Laser Verification)
 *   06. Finishing (Smooth Plaster, Glazing & Refined Surfaces)
 *   07. Handover (Completed Architectural Masterpiece & Turnkey Certificate)
 */
export default function ConstructionProcessRoom({ processStages = [] }) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [activeStageIdx, setActiveStageIdx] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.0005,
  })

  // Scrub active stage and internal stage progress
  useEffect(() => {
    if (shouldReduceMotion) return

    const unsubscribe = smoothProgress.on('change', (v) => {
      const progress = Math.max(0, Math.min(1, v))
      const count = processStages.length || 7
      const segmentSize = 1 / count
      const currentSegment = Math.min(count - 1, Math.floor(progress / segmentSize))
      setActiveStageIdx(currentSegment)

      // Local progress within current stage: 0 to 1
      const segmentStart = currentSegment * segmentSize
      const localP = Math.max(0, Math.min(1, (progress - segmentStart) / segmentSize))
      setStageProgress(localP)
    })

    return () => unsubscribe()
  }, [smoothProgress, shouldReduceMotion, processStages.length])

  const activeStage = processStages[activeStageIdx] || processStages[0] || { step: '01', title: 'Requirement', desc: '' }
  const activeConfig = STAGE_CONFIGS[activeStageIdx] || STAGE_CONFIGS[0]
  const ActiveIcon = activeConfig.icon

  // ── REDUCED MOTION ACCESSIBLE FALLBACK ─────────────────────────────
  if (shouldReduceMotion) {
    return (
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2 font-mono">
              Section 03 · Execution Methodology
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Our Construction Process
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              A rigorous 7-stage engineering methodology from initial site assessment to final keys handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processStages.map((step, i) => {
              const config = STAGE_CONFIGS[i] || STAGE_CONFIGS[0]
              const Icon = config.icon
              return (
                <div
                  key={step.step}
                  className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-red-500">
                        {step.step}
                      </span>
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{step.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 space-y-1.5">
                    {config.deliverables.map((del) => (
                      <div key={del} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{del}</span>
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

  // ── CINEMATIC PROJECT ROOM SCROLL EXPERIENCE ───────────────────────
  return (
    <div
      ref={containerRef}
      className="relative bg-slate-950 text-white"
      style={{ height: '420vh' }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 lg:py-10 select-none">
        {/* Dynamic Studio Room Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700"
          style={ROOM_GRID}
          aria-hidden="true"
        />

        {/* Dynamic Stage Lighting Atmosphere */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
          style={{
            top: '20%',
            left: '30%',
            background: `radial-gradient(circle, ${activeConfig.accentColor} 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* ── 1. TOP HUD STATUS & METADATA BAR ───────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
                Section 03 · Project Room
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              One Project · Seven Stages
            </h2>
          </div>

          {/* Active Stage Counter & Micro Progress */}
          <div className="shrink-0 flex flex-col items-end font-mono">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400 uppercase">Stage</span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {activeStage.step}
              </span>
              <span className="text-xs text-slate-500">/ 0{processStages.length || 7}</span>
            </div>
            <div className="w-28 sm:w-36 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-red-600 rounded-full origin-left"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>

        {/* ── 2. CENTER STAGE: EDITORIAL DOSSIER + CENTRAL PROJECT MODEL ── */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Stage Dossier & Vertical Process Navigator */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
                  style={{ background: `linear-gradient(to right, ${activeConfig.accentColor}, #ef4444, transparent)` }}
                />

                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-red-400">
                        {activeConfig.code} · {activeConfig.roomMood}
                      </p>
                      <span className="text-xs text-slate-400 font-mono">
                        Active Methodology Stage
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    Stage {activeStage.step} of 07
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  {activeStage.title}
                </h3>

                {/* Description from services.js */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeStage.desc}
                </p>

                {/* Itemized Deliverables */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Verified Execution Milestones:
                  </p>
                  {activeConfig.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Editorial Compact 7-Stage Process Navigator */}
            <div className="hidden sm:flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-[11px]">
              {processStages.map((step, idx) => {
                const isActive = activeStageIdx === idx
                return (
                  <div
                    key={step.step}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-700'
                      }`}
                    />
                    <span>{step.step}</span>
                    <span className="hidden md:inline truncate max-w-[65px]">
                      {step.title.split(' ')[0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Hero Project Room & Evolving Architectural Model */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center">
            <div className="w-full relative aspect-[800/540] max-h-[380px] sm:max-h-[460px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl flex items-center justify-center p-4">
              {/* Studio Workspace Atmosphere Linework */}
              <div className="absolute inset-0 pointer-events-none opacity-25">
                <svg viewBox="0 0 800 540" className="w-full h-full" fill="none">
                  {/* Axis Center Crosshairs */}
                  <line x1="400" y1="20" x2="400" y2="520" stroke="#475569" strokeWidth="1" strokeDasharray="4 6" />
                  <line x1="20" y1="270" x2="780" y2="270" stroke="#475569" strokeWidth="1" strokeDasharray="4 6" />
                  {/* Outer Project Plinth Platform */}
                  <polygon
                    points="400,100 700,270 400,440 100,270"
                    stroke="rgba(100, 116, 139, 0.4)"
                    strokeWidth="1.5"
                    fill="rgba(15, 23, 42, 0.4)"
                  />
                </svg>
              </div>

              {/* Central Evolving Project Model */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 800 540"
                  className="w-full h-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {renderProjectModel(activeStageIdx, stageProgress)}
                </svg>
              </div>

              {/* Floating Studio Artifact Panels (2 per stage) */}
              <div className="absolute top-4 right-4 max-w-[210px] hidden sm:flex flex-col gap-2 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`art-${activeStageIdx}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md text-[11px]"
                  >
                    <p className="font-mono text-[10px] font-bold text-red-400 uppercase mb-1">
                      {activeConfig.artifacts[0].title}
                    </p>
                    <p className="text-slate-400 leading-snug text-[10px]">
                      {activeConfig.artifacts[0].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom HUD Studio Tag */}
              <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3 font-mono text-[10px] text-slate-500">
                <span className="text-red-400 font-bold">● {activeConfig.roomMood}</span>
                <span>·</span>
                <span>ADVITH PROJECT STUDIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM HUD FOOTER & REVERSIBILITY CONTROLS ──────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-red-500 font-semibold uppercase tracking-wider">
              {activeStage.title}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden sm:inline">
              Scroll down to evolve project from Requirement → Structural Frame → Turnkey Handover
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span>
              {activeStageIdx === processStages.length - 1 ? 'Project Handover Complete ★' : 'Project evolving through methodology'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Helper to render the progressive evolution of the central architectural project model across all 7 stages.
 */
function renderProjectModel(stageIdx, _localProgress) {
  switch (stageIdx) {
    // ── STAGE 01: REQUIREMENT & SITE UNDERSTANDING ───────────────────
    // Minimal conceptual plot boundary, orientation compass, survey pegs
    case 0:
    default:
      return (
        <g>
          {/* Site Boundary Grid */}
          <polygon
            points="400,160 620,280 400,400 180,280"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="rgba(56, 189, 248, 0.04)"
          />

          {/* Survey Peg Markers */}
          {[[400, 160], [620, 280], [400, 400], [180, 280]].map(([px, py], i) => (
            <g key={`peg-${i}`}>
              <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              <line x1={px} y1={py - 12} x2={px} y2={py + 12} stroke="#38bdf8" strokeWidth="1" />
            </g>
          ))}

          {/* Conceptual Massing Wireframe Box */}
          <polygon points="400,200 540,280 400,360 260,280" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <line x1="260" y1="280" x2="260" y2="230" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="400" y1="360" x2="400" y2="310" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="540" y1="280" x2="540" y2="230" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="400" y1="200" x2="400" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Orientation Compass Marker */}
          <g transform="translate(400, 280)">
            <circle r="18" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="0" y="-18" textAnchor="middle" className="text-[9px] font-mono fill-sky-400 font-bold">N</text>
          </g>

          <text x="400" y="435" textAnchor="middle" className="text-[11px] font-mono fill-sky-300 font-bold">
            SITE BOUNDARY & CLIENT PROGRAM CONCEPT
          </text>
        </g>
      )

    // ── STAGE 02: PLANNING & ESTIMATION ──────────────────────────────
    // The same model gains dimension strings, zoned massing blocks, and BOQ volume lines
    case 1:
      return (
        <g>
          {/* Ground Footprint Base */}
          <polygon
            points="400,160 620,280 400,400 180,280"
            stroke="rgba(251, 191, 36, 0.5)"
            strokeWidth="1.5"
            fill="rgba(251, 191, 36, 0.05)"
          />

          {/* Zoned Massing Envelopes (Zone A Ground Floor + Zone B Level 1) */}
          {/* Lower Mass */}
          <polygon points="280,260 400,330 520,260 400,190" fill="rgba(30, 41, 59, 0.6)" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="280,260 400,330 400,380 280,310" fill="rgba(15, 23, 42, 0.8)" stroke="#fbbf24" strokeWidth="1.5" />
          <polygon points="400,330 520,260 520,310 400,380" fill="rgba(15, 23, 42, 0.9)" stroke="#fbbf24" strokeWidth="1.5" />

          {/* Upper Mass Block */}
          <polygon points="340,210 440,270 540,210 440,150" fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="340,210 440,270 440,310 340,250" fill="rgba(30, 41, 59, 0.8)" stroke="#fbbf24" strokeWidth="1.5" />
          <polygon points="440,270 540,210 540,250 440,310" fill="rgba(15, 23, 42, 0.9)" stroke="#fbbf24" strokeWidth="1.5" />

          {/* Dimension Callout Lines */}
          <g opacity="0.8" className="font-mono text-[9px] fill-amber-300">
            <line x1="240" y1="280" x2="160" y2="230" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
            <text x="170" y="220" textAnchor="end">18.6m WIDTH</text>

            <line x1="560" y1="280" x2="640" y2="230" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
            <text x="630" y="220" textAnchor="start">14.2m DEPTH</text>

            <text x="400" y="425" textAnchor="middle" className="text-[11px] fill-amber-400 font-bold">
              ESTIMATED BOQ VOLUME · 4,200 SQ.FT
            </text>
          </g>
        </g>
      )

    // ── STAGE 03: STRUCTURAL & EXECUTION PLANNING ─────────────────────
    // Engineered structural framework: columns uprights, footing anchors, slab grid
    case 2:
      return (
        <g>
          {/* Foundation Footing Base Plates */}
          {[
            [260, 310], [400, 380], [540, 310],
            [330, 260], [470, 260],
            [400, 190],
          ].map(([fx, fy], i) => (
            <rect key={`ft-${i}`} x={fx - 10} y={fy - 6} width="20" height="12" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          ))}

          {/* Primary RCC Column Cages (Rising vertically) */}
          {[
            [260, 310, 190],
            [400, 380, 260],
            [540, 310, 190],
            [330, 260, 140],
            [470, 260, 140],
            [400, 190, 80],
          ].map(([cx, cyBottom, cyTop], i) => (
            <g key={`col-${i}`}>
              <line x1={cx} y1={cyBottom} x2={cx} y2={cyTop} stroke="#60a5fa" strokeWidth="3" />
              <line x1={cx - 3} y1={cyBottom} x2={cx - 3} y2={cyTop} stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1" />
              <line x1={cx + 3} y1={cyBottom} x2={cx + 3} y2={cyTop} stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1" />
            </g>
          ))}

          {/* Level 01 Intermediate Slab Beam Matrix */}
          <polygon points="260,250 400,320 540,250 400,180" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="2" />

          {/* Level 02 Eaves Tie Beam Grid */}
          <polygon points="260,190 400,260 540,190 400,120" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />

          <text x="400" y="425" textAnchor="middle" className="text-[11px] font-mono fill-blue-400 font-bold">
            ENGINEERED RCC COLUMN & SLAB FRAMEWORK
          </text>
        </g>
      )

    // ── STAGE 04: CONSTRUCTION (THE PEAK TRANSFORMATION) ─────────────
    // Full physical construction: solid volumetric walls, floor slabs, pitched rafters, entrance portal
    case 3:
      return (
        <g>
          {/* Ground Floor Solid Volumetric Facade */}
          <polygon points="250,290 390,365 390,260 250,185" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
          <polygon points="390,365 550,285 550,180 390,260" fill="#1e293b" stroke="#ef4444" strokeWidth="2.5" />

          {/* Level 1 Intermediate Slab Projection */}
          <polygon points="240,185 390,260 560,180 410,105" fill="rgba(239, 68, 68, 0.18)" stroke="#ef4444" strokeWidth="2.5" />

          {/* Upper Floor Volumetric Enclosure */}
          <polygon points="280,165 390,225 390,145 280,85" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
          <polygon points="390,225 520,160 520,80 390,145" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />

          {/* Pitched Roof Rafter Framing */}
          <polygon points="270,85 390,15 530,80 390,145" fill="rgba(239, 68, 68, 0.12)" stroke="#f87171" strokeWidth="2.5" />
          <line x1="390" y1="15" x2="390" y2="145" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

          {/* Entrance Door & Window Apertures */}
          <polygon points="330,300 370,320 370,355 330,335" fill="#020617" stroke="#f87171" strokeWidth="1.5" />
          <polygon points="420,295 500,255 500,215 420,255" fill="#020617" stroke="#f87171" strokeWidth="1.5" />

          <text x="400" y="425" textAnchor="middle" className="text-[11px] font-mono fill-red-400 font-bold">
            ACTIVE CONSTRUCTION · MONOLITHIC SLABS & WALLS
          </text>
        </g>
      )

    // ── STAGE 05: QUALITY & SAFETY CHECKS ────────────────────────────
    // Professional inspection audit system with 4 optical verification nodes
    case 4:
      return (
        <g>
          {/* Base Constructed Building Form */}
          <polygon points="250,290 390,365 390,260 250,185" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <polygon points="390,365 550,285 550,180 390,260" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <polygon points="240,185 390,260 560,180 410,105" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
          <polygon points="280,165 390,225 390,145 280,85" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <polygon points="390,225 520,160 520,80 390,145" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <polygon points="270,85 390,15 530,80 390,145" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="2" />

          {/* 4 Active Quality Audit Inspection Reticles */}
          {/* Node 1: Foundation Settlement */}
          <g transform="translate(250, 290)">
            <circle r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: '6s' }} />
            <circle r="5" fill="#10b981" />
            <text x="-24" y="-12" textAnchor="end" className="text-[9px] font-mono fill-emerald-400 font-bold">✓ SETTLEMENT PASS</text>
          </g>

          {/* Node 2: Cube Strength */}
          <g transform="translate(390, 260)">
            <circle r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: '6s' }} />
            <circle r="5" fill="#10b981" />
            <text x="24" y="-12" textAnchor="start" className="text-[9px] font-mono fill-emerald-400 font-bold">✓ M25 STRENGTH VERIFIED</text>
          </g>

          {/* Node 3: Laser Plumb Level */}
          <g transform="translate(550, 180)">
            <circle r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: '6s' }} />
            <circle r="5" fill="#10b981" />
            <text x="24" y="16" textAnchor="start" className="text-[9px] font-mono fill-emerald-400 font-bold">✓ LASER LEVEL ±1.5mm</text>
          </g>

          {/* Node 4: Roof Membrane */}
          <g transform="translate(390, 15)">
            <circle r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: '6s' }} />
            <circle r="5" fill="#10b981" />
            <text x="0" y="-24" textAnchor="middle" className="text-[9px] font-mono fill-emerald-400 font-bold">✓ WATERPROOF SEAL CERTIFIED</text>
          </g>

          <text x="400" y="425" textAnchor="middle" className="text-[11px] font-mono fill-emerald-400 font-bold">
            STAGE 05 AUDIT · 100% QUALITY & SAFETY SIGN-OFF
          </text>
        </g>
      )

    // ── STAGE 06: FINISHING & ARCHITECTURAL REFINEMENT ────────────────
    // Smooth surfaces, refined fenestrations, clean architectural glass and lighting
    case 5:
      return (
        <g>
          {/* Smooth Plaster Facades */}
          <polygon points="250,290 390,365 390,260 250,185" fill="#1e293b" stroke="#f472b6" strokeWidth="2.5" />
          <polygon points="390,365 550,285 550,180 390,260" fill="#334155" stroke="#f472b6" strokeWidth="2.5" />

          {/* Crisp Level 1 Cantilever Slab */}
          <polygon points="240,185 390,260 560,180 410,105" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />

          {/* Upper Floor Smooth Enclosure */}
          <polygon points="280,165 390,225 390,145 280,85" fill="#1e293b" stroke="#f472b6" strokeWidth="2" />
          <polygon points="390,225 520,160 520,80 390,145" fill="#334155" stroke="#f472b6" strokeWidth="2" />

          {/* Finished Roof Crown */}
          <polygon points="270,85 390,15 530,80 390,145" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />

          {/* Architectural Glazing & Warm Interior Lighting Glow */}
          <polygon points="330,295 370,315 370,355 330,335" fill="rgba(244, 114, 182, 0.4)" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="420,290 500,250 500,210 420,250" fill="rgba(56, 189, 248, 0.4)" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="310,155 370,190 370,160 310,125" fill="rgba(56, 189, 248, 0.4)" stroke="#ffffff" strokeWidth="1.5" />

          <text x="400" y="425" textAnchor="middle" className="text-[11px] font-mono fill-pink-300 font-bold">
            ARCHITECTURAL FINISHES · LEVEL-5 PLASTER & GLAZING
          </text>
        </g>
      )

    // ── STAGE 07: HANDOVER (COMPLETED MASTERPIECE) ───────────────────
    // Completed building model with golden turnkey crown and handover certificate
    case 6:
      return (
        <g>
          {/* Refined Completed Architectural Residence */}
          <polygon points="250,290 390,365 390,260 250,185" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
          <polygon points="390,365 550,285 550,180 390,260" fill="#334155" stroke="#fbbf24" strokeWidth="2.5" />
          <polygon points="240,185 390,260 560,180 410,105" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
          <polygon points="280,165 390,225 390,145 280,85" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="390,225 520,160 520,80 390,145" fill="#334155" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="270,85 390,15 530,80 390,145" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />

          {/* Glazing Highlights */}
          <polygon points="330,295 370,315 370,355 330,335" fill="rgba(251, 191, 36, 0.4)" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="420,290 500,250 500,210 420,250" fill="rgba(56, 189, 248, 0.5)" stroke="#ffffff" strokeWidth="1.5" />

          {/* Turnkey Handover Certificate Seal */}
          <g transform="translate(390, 15)">
            <circle r="22" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
            <circle r="17" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ transformOrigin: '0 0', animationDuration: '8s' }} />
            <text x="0" y="4" textAnchor="middle" className="text-[12px] font-bold fill-amber-400">★</text>
          </g>

          <text x="400" y="425" textAnchor="middle" className="text-[12px] font-mono fill-amber-400 font-bold">
            PROJECT COMPLETE · KEYS HANDED OVER ★
          </text>
        </g>
      )
  }
}
