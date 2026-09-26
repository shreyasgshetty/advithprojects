import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

function HomeHero() {
  const shouldReduceMotion = useReducedMotion()

  const anim = (delay = 0, y = 18) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] border-b border-slate-200 select-none">
      {/* ── 1. Architectural Drafting Paper Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric subtle radial glow */}
      <div
        className="absolute -top-32 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 sm:pt-14 pb-14 sm:pb-20">
        {/* Technical Header Strip */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 sm:mb-12 border-b border-slate-200/80 text-[11px] font-mono text-slate-500 uppercase tracking-widest"
          {...anim(0.05, 10)}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-bold text-slate-900 tracking-wider">
              ADVITH PROJECTS
            </span>
          </div>
        </motion.div>

        {/* Hero Grid: Left Editorial Statement, Right Architectural Presentation Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Positioning Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 shadow-2xs"
              {...anim(0.12, 12)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Architecture · Civil Construction · Interiors</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-[4.15rem] font-bold text-slate-900 tracking-tight leading-[1.08]"
              {...anim(0.2, 20)}
            >
              We Build the{' '}
              <span className="relative inline-block text-red-600">
                Spaces
              </span>{' '}
              You Dream Of.
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl"
              {...anim(0.3, 16)}
            >
              Architecture, civil construction, and turnkey interior environments delivered through
              one coordinated team. We eliminate the friction of fragmented contractors with end-to-end
              engineering discipline.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3.5 pt-2"
              {...anim(0.38, 16)}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-900 hover:bg-red-600 text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-red-600/20"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-900 hover:text-red-600 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border border-slate-300 hover:border-red-400 transition-all duration-200 shadow-2xs"
              >
                <span>START A PROJECT</span>
              </Link>
            </motion.div>

            {/* Quick Micro Technical Specifications */}
            <motion.div
              className="pt-4 border-t border-slate-200/90 grid grid-cols-3 gap-4 text-xs font-mono"
              {...anim(0.46, 12)}
            >
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">DISCIPLINES</p>
                <p className="font-bold text-slate-900">03 Integrated</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">DELIVERY</p>
                <p className="font-bold text-slate-900">Turnkey Model</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">COVERAGE</p>
                <p className="font-bold text-slate-900">Karnataka Hubs</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Presentation Board */}
          <div className="lg:col-span-5">
            <motion.div
              className="relative bg-white border border-slate-200/90 shadow-lg p-3 sm:p-4 group"
              {...anim(0.25, 24)}
            >
              {/* Corner crosshairs */}
              <div className="absolute -top-1.5 -left-1.5 text-slate-400 font-mono text-xs select-none pointer-events-none">+</div>
              <div className="absolute -top-1.5 -right-1.5 text-slate-400 font-mono text-xs select-none pointer-events-none">+</div>
              <div className="absolute -bottom-1.5 -left-1.5 text-slate-400 font-mono text-xs select-none pointer-events-none">+</div>
              <div className="absolute -bottom-1.5 -right-1.5 text-slate-400 font-mono text-xs select-none pointer-events-none">+</div>

              {/* Architectural Plate Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  COMMISSION · AP-001
                </span>
                <span className="text-slate-400">IS-456 SPECS</span>
              </div>

              {/* Main Photo Visual */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950 border border-slate-200">
                <img
                  src="/projects/architecture/ap-ckm2025-01/cover.jpeg"
                  alt="Advith Projects — Contemporary Villa Architecture & Civil Construction"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Technical Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white text-xs font-mono">
                  <div>
                    <p className="text-[10px] text-red-400 uppercase tracking-widest font-semibold">CONTEMPORARY RESIDENTIAL</p>
                    <p className="font-bold text-sm text-white">Villa Residence Commission</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[9px] font-bold uppercase tracking-wider">
                    COMPLETED
                  </span>
                </div>
              </div>

              {/* Lower Spec Sheet */}
              <div className="pt-3.5 px-2 grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-100 mt-3 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Bangalore, Karnataka</span>
                </div>
                <div className="text-right text-slate-500">
                  <span>Scope: Full Turnkey</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeHero)
