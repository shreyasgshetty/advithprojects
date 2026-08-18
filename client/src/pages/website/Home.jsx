import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2, Compass, Layers, ArrowRight, Shield, Clock,
  CheckCircle2, Users, Star, MapPin, Ruler,
} from 'lucide-react'
import { projects } from '../../data/projects'

const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

// Delay for hero content — gives the layoutId logo travel time to settle
const HERO_DELAY = 0.45

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

// Use explicitly static Tailwind classes to ensure v4 compilation
const heroServices = [
  {
    icon: Building2,
    title: 'Construction',
    desc: 'End-to-end civil construction with structural quality and precise execution.',
    bgClass: 'bg-red-50',
    textClass: 'text-red-500',
    link: '/services/construction',
  },
  {
    icon: Compass,
    title: 'Architecture',
    desc: 'Thoughtful architectural design — concept through construction documentation.',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-500',
    link: '/services/architecture',
  },
  {
    icon: Layers,
    title: 'Interior Design',
    desc: 'Turnkey interior environments — material, light, furniture, and execution.',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-500',
    link: '/services/interiors',
  },
]

const whyItems = [
  {
    icon: Shield,
    title: 'Single Accountability',
    desc: 'One team responsible for design, construction, and interiors — no gaps or finger-pointing.',
    bg: 'bg-red-50',
    ic: 'text-red-600',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Standards',
    desc: 'Consistent quality across every material specification, structural element, and interior finish.',
    bg: 'bg-emerald-50',
    ic: 'text-emerald-600',
  },
  {
    icon: Clock,
    title: 'Delivery Discipline',
    desc: 'Planned milestones, proactive reporting, and disciplined schedule management.',
    bg: 'bg-blue-50',
    ic: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    desc: 'Transparent communication and genuine collaboration throughout every project phase.',
    bg: 'bg-amber-50',
    ic: 'text-amber-600',
  },
]

const processSteps = [
  { step: '01', title: 'Brief', desc: 'Understand your vision, requirements, site, and constraints.' },
  { step: '02', title: 'Design', desc: 'Develop architectural and interior concepts that respond to your brief.' },
  { step: '03', title: 'Plan', desc: 'Detail the execution programme, materials, and project methodology.' },
  { step: '04', title: 'Build', desc: 'Execute on-site with consistent quality supervision and proactive reporting.' },
  { step: '05', title: 'Deliver', desc: 'Final completion, quality checks, and a considered project handover.' },
]

const testimonials = [
  {
    name: 'Representative Client A',
    role: 'Residential Construction',
    location: 'Bangalore',
    quote: "The team's attention to structural quality and finishing detail exceeded our expectations. Communication was clear throughout the entire project.",
    rating: 5,
    demo: true,
  },
  {
    name: 'Representative Client B',
    role: 'Architecture & Interiors',
    location: 'Mysore',
    quote: 'A genuinely integrated team — the same standards we saw in the architectural drawings were reflected in the finished interior. Excellent coordination.',
    rating: 5,
    demo: true,
  },
  {
    name: 'Representative Client C',
    role: 'Commercial Construction',
    location: 'Karnataka',
    quote: 'They managed the project timeline professionally and kept us informed at every stage. Quality of work was consistently high across all trades.',
    rating: 5,
    demo: true,
  },
]

const featuredProjectIds = ['ap-001', 'ap-002', 'ap-003']
const featuredProjects = projects.filter((p) => featuredProjectIds.includes(p.id))

const CATEGORY_GRADIENTS = {
  residential: 'from-red-900 to-slate-900',
  commercial: 'from-amber-900 to-slate-900',
  architecture: 'from-blue-900 to-slate-900',
  interiors: 'from-rose-900 to-slate-900',
}

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 65%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-28 lg:pt-32 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT — text */}
            <div className="space-y-7">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-widest"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_DELAY, duration: 0.6, ease: EXPO }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Construction · Architecture · Interiors
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-slate-900"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_DELAY + 0.1, duration: 0.7, ease: EXPO }}
              >
                We Build the <br />
                <span className="text-red-600">Spaces</span> You Dream Of.
              </motion.h1>

              <motion.p
                className="text-lg text-slate-500 font-light leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_DELAY + 0.2, duration: 0.65, ease: EXPO }}
              >
                From structural precision to interior elegance — Advith Projects brings your
                vision to life with craftsmanship that endures.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 pt-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_DELAY + 0.3, duration: 0.6, ease: EXPO }}
              >
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-2xl shadow-lg transition-all"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 font-medium text-sm rounded-2xl transition-all bg-white hover:bg-red-50/30"
                >
                  Get a Quote
                </Link>
              </motion.div>

              {/* Discipline tags — replacing invented stats */}
              <motion.div
                className="flex flex-wrap gap-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_DELAY + 0.45, duration: 0.6, ease: EASE }}
              >
                {['Civil Construction', 'Architecture', 'Interior Design', 'Turnkey Delivery'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — service cards with static Tailwind classes */}
            <div className="grid grid-cols-1 gap-4">
              {heroServices.map(({ icon: Icon, bgClass, textClass, title, desc, link }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: HERO_DELAY + 0.35 + i * 0.1, duration: 0.6, ease: EXPO }}
                >
                  <Link
                    to={link}
                    className="group flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all block"
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} ${textClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14" {...rev(0)}>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Selected Work</p>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Featured Projects</h2>
            </div>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 whitespace-nowrap"
            >
              All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => {
              const gradient = CATEGORY_GRADIENTS[p.category] ?? 'from-slate-800 to-slate-900'
              return (
                <motion.div
                  key={p.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 overflow-hidden transition-all"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EXPO }}
                >
                  <div className={`h-44 bg-gradient-to-br ${gradient} relative`}>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div
                      className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'completed' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {p.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {p.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {p.area}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{p.description}</p>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      View Project <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY ADVITH ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              One team. Complete responsibility.
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Managing separate architects, builders, and interior designers is complex and costly.
              Advith Projects integrates all three disciplines under a single coordinated team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="p-7 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.55, ease: EXPO }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.bg} ${item.ic}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-14" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">Our Process</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: EXPO }}
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-slate-700 z-0" style={{ width: 'calc(100% - 24px)' }} />
                )}
                <div className="relative z-10 p-5 bg-slate-800 rounded-2xl border border-slate-700 h-full">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                    <span className="text-xs font-bold text-white">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-4" {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Client Feedback</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">What Clients Say</h2>
          </motion.div>
          <motion.p className="text-center text-xs text-slate-400 mb-12" {...rev(0.05)}>
            Representative testimonials — specific client names will be updated with permission.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-7 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-500">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} · {t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-red-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
            {...rev(0)}
          >
            Ready to start building?
          </motion.h2>
          <motion.p
            className="text-red-100 font-light text-lg mb-10 max-w-xl mx-auto"
            {...rev(0.1)}
          >
            Share your project brief and our team will be in touch to discuss how we can help.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.2)}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-red-50 text-red-600 font-bold text-sm rounded-2xl shadow-lg transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-medium text-sm rounded-2xl transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
