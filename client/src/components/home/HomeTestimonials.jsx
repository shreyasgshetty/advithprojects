import { useState, memo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const TESTIMONIALS_DATA = [
  {
    quote:
      'The team’s attention to structural quality and finishing detail exceeded our expectations. Having the architectural planners coordinate directly with the site engineers kept our timeline clear from start to finish.',
    client: 'Representative Client Account',
    project: 'Private Residential Construction',
    location: 'Bangalore, Karnataka',
    rating: 5,
  },
  {
    quote:
      'A genuinely integrated team — the exact standards and materials we reviewed in the architectural drawings were faithfully reflected on-site. There was zero finger-pointing between trades.',
    client: 'Representative Client Account',
    project: 'Architecture & Turnkey Interiors',
    location: 'Mysore, Karnataka',
    rating: 5,
  },
  {
    quote:
      'They managed the project timeline professionally with consistent site reporting. The concrete quality, brickwork alignment, and final finishes met rigorous commercial engineering standards.',
    client: 'Representative Client Account',
    project: 'Commercial Structural Shell',
    location: 'Chikkamagaluru, Karnataka',
    rating: 5,
  },
]

function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1))
  }

  const current = TESTIMONIALS_DATA[currentIndex]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 select-none">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-slate-200 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span className="font-bold text-slate-900 uppercase tracking-widest">
              CLIENT EXPERIENCE
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span>
              0{currentIndex + 1} / 0{TESTIMONIALS_DATA.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-7 h-7 rounded border border-slate-300 hover:border-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-7 h-7 rounded border border-slate-300 hover:border-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Testimonial Display */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EXPO }}
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl text-slate-900 font-light leading-snug tracking-tight mb-8">
                “{current.quote}”
              </blockquote>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <p className="font-bold text-slate-900">{current.client}</p>
                  <p className="text-slate-500">{current.project}</p>
                </div>
                <div className="text-slate-400">
                  <span>{current.location}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ethical Note */}
        <p className="mt-12 text-[11px] font-mono text-slate-400 text-center">
          Representative client feedback — specific names &amp; private residential accounts are kept confidential upon request.
        </p>
      </div>
    </section>
  )
}

export default memo(HomeTestimonials)
