import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const contactCards = [
  {
    icon: Phone,
    title: 'Direct Phone',
    value: '+91 8277339115',
    action: 'tel:+918277339115',
    actionText: 'Call Now',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
  },
  {
    icon: Mail,
    title: 'Email Enquiries',
    value: 'advithprojects@gmail.com',
    action: 'mailto:advithprojects@gmail.com',
    actionText: 'Send Email',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
  },
  {
    icon: MapPin,
    title: 'Office Location',
    value: 'Karnataka, India',
    action: '#',
    actionText: 'Headquarters',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-600',
  },
]

export default function Contact() {
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

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
          >
            Let&apos;s Discuss Your <br />
            <span className="text-red-600">Next Project</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-600 font-light leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EXPO }}
          >
            Reach out directly for civil builds, architectural planning, interior design,
            and cost estimation consultations.
          </motion.p>
        </div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {contactCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: EXPO }}
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.bgClass} ${card.textClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-800 break-words">{card.value}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-50">
                  {card.action.startsWith('#') ? (
                    <span className="text-xs font-medium text-slate-400">
                      {card.actionText}
                    </span>
                  ) : (
                    <a
                      href={card.action}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Informational notification banner */}
        <motion.div
          className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 backdrop-blur-sm max-w-2xl mx-auto text-sm text-slate-500 space-y-2"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6, ease: EXPO }}
        >
          <p className="font-semibold text-slate-800">
            Interactive Enquiry &amp; Quotation Form
          </p>
          <p>
            An interactive lead submission form and automated estimate calculator will be enabled in
            the upcoming release.
          </p>
        </motion.div>

        {/* Return / Navigation */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EXPO }}
        >
          <a
            href="tel:+918277339115"
            className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-red-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 8277339115</span>
          </a>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm rounded-xl transition-all bg-white"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
