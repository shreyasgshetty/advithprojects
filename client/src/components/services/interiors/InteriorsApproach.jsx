import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

export default function InteriorsApproach() {
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
      title: 'Spatial Flow & Ergonomics',
      desc: 'Developing internal circulation and furniture layouts that respond naturally to how rooms are used daily, avoiding visual clutter.',
    },
    {
      title: 'Curated Material Palette',
      desc: 'Selecting tactile stone, warm hardwoods, metal trims, and wall finishes that harmonize in tone and withstand long-term use.',
    },
    {
      title: 'Layered Architectural Lighting',
      desc: 'Designing ambient illumination, focused task lighting, and subtle feature coves to create adaptable atmospheres from day to night.',
    },
    {
      title: 'Bespoke Joinery & Fit-out',
      desc: 'Custom-designed wardrobes, kitchen cabinetry, and transitional paneling crafted with precision tolerances and clean edge details.',
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
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#E11D48] mb-3">
              <span>01</span>
              <span className="text-slate-300">/</span>
              <span>Interior Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Interiors Shaped by Lifestyle, Texture & Proportion
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                At Advith Projects, interior design is not merely decoration. It is the continuation of architectural volume down to the human scale—where light meets texture, and spaces support daily living with effortless comfort.
              </p>
              <p>
                We prioritize spatial proportion, natural light interaction, and material authenticity. Every finish is evaluated for its tactile quality, durability, and visual harmony with adjacent surfaces.
              </p>
              <p>
                From private villas and contemporary apartments to commercial workplaces, our design team coordinates space planning, customized cabinetry, and on-site trade execution for a complete, coherent living environment.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500">
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Methodology</span>
                <span className="font-semibold text-slate-800">Holistic Space Planning</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <span className="text-slate-400 block uppercase tracking-widest text-[10px]">Detailing</span>
                <span className="font-semibold text-slate-800">Custom Joinery & Lighting</span>
              </div>
              <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
              <div>
                <Link
                  to="/about"
                  className="text-[#E11D48] hover:text-rose-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  About Our Studio <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                className="p-6 bg-white border border-[#E7E5E0] rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:border-[#E11D48]/40 transition-colors"
                {...anim(idx * 0.08)}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-[#E11D48] bg-rose-50 border border-rose-100 rounded px-2 py-1 shrink-0">
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
