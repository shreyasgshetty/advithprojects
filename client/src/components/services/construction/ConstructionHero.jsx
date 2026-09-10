import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, MessageCircle, Shield, Layers, HardHat } from 'lucide-react'
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
        className="absolute inset-0 pointer-events-none opacity-40"
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
          className="flex items-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-widest flex-wrap"
          aria-label="Breadcrumb"
          {...anim(0.05, 8)}
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" aria-hidden="true" />
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" aria-hidden="true" />
          <span className="text-red-400 font-semibold" aria-current="page">Civil Construction</span>
        </motion.nav>

        {/* Hero Grid: Left Content + Right Technical Specification Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7">
            {/* Technical Service Tag */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-700/60 text-red-400 font-mono text-xs uppercase tracking-wider mb-6"
              {...anim(0.1, 10)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>01 / Civil Construction Division</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
              {...anim(0.18, 16)}
            >
              Built with Precision.{' '}
              <span className="text-red-500 block sm:inline">Executed with Purpose.</span>
            </motion.h1>

            {/* Grounded Description from services.js */}
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

            {/* Metadata Badges */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 font-mono text-xs text-slate-400"
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
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Oversight</span>
                <span className="text-slate-200 font-medium">Site Supervision</span>
              </div>
            </motion.div>
          </div>

          {/* Right Technical Specification Dossier Card */}
          <motion.div
            className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative"
            {...anim(0.28, 16)}
          >
            {/* Header with technical tick marks */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
              <span className="text-red-400 font-semibold tracking-wider uppercase">Specification Dossier</span>
              <span>REF: AP-CIVIL-01</span>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-red-400" />
                  <span>Primary Project Typologies</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-light">
                  {service.atAGlance.bestFor.join(' · ')}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Core Execution Focus</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-light">
                  Structural accuracy, material verification, continuous site oversight, and coordinated milestone delivery.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <HardHat className="w-3.5 h-3.5 text-red-400" />
                  <span>Delivery Model</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-light">
                  Turnkey management from ground-breaking through structural framework and finishing to final client handover.
                </p>
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Site Operations
              </span>
              <span>Advith Projects</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
