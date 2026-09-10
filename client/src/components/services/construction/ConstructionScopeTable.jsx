import { motion, useReducedMotion } from 'framer-motion'
import { Check, Layers, ShieldCheck, Hammer } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionScopeTable() {
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
      id: 'cluster-substructure',
      name: 'Substructure & Earthworks',
      ref: 'PHASE A',
      icon: Hammer,
      summary: 'Setting out datum levels, clearing the site, and constructing the load-transferring foundation matrix.',
      items: [
        {
          title: 'Site Preparation & Setting Out',
          desc: 'Establishment of baseline grid references, benchmark leveling, and site clearance.',
        },
        {
          title: 'Excavation & Earth Retaining',
          desc: 'Excavation according to footing layouts and soil strata characteristics with proper shoring where required.',
        },
        {
          title: 'Foundation & Plinth Beams',
          desc: 'PCC bed laying, isolated or raft reinforcement cage placement, concrete casting, and plinth tie beams.',
        },
      ],
    },
    {
      id: 'cluster-superstructure',
      name: 'Superstructure & RCC Framing',
      ref: 'PHASE B',
      icon: Layers,
      summary: 'Erecting the structural skeleton with continuous alignment and verified rebar placements.',
      items: [
        {
          title: 'RCC Columns, Beams & Slabs',
          desc: 'Shuttering formwork erection, beam-column junction reinforcement binding, and scheduled concrete casting.',
        },
        {
          title: 'Masonry & Enclosure Walls',
          desc: 'Precision brickwork or block masonry walls, lintel bands, and partition enclosures built to architectural layout.',
        },
        {
          title: 'Waterproofing & Barrier Systems',
          desc: 'Waterproofing treatments for basements, terraces, and wet utility zones to prevent moisture ingress.',
        },
      ],
    },
    {
      id: 'cluster-finishes',
      name: 'Finishing & Service Coordination',
      ref: 'PHASE C',
      icon: ShieldCheck,
      summary: 'Integrating essential utilities, wall treatments, and durable architectural floor finishes.',
      items: [
        {
          title: 'Plastering & Surface Preparation',
          desc: 'Internal and external cement plastering with level checks to achieve smooth, crack-resistant surfaces.',
        },
        {
          title: 'Electrical & Plumbing Conduit Coordination',
          desc: 'Concealed plumbing pipelines, electrical conduit routing, and drainage lines integrated prior to finishes.',
        },
        {
          title: 'Flooring, Painting & Handover Preparation',
          desc: 'Flooring installation, primer and paint coats, site cleaning, and comprehensive final quality review.',
        },
      ],
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E7E5E0]" id="scope">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
            <span>03</span>
            <span className="text-slate-300">/</span>
            <span>Execution Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Built Around Engineering Discipline
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Our construction capabilities are structured into three distinct phases, ensuring orderly sequencing from initial ground-breaking to final architectural closure.
          </p>
        </div>

        {/* 3 Engineering Clusters: Clean Structured Specification Layout */}
        <div className="space-y-8">
          {clusters.map((cluster, cIdx) => {
            const Icon = cluster.icon
            return (
              <motion.div
                key={cluster.id}
                className="bg-white border border-[#E7E5E0] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
                {...anim(cIdx * 0.1)}
              >
                {/* Cluster Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-[#E7E5E0] items-center">
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#DC2626] tracking-wider uppercase">
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

                {/* Sub-items in 3-column table-like division */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {cluster.items.map((item) => (
                    <div key={item.title} className="relative">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
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
