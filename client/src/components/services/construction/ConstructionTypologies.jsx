import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Building, Home, Warehouse, Wrench } from 'lucide-react'
import { projects } from '../../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]

export default function ConstructionTypologies() {
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

  // Linked real projects from projects.js
  const villaProject = projects.find((p) => p.slug === 'modern-villa-design')
  const rowHouseProject = projects.find((p) => p.slug === 'row-house-development')
  const commercialProject = projects.find((p) => p.slug === 'commercial-office-complex')

  const typologies = [
    {
      id: 'villas',
      title: 'Independent Villas & Private Residences',
      category: 'Residential',
      icon: Home,
      desc: 'Bespoke residential construction tailored to custom architectural plans, demanding close attention to foundation stability, high-ceiling RCC structures, and seamless interior coordination.',
      linkedProject: villaProject,
    },
    {
      id: 'row-houses',
      title: 'Row Houses & Residential Communities',
      category: 'Developments',
      icon: Warehouse,
      desc: 'Multi-unit residential construction planned for structural uniformity, coordinated phased casting, and efficient site logistics across interconnected living units.',
      linkedProject: rowHouseProject,
    },
    {
      id: 'commercial',
      title: 'Commercial Complexes & Office Spaces',
      category: 'Commercial',
      icon: Building,
      desc: 'Multi-level commercial construction requiring engineered load-bearing structural frames, open floor-plate RCC slabs, and organized service shaft provisions.',
      linkedProject: commercialProject,
    },
    {
      id: 'renovation',
      title: 'Civil Modifications & Structural Upgrades',
      category: 'Refurbishment',
      icon: Wrench,
      desc: 'Careful civil modifications, structural reinforcements, vertical/horizontal extensions, and aesthetic masonry upgrades for existing properties with minimal disruption.',
      linkedProject: null,
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E7E5E0]" id="typologies">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div className="max-w-2xl" {...anim(0)}>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#DC2626] mb-3">
              <span>02</span>
              <span className="text-slate-300">/</span>
              <span>Project Typologies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Construction Expertise Across Project Types
            </h2>
          </motion.div>
          <motion.div className="text-sm text-slate-500 max-w-md font-light" {...anim(0.1)}>
            Each typology requires a tailored execution approach, from deep footing foundations on residential plots to expansive spans for commercial properties.
          </motion.div>
        </div>

        {/* Typologies Layout: 2x2 Clean Editorial Composition with Real Project Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {typologies.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.id}
                className="bg-[#FBFBFA] border border-[#E7E5E0] rounded-2xl p-7 sm:p-9 flex flex-col justify-between hover:border-slate-400 transition-colors"
                {...anim(idx * 0.08)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E5E0] text-slate-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#DC2626]" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-medium">
                      TYP-0{idx + 1} · {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Real Case Reference Anchor */}
                {item.linkedProject ? (
                  <div className="pt-5 border-t border-[#E7E5E0] mt-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Case Reference
                      </span>
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#DC2626]" />
                        {item.linkedProject.title} ({item.linkedProject.location})
                      </span>
                    </div>
                    <Link
                      to={`/projects/${item.linkedProject.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] hover:text-red-700 transition-colors"
                      aria-label={`View project details for ${item.linkedProject.title}`}
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                ) : (
                  <div className="pt-5 border-t border-[#E7E5E0] mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Scope: Structural Modifications & Retrofits</span>
                    <span className="text-slate-400">Consultation Available</span>
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
