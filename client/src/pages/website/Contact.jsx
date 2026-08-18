import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Phone, MessageCircle, Mail, CheckCircle2, AlertCircle,
  MapPin, ArrowRight, Send,
} from 'lucide-react'
import {
  PHONE_DISPLAY, TEL_URL, WHATSAPP_URL, EMAIL, MAILTO_URL,
} from '../../config/contact'

// ─── Shared easing ────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1]

// ─── Scroll-reveal helper ─────────────────────────────────────────────────────
function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay, ease: EXPO },
  }
}

// ─── Shared input classname helper ────────────────────────────────────────────
function inputCls(hasError) {
  return [
    'w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900',
    'placeholder-slate-400 bg-white transition-all',
    'focus:outline-none focus:ring-2 focus:ring-red-400/40 focus:border-red-400',
    hasError
      ? 'border-red-300 bg-red-50/30'
      : 'border-slate-200 hover:border-slate-300',
  ].join(' ')
}

// ─── EmailJS constants (from Vite env vars) ───────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function SignalPulse() {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.6 }}
    >
      <div className="relative shrink-0">
        <span className="block w-2.5 h-2.5 rounded-full bg-red-500" />
        <motion.span
          className="absolute inset-0 rounded-full bg-red-400"
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <svg width="64" height="2" className="overflow-visible" aria-hidden="true">
        <motion.line
          x1="0" y1="1" x2="64" y2="1"
          stroke="rgba(239,68,68,0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EXPO }}
        />
      </svg>
      <motion.span
        className="block w-1.5 h-1.5 rounded-full bg-red-300"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.div>
  )
}

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-10 lg:pt-24 lg:pb-14">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Subtle red glow top-right */}
      <div
        className="absolute -top-24 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <SignalPulse />

        <motion.p
          className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          Get in Touch
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.08] tracking-tight mb-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65, ease: EXPO }}
        >
          {"Ready to Bring Your Space to Life?"}<br />
          <span className="text-red-600">Let's Talk</span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-500 font-light leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: EXPO }}
        >
          Whether you have a project in mind, a question about our services, or simply
          want to learn more — we are here to listen and help.
        </motion.p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. QUICK CONNECT DOCK
// ─────────────────────────────────────────────────────────────────────────────
const CONNECT_METHODS = [
  {
    id: 'call',
    Icon: Phone,
    label: 'Call Us',
    sub: 'Speak directly with our team',
    contactPerson: 'Puneeth',
    detail: PHONE_DISPLAY,
    href: TEL_URL,
    external: false,
    mobileBg: 'bg-red-50/35',
    mobileIconBg: 'bg-red-100/70 text-red-600 border-red-200/60',
  },
  {
    id: 'whatsapp',
    Icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Chat with us about your project',
    contactPerson: 'Puneeth',
    detail: PHONE_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
    mobileBg: 'bg-emerald-50/35',
    mobileIconBg: 'bg-emerald-100/70 text-emerald-600 border-emerald-200/60',
  },
  {
    id: 'email',
    Icon: Mail,
    label: 'Email Us',
    sub: 'Send us your requirements anytime',
    contactPerson: null,
    detail: EMAIL,
    href: MAILTO_URL,
    external: false,
    mobileBg: 'bg-blue-50/35',
    mobileIconBg: 'bg-blue-100/70 text-blue-600 border-blue-200/60',
  },
]

