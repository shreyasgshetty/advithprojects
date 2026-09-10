import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../../../config/contact'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionHero({ service }) {
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

      {/* Atmospheric Engineering Glow */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)' }}
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
          <span className="text-red-400 font-semibold" aria-current="page">Civil Construction</span>
        </motion.nav>

        {/* Hero Grid: Left Content + Right Architectural CAD Linework Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Editorial Content */}
          <div className="lg:col-span-7">
            {/* Technical Service Tag */}


            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
              {...anim(0.18, 16)}
            >
              Built with Precision.{' '}
              <span className="text-red-500 block sm:inline">Executed with Purpose.</span>
            </motion.h1>

            {/* Description directly from services.js */}
            <motion.p
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-8"
              {...anim(0.26, 14)}
            >
              {service.heroDescription}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div className="flex flex-wrap gap-4 items-center mb-10" {...anim(0.34, 12)}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="#scope"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all hover:bg-slate-800/40"
              >
                <span>Explore Execution Scope</span>
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

            {/* Technical Metadata Chips */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 font-mono text-xs text-slate-400"
              {...anim(0.42, 10)}
            >
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Category</span>
                <span className="text-slate-200 font-medium">Civil & Structural</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Scope</span>
                <span className="text-slate-200 font-medium">Turnkey & Structure</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Process</span>
                <span className="text-slate-200 font-medium">7-Stage Phased</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Supervision</span>
                <span className="text-slate-200 font-medium">On-Site Oversight</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Authentic Architectural Drafting Linework Composition (No empty UI card) */}
          <motion.div
            className="lg:col-span-5 relative select-none flex items-center justify-center"
            {...anim(0.28, 16)}
            aria-hidden="true"
          >
            {/* Architectural Linework Canvas */}
            <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-slate-800/80 bg-slate-950/40 p-6 overflow-hidden flex flex-col justify-between">
              {/* Draftsman Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Top CAD Header Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] font-mono text-slate-400">
                <span className="text-red-400 font-semibold tracking-wider">STRUCTURAL ELEVATION // DWG-01</span>
                <span>SCALE 1:100</span>
              </div>

              {/* Center Structural Blueprint Linework */}
              <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 320 180"
                  className="w-full h-full text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  {/* Datum Level Lines */}
                  <line x1="30" y1="30" x2="290" y2="30" stroke="#334155" strokeDasharray="3 3" />
                  <text x="295" y="33" fill="#64748B" fontSize="7" fontFamily="monospace">+6.40 ROOF</text>

                  <line x1="30" y1="80" x2="290" y2="80" stroke="#334155" strokeDasharray="3 3" />
                  <text x="295" y="83" fill="#64748B" fontSize="7" fontFamily="monospace">+3.20 FIRST</text>

                  <line x1="30" y1="130" x2="290" y2="130" stroke="#DC2626" strokeWidth="1.2" />
                  <text x="295" y="133" fill="#DC2626" fontSize="7" fontFamily="monospace">±0.00 PLINTH</text>

                  <line x1="30" y1="165" x2="290" y2="165" stroke="#334155" strokeDasharray="3 3" />
                  <text x="295" y="168" fill="#64748B" fontSize="7" fontFamily="monospace">-1.50 FTG</text>

                  {/* Structural Columns & Framing */}
                  {/* Grid Line 1 */}
                  <line x1="70" y1="20" x2="70" y2="170" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.8" />
                  <rect x="66" y="30" width="8" height="100" fill="rgba(2,132,199,0.1)" stroke="#0284C7" strokeWidth="1" />
                  <rect x="58" y="155" width="24" height="10" fill="none" stroke="#64748B" strokeWidth="1" />
                  <circle cx="70" cy="15" r="4" stroke="#64748B" fill="#0B0F17" />
                  <text x="68" y="17" fill="#CBD5E1" fontSize="6" fontFamily="monospace">A</text>

                  {/* Grid Line 2 */}
                  <line x1="160" y1="20" x2="160" y2="170" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.8" />
                  <rect x="156" y="30" width="8" height="100" fill="rgba(2,132,199,0.1)" stroke="#0284C7" strokeWidth="1" />
                  <rect x="148" y="155" width="24" height="10" fill="none" stroke="#64748B" strokeWidth="1" />
                  <circle cx="160" cy="15" r="4" stroke="#64748B" fill="#0B0F17" />
                  <text x="158" y="17" fill="#CBD5E1" fontSize="6" fontFamily="monospace">B</text>

                  {/* Grid Line 3 */}
                  <line x1="250" y1="20" x2="250" y2="170" stroke="#0284C7" strokeWidth="1.2" strokeOpacity="0.8" />
                  <rect x="246" y="30" width="8" height="100" fill="rgba(2,132,199,0.1)" stroke="#0284C7" strokeWidth="1" />
                  <rect x="238" y="155" width="24" height="10" fill="none" stroke="#64748B" strokeWidth="1" />
                  <circle cx="250" cy="15" r="4" stroke="#64748B" fill="#0B0F17" />
                  <text x="248" y="17" fill="#CBD5E1" fontSize="6" fontFamily="monospace">C</text>

                  {/* Slabs & Tie Beams */}
                  <rect x="66" y="27" width="188" height="6" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
                  <rect x="66" y="77" width="188" height="6" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
                  <rect x="66" y="127" width="188" height="6" fill="#1E293B" stroke="#DC2626" strokeWidth="1" />

                  {/* Dimension Callouts */}
                  <line x1="70" y1="178" x2="160" y2="178" stroke="#475569" strokeWidth="0.8" markerStart="url(#tick)" markerEnd="url(#tick)" />
                  <text x="105" y="176" fill="#94A3B8" fontSize="6" fontFamily="monospace">4.50m</text>

                  <line x1="160" y1="178" x2="250" y2="178" stroke="#475569" strokeWidth="0.8" />
                  <text x="195" y="176" fill="#94A3B8" fontSize="6" fontFamily="monospace">4.50m</text>
                </svg>
              </div>

              {/* Bottom CAD Metadata Bar */}
              <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-2 text-[9px] font-mono text-slate-500">
                <span>PROJECT: ADVITH RESIDENTIAL</span>
                <span>STATUS: VERIFIED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
