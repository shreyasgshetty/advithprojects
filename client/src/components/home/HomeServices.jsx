import { useState, useRef, useEffect, memo } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  Building2,
  Layers,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  SlidersHorizontal,
  Image as ImageIcon,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]
const FLIP_EASE = [0.25, 1, 0.5, 1]

const FOLIOS = [
  {
    id: 'architecture',
    num: '01',
    roman: 'I',
    title: 'Architecture & Planning',
    shortTitle: 'Architecture',
    subtitle: 'From spatial viability to coordinated construction blueprints.',
    accent: 'text-amber-600',
    accentBorder: 'border-amber-500',
    accentHex: '#d97706',
    bgLight: 'bg-amber-50',
    btnBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-900/20',
    dot: 'bg-amber-500',
    icon: Compass,
    image: '/projects/architecture/ap-ckm2025-01/cover.jpeg',
    path: '/services/architecture',
    leadParagraph:
      'Architecture shapes how space functions, breathes, and endures. We coordinate concept blueprints with structural calculations from day one, preventing site revisions and misaligned drawings.',
    specs: [
      { label: 'COORDINATION', value: 'Unified BIM & Structural CAD' },
      { label: 'PERMITTING', value: 'Local Council & NBC Clearances' },
      { label: 'DELIVERABLE', value: 'Full Working Drawing Sets' },
      { label: 'VISUALIZATION', value: 'Photorealistic Spatial 3D' },
    ],
    capabilities: [
      'Site Analysis & Spatial Layouts',
      'Structural Drawing Coordination',
      'High-Precision 3D Visualization',
      'Statutory & Local Council Approvals',
    ],
  },
  {
    id: 'construction',
    num: '02',
    roman: 'II',
    title: 'Civil Construction',
    shortTitle: 'Construction',
    subtitle: 'IS-456 structural framing, certified materials, zero site shortcuts.',
    accent: 'text-red-600',
    accentBorder: 'border-red-600',
    accentHex: '#dc2626',
    bgLight: 'bg-red-50',
    btnBg: 'bg-red-600 hover:bg-red-700 shadow-red-900/20',
    dot: 'bg-red-600',
    icon: Building2,
    image: '/projects/construction/ap-ckm2024-01/cover.jpeg',
    path: '/services/construction',
    leadParagraph:
      'From groundbreaking to structural topping out, our dedicated site engineers verify every pour, rebar schedule, and brick course to Indian Standards. We eliminate contractor blame games through single-source accountability.',
    specs: [
      { label: 'GOVERNING CODE', value: 'IS-456 & IS-13920 Ductile' },
      { label: 'QA / QC CHECKS', value: '7 & 28-Day Cube Testing' },
      { label: 'STEEL SPEC', value: 'Fe-550D TMT Certified' },
      { label: 'SUPERVISION', value: 'Resident Civil Engineers' },
    ],
    capabilities: [
      'RCC Foundation & Structural Framing',
      'IS-456 Concrete & Reinforcement Standards',
      'Brick Masonry & Precision Plastering',
      'Turnkey Site Management & Quality Audits',
    ],
  },
  {
    id: 'interiors',
    num: '03',
    roman: 'III',
    title: 'Turnkey Interior Design',
    shortTitle: 'Interiors',
    subtitle: 'Crafted joinery, architectural illumination, bespoke finish.',
    accent: 'text-rose-600',
    accentBorder: 'border-rose-500',
    accentHex: '#e11d48',
    bgLight: 'bg-rose-50',
    btnBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-900/20',
    dot: 'bg-rose-500',
    icon: Layers,
    image: '/projects/interior/ap-ckm2025-02/cover.jpeg',
    path: '/services/interiors',
    leadParagraph:
      'Turnkey interiors designed as an architectural continuation of the built frame. We engineer custom woodwork, layered warm illumination, and hand-selected natural materials with zero contractor friction.',
    specs: [
      { label: 'HARDWARE CLASS', value: 'Blum / Häfele Soft-Close' },
      { label: 'MILLWORK', value: 'Marine Ply & Factory Edge-Banded' },
      { label: 'LIGHTING DESIGN', value: 'Warm Layered CRI 90+ LEDs' },
      { label: 'HANDOVER', value: 'Snag-Free Deep Clean Polish' },
    ],
    capabilities: [
      'Bespoke Woodwork & Custom Joinery',
      'Architectural & Layered Lighting Design',
      'Stone, Tile & Palette Selection',
      'Turnkey Execution & Furnishing Polish',
    ],
  },
]

