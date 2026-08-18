import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Compass, Layers, ArrowRight, PhoneCall } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const serviceList = [
  {
    icon: Building2,
    title: 'Civil & Commercial Construction',
    desc: 'Turnkey structural construction, reinforced framing, residential developments, and commercial complexes built to rigorous safety standards.',
    badge: 'Structural Engineering',
    bgClass: 'bg-red-50',
    textClass: 'text-red-500',
  },
  {
    icon: Compass,
    title: 'Architectural Design & Planning',
    desc: 'Modern 2D/3D elevations, structural blueprints, municipal zoning clearances, BIM modeling, and sustainable building layouts.',
    badge: 'Bespoke Architecture',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-500',
  },
  {
    icon: Layers,
    title: 'Luxury Turnkey Interiors',
    desc: 'Complete spatial transformation with custom woodwork, ambient lighting plans, false ceiling artistry, and premium finishings.',
    badge: 'Interior Artistry',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-500',
  },
]

export default function Services() {
  return (
    <div className="relative overflow-hidden py-20 lg:py-28">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Our Service Offerings</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
          >
            End-to-End Construction &amp; <br />
            <span className="text-red-600">Design Excellence</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
          >
            From foundation to final furnishing, Advith Projects delivers unified architectural,
            civil, and interior solutions. Full technical specifications and case studies will be
            unveiled in the upcoming release.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {serviceList.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.1, duration: 0.5, ease: EXPO }}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bgClass} ${service.textClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    {service.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          className="rounded-2xl bg-slate-900 p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EXPO }}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have a project in mind?</h3>
            <p className="text-sm text-slate-300">
              Get an estimate or discuss blueprints with our senior engineers.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-500/20 transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Enquire for Services</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
