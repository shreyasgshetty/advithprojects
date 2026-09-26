import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Shield, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EXPO = [0.16, 1, 0.3, 1]

const PRINCIPLES = [
  {
    num: '01',
    title: 'Single Accountability',
    tagline: 'One team from foundation to finish',
    icon: Shield,
    desc: 'You deal directly with one coordinated leadership team responsible for architecture, civil execution, and interiors. No passing blame or fragmented responsibilities.',
  },
  {
    num: '02',
    title: 'Quality Standards',
    tagline: 'Rigor in structural and material specs',
    icon: CheckCircle2,
    desc: 'Strict adherence to IS-456 structural standards, vetted concrete mix ratios, premium certified steel, and rigorous quality check inspections at every critical pour.',
  },
  {
    num: '03',
    title: 'Delivery Discipline',
    tagline: 'Planned milestones and proactive communication',
    icon: Clock,
    desc: 'Clear work schedules, procurement forecasting, and structured site updates keep your build progressing without unexpected surprises or prolonged site standstills.',
  },
  {
    num: '04',
    title: 'Client Partnership',
    tagline: 'Transparent execution and honest pricing',
    icon: Users,
    desc: 'Transparent bills of quantities, uncompromised material specifications, and regular on-site walkthroughs ensure what was drafted on paper is built faithfully.',
  },
]

function HomeWhyAdvith() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Architectural Principles Statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                WHY ADVITH PROJECTS
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Built on Principles of Precision and Integrity.
            </h2>

            <p className="text-base text-slate-600 font-light leading-relaxed">
              We started Advith Projects because homeowners and commercial clients in Karnataka were
              exhausted by disjointed contractors, vague estimates, and execution shortcuts.
            </p>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
              >
                <span>LEARN ABOUT OUR FIRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Technical Principles */}
          <div className="lg:col-span-7 divide-y divide-slate-200">
            {PRINCIPLES.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="py-8 first:pt-0 last:pb-0 group"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EXPO }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-sm font-mono font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>
                        <Icon className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
                      </div>
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-0.5 mb-3">
                        {item.tagline}
                      </p>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeWhyAdvith)