function HomeServices() {
  const [activeFolio, setActiveFolio] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = next, -1 = prev
  const [isFlipping, setIsFlipping] = useState(false)
  const [mobileTab, setMobileTab] = useState('visuals') // 'visuals' | 'specs' for mobile view
  const shouldReduceMotion = useReducedMotion()

  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const isManualNavigating = useRef(false)
  const manualTimer = useRef(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

  // Scroll tracking across the pinned multi-viewport section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Synchronize scroll position smoothly with active page
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isManualNavigating.current) return

    let target = 0
    if (latest < 0.35) {
      target = 0
    } else if (latest < 0.70) {
      target = 1
    } else {
      target = 2
    }

    if (target !== activeFolio) {
      setDirection(target > activeFolio ? 1 : -1)
      setIsFlipping(true)
      setActiveFolio(target)
      setTimeout(() => setIsFlipping(false), 550)
    }
  })

  // Turn page smoothly in-place without jarring scroll jumps
  const turnToPage = (index) => {
    if (index === activeFolio || index < 0 || index >= FOLIOS.length) return

    isManualNavigating.current = true
    if (manualTimer.current) clearTimeout(manualTimer.current)

    setDirection(index > activeFolio ? 1 : -1)
    setIsFlipping(true)
    setActiveFolio(index)

    // Reset manual lock after transition finishes (no forced window scroll!)
    manualTimer.current = setTimeout(() => {
      isManualNavigating.current = false
      setIsFlipping(false)
    }, 700)
  }

  useEffect(() => {
    return () => {
      if (manualTimer.current) clearTimeout(manualTimer.current)
    }
  }, [])

  const current = FOLIOS[activeFolio]
  const Icon = current.icon

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F4F4F1] border-b border-slate-300/80 min-h-[100vh] lg:min-h-[250vh] selection:bg-red-600 selection:text-white"
    >
      {/* Drafting Studio Ambient Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Sticky Fullscreen Presentation Viewport — Fits 100% of the screen */}
      <div className="lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center py-4 lg:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Compact Integrated Header Bar */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 lg:mb-4 px-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EXPO }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
                WHAT WE DO
              </span>
            </div>
            <span className="text-slate-300 font-mono hidden sm:inline">/</span>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 truncate">
              From First Sketch to Final Handover
            </h2>
          </motion.div>

          {/* Quick Folio Tracker */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-300 shadow-2xs">
              <BookOpen className="w-3 h-3 text-red-600" />
              <span className="hidden md:inline">Scroll or click tabs to turn pages</span>
              <span className="md:hidden">Folio Monograph</span>
            </div>
            <div className="flex items-center gap-1 font-bold">
              <span className="text-red-600 text-xs sm:text-sm">0{activeFolio + 1}</span>
              <span className="text-slate-400">/ 03</span>
            </div>
          </div>
        </div>

        {/* ── THE ARCHITECTURAL BOOK SPREAD ── */}
        <div className="relative w-full max-w-6xl mx-auto [perspective:2200px]">
          {/* Stacked Paper Page Edges (Depth Illusion) */}
          <div
            className="absolute -inset-1.5 sm:-inset-2 bg-slate-900/10 rounded-2xl transform translate-y-2 blur-[2px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-1 bg-gradient-to-r from-amber-900/10 via-slate-700/10 to-amber-900/10 rounded-2xl pointer-events-none shadow-[2px_4px_16px_rgba(0,0,0,0.12)]"
            aria-hidden="true"
          />

          {/* Outer Book Binder Container */}
          <div className="relative bg-[#1A1D24] text-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] border border-slate-800">
            {/* Hanging Bookmark Ribbon */}
            <div
              className="absolute -top-2.5 left-12 sm:left-20 z-30 w-5 sm:w-6 h-8 sm:h-10 bg-red-600 shadow-md rounded-b-sm pointer-events-none transition-all duration-500"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
              }}
            />

            {/* Monograph Running Header & Chapter Tabs */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-2 border-b border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold tracking-wider uppercase text-white">
                  ADVITH MONOGRAPH
                </span>
                <span className="text-slate-600 hidden sm:inline">/</span>
                <span className="hidden sm:inline text-slate-400">PRACTICE CAPABILITIES</span>
              </div>

              {/* Chapter Tabs (Quick Direct Turn Without Jumping) */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {FOLIOS.map((folio, idx) => {
                  const isCur = activeFolio === idx
                  return (
                    <button
                      key={folio.id}
                      type="button"
                      onClick={() => turnToPage(idx)}
                      className={`relative px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        isCur
                          ? 'bg-white text-slate-900 font-bold shadow-2xs'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="inline-block sm:hidden">0{folio.num}</span>
                      <span className="hidden sm:inline">
                        {folio.num} {folio.shortTitle}
                      </span>
                      {isCur && (
                        <motion.span
                          layoutId="activeTabPill"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────── */}
            {/* DESKTOP TWO-PAGE SPREAD (Hidden on Mobile)                  */}
            {/* ─────────────────────────────────────────────────────────── */}
            <div className="hidden lg:grid grid-cols-2 bg-[#FAF8F5] rounded-xl overflow-hidden relative shadow-inner h-[calc(100vh-170px)] max-h-[580px] min-h-[500px]">
              {/* Central Spine Gutter & Stitching */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-20 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.12) 100%)',
                }}
              >
                <div className="absolute top-4 bottom-4 left-1/2 -ml-px w-px border-l border-dashed border-slate-400/50" />
              </div>

              {/* LEFT PAGE: Technical Brief, Manifesto & Codes */}
              <div className="relative p-6 xl:p-8 flex flex-col justify-between border-r border-slate-200/90 bg-[#FAF8F5] overflow-y-auto">
                <span
                  className="absolute right-6 top-4 text-8xl xl:text-9xl font-serif font-black text-slate-900/[0.04] select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  {current.roman}
                </span>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        FOLIO {current.num}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${current.accent}`}>
                        DISCIPLINE {current.num}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${current.bgLight} ${current.accent} shadow-2xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EXPO }}
                    >
                      <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-1.5">
                        {current.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wide mb-3">
                        {current.subtitle}
                      </p>
                      <p className="text-xs xl:text-sm text-slate-600 font-light leading-relaxed mb-4">
                        {current.leadParagraph}
                      </p>

                      {/* Technical Standards Table */}
                      <div className="bg-white/95 border border-slate-200/90 rounded-lg p-3 xl:p-3.5 mb-2 shadow-2xs font-mono">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 pb-1 border-b border-slate-100 flex items-center justify-between">
                          <span>TECHNICAL SPECIFICATION</span>
                          <span className="text-slate-900 font-semibold text-[10px]">IS & NBC STANDARDS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                          {current.specs.map((item) => (
                            <div key={item.label} className="text-slate-600">
                              <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                                {item.label}
                              </div>
                              <div className="font-medium text-slate-900 text-[11px] truncate">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left Page Running Footer */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>ADVITH PROJECTS · SPEC FOLIO</span>
                  <span>PAGE {current.num}-L</span>
                </div>
              </div>

              {/* RIGHT PAGE: Turning Plate, Showcase & Action */}
              <div className="relative p-6 xl:p-8 flex flex-col justify-between bg-[#FCFAF7] [transform-style:preserve-3d] overflow-hidden">
                {/* Dynamic paper sheen & curl shadow during flip */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-30 ${
                    isFlipping
                      ? 'opacity-30 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/10'
                      : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: direction > 0 ? 75 : -75,
                            opacity: 0.15,
                            scale: 0.98,
                            transformOrigin: 'left center',
                          }
                    }
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                      transformOrigin: 'left center',
                    }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: direction > 0 ? -75 : 75,
                            opacity: 0,
                            scale: 0.98,
                            transformOrigin: 'left center',
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.25 : 0.55,
                      ease: FLIP_EASE,
                    }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Top Plate Specification Bar */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-200/90 font-mono text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${current.dot} animate-ping`} />
                          <span className="font-bold text-slate-800 uppercase tracking-wider">
                            ARCHIVE PLATE 0{current.num}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[10px] tracking-widest uppercase">
                          SOUTH KARNATAKA SITES
                        </span>
                      </div>

                      {/* Monograph Framed Architectural Plate */}
                      <div className="relative rounded-lg overflow-hidden border border-slate-300/80 shadow-md bg-slate-900 group aspect-[16/9] max-h-[220px] mb-3">
                        <img
                          src={current.image}
                          alt={current.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between font-mono text-white text-xs">
                          <div>
                            <div className="text-[9px] text-slate-300 uppercase tracking-widest">
                              COMMISSION RECORD
                            </div>
                            <div className="font-bold text-xs sm:text-sm text-white drop-shadow-xs">
                              {current.title}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] text-emerald-300 border border-emerald-500/30">
                            VERIFIED
                          </span>
                        </div>
                      </div>

                      {/* Practice Deliverables Checklist */}
                      <div className="mb-2">
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                          DELIVERABLE CAPABILITIES
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {current.capabilities.map((cap) => (
                            <div
                              key={cap}
                              className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-slate-200/80 text-[11px] text-slate-700 shadow-2xs font-medium"
                            >
                              <Check className={`w-3 h-3 shrink-0 ${current.accent}`} />
                              <span className="leading-tight truncate">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Strip & Page Flip Triggers */}
                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
                      <Link
                        to={current.path}
                        className={`group inline-flex items-center gap-2 px-4 py-2 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 rounded-lg shadow-2xs ${current.btnBg}`}
                      >
                        <span>EXPLORE {current.shortTitle.toUpperCase()}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>

                      {/* Book Page Controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => turnToPage(activeFolio - 1)}
                          disabled={activeFolio === 0}
                          className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-md border text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                            activeFolio === 0
                              ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                              : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
                          }`}
                          aria-label="Previous Page"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">PREV</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => turnToPage(activeFolio + 1)}
                          disabled={activeFolio === FOLIOS.length - 1}
                          className={`px-2.5 py-1.5 rounded-md border text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            activeFolio === FOLIOS.length - 1
                              ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                              : 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                          }`}
                          aria-label="Next Page"
                        >
                          <span>{activeFolio === FOLIOS.length - 1 ? 'FINAL' : 'NEXT'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Interactive Dog-Ear Corner at Bottom-Right */}
                {activeFolio < FOLIOS.length - 1 && (
                  <button
                    type="button"
                    onClick={() => turnToPage(activeFolio + 1)}
                    className="group absolute bottom-0 right-0 w-8 h-8 overflow-hidden cursor-pointer"
                    title="Turn to next page"
                    aria-label="Turn page"
                  >
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-200/90 border-t border-l border-slate-300 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:bg-amber-100 shadow-2xs" />
                  </button>
                )}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────── */}
            {/* MOBILE FOLIO VIEW (< lg screens) — 100% Responsive         */}
            {/* ─────────────────────────────────────────────────────────── */}
            <div className="lg:hidden bg-[#FAF8F5] rounded-xl overflow-hidden shadow-inner p-4 sm:p-5 flex flex-col justify-between">
              {/* Mobile Sub-Tab Segmented Control (Visual Plate vs Specification) */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded flex items-center justify-center ${current.bgLight} ${current.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                      FOLIO 0{current.num}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-none">
                      {current.shortTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setMobileTab('visuals')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                      mobileTab === 'visuals'
                        ? 'bg-white text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Plate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab('specs')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                      mobileTab === 'specs'
                        ? 'bg-white text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Specs</span>
                  </button>
                </div>
              </div>

              {/* Mobile 3D Turn Container */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${current.id}-${mobileTab}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -16 : 16 }}
                  transition={{ duration: 0.3, ease: EXPO }}
                  className="mb-4"
                >
                  {mobileTab === 'visuals' ? (
                    <div>
                      {/* Architectural Photo Plate */}
                      <div className="relative rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-900 aspect-[16/10] mb-3">
                        <img
                          src={current.image}
                          alt={current.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between font-mono text-white text-xs">
                          <div>
                            <div className="text-[9px] text-slate-300 uppercase">COMMISSION RECORD</div>
                            <div className="font-bold text-xs text-white">{current.title}</div>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-emerald-300">
                            IS-456
                          </span>
                        </div>
                      </div>

                      {/* Deliverables tags */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {current.capabilities.slice(0, 4).map((cap) => (
                          <div
                            key={cap}
                            className="flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200/80 text-[11px] text-slate-700 font-medium"
                          >
                            <Check className={`w-3 h-3 shrink-0 ${current.accent}`} />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-600 font-light leading-relaxed mb-3">
                        {current.leadParagraph}
                      </p>
                      <div className="bg-white border border-slate-200/90 rounded-lg p-3 space-y-2 font-mono text-xs mb-2">
                        {current.specs.map((item) => (
                          <div key={item.label} className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400 uppercase">{item.label}</span>
                            <span className="font-medium text-slate-900 text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mobile Bottom Navigation & Action */}
              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
                <Link
                  to={current.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-md ${current.btnBg}`}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => turnToPage(activeFolio - 1)}
                    disabled={activeFolio === 0}
                    className={`p-1.5 rounded border text-xs font-mono cursor-pointer ${
                      activeFolio === 0 ? 'border-slate-200 text-slate-300' : 'border-slate-300 text-slate-700 bg-white'
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] font-mono font-bold px-1.5 text-slate-600">
                    0{activeFolio + 1} / 03
                  </span>

                  <button
                    type="button"
                    onClick={() => turnToPage(activeFolio + 1)}
                    disabled={activeFolio === FOLIOS.length - 1}
                    className={`p-1.5 rounded border text-xs font-mono font-bold cursor-pointer ${
                      activeFolio === FOLIOS.length - 1
                        ? 'border-slate-200 text-slate-300'
                        : 'border-slate-900 bg-slate-900 text-white'
                    }`}
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Book Footnote */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-2 text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-[9px] sm:text-[10px]">
                  SINGLE-SOURCE ADVITH GOVERNANCE STANDARD
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {FOLIOS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => turnToPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeFolio === i ? 'w-5 sm:w-6 bg-red-600' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to folio ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeServices)
