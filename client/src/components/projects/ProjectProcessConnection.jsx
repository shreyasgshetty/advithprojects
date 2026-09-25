import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const PROCESS_STEPS = [
  { num: '01', title: 'Brief', desc: 'Site evaluation & requirement definition' },
  { num: '02', title: 'Design', desc: 'Architectural & working documentation' },
  { num: '03', title: 'Plan', desc: 'Structural schedules, BOQ & milestone plan' },
  { num: '04', title: 'Build', desc: 'On-site civil execution & QA supervision' },
  { num: '05', title: 'Deliver', desc: 'Final commissioning & turnkey handover' },
]

function ProjectProcessConnection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8F9FA] border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-red-600 mb-1">
              EXECUTION DISCIPLINE
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              How We Build Every Commission
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 hover:text-red-600 transition-colors"
          >
            <span>Learn About Our Methodology</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Step Linear Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4">
          {PROCESS_STEPS.map((s) => (
            <div key={s.num} className="relative pt-2">
              <div className="flex items-center gap-2 text-xs font-mono mb-2">
                <span className="font-bold text-red-600">{s.num}</span>
                <span className="text-slate-300">/</span>
                <span className="font-bold text-slate-900 uppercase">{s.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-mono">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectProcessConnection)
