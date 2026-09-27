import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail, MessageSquare } from 'lucide-react'
import { PHONE_DISPLAY, EMAIL, TEL_URL, MAILTO_URL, WHATSAPP_URL } from '../../config/contact'

const EXPO = [0.16, 1, 0.3, 1]

function HomeCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 lg:py-32 bg-[#0B1220] text-white overflow-hidden select-none border-t border-slate-800">
      {/* Drafting Grid & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono font-semibold uppercase tracking-widest text-red-400 mb-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>START A PROJECT WITH ADVITH</span>
        </motion.div>

        {/* Main Statement */}
        <motion.h2
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}
        >
          Have a project in mind?
        </motion.h2>

        <motion.p
          className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EXPO }}
        >
          Bring us your initial brief. Whether it is an independent residence, commercial building, or
          turnkey interior fit-out, we will help take it from concept to precision execution.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-red-600/30 transition-all duration-200"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 rounded-lg transition-all duration-200"
          >
            <span>EXPLORE OUR WORK</span>
          </Link>
        </motion.div>

        {/* Direct Contact Metadata Channels */}
        <motion.div
          className="pt-10 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EXPO }}
        >
          <a
            href={TEL_URL}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>{PHONE_DISPLAY}</span>
          </a>

          <span className="text-slate-700 hidden sm:inline">·</span>

          <a
            href={MAILTO_URL}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span>{EMAIL}</span>
          </a>

          <span className="text-slate-700 hidden sm:inline">·</span>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WHATSAPP DIRECT</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(HomeCTA)
