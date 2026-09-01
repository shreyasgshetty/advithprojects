import { motion } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1]

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, delay, ease: EXPO },
  }
}

const TRADITIONAL_STEPS = [
  { label: 'Architect', note: 'Separate engagement' },
  { label: 'Contractor', note: 'Separate engagement' },
  { label: 'Interior Vendor', note: 'Separate engagement' },
]

const ADVITH_DISCIPLINES = ['Architecture', 'Construction', 'Interiors']

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
}

/**
 * IntegrationDiagram — "One Team. No Gaps."
 * Visual comparison of the traditional multi-vendor approach vs.
 * Advith Projects' integrated single-team model.
 *
 * Desktop: side-by-side columns.
 * Mobile: stacked.
 */
export default function IntegrationDiagram() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={GRID_BG} />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-14" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            The Difference
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            One team. No gaps.
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm">
            Managing separate architects, contractors, and interior vendors creates coordination
            gaps. Advith Projects brings all three disciplines under a single accountable team.
          </p>
        </motion.div>

        {/* Comparison columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* ── Traditional ── */}
          <motion.div
            className="flex flex-col p-7 bg-white rounded-2xl border border-slate-100 shadow-sm"
            {...rev(0.1)}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Traditional Approach
            </p>

            <div className="flex flex-col items-center gap-0 flex-1 mb-6">
              {/* Client */}
              <div className="w-full max-w-xs px-5 py-3 bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 text-center">
                Client
              </div>

              {TRADITIONAL_STEPS.map((item) => (
                <div key={item.label} className="flex flex-col items-center w-full max-w-xs">
                  {/* Down arrow */}
                  <div className="flex flex-col items-center py-1.5">
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-200" />
                  </div>
                  {/* Vendor box */}
                  <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80">
                    <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-700 leading-none">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Result */}
              <div className="flex flex-col items-center w-full max-w-xs">
                <div className="flex flex-col items-center py-1.5">
                  <div className="w-px h-4 bg-slate-200" />
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-200" />
                </div>
                <div className="w-full px-5 py-3 bg-slate-100 rounded-xl text-sm font-semibold text-slate-400 text-center">
                  Result (if well coordinated)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <p className="text-xs text-slate-400 leading-relaxed">
                Coordination gaps between separate disciplines can lead to conflicts, rework, and
                inconsistent quality.
              </p>
            </div>
          </motion.div>

          {/* ── Advith ── */}
          <motion.div
            className="flex flex-col p-7 bg-white rounded-2xl border border-red-100 shadow-sm relative overflow-hidden"
            {...rev(0.2)}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-6">
              Advith Projects
            </p>

            <div className="flex flex-col items-center gap-0 flex-1 mb-6">
              {/* Client */}
              <div className="w-full max-w-xs px-5 py-3 bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 text-center">
                Client
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center py-1.5">
                <div className="w-px h-4 bg-red-200" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-200" />
              </div>

              {/* Advith integrated box */}
              <div className="w-full max-w-xs p-5 rounded-2xl bg-slate-900">
                <p className="text-white font-bold text-sm text-center mb-4">Advith Projects</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {ADVITH_DISCIPLINES.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs text-center mt-3 leading-relaxed">
                  One team. One conversation. One responsibility.
                </p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center py-1.5">
                <div className="w-px h-4 bg-red-200" />
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-200" />
              </div>

              {/* Result */}
              <div className="w-full max-w-xs px-5 py-3 bg-red-50 border border-red-100 rounded-xl text-sm font-semibold text-red-700 text-center">
                Complete Delivery
              </div>
            </div>

            <div className="pt-4 border-t border-red-50 mt-auto">
              <p className="text-xs text-slate-500 leading-relaxed">
                Single point of accountability across architecture, construction, and interiors — no
                gaps, no conflicts.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-10 flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5, ease: EXPO }}
        >
          {[
            'Seamless coordination across all disciplines',
            'Single point of responsibility',
            'Consistent quality standards throughout',
          ].map((point) => (
            <div key={point} className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {point}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
