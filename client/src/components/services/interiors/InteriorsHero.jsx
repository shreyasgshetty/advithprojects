import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../../../config/contact'

const EXPO = [0.16, 1, 0.3, 1]

export default function InteriorsHero({ service }) {
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

      {/* Atmospheric Rose Glow */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #E11D48 0%, transparent 70%)' }}
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
          <span className="text-rose-400 font-semibold" aria-current="page">Interior Design</span>
        </motion.nav>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
              {...anim(0.18, 16)}
            >
              Environments Crafted with{' '}
              <span className="text-rose-500 block sm:inline">Material, Detail & Light.</span>
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
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="#scope"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all hover:bg-slate-800/40"
              >
                <span>Explore Interior Scope</span>
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
                <span className="text-slate-200 font-medium">Interior Architecture</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Scope</span>
                <span className="text-slate-200 font-medium">Concept to Fit-out</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Process</span>
                <span className="text-slate-200 font-medium">6-Stage Phased</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Focus</span>
                <span className="text-slate-200 font-medium">Joinery & Light</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Authentic Interior Elevation & Joinery Linework (No empty card) */}
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
                <span className="text-rose-400 font-semibold tracking-wider">JOINERY ELEVATION // INT-01</span>
                <span>SCALE 1:50</span>
              </div>

              {/* Interior Joinery Section SVG */}
              <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 320 180"
                  className="w-full h-full text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  {/* Floor and Ceiling Datum */}
                  <line x1="20" y1="25" x2="300" y2="25" stroke="#334155" strokeDasharray="3 3" />
                  <text x="245" y="20" fill="#64748B" fontSize="6" fontFamily="monospace">CEILING +2.85m</text>

                  <line x1="20" y1="155" x2="300" y2="155" stroke="#E11D48" strokeWidth="1.2" />
                  <text x="245" y="167" fill="#E11D48" fontSize="6" fontFamily="monospace">FINISHED FLOOR</text>

                  {/* Feature Wall Cladding Panel */}
                  <rect x="40" y="35" width="240" height="120" stroke="#334155" fill="none" />
                  {/* Fluted panel accents */}
                  <line x1="50" y1="35" x2="50" y2="155" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="60" y1="35" x2="60" y2="155" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" />
                  <line x1="70" y1="35" x2="70" y2="155" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 2" />

                  {/* Built-in Credenza / Media Unit */}
                  <rect x="90" y="115" width="140" height="40" stroke="#E11D48" strokeWidth="1.2" fill="rgba(225,29,72,0.06)" />
                  <line x1="136" y1="115" x2="136" y2="155" stroke="#475569" strokeWidth="0.8" />
                  <line x1="184" y1="115" x2="184" y2="155" stroke="#475569" strokeWidth="0.8" />

                  {/* Handles / Reveal line */}
                  <line x1="90" y1="120" x2="230" y2="120" stroke="#E11D48" strokeWidth="0.6" strokeDasharray="2 2" />

                  {/* Wall-hung display shelves */}
                  <line x1="110" y1="65" x2="210" y2="65" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="110" y1="85" x2="210" y2="85" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Ambient Light Cove indicator */}
                  <line x1="40" y1="32" x2="280" y2="32" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.8" strokeDasharray="4 2" />
                  <text x="120" y="44" fill="#FDE047" fontSize="6" fontFamily="monospace">COVE LIGHTING STRIP</text>

                  {/* Callout Labels */}
                  <text x="95" y="140" fill="#CBD5E1" fontSize="6" fontFamily="monospace">WALNUT VENEER</text>
                  <text x="145" y="140" fill="#CBD5E1" fontSize="6" fontFamily="monospace">MATTE LACQUER</text>
                  <text x="115" y="60" fill="#94A3B8" fontSize="5" fontFamily="monospace">CONCEALED BRACKET</text>

                  {/* Dimension Line */}
                  <line x1="90" y1="162" x2="230" y2="162" stroke="#64748B" strokeWidth="0.8" />
                  <text x="150" y="172" fill="#94A3B8" fontSize="6" fontFamily="monospace">2.10m</text>
                </svg>
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-2 text-[9px] font-mono text-slate-500">
                <span>CUSTOM JOINERY STUDY</span>
                <span>ADVITH INTERIORS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
