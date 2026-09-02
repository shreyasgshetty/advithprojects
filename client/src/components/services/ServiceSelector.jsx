import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Home,
  Compass,
  Layers,
  Wrench,
  Building2,
  Paintbrush,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react'
import { WHATSAPP_URL } from '../../config/contact'
import { services } from '../../data/services'

const EXPO = [0.16, 1, 0.3, 1]

/**
 * Selector option data — drives the recommendation logic.
 * Each option maps to one or more service slugs from services.js.
 * Adding a new option here requires no JSX changes.
 */
const SELECTOR_OPTIONS = [
  {
    id: 'build-home',
    label: 'Build a new home',
    sub: 'Ground-up residential construction',
    Icon: Home,
    recommended: ['architecture', 'construction'],
    note: 'Architecture handles design and planning. Construction manages the structural build from foundation to handover.',
  },
  {
    id: 'design-home',
    label: 'Design a home',
    sub: 'Architectural planning and visualization',
    Icon: Compass,
    recommended: ['architecture'],
    note: 'Architecture covers concept, floor plans, elevations, 3D visualization, and complete construction documents.',
  },
  {
    id: 'redesign-interiors',
    label: 'Redesign interiors',
    sub: 'Transform your living or work spaces',
    Icon: Layers,
    recommended: ['interiors'],
    note: 'Interior Design covers space planning, materials, furniture, lighting, and full turnkey execution.',
  },
  {
    id: 'renovate',
    label: 'Renovate a property',
    sub: 'Structural and aesthetic refurbishment',
    Icon: Wrench,
    recommended: ['construction'],
    note: 'Civil Construction manages all renovation, structural improvement, and refurbishment works.',
  },
  {
    id: 'commercial',
    label: 'Build a commercial space',
    sub: 'Office, showroom, or commercial building',
    Icon: Building2,
    recommended: ['architecture', 'construction', 'interiors'],
    note: 'A full-service approach: architectural design, structural build, and interior fit-out under one coordinated team.',
  },
  {
    id: 'interior-fitout',
    label: 'Interior fit-out only',
    sub: 'Furniture, materials, and lighting',
    Icon: Paintbrush,
    recommended: ['interiors'],
    note: 'Interior Design covers the complete fit-out from space planning through material selection to final installation.',
  },
]

/**
 * Static color map — full class strings required for Tailwind v4 scanning.
 * Never construct class names dynamically from partials.
 */
const SERVICE_COLORS = {
  construction: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-100',
    dot: 'bg-red-500',
    arrowColor: 'text-red-600',
  },
  architecture: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
    dot: 'bg-amber-500',
    arrowColor: 'text-amber-600',
  },
  interiors: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-100',
    dot: 'bg-rose-500',
    arrowColor: 'text-rose-600',
  },
}

function getServiceData(slug) {
  return services.find((s) => s.slug === slug)
}

/**
 * ServiceSelector — data-driven "Which service do I need?" interactive tool.
 *
 * Desktop: 3-column option grid; recommendation panel appears below.
 * Mobile: single-column stacked cards; recommendation appears immediately below selection.
 *
 * Accessibility: aria-pressed on buttons, aria-live on recommendation panel.
 * Reduced motion: recommendation panel appears without slide animation when prefers-reduced-motion is active.
 */
export default function ServiceSelector() {
  const [selected, setSelected] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const selectedOption = SELECTOR_OPTIONS.find((o) => o.id === selected)

  const recommendedServices = selectedOption
    ? selectedOption.recommended.map(getServiceData).filter(Boolean)
    : []

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Service Finder
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Not sure where to start?
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm">
            Select what you are planning and we will show you which services are most relevant.
          </p>
        </motion.div>

        {/* Aria live region for screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {selectedOption
            ? `Recommended: ${recommendedServices.map((s) => s.title).join(' and ')}`
            : 'Select an option to see a recommendation'}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6"
          role="group"
          aria-label="Select what you are planning"
        >
          {SELECTOR_OPTIONS.map((option, i) => {
            const isSelected = selected === option.id
            // When something IS selected, unselected cards subtly pull back.
            const isDeemphasized = selected && !isSelected
            const { Icon } = option
            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={() => setSelected(isSelected ? null : option.id)}
                aria-pressed={isSelected}
                className={[
                  'group w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
                  isSelected
                    ? 'bg-slate-900 border-slate-800 shadow-md'
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm',
                ].join(' ')}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EXPO }}
                /* De-emphasize unselected when a selection exists */
                animate={isDeemphasized && !shouldReduceMotion ? { opacity: 0.5 } : { opacity: 1 }}
              >
                {/* Icon */}
                <div
                  className={[
                    'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-50 text-slate-500 group-hover:bg-red-50 group-hover:text-red-600',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm mb-0.5 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {option.label}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {option.sub}
                  </p>
                </div>

                {/* Check indicator */}
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Recommendation panel */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: EXPO }}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-6 lg:p-8"
              role="region"
              aria-label="Service recommendation"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Left: explanation + service links */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    Recommended for you
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-lg">
                    {selectedOption.note}
                  </p>

                  {/* Staggered service chips */}
                  <div className="flex flex-wrap gap-3">
                    {recommendedServices.map((svc, ri) => {
                      const colors = SERVICE_COLORS[svc.slug] || SERVICE_COLORS.construction
                      return (
                        <motion.div
                          key={svc.slug}
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 + ri * 0.08, ease: EXPO }}
                        >
                          <Link
                            to={svc.path}
                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${colors.bg} ${colors.border} hover:shadow-sm transition-all`}
                          >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} aria-hidden="true" />
                            <span className={`text-sm font-semibold ${colors.text}`}>
                              {svc.title}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 ${colors.arrowColor}`} aria-hidden="true" />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Right: CTAs */}
                <div className="flex flex-row lg:flex-col gap-3 lg:w-52 shrink-0">
                  <Link
                    to="/contact"
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-red-500/20"
                  >
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-medium rounded-xl transition-all"
                    aria-label="Contact via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt when nothing is selected */}
        {!selectedOption && (
          <p className="text-center text-xs text-slate-400 mt-2">
            Select any option above to see a recommendation.
          </p>
        )}
      </div>
    </section>
  )
}
