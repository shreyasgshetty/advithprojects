import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

export default function ArchitectureApproach() {
  const shouldReduceMotion = useReducedMotion()

  const anim = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: shouldReduceMotion ? 0.3 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EXPO,
    },
  })

  const pillars = [
    {
      title: 'Contextual Site Orientation',
      desc: 'Careful analysis of topography, setbacks, prevailing breezes, and solar paths to optimize internal comfort before formal drawing begins.',
    },
    {
      title: 'Proportion & Spatial Flow',
      desc: 'Developing floor plans with natural visual axes, clear circulation routes, and balanced proportional relationships across living zones.',
    },
    {
      title: 'Structural & Engineering Alignment',
      desc: 'Integrating structural columns, load paths, and service shafts directly into the architectural layout to avoid on-site compromises.',
    },
    {
      title: 'Daylight & Material Expression',
      desc: 'Curating fenestrations and surface textures so natural light defines spatial atmosphere, depth, and daily living quality.',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0] relative" id="overview">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div className="lg:col-span-6" {...anim(0)}>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#D97706] mb-3">
              <span>01</span>
              <span className="text-slate-300">/</span>
              <span>Design Approach</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Architecture That Balances Function, Form & Light
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                At Advith Projects, architectural design is an investigative process. Every project begins by listening to how occupants intend to live or work, analyzing site boundaries, and identifying how natural light moves across the plot.
              </p>
              <p>
                We do not impose arbitrary styles. Instead, we develop concepts where structural integrity and functional requirements shape the building’s volume. Every wall, opening, and transitional space serves a defined purpose.
              </p>
              <p>
                From initial schematic layouts to full construction documentation, our architectural team works in tandem with structural consultants, ensuring that buildability and cost clarity are embedded into the design from day one.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Methodology</span>
                <span className="font-semibold text-slate-800">Contextual Planning</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Documentation</span>
                <span className="font-semibold text-slate-800">Coordinated Drawing Sets</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <Link
                  to="/about"
                  className="text-[#D97706] hover:text-amber-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  About Our Studio <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Architectural Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                className="p-6 bg-white border border-[#E7E5E0] rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:border-[#D97706]/40 transition-colors"
                {...anim(idx * 0.08)}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-[#D97706] bg-amber-50 border border-amber-100 rounded px-2 py-1 shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
