import { motion } from 'framer-motion'
import puneethImg from '../../assets/puneeth.jpg'
import { Link } from 'react-router-dom'
import {
  Building2,
  Compass,
  Layers,
  ArrowRight,
  MapPin,
  MessageCircle,
  CheckCheck,
  Lightbulb,
  FileText,
  Wrench,
} from 'lucide-react'

// ─── Shared easing ────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1]

// ─── Scroll-reveal helper ─────────────────────────────────────────────────────
function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: EXPO },
  }
}

// ─── Blueprint grid background ────────────────────────────────────────────────
function BlueprintGrid({ opacity = 0.035 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,${opacity}) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}
    />
  )
}
function SignalPulse() {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.6 }}
    >
      <div className="relative shrink-0">
        <span className="block w-2.5 h-2.5 rounded-full bg-red-500" />
        <motion.span
          className="absolute inset-0 rounded-full bg-red-400"
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <svg width="64" height="2" className="overflow-visible" aria-hidden="true">
        <motion.line
          x1="0" y1="1" x2="64" y2="1"
          stroke="rgba(239,68,68,0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EXPO }}
        />
      </svg>
      <motion.span
        className="block w-1.5 h-1.5 rounded-full bg-red-300"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.div>
  )
}
// ══════════════════════════════════════════════════════════════════════════════
// 1. ABOUT HERO
// ══════════════════════════════════════════════════════════════════════════════
function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-14 lg:pt-24 lg:pb-20">
      <BlueprintGrid opacity={0.04} />

      {/* Subtle red radial glow */}
      <div
        className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 65%)' }}
      />

      {/* Corner ruler marks */}
      <div className="absolute top-6 left-6 pointer-events-none select-none hidden sm:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute top-6 right-6 pointer-events-none select-none hidden sm:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <line x1="40" y1="0" x2="40" y2="24" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
          <line x1="40" y1="0" x2="16" y2="0" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <SignalPulse />

        <motion.p
          className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          About Advith Projects
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EXPO }}
        >
          From Your Idea to a Space{' '}
          <span className="text-red-600">You Can Call Your Own.</span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: EXPO }}
        >
          Advith Projects brings together architecture, construction and interiors through a
          personalized approach built around every project's unique requirements.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.55, ease: EXPO }}
        >
          {[
            'Civil Construction',
            'Architecture & Planning',
            'Interior Design',
            'Bengaluru · Mysuru · Hassan · Chikkamagaluru',
          ].map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. OUR STORY
// ══════════════════════════════════════════════════════════════════════════════
function StorySection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <BlueprintGrid opacity={0.03} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Text column */}
          <motion.div {...rev(0)}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-6">
              Built around a simple idea.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                Advith Projects was built around a simple idea — making the process of planning,
                designing and building a space easier for the client.
              </p>
              <p>
                Every project begins with a conversation. We take the time to understand what the
                client wants to create, assess what the project requires, and bring together the
                appropriate expertise to move the work forward.
              </p>
              <p>
                Whether the requirement is architectural planning, a complete construction project,
                or an interior, the approach remains the same: understand the project first, then
                determine the right path to deliver it.
              </p>
            </div>
          </motion.div>

          {/* Visual column */}
          <motion.div className="flex flex-col gap-5" {...rev(0.15)}>
            {/* Blueprint card */}
            <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden p-8">
              <BlueprintGrid opacity={0.06} />
              <div className="relative z-10">
                <svg
                  viewBox="0 0 280 180"
                  className="w-full"
                  fill="none"
                  aria-label="Abstract architectural floor plan illustration"
                >
                  <rect x="20" y="20" width="240" height="140" rx="2" stroke="rgba(15,23,42,0.12)" strokeWidth="1.5" />
                  <line x1="20" y1="90" x2="130" y2="90" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                  <line x1="130" y1="20" x2="130" y2="90" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                  <line x1="170" y1="90" x2="260" y2="90" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                  <line x1="170" y1="20" x2="170" y2="90" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                  <line x1="20" y1="168" x2="260" y2="168" stroke="rgba(239,68,68,0.25)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="164" x2="20" y2="172" stroke="rgba(239,68,68,0.35)" strokeWidth="1" />
                  <line x1="260" y1="164" x2="260" y2="172" stroke="rgba(239,68,68,0.35)" strokeWidth="1" />
                  <path d="M 20 90 Q 48 90 48 62" stroke="rgba(239,68,68,0.3)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                  <line x1="20" y1="90" x2="48" y2="90" stroke="rgba(15,23,42,0.1)" strokeWidth="1" />
                  <line x1="80" y1="20" x2="100" y2="20" stroke="rgba(239,68,68,0.4)" strokeWidth="2.5" />
                  <line x1="195" y1="20" x2="220" y2="20" stroke="rgba(239,68,68,0.4)" strokeWidth="2.5" />
                  <line x1="17" y1="20" x2="23" y2="20" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
                  <line x1="20" y1="17" x2="20" y2="23" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
                  <line x1="257" y1="20" x2="263" y2="20" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
                  <line x1="260" y1="17" x2="260" y2="23" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
                  <text x="58" y="58" fill="rgba(15,23,42,0.25)" fontSize="8" fontWeight="400" style={{ fontFamily: 'monospace' }}>Kitchen</text>
                  <text x="185" y="58" fill="rgba(15,23,42,0.25)" fontSize="8" fontWeight="400" style={{ fontFamily: 'monospace' }}>Bedroom</text>
                  <text x="100" y="120" fill="rgba(15,23,42,0.25)" fontSize="8" fontWeight="400" style={{ fontFamily: 'monospace' }}>Living</text>
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Values</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Values chips */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                'Client-first approach',
                'Personalized planning',
                'Direct coordination',
                'Quality standards',
              ].map((label, index) => (
                <motion.div
                  key={label}
                  className="group flex items-center gap-3 py-3 border-b border-slate-200"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: EXPO }}
                >
                  <span className="flex items-center justify-center w-6 h-6 shrink-0 border border-red-200 text-[10px] font-semibold text-red-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. WHAT WE DO
