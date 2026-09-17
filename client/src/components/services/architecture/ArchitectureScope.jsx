import { motion, useReducedMotion } from 'framer-motion'
import { Check, Compass, Grid, FileText } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function ArchitectureScope() {
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
      id: 'cluster-concept',
      name: 'Concept & Site Planning',
      ref: 'PHASE A',
      icon: Compass,
      summary: 'Translating client briefs, climatic patterns, and site constraints into initial volume and massing models.',
      items: [
        {
          title: 'Site Analysis & Orientation',
          desc: 'Orientation, setbacks, access points, and boundary constraints resolved before formal drawing begins.',
        },
        {
          title: 'Spatial Concept Development',
          desc: 'Early-stage volumetric exploration and spatial relationships translating functional requirements.',
        },
        {
          title: 'Zoning & Master Layout',
          desc: 'Logical allocation of private, semi-private, and service zones aligned with client lifestyle.',
        },
      ],
    },
    {
      id: 'cluster-design',
      name: 'Design Development & Spatial Planning',
      ref: 'PHASE B',
      icon: Grid,
      summary: 'Refining schematic models into detailed floor plans, proportioned elevations, and realistic 3D presentations.',
      items: [
        {
          title: 'Detailed Floor Plan Development',
          desc: 'Plans optimized for natural daylight, cross ventilation, circulation efficiency, and room proportions.',
        },
        {
          title: 'Elevation & Facade Design',
          desc: 'Facade studies balancing material textures, fenestration proportions, shading overhangs, and context.',
        },
        {
          title: '3D Visualization & Spatial Models',
          desc: 'Digital renderings and walkthrough perspectives communicating spatial volume prior to construction.',
        },
      ],
    },
    {
      id: 'cluster-docs',
      name: 'Construction Documentation & Coordination',
      ref: 'PHASE C',
      icon: FileText,
      summary: 'Generating high-precision drawing packages for seamless structural and MEP site execution.',
      items: [
        {
          title: 'Architectural Working Drawings',
          desc: 'Dimensioned setting-out plans, wall cross-sections, staircases, and door/window schedules.',
        },
        {
          title: 'Structural & MEP Coordination',
          desc: 'Aligning architectural layout with structural engineering models, column grids, and conduit paths.',
        },
        {
          title: 'Statutory Documentation Sets',
          desc: 'Comprehensive drawing packages prepared in alignment with local developmental regulations.',
        },
      ],
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E7E5E0]" id="scope">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#D97706] mb-3">
            <span>02</span>
            <span className="text-slate-300">/</span>
            <span>Architectural Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Built Around Spatial Discipline
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Our architectural services cover the entire project lifecycle, structured into three coordinated phases from initial sketch to site-ready documentation.
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
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#D97706] tracking-wider uppercase">
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
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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
