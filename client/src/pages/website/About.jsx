import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Users, Clock, Shield } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

const values = [
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'Every project is held to the same standard — rigorous material selection, skilled workmanship, and thorough quality checks at every stage.',
  },
  {
    icon: Users,
    title: 'Client-Centred Approach',
    desc: 'We listen, understand, and align — your project vision and requirements are central to every decision we make.',
  },
  {
    icon: Clock,
    title: 'Delivery Discipline',
    desc: 'Planned milestones, proactive communication, and responsible management to ensure your project is delivered on time.',
  },
  {
    icon: Shield,
    title: 'Accountability',
    desc: 'A single team — a single point of accountability. We stand behind every element of our work.',
  },
]

const team = [
  { initials: 'AP', name: 'Advith', role: 'Founder & Principal', desc: 'Leads project direction, client relationships, and overall quality standards across all disciplines.' },
  { initials: 'SM', name: 'Site Manager', role: 'Construction Lead', desc: 'Oversees on-site execution, subcontractor coordination, and construction quality assurance.' },
  { initials: 'AD', name: 'Architect', role: 'Design Lead', desc: 'Manages architectural concept development, documentation, and design coordination.' },
  { initials: 'ID', name: 'Interior Designer', role: 'Interiors Lead', desc: 'Leads interior design concept, material selection, and turnkey execution.' },
]

export default function About() {
  return (
    <div className="antialiased">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-36">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 65%)' }} />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-800/40 bg-red-900/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Our Story
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: EXPO }}
          >
            Built on Trust. <br />
            <span className="text-red-400">Grounded in Craft.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EXPO }}
          >
            Advith Projects is a professional construction, architecture, and interior design firm
            committed to building environments that endure — in quality, character, and function.
          </motion.p>
        </div>
      </section>

      {/* ── About Text ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div {...rev(0)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Who We Are</p>
              <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-6">
                A team that builds with intention.
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  Advith Projects was founded with a straightforward purpose: to bring professional,
                  coordinated expertise in construction, architecture, and interior design together
                  under one accountable team.
                </p>
                <p>
                  We believe that the built environment profoundly shapes how people live and work.
                  That belief drives our commitment to quality — in the materials we specify, the
                  workmanship we deliver, and the relationships we build with every client.
                </p>
                <p>
                  Whether we are constructing a family home, designing an architectural space, or
                  completing an interior, our approach is the same: listen carefully, plan rigorously,
                  and execute with precision.
                </p>
              </div>
            </motion.div>

            <motion.div className="space-y-5" {...rev(0.15)}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">What Guides Us</p>
              <div className="p-7 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-3">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To deliver construction, architecture, and interior design of the highest standard —
                  on time, to budget, and with unwavering accountability to our clients.
                </p>
              </div>
              <div className="p-7 bg-red-50 rounded-2xl border border-red-100">
                <h3 className="font-bold text-red-900 text-lg mb-3">Our Vision</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  To be the most trusted name in professional construction and design in the regions
                  we operate — known for integrity, quality, and the lasting value we create.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Principles that guide every project.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <motion.div
                  key={val.title}
                  className="p-7 bg-white rounded-2xl border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5 text-red-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Approach ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div className="mb-12" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight max-w-xl">
              One integrated team across every phase.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { step: '01', title: 'Understand', desc: 'We begin with thorough conversations — understanding your brief, aspirations, site, budget, and schedule.' },
              { step: '02', title: 'Plan', desc: 'Rigorous planning across design, structure, and execution before a single brick is laid.' },
              { step: '03', title: 'Execute', desc: 'Coordinated on-site delivery with consistent quality supervision and proactive communication.' },
              { step: '04', title: 'Deliver', desc: 'Thorough completion, final inspections, documentation, and a handover that reflects our standards.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="flex gap-5 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">The Team</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              People you work with.
            </h2>
            <p className="text-slate-500 mt-3 text-sm">
              Representative roles — specific team members vary by project scope and discipline.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="p-7 bg-white rounded-2xl border border-slate-100 shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <p className="font-bold text-slate-900">{member.name}</p>
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mt-1 mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-4xl font-bold text-white mb-4" {...rev(0)}>
            Let's build something together.
          </motion.h2>
          <motion.p className="text-slate-300 font-light mb-10" {...rev(0.1)}>
            Share your project brief and we will get back to you to discuss next steps.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.2)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium text-sm rounded-2xl transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