// ══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    icon: Compass,
    title: 'Architecture & Planning',
    description:
      'Architectural planning, design and related requirements — handled personally or with trusted collaborators as the project demands. From concept and floor plans through to construction documentation.',
    link: '/services/architecture',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    linkCls: 'text-amber-600',
  },
  {
    icon: Building2,
    title: 'Civil Construction',
    description:
      'Complete construction projects are planned and coordinated according to the actual scope of work. The right specialists are engaged for each phase — from structural to finishing works.',
    link: '/services/construction',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    linkCls: 'text-red-600',
  },
  {
    icon: Layers,
    title: 'Interior Design',
    description:
      'Interior requirements are understood directly with the client and coordinated with appropriate interior professionals. A project-specific quotation is prepared based on the actual scope.',
    link: '/services/interiors',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-600',
    linkCls: 'text-rose-600',
  },
]

function WhatWeDo() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-14" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight max-w-xl">
            Three disciplines. One coordinated approach.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                className="group relative flex flex-col p-7 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EXPO }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(15,23,42,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.025) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${svc.bgClass} ${svc.textClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3">{svc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{svc.description}</p>
                  <Link
                    to={svc.link}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold mt-6 ${svc.linkCls} hover:gap-2.5 transition-all`}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. A PROJECT BUILT AROUND YOU
// ══════════════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  {
    icon: MessageCircle,
    label: 'Understand',
    desc: 'Listen to your requirements and understand your vision.',
    step: '01',
  },
  {
    icon: Lightbulb,
    label: 'Plan',
    desc: 'Determine the design and execution requirements.',
    step: '02',
  },
  {
    icon: FileText,
    label: 'Quote',
    desc: 'Prepare a project-specific quotation.',
    step: '03',
  },
  {
    icon: Wrench,
    label: 'Execute',
    desc: 'Coordinate the work and bring the plan to life.',
    step: '04',
  },
]

function ProjectApproach() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <BlueprintGrid opacity={0.03} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="max-w-2xl mb-16" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            The Approach
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            A Project Built Around You
          </h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            Every project is different. So the approach should be too.
          </p>
          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed">
              Rather than fixed packages or one-size-fits-all solutions, Advith Projects first
              understands the project, evaluates its requirements, coordinates the appropriate
              professionals, and prepares a quotation based on the actual scope of work.
            </p>
          </div>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-slate-200" />
            <div
              className="absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(239,68,68,0.25) 0, rgba(239,68,68,0.25) 8px, transparent 8px, transparent 16px)',
              }}
            />
            <div className="grid grid-cols-4 gap-4">
              {PROCESS_STEPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: EXPO }}
                  >
                    <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm mb-4">
                      <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">{s.step}</span>
                    <h3 className="font-bold text-slate-900 mb-2">{s.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {PROCESS_STEPS.map((s, i) => {
            const Icon = s.icon
            const isLast = i === PROCESS_STEPS.length - 1
            return (
              <motion.div
                key={s.label}
                className="flex gap-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EXPO }}
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  {!isLast && (
                    <div
                      className="flex-1 w-px mt-1"
                      style={{
                        minHeight: '40px',
                        backgroundImage:
                          'repeating-linear-gradient(180deg, rgba(239,68,68,0.25) 0, rgba(239,68,68,0.25) 6px, transparent 6px, transparent 12px)',
                      }}
                    />
                  )}
                </div>
                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{s.step}</span>
                  <h3 className="font-bold text-slate-900 mb-1 mt-0.5">{s.label}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. THE PERSON BEHIND ADVITH PROJECTS
// ══════════════════════════════════════════════════════════════════════════════
function FounderSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <BlueprintGrid opacity={0.03} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-12" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            The Person Behind Advith Projects
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            One point of contact, from start to finish.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
          {/* Photo placeholder */}
          <motion.div className="flex justify-center lg:justify-start" {...rev(0.1)}>
            <div className="relative">
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <img
                  src={puneethImg}
                  alt="Puneeth — Founder & Project Coordinator, Advith Projects"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-3 left-6 right-6 h-1 bg-red-600 rounded-full" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-5" {...rev(0.15)}>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Puneeth C B</h3>
              <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mt-1">
                Founder &amp; Project Coordinator
              </p>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                Advith Projects is personally managed by Puneeth, who works directly with clients
                to understand their requirements, coordinate planning and design, and organize the
                specialists required for each project.
              </p>
              <p>
                From the first conversation to the execution stage, clients have a direct point
                of contact throughout the project — without needing to independently coordinate
                multiple contractors, architects, or interior professionals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                'Direct client communication',
                'Hands-on project involvement',
                'Single point of responsibility',
              ].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-700"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. WHERE WE'VE WORKED
// ══════════════════════════════════════════════════════════════════════════════
const FOOTPRINT_CITIES = [
  { id: 'bengaluru', label: 'Bengaluru', note: 'Construction, architecture and interiors', cx: 68, cy: 52 },
  { id: 'mysuru', label: 'Mysuru', note: 'Residential and design projects', cx: 48, cy: 78 },
  { id: 'hassan', label: 'Hassan', note: 'Residential commissions', cx: 28, cy: 52 },
  { id: 'chikkamagaluru', label: 'Chikkamagaluru', note: 'Architecture and hospitality projects', cx: 28, cy: 22 },
]

const FOOTPRINT_EDGES = [
  ['bengaluru', 'mysuru'],
  ['bengaluru', 'hassan'],
  ['hassan', 'mysuru'],
  ['hassan', 'chikkamagaluru'],
]

function ProjectFootprint() {
  const W = 360
  const H = 240
  const R = 8

  function nodePos(city) {
    return { x: (city.cx / 100) * W, y: (city.cy / 100) * H }
  }
  function cityById(id) {
    return FOOTPRINT_CITIES.find((c) => c.id === id)
  }

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <BlueprintGrid opacity={0.03} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-14 text-center" {...rev(0)}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Project Footprint
          </p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
            {"Where We've Worked"}
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Growing through every project, one city at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* SVG node diagram */}
          <motion.div
            className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 sm:p-8"
            {...rev(0.1)}
          >
            <BlueprintGrid opacity={0.05} />
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full relative z-10"
              style={{ maxHeight: 240 }}
              aria-label="Karnataka cities where Advith Projects has worked: Bengaluru, Mysuru, Hassan, Chikkamagaluru"
            >
              {FOOTPRINT_EDGES.map(([aId, bId]) => {
                const a = nodePos(cityById(aId))
                const b = nodePos(cityById(bId))
                return (
                  <g key={`${aId}-${bId}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(15,23,42,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <motion.line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(239,68,68,0.2)"
                      strokeWidth="1.5"
                      strokeDasharray="6 32"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -76 }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                    />
                  </g>
                )
              })}

              {FOOTPRINT_CITIES.map((city, i) => {
                const { x, y } = nodePos(city)
                const isRight = city.cx > 50
                return (
                  <motion.g
                    key={city.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EXPO }}
                  >
                    <circle
                      cx={x} cy={y} r={R + 8}
                      fill="none"
                      stroke="rgba(239,68,68,0.18)"
                      strokeWidth="1"
                      style={{
                        transformOrigin: `${x}px ${y}px`,
                        animation: `aboutPulse 3s ease-in-out ${i * 0.7}s infinite`,
                      }}
                    />
                    <circle cx={x} cy={y} r={R + 3} fill="white" stroke="rgba(239,68,68,0.2)" strokeWidth="1" />
                    <circle cx={x} cy={y} r={R} fill="rgb(220,38,38)" />
                    <line x1={x} y1={y - R + 2} x2={x} y2={y + R - 2} stroke="white" strokeWidth="1.5" />
                    <line x1={x - R + 2} y1={y} x2={x + R - 2} y2={y} stroke="white" strokeWidth="1.5" />
                    <text
                      x={isRight ? x + R + 8 : x - R - 8}
                      y={y}
                      textAnchor={isRight ? 'start' : 'end'}
                      dominantBaseline="middle"
                      fill="rgb(30,41,59)"
                      fontSize="10"
                      fontWeight="600"
                      style={{ userSelect: 'none', pointerEvents: 'none', fontFamily: 'inherit' }}
                    >
                      {city.label}
                    </text>
                  </motion.g>
                )
              })}
            </svg>
            <p className="text-center text-xs text-slate-300 mt-1 relative z-10 select-none">
              Projects across Karnataka
            </p>
          </motion.div>

          {/* City list */}
          <motion.div className="space-y-3" {...rev(0.2)}>
            {FOOTPRINT_CITIES.map((city, i) => (
              <motion.div
                key={city.id}
                className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EXPO }}
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{city.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{city.note}</p>
                </div>
              </motion.div>
            ))}
            <p className="text-xs text-slate-400 leading-relaxed pt-1 pl-1">
              {"Working on a project outside these areas? "}
              <Link to="/contact" className="text-red-500 hover:underline font-medium">
                Get in touch
              </Link>
              {" to discuss."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. FINAL CTA
// ══════════════════════════════════════════════════════════════════════════════
function AboutCTA() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <BlueprintGrid opacity={0.035} />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(239,68,68,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="relative bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
          {...rev(0)}
        >
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

          <div className="absolute top-6 left-6 pointer-events-none hidden sm:block">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="16" y2="0" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute top-6 right-6 pointer-events-none hidden sm:block">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <line x1="28" y1="0" x2="28" y2="16" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
              <line x1="28" y1="0" x2="12" y2="0" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="px-8 py-14 sm:px-16 sm:py-16 text-center">
            <motion.p
              className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-4"
              {...rev(0.05)}
            >
              Start a Conversation
            </motion.p>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4"
              {...rev(0.1)}
            >
              Have a Space in Mind?
            </motion.h2>
            <motion.p
              className="text-slate-500 font-light text-lg leading-relaxed max-w-md mx-auto mb-10"
              {...rev(0.15)}
            >
              {"Tell us what you're planning, and let's discuss how to bring it to life."}
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 justify-center" {...rev(0.2)}>
              <Link
                to="/contact"
                className="group flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-red-500/20 transition-all"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-2xl transition-all bg-white hover:bg-slate-50"
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN ABOUT PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function About() {
  return (
    <main className="antialiased">
      <AboutHero />
      <StorySection />
      <WhatWeDo />
      <ProjectApproach />
      <FounderSection />
      <ProjectFootprint />
      <AboutCTA />
    </main>
  )
}
