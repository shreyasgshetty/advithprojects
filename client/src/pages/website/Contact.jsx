import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, CheckCircle2, ChevronRight,
  ArrowRight, Building2, Compass, Layers, AlertCircle,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay, ease: EXPO },
  }
}

// ── Multi-step form state ────────────────────────────────────────────────────
const INITIAL_FORM = {
  // Step 1
  name: '',
  email: '',
  phone: '',
  // Step 2
  service: '',
  projectType: '',
  budget: '',
  location: '',
  // Step 3
  message: '',
  timeline: '',
}

const STEPS = [
  { id: 1, title: 'Contact Details', desc: 'Tell us who you are' },
  { id: 2, title: 'Project Overview', desc: 'Describe your project' },
  { id: 3, title: 'Additional Details', desc: 'Timeline & brief' },
]

const SERVICE_OPTIONS = [
  { value: 'construction', label: 'Civil Construction', icon: Building2 },
  { value: 'architecture', label: 'Architecture', icon: Compass },
  { value: 'interiors', label: 'Interior Design', icon: Layers },
  { value: 'integrated', label: 'Integrated (Multiple)', icon: Building2 },
]

const BUDGET_OPTIONS = [
  { value: 'under-25', label: 'Under ₹25 Lakhs' },
  { value: '25-50', label: '₹25 – 50 Lakhs' },
  { value: '50-100', label: '₹50 Lakhs – 1 Crore' },
  { value: '1-2cr', label: '₹1 – 2 Crore' },
  { value: 'above-2cr', label: 'Above ₹2 Crore' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '3-months', label: 'Within 3 months' },
  { value: '6-months', label: 'Within 6 months' },
  { value: '6-plus', label: 'More than 6 months away' },
  { value: 'exploring', label: 'Just exploring for now' },
]

function FieldWrapper({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}

function InputField({ id, type = 'text', placeholder, value, onChange, error }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-red-400 ${
        error ? 'border-red-300 bg-red-50/30' : 'border-slate-200 hover:border-slate-300 focus:border-red-400'
      }`}
    />
  )
}

function TextAreaField({ id, placeholder, value, onChange, error, rows = 5 }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-white resize-none transition-all focus:outline-none focus:ring-2 focus:ring-red-400 ${
        error ? 'border-red-300 bg-red-50/30' : 'border-slate-200 hover:border-slate-300 focus:border-red-400'
      }`}
    />
  )
}

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const Icon = opt.icon
        return (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all text-sm ${
              value === opt.value
                ? 'border-red-500 bg-red-50 text-red-700 font-semibold shadow-sm shadow-red-100'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            {opt.label}
          </label>
        )
      })}
    </div>
  )
}