function QuickConnectDock() {
  return (
    <section className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EXPO }}
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Direct Access
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Connect With Puneeth
          </h2>
          <p className="text-sm text-slate-500 font-light">
            Choose the way that works best for you.
          </p>
        </motion.div>

        {/* Connected Architectural Dock Container */}
        <motion.div
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm shadow-slate-100/70 overflow-hidden relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EXPO }}
        >
          {/* Subtle architectural top accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent absolute top-0 inset-x-0" />

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70 sm:divide-slate-100">
            {CONNECT_METHODS.map((method, i) => {
              const Icon = method.Icon
              return (
                <motion.a
                  key={method.id}
                  href={method.href}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className={`group relative flex flex-col justify-between p-6 sm:p-8 ${method.mobileBg} sm:bg-white sm:hover:bg-slate-50/50 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:z-10`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EXPO }}
                  whileTap={{ scale: 0.985 }}
                >
                  {/* Red Active Indicator Bar on desktop hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 sm:group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  {/* Top Row: Icon + Arrow Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-2xs sm:shadow-none ${method.mobileIconBg} sm:bg-slate-50 sm:text-slate-700 sm:border-slate-100 sm:group-hover:bg-red-50 sm:group-hover:text-red-600 sm:group-hover:border-red-100`}>
                      <Icon className="w-5 h-5 transition-transform duration-300 sm:group-hover:scale-105" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 bg-white/70 border border-slate-200/50 shadow-2xs sm:bg-transparent sm:border-transparent sm:shadow-none sm:text-slate-300 sm:group-hover:text-red-600 sm:group-hover:bg-red-50 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 sm:group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="space-y-1.5">
                    <p className="text-base font-bold text-slate-900 sm:group-hover:text-red-600 transition-colors duration-200">
                      {method.label}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {method.sub}
                    </p>
                  </div>

                  {/* Detail / Contact Value */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60 sm:border-slate-100">
                    {method.contactPerson && (
                      <p className="text-[11px] font-medium text-slate-400 mb-0.5">
                        {method.contactPerson}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-slate-800 sm:group-hover:text-red-600 transition-colors duration-200 truncate">
                      {method.detail}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// 3. CONTACT FORM (EmailJS)
// ─────────────────────────────────────────────────────────────────────────────
const PREF_METHODS = [
  { value: 'Phone Call', label: 'Phone Call' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Email', label: 'Email' },
]

const INITIAL_FORM = { name: '', phone: '', email: '', contactMethod: 'Email', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  else if (!/^[0-9+\-\s]{7,20}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = 'Please describe your requirements (at least 10 characters)'
  return errors
}

function FieldError({ msg }) {
  if (!msg) return null
  return (
    <motion.p
      className="text-xs text-red-500 flex items-center gap-1 mt-1.5"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AlertCircle className="w-3 h-3 shrink-0" />
      {msg}
    </motion.p>
  )
}

function ContactForm() {
  const formRef = useRef(null)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        // Dev mode: simulate send
        await new Promise((r) => setTimeout(r, 1200))
        setStatus('success')
        return
      }
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          from_phone: form.phone,
          contact_method: form.contactMethod,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center text-center py-12 px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EXPO }}
      >
        <div className="relative w-20 h-20 mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-emerald-200"
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Your message is on its way.</h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-2">
          Thank you for reaching out to Advith Projects. We will review your message and get back to you shortly.
        </p>
        <p className="text-xs text-slate-400 mb-8">
          {"We'll respond to "}<strong>{form.email}</strong>{` or reach you by ${form.contactMethod}.`}
        </p>
        <button
          onClick={() => { setForm(INITIAL_FORM); setStatus('idle') }}
          className="text-sm text-red-600 hover:text-red-700 font-medium underline-offset-2 hover:underline transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  const isSending = status === 'sending'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChange={update('name')}
          disabled={isSending}
          className={inputCls(errors.name)}
        />
        <FieldError msg={errors.name} />
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={update('phone')}
            disabled={isSending}
            className={inputCls(errors.phone)}
          />
          <FieldError msg={errors.phone} />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update('email')}
            disabled={isSending}
            className={inputCls(errors.email)}
          />
          <FieldError msg={errors.email} />
        </div>
      </div>

      {/* Preferred contact method */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Preferred Contact Method
        </label>
        <div className="flex gap-2 flex-wrap">
          {PREF_METHODS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setForm((p) => ({ ...p, contactMethod: m.value }))}
              disabled={isSending}
              className={[
                'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                form.contactMethod === m.value
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300',
              ].join(' ')}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Message / Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell us about your project — the type of space, approximate area, location, and any specific requirements."
          value={form.message}
          onChange={update('message')}
          disabled={isSending}
          className={`${inputCls(errors.message)} resize-none`}
        />
        <FieldError msg={errors.message} />
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Something went wrong. Please try again or contact us directly by phone.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSending}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-500/20"
        whileTap={{ scale: 0.98 }}
      >
        {isSending ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            Sending
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </motion.button>

      <p className="text-xs text-center text-slate-400 leading-relaxed">
        By submitting, you agree to be contacted by Advith Projects. We do not share your information with third parties.
      </p>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WHERE WE WORK — Architectural City Diagram
// ─────────────────────────────────────────────────────────────────────────────
const CITIES = [
  { id: 'bengaluru', label: 'Bengaluru', sub: 'Primary base of operations', cx: 70, cy: 50 },
  { id: 'mysuru', label: 'Mysuru', sub: 'Residential and heritage projects', cx: 50, cy: 80 },
  { id: 'hassan', label: 'Hassan', sub: 'Residential design commissions', cx: 28, cy: 50 },
  { id: 'chikkamagaluru', label: 'Chikkamagaluru', sub: 'Architecture and hospitality projects', cx: 28, cy: 20 },
]

const CITY_EDGES = [
  ['bengaluru', 'mysuru'],
  ['bengaluru', 'hassan'],
  ['hassan', 'chikkamagaluru'],
  ['hassan', 'mysuru'],
]

function getCityById(id) { return CITIES.find((c) => c.id === id) }
function cityPos(city, W, H) { return { x: (city.cx / 100) * W, y: (city.cy / 100) * H } }

function WhereWeWork() {
  const [activeCity, setActiveCity] = useState(null)
  const W = 480
  const H = 300
  const R = 9

  const activeData = activeCity ? getCityById(activeCity) : null

  const toggle = (id) => setActiveCity((prev) => (prev === id ? null : id))

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-14" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Coverage</p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">Where We Work</h2>
          <p className="text-slate-500 leading-relaxed max-w-md">Bringing ideas to life across Karnataka.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
          {/* SVG Diagram */}
          <motion.div
            className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-4 sm:p-8"
            {...rev(0.1)}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full relative z-10"
              style={{ maxHeight: 300 }}
              aria-label="Cities where Advith Projects operates across Karnataka"
            >
              {/* Edges */}
              {CITY_EDGES.map(([aId, bId]) => {
                const a = cityPos(getCityById(aId), W, H)
                const b = cityPos(getCityById(bId), W, H)
                const isActive = activeCity === aId || activeCity === bId
                return (
                  <g key={`${aId}-${bId}`}>
                    <motion.line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      strokeDasharray="5 5"
                      animate={{
                        stroke: isActive ? 'rgba(239,68,68,0.4)' : 'rgba(15,23,42,0.1)',
                        strokeWidth: isActive ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                    {isActive && (
                      <motion.line
                        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke="rgba(239,68,68,0.7)"
                        strokeWidth="2"
                        strokeDasharray="8 40"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -120 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </g>
                )
              })}

              {/* Nodes */}
              {CITIES.map((city) => {
                const { x, y } = cityPos(city, W, H)
                const isActive = activeCity === city.id
                const isNeighbour =
                  !isActive &&
                  activeCity &&
                  CITY_EDGES.some(
                    ([a, b]) =>
                      (a === activeCity && b === city.id) ||
                      (b === activeCity && a === city.id),
                  )

                return (
                  <g
                    key={city.id}
                    className="cursor-pointer"
                    onClick={() => toggle(city.id)}
                    onMouseEnter={() => setActiveCity(city.id)}
                    onMouseLeave={() => setActiveCity(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={city.label}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') toggle(city.id)
                    }}
                  >
                    {/* Pulse ring */}
                    {isActive && (
                      <motion.circle
                        cx={x} cy={y} r={R + 8}
                        fill="none"
                        stroke="rgba(239,68,68,0.25)"
                        strokeWidth="1.5"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                    {/* Outer ring */}
                    <motion.circle
                      cx={x} cy={y} r={R + 4}
                      fill="white"
                      animate={{
                        stroke: isActive
                          ? 'rgba(239,68,68,0.3)'
                          : isNeighbour ? 'rgba(239,68,68,0.15)' : 'rgba(15,23,42,0.07)',
                        strokeWidth: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Inner dot */}
                    <motion.circle
                      cx={x} cy={y} r={R}
                      animate={{
                        fill: isActive
                          ? 'rgb(220,38,38)'
                          : isNeighbour ? 'rgb(252,165,165)' : 'rgb(203,213,225)',
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Label */}
                    <text
                      x={city.cx > 50 ? x + R + 8 : x - R - 8}
                      y={y}
                      textAnchor={city.cx > 50 ? 'start' : 'end'}
                      dominantBaseline="middle"
                      fill={isActive ? 'rgb(127,29,29)' : 'rgb(51,65,85)'}
                      fontSize="11"
                      fontWeight={isActive ? '700' : '500'}
                      style={{ userSelect: 'none', pointerEvents: 'none', fontFamily: 'inherit' }}
                    >
                      {city.label}
                    </text>
                  </g>
                )
              })}
            </svg>

            <p className="text-center text-xs text-slate-300 mt-2 relative z-10 select-none">
              Tap or hover a city to learn more
            </p>
          </motion.div>

          {/* Info panel + city list */}
          <motion.div className="lg:w-64 space-y-3" {...rev(0.2)}>
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div
                  key={activeData.id}
                  className="p-5 bg-white rounded-2xl border border-red-100 shadow-sm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: EXPO }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <p className="text-sm font-bold text-slate-900">{activeData.label}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{activeData.sub}</p>
                  <p className="text-xs text-red-500 font-semibold mt-3">Services Available</p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hover or tap a city to see details.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => toggle(city.id)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm',
                    activeCity === city.id
                      ? 'bg-red-50 border-red-100 text-red-700'
                      : 'bg-white border-slate-100 text-slate-700 hover:border-slate-200',
                  ].join(' ')}
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${activeCity === city.id ? 'text-red-500' : 'text-slate-400'}`} />
                  <span className="font-medium">{city.label}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {"Don't see your location? "}
              <a href={MAILTO_URL} className="text-red-500 hover:underline font-medium">
                Get in touch
              </a>
              {" to discuss your project."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MAIN CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div className="antialiased">
      {/* Hero */}
      <ContactHero />

      {/* Quick Connect */}
      <QuickConnectDock />

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-slate-100" />
      </div>

      {/* Contact Form + Sidebar */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 items-start">

            {/* Form card */}
            <motion.div
              className="bg-white border border-slate-100 rounded-2xl shadow-sm p-7 sm:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Send a Message</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell us about your project.</h2>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Fill in the form below and we will get back to in some time.
              </p>
              <ContactForm />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:sticky lg:top-28 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
            >
              {/* What to expect */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">What to Expect</p>
                <ul className="space-y-3">
                  {[
                    'We review all messages and respond within 1 to 2 business days.',
                    'Initial consultation is exploratory — no commitment required.',
                    'Your project details stay strictly confidential.',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct contact */}
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Direct Contact</p>
                {[
                  { Icon: Phone, text: PHONE_DISPLAY, href: TEL_URL, label: 'Phone', external: false },
                  { Icon: MessageCircle, text: 'WhatsApp', href: WHATSAPP_URL, label: 'WhatsApp', external: true },
                  { Icon: Mail, text: EMAIL, href: MAILTO_URL, label: 'Email', external: false },
                ].map(({ Icon, text, href, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-red-600 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-all border border-slate-100 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium truncate">{text}</span>
                  </a>
                ))}
              </div>

              {/* Services */}
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Our Services</p>
                {[
                  { label: 'Civil Construction', path: '/services/construction' },
                  { label: 'Architecture', path: '/services/architecture' },
                  { label: 'Interior Design', path: '/services/interiors' },
                ].map(({ label, path }) => (
                  <a
                    key={label}
                    href={path}
                    className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0 text-sm text-white/70 hover:text-white transition-colors group"
                  >
                    {label}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <WhereWeWork />
    </div>
  )
}
