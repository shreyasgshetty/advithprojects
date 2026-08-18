import { motion } from 'framer-motion'
import { Building2, Compass, Layers, ArrowRight, PhoneCall } from 'lucide-react'
import logoImg from '../../assets/logo.png'

const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

// Delay for hero content — gives the layoutId logo travel time to settle
const HERO_DELAY = 0.45

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">

      {/* ──────────────── NAVBAR ──────────────── */}
      {/*
        The navbar has two layers so the logo is NOT obscured by the
        navbar background fade-in animation — critical for layoutId handoff.
      */}
      <header className="sticky top-0 z-40">
        {/* Navbar background fades in AFTER logo lands */}
        <motion.div
          className="absolute inset-0 bg-white/90 backdrop-blur-lg border-b border-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

          {/*
            SHARED LOGO — layoutId="advith-logo" makes Framer Motion animate
            this element from where the intro logo was (centered, large) to
            its natural position here (top-left, h-12). Fully responsive
            because Framer Motion uses actual DOM measurements.
          */}
          <motion.img
            layoutId="advith-logo"
            src={logoImg}
            alt="Advith Projects"
            className="h-12 w-auto object-contain"
            // layoutId handles the entrance; only provide the layout transition
            transition={{ type: 'spring', stiffness: 280, damping: 32, mass: 1 }}
          />

          {/* Nav links — staggered fade in after logo settles */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {['Services', 'Projects', 'About', 'Contact'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-red-600 transition-colors duration-200"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.45, ease: EXPO }}
              >
                {link}
              </motion.a>
            ))}
          </nav>

          {/* CTA — appears last */}
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-red-500/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.45, ease: EXPO }}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Enquire Now
          </motion.button>
        </div>
      </header>

      {/* ──────────────── HERO ──────────────── */}
      <main>
        <section className="relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {/* Warm red orb */}
          <div
            className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 65%)' }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-28 lg:pt-32 lg:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* LEFT — text content */}
              <div className="space-y-7">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: HERO_DELAY, duration: 0.6, ease: EXPO }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Architecture &amp; Interiors
                </motion.div>

                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-slate-900"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: HERO_DELAY + 0.1, duration: 0.7, ease: EXPO }}
                >
                  We Build the <br />
                  <span className="text-red-600">Spaces</span> You Dream Of.
                </motion.h1>

                <motion.p
                  className="text-lg text-slate-500 font-light leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: HERO_DELAY + 0.2, duration: 0.65, ease: EXPO }}
                >
                  From structural precision to interior elegance — Advith Projects brings your
                  vision to life with craftsmanship that endures.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 pt-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: HERO_DELAY + 0.3, duration: 0.6, ease: EXPO }}
                >
                  <button className="group flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-2xl shadow-lg transition-all">
                    Explore Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 font-medium text-sm rounded-2xl transition-all bg-white hover:bg-red-50/30">
                    Get a Quote
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="flex gap-10 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: HERO_DELAY + 0.45, duration: 0.6, ease: EASE }}
                >
                  {[['200+', 'Projects Done'], ['15+', 'Years Experience'], ['98%', 'Client Satisfaction']].map(
                    ([num, label]) => (
                      <div key={label}>
                        <p className="text-2xl font-bold text-slate-900">{num}</p>
                        <p className="text-xs text-slate-400 mt-0.5 tracking-wide">{label}</p>
                      </div>
                    )
                  )}
                </motion.div>
              </div>

              {/* RIGHT — service cards (staggered) */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Building2 className="w-6 h-6" />, color: 'red',   title: 'Construction',   desc: 'Precision structural builds for commercial and residential properties.' },
                  { icon: <Compass   className="w-6 h-6" />, color: 'amber', title: 'Architecture',   desc: 'Bespoke architectural planning, elevation drawings, and 3D visualization.' },
                  { icon: <Layers    className="w-6 h-6" />, color: 'rose',  title: 'Interior Design', desc: 'Luxury turnkey interiors with curated materials and spatial artistry.' },
                ].map(({ icon, color, title, desc }, i) => (
                  <motion.div
                    key={title}
                    className="group flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-default"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: HERO_DELAY + 0.35 + i * 0.1, duration: 0.6, ease: EXPO }}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-50 text-${color}-500`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Advith Projects. All rights reserved.</p>
          <p className="uppercase tracking-widest">Construction · Architecture · Interior Design</p>
        </div>
      </footer>
    </div>
  )
}
