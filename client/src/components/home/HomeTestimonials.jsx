import { useState, memo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const TESTIMONIALS_DATA = [
  {
    quote:
      'I really liked how the design came together. The team understood what we were looking for and gave us a practical design that also looked great.',
    client: 'Deepu',
    project: 'AP-CKM2024-01',
    location: 'Chikkamagaluru, Karnataka',
    rating: 5,
  },
  {
    quote:
      'I am really happy with how the construction was handled. Puneeth personally supervised the work every week and kept us updated on the progress. It was easy to discuss changes and get things sorted as the work went on.',
    client: 'Prakash',
    project: 'AP-CKM2024-01',
    location: 'Chikkamagaluru, Karnataka',
    rating: 5,
  },
  {
    quote:
      'I made quite a few changes along the way, and they were handled well. The design was updated based on my requirements, and the final result came together just the way I wanted.',
    client: 'Vishu',
    project: 'AP-CKM2025-03',
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
      </div>
    </section>
  )
}

export default memo(HomeTestimonials)