function SelectField({ id, options, value, onChange, placeholder, error }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-red-400 ${
        error ? 'border-red-300' : 'border-slate-200 hover:border-slate-300 focus:border-red-400'
      } ${!value ? 'text-slate-400' : ''}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

function validateStep(step, form) {
  const errors = {}
  if (step === 1) {
    if (!form.name.trim()) errors.name = 'Your name is required'
    if (!form.email.trim()) errors.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email'
    if (form.phone && !/^[0-9+\- ]{7,15}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number'
  }
  if (step === 2) {
    if (!form.service) errors.service = 'Please select a service'
    if (!form.location.trim()) errors.location = 'Project location is required'
  }
  if (step === 3) {
    if (!form.message.trim() || form.message.trim().length < 20) errors.message = 'Please describe your project (at least 20 characters)'
  }
  return errors
}

function ContactForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: typeof e === 'string' ? e : e.target.value }))

  const next = () => {
    const errs = validateStep(step, form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setErrors({})
    setStep((s) => s - 1)
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validateStep(3, form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EXPO }}
      >
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Enquiry Received</h3>
        <p className="text-slate-500 mb-2 text-sm">
          Thank you, <strong>{form.name}</strong>. We have received your project brief.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Our team will review your enquiry and be in touch at <strong>{form.email}</strong> within 1–2 business days.
        </p>
        <button
          onClick={() => { setForm(INITIAL_FORM); setStep(1); setSubmitted(false) }}
          className="text-sm text-red-600 hover:underline font-medium"
        >
          Submit another enquiry
        </button>
        <p className="text-xs text-slate-300 mt-8">
          Note: This form does not currently transmit data — backend integration coming soon.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-0 mb-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                step > s.id ? 'bg-emerald-500 text-white' :
                step === s.id ? 'bg-red-600 text-white ring-4 ring-red-100' :
                'bg-slate-100 text-slate-400'
              }`}>
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-all ${step > s.id ? 'bg-emerald-400' : 'bg-slate-100'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          Step {step} of {STEPS.length} — <span className="text-slate-600 font-medium">{STEPS[step - 1].title}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: EXPO }}
          >
            <FieldWrapper label="Your Full Name *" error={errors.name}>
              <InputField id="name" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={update('name')} error={errors.name} />
            </FieldWrapper>
            <FieldWrapper label="Email Address *" error={errors.email}>
              <InputField id="email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} error={errors.email} />
            </FieldWrapper>
            <FieldWrapper label="Phone Number (optional)" error={errors.phone}>
              <InputField id="phone" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={update('phone')} error={errors.phone} />
            </FieldWrapper>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: EXPO }}
          >
            <FieldWrapper label="Service Required *" error={errors.service}>
              <RadioGroup
                name="service"
                options={SERVICE_OPTIONS}
                value={form.service}
                onChange={(v) => setForm((prev) => ({ ...prev, service: v }))}
              />
              {errors.service && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.service}</p>}
            </FieldWrapper>

            <FieldWrapper label="Project Type" error={errors.projectType}>
              <InputField
                id="projectType"
                placeholder="e.g. 4BHK Villa, Office Space, Restaurant Interior"
                value={form.projectType}
                onChange={update('projectType')}
              />
            </FieldWrapper>

            <FieldWrapper label="Project Location *" error={errors.location}>
              <InputField id="location" placeholder="e.g. Bangalore, Karnataka" value={form.location} onChange={update('location')} error={errors.location} />
            </FieldWrapper>

            <FieldWrapper label="Approximate Budget">
              <SelectField
                id="budget"
                options={BUDGET_OPTIONS}
                value={form.budget}
                onChange={update('budget')}
                placeholder="Select a budget range"
              />
            </FieldWrapper>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: EXPO }}
          >
            <FieldWrapper label="Project Brief *" error={errors.message}>
              <TextAreaField
                id="message"
                placeholder="Describe your project — requirements, scope, site details, and any design aspirations. The more detail you share, the better we can respond."
                value={form.message}
                onChange={update('message')}
                error={errors.message}
                rows={6}
              />
            </FieldWrapper>

            <FieldWrapper label="Expected Timeline">
              <SelectField
                id="timeline"
                options={TIMELINE_OPTIONS}
                value={form.timeline}
                onChange={update('timeline')}
                placeholder="When are you looking to start?"
              />
            </FieldWrapper>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-400">
              By submitting this form you agree to be contacted by Advith Projects regarding your enquiry. 
              We do not share your information with third parties.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex-1 px-5 py-3.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-500/20"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-red-500/20"
          >
            Submit Enquiry
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  )
}

// ── Contact Info ───────────────────────────────────────────────────────────────
function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Get In Touch</p>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
          Let's talk about your project.
        </h2>
        <p className="text-slate-500 text-base leading-relaxed">
          Fill in the enquiry form with details about your project brief. We'll review your requirements and be in touch within 1–2 business days.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { icon: MapPin, label: 'Location', value: 'Karnataka, India', sub: 'Serving Bangalore, Mysore, Hubli & surrounding regions' },
          { icon: Phone, label: 'Phone', value: 'Available on request', sub: 'Provided on initial enquiry confirmation' },
          { icon: Mail, label: 'Email', value: 'enquiries@advithprojects.in', sub: 'We respond within 1–2 business days' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-6 bg-slate-900 rounded-2xl space-y-3">
        <p className="text-sm font-bold text-white">Our Services</p>
        <div className="flex flex-wrap gap-2">
          {['Civil Construction', 'Architecture', 'Interior Design', 'Turnkey'].map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">{s}</span>
          ))}
        </div>
        <Link
          to="/services"
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 mt-2 font-medium"
        >
          Explore all services <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <div className="antialiased">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-800/40 bg-red-900/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Enquire Now
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: EXPO }}
          >
            Start Your Project.
          </motion.h1>
          <motion.p
            className="text-lg text-slate-300 font-light max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EXPO }}
          >
            Share your brief and we'll be in touch to discuss how we can help.
          </motion.p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-start">
            {/* Form */}
            <motion.div
              className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-1">Project Enquiry</h2>
              <p className="text-sm text-slate-400 mb-8">Complete all three steps to submit your brief.</p>
              <ContactForm />
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              className="lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust indicators ─────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Our Commitments</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: 'Prompt Response', desc: 'We review all enquiries and respond within 1–2 business days.' },
              { title: 'Confidentiality', desc: 'Your project details and contact information are kept strictly confidential.' },
              { title: 'No-obligation', desc: 'Initial consultations are exploratory — no commitment required.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: EXPO }}
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
