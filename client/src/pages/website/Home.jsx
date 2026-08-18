import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Compass, Layers, ArrowRight } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

// Delay for hero content — gives the layoutId logo travel time to settle
const HERO_DELAY = 0.45

const services = [
  {
    icon: Building2,
    title: 'Construction',
    desc: 'Precision structural builds for commercial and residential properties.',
    bgClass: 'bg-red-50',
    textClass: 'text-red-500',
    link: '/services',
  },
  {
    icon: Compass,
    title: 'Architecture',
    desc: 'Bespoke architectural planning, elevation drawings, and 3D visualization.',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-500',
    link: '/services',
  },
  {
    icon: Layers,
    title: 'Interior Design',
    desc: 'Luxury turnkey interiors with curated materials and spatial artistry.',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-500',
    link: '/services',
  },
]

export default function Home() {
  return (
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
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-2xl shadow-lg transition-all"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 font-medium text-sm rounded-2xl transition-all bg-white hover:bg-red-50/30"
                >
                  Get a Quote
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-10 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_DELAY + 0.45, duration: 0.6, ease: EASE }}
              >
                {[
                  ['200+', 'Projects Done'],
                  ['15+', 'Years Experience'],
                  ['98%', 'Client Satisfaction'],
                ].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-slate-900">{num}</p>
                    <p className="text-xs text-slate-400 mt-0.5 tracking-wide">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — service cards with static Tailwind classes */}
            <div className="grid grid-cols-1 gap-4">
              {services.map(({ icon: Icon, bgClass, textClass, title, desc, link }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: HERO_DELAY + 0.35 + i * 0.1, duration: 0.6, ease: EXPO }}
                >
                  <Link
                    to={link}
                    className="group flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all block"
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} ${textClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
