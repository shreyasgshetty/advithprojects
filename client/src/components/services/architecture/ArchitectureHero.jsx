import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../../../config/contact'

const EXPO = [0.16, 1, 0.3, 1]

export default function ArchitectureHero({ service }) {
  const shouldReduceMotion = useReducedMotion()

  const anim = (delay = 0, y = 16) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  return (
    <section className="relative overflow-hidden bg-[#0B0F17] text-white border-b border-slate-800">
      {/* Subtle Architectural Draftsman Grid Canvas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Amber Glow */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #D97706 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="flex items-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-widest flex-wrap font-mono"
          aria-label="Breadcrumb"
          {...anim(0.05, 8)}
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" aria-hidden="true" />
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" aria-hidden="true" />
          <span className="text-amber-400 font-semibold" aria-current="page">Architecture</span>
        </motion.nav>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
              {...anim(0.18, 16)}
            >
              Spaces Formed by Context.{' '}
              <span className="text-amber-500 block sm:inline">Planned with Purpose.</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-8"
              {...anim(0.26, 14)}
            >
              {service.heroDescription}
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 items-center mb-10" {...anim(0.34, 12)}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="#scope"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all hover:bg-slate-800/40"
              >
                <span>Explore Architectural Scope</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-slate-400 hover:text-emerald-400 font-medium text-sm transition-colors"
                aria-label="Direct inquiry via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 font-mono text-xs text-slate-400"
              {...anim(0.42, 10)}
            >
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Discipline</span>
                <span className="text-slate-200 font-medium">Architecture & Form</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Scope</span>
                <span className="text-slate-200 font-medium">Concept to Docs</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Process</span>
                <span className="text-slate-200 font-medium">6-Stage Phased</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Orientation</span>
                <span className="text-slate-200 font-medium">Context & Light</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Authentic Architectural Plan Linework (No empty card) */}
          <motion.div
            className="lg:col-span-5 relative select-none flex items-center justify-center"
            {...anim(0.28, 16)}
            aria-hidden="true"
          >
            <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-slate-800/80 bg-slate-950/40 p-6 overflow-hidden flex flex-col justify-between">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] font-mono text-slate-400">
                <span className="text-amber-400 font-semibold tracking-wider">Advith Projects</span>
                <span>SCALE 1:100</span>
              </div>

              {/* Architectural Plan Linework SVG */}
              <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 320 180"
                  className="w-full h-full text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="40" y2="160" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="160" y1="20" x2="160" y2="160" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="280" y1="20" x2="280" y2="160" stroke="#334155" strokeDasharray="3 3" />

                  {/* Exterior Perimeter Walls */}
                  <rect x="40" y="30" width="240" height="120" stroke="#D97706" strokeWidth="1.5" />
                  <rect x="44" y="34" width="232" height="112" stroke="#475569" strokeWidth="0.8" />

                  {/* Internal Rooms Partition */}
                  <line x1="150" y1="34" x2="150" y2="146" stroke="#475569" strokeWidth="1.2" />
                  <line x1="44" y1="95" x2="150" y2="95" stroke="#475569" strokeWidth="1.2" />

                  {/* Door Swings */}
                  <path d="M 150 70 A 25 25 0 0 1 125 95" stroke="#D97706" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="150" y1="70" x2="150" y2="95" stroke="#D97706" strokeWidth="1" />

                  {/* Room Labels */}
                  <text x="65" y="65" fill="#CBD5E1" fontSize="8" fontFamily="monospace">LIVING ROOM</text>
                  <text x="65" y="77" fill="#64748B" fontSize="6" fontFamily="monospace">4.20 x 5.10m</text>

                  <text x="65" y="120" fill="#CBD5E1" fontSize="8" fontFamily="monospace">DINING / KITCHEN</text>
                  <text x="65" y="132" fill="#64748B" fontSize="6" fontFamily="monospace">3.80 x 4.20m</text>

                  <text x="180" y="85" fill="#CBD5E1" fontSize="8" fontFamily="monospace">MASTER SUITE</text>
                  <text x="180" y="97" fill="#64748B" fontSize="6" fontFamily="monospace">4.80 x 5.60m</text>

                  {/* Fenestration / Windows */}
                  <rect x="90" y="28" width="40" height="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1" />
                  <rect x="200" y="28" width="40" height="4" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1" />
                  <rect x="278" y="70" width="4" height="40" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1" />

                  {/* North Point Indicator */}
                  <g transform="translate(290, 45)">
                    <circle cx="0" cy="0" r="8" stroke="#475569" />
                    <polygon points="0,-7 3,5 0,3 -3,5" fill="#D97706" />
                    <text x="-2" y="-9" fill="#D97706" fontSize="6" fontFamily="monospace">N</text>
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
