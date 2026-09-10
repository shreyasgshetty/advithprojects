import { motion, useReducedMotion } from 'framer-motion'
import { Check, Sparkles, Sliders, CheckSquare } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function InteriorsScope() {
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

  const clusters = [
    {
      id: 'cluster-planning',
      name: 'Spatial Planning & Concept Modeling',
      ref: 'PHASE A',
      icon: Sparkles,
      summary: 'Establishing internal zoning, circulation axes, functional ergonomics, and overarching aesthetic mood.',
      items: [
        {
          title: 'Space Planning & Layout Drawings',
          desc: 'Dimensioned floor arrangements optimized for movement flow, functional zones, and natural lighting.',
        },
        {
          title: 'Furniture Layout Planning',
          desc: 'Custom and specified furniture placement plans tailored for daily living comfort and balanced proportions.',
        },
        {
          title: 'Concept Mood & Palette Direction',
          desc: 'Visual mood boards establishing the tonal foundation, material hierarchy, and textural character.',
        },
      ],
    },
    {
      id: 'cluster-joinery',
      name: 'Material Curation & Custom Joinery',
      ref: 'PHASE B',
      icon: Sliders,
      summary: 'Specifying durable surface finishes, custom cabinetry, bespoke wardrobes, and architectural lighting schemes.',
      items: [
        {
          title: 'Material & Finish Schedules',
          desc: 'Curated selection of flooring stones, wall claddings, veneer woods, and paint tones with physical samples.',
        },
        {
          title: 'Kitchen & Wardrobe Custom Design',
          desc: 'Detailed joinery drawings for modular kitchen cabinetry, internal organizers, and bespoke wardrobe systems.',
        },
        {
          title: 'Architectural Lighting Layouts',
          desc: 'Layered lighting design integrating ceiling coves, task spotlights, accent sconces, and driver positioning.',
        },
      ],
    },
    {
      id: 'cluster-fitout',
      name: 'Execution Supervision & Turnkey Delivery',
      ref: 'PHASE C',
      icon: CheckSquare,
      summary: 'Managing trade execution, joinery fabrication, and finishing alignment through to final client handover.',
      items: [
        {
          title: 'Vendor & Trade Coordination',
          desc: 'Aligning carpentry specialists, electricians, false ceiling installers, and painters under direct supervision.',
        },
        {
          title: 'Site Quality & Tolerance Inspection',
          desc: 'Regular verification of edge alignments, hardware functionality, surface finishes, and joinery gaps.',
        },
        {
          title: 'Turnkey Handover & Snag Review',
          desc: 'Final walkthrough, comprehensive defect rectification, site cleaning, and handover documentation.',
        },
      ],
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E7E5E0]" id="scope">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#E11D48] mb-3">
            <span>02</span>
            <span className="text-slate-300">/</span>
            <span>Interior Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Built Around Craft & Material Precision
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Our interior design solutions span three structured execution phases, taking projects from initial conceptual layouts through custom manufacturing to finished installation.
          </p>
        </div>

        <div className="space-y-8">
          {clusters.map((cluster, cIdx) => {
            const Icon = cluster.icon
            return (
              <motion.div
                key={cluster.id}
                className="bg-[#FBFBFA] border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_2px_12px_rgba(15,23,42,0.02)]"
                {...anim(cIdx * 0.1)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-[#E7E5E0] items-center">
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#E11D48] tracking-wider uppercase">
                        {cluster.ref}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                        {cluster.name}
                      </h3>
                    </div>
                  </div>
                  <div className="lg:col-span-7 text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    {cluster.summary}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {cluster.items.map((item) => (
                    <div key={item.title} className="relative">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
