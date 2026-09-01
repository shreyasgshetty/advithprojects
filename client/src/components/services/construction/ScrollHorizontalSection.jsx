import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const GRID_LIGHT = {
  backgroundImage:
    'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

const GRID_DARK = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

/**
 * ScrollHorizontalSection
 * Reusable pinned horizontal scroll container for Civil Construction storytelling.
 *
 * Props:
 * - title: Section heading (e.g. "Construction Capabilities")
 * - subtitle: Eyebrow label (e.g. "Section 01 · Scope & Specializations")
 * - description: Context paragraph
 * - totalItems: Total number of items
 * - theme: 'light' | 'dark'
 * - children: The horizontal card elements
 */
export default function ScrollHorizontalSection({
  title,
  subtitle,
  description,
  totalItems = 1,
  theme = 'light',
  children,
}) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(1)
  const [maxScrollX, setMaxScrollX] = useState(0)

  // Scroll progress through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Measure track width to determine exact translation distance
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth
        const clientWidth = window.innerWidth
        // Allow enough padding so the last card aligns nicely with the viewport
        const padding = clientWidth < 768 ? 48 : 120
        const distance = Math.max(0, scrollWidth - clientWidth + padding)
        setMaxScrollX(distance)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    // Extra measure after fonts/styles settle
    const timer = setTimeout(updateDimensions, 200)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timer)
    }
  }, [children, totalItems])

  // Map vertical progress to horizontal transform (smooth with spring)
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 28, restDelta: 0.001 })
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScrollX])

  // Subtle dynamic skew during scroll movement
  const skewX = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    shouldReduceMotion ? [0, 0, 0, 0, 0] : [0, -1.2, 0, 1.2, 0]
  )

  // Track active step indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const step = Math.min(totalItems, Math.max(1, Math.floor(v * totalItems) + 1))
      setActiveStep(step)
    })
    return () => unsubscribe()
  }, [scrollYProgress, totalItems])

  const isDark = theme === 'dark'

  // Height proportional to items so scrolling feels comfortable and measured
  // ~45vh per item gives a natural, controlled pace
  const containerHeight = `${Math.max(220, totalItems * 48)}vh`

  // Reduced motion fallback: display standard responsive grid without pinning
  if (shouldReduceMotion) {
    return (
      <section className={`py-20 lg:py-28 ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              {subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{title}</h2>
            {description && <p className="text-slate-400 text-sm max-w-2xl">{description}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 lg:py-8 select-none">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={isDark ? GRID_DARK : GRID_LIGHT}
          aria-hidden="true"
        />

        {/* Ambient Glow */}
        <div
          className="absolute top-1/4 right-10 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* ── 1. HEADER & PROGRESS HUD ───────────────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                {subtitle}
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              {title}
            </h2>
            {description && (
              <p className={`text-xs sm:text-sm mt-1 max-w-xl line-clamp-1 sm:line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>

          {/* Step Counter + Progress HUD */}
          <div className="shrink-0 flex flex-col items-end">
            <div className="flex items-baseline gap-1 font-mono">
              <span className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {String(activeStep).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm text-slate-400">
                / {String(totalItems).padStart(2, '0')}
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-28 sm:w-36 h-1 bg-slate-200/40 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-red-600 rounded-full origin-left"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>

        {/* ── 2. HORIZONTAL SCROLL TRACK ─────────────────────────────── */}
        <div className="relative z-10 w-full overflow-visible my-auto py-4">
          <motion.div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 w-max"
            style={{ x, skewX }}
          >
            {children}
          </motion.div>
        </div>

        {/* ── 3. FOOTER CONTROLS / STORY PROGRESS ────────────────────── */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-8 flex items-center justify-between text-xs shrink-0 pt-2 border-t border-slate-200/50 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="font-mono text-red-500 font-semibold uppercase tracking-wider">
              Sequence {String(activeStep).padStart(2, '0')}
            </span>
            <span className="text-slate-400">·</span>
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Vertical scroll drives horizontal progression
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span>Scroll down to continue</span>
            <div className="w-4 h-4 rounded-full border border-slate-400/40 flex items-center justify-center">
              <div className="w-1 h-1.5 bg-red-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
