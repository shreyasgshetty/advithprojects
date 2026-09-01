import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

/**
 * FAQ content — factual only, derived from confirmed project information.
 * No fabricated guarantees, timelines, pricing, or certifications.
 */
const FAQ_ITEMS = [
  {
    q: 'What services does Advith Projects provide?',
    a: 'Advith Projects provides three integrated services: Civil Construction, Architecture & Planning, and Interior Design. These can be engaged individually or together depending on your project requirements.',
  },
  {
    q: 'Can architecture and construction be handled by the same team?',
    a: 'Yes. Advith Projects coordinates architectural planning and construction under a single point of responsibility. This eliminates the coordination gaps that often occur when separate architects and contractors are engaged independently.',
  },
  {
    q: 'Do you provide interior design services?',
    a: 'Yes. Interior Design services include space planning, material and finish selection, furniture planning, lighting design, kitchen design, and complete turnkey interior execution.',
  },
  {
    q: 'Can I engage only one service?',
    a: 'Yes. You can engage any of the three services individually. A project-specific discussion and quotation will be prepared based on your actual scope of work.',
  },
  {
    q: 'How does the quotation process work?',
    a: 'Advith Projects first understands your project requirements through a direct conversation. Based on the actual scope of work, a project-specific quotation is prepared — rather than applying a generic package.',
  },
  {
    q: 'Which locations do you currently serve?',
    a: 'Advith Projects has worked across Bengaluru, Mysuru, Hassan, and Chikkamagaluru. If your project is in a different location, get in touch to discuss possibilities.',
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-inset"
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="font-semibold text-slate-900 text-sm leading-relaxed pr-2">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            key="content"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: EXPO }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-slate-100 mb-4" />
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * ServiceFAQ — accordion-style FAQ component.
 * Accessibility: keyboard navigable, aria-expanded, aria-controls, aria-live.
 * Reduced motion: accordion animation disabled when prefers-reduced-motion is active.
 */
export default function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Common Questions
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            Questions & answers
          </h2>
        </motion.div>

        {/* Screen-reader live region announces the open state */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {openIndex !== null ? `Expanded: ${FAQ_ITEMS[openIndex]?.q}` : ''}
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: EXPO }}
            >
              <FAQItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer prompt */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: EXPO }}
        >
          <p className="text-sm text-slate-500">
            Have a question not listed here?{' '}
            <Link
              to="/contact"
              className="text-red-600 hover:text-red-700 font-semibold transition-colors underline-offset-2 hover:underline"
            >
              Get in touch
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
