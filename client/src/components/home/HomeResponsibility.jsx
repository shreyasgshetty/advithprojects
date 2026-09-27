import { useState, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Building2, Layers, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1]

const WORKFLOW_STEPS = [
  { step: '01', title: 'PLAN', desc: 'Site viability, zoning & budget parameters' },
  { step: '02', title: 'DESIGN', desc: 'Architectural drawings, spatial concepts & 3D' },
  { step: '03', title: 'ENGINEER', desc: 'IS-456 structural schedules & MEP integration' },
  { step: '04', title: 'BUILD', desc: 'Civil execution, materials & site supervision' },
  { step: '05', title: 'HANDOVER', desc: 'Turnkey interior fit-out & final quality sign-off' },
]

const INTEGRATED_NODES = [
  {
    id: 'arch',
    title: 'Architecture & Planning',
    role: 'Concept & Spatial Intent',
    icon: Compass,
    accent: 'text-amber-500 border-amber-300 bg-amber-50',
    detail: 'Complete architectural blueprints and working drawings developed with on-site buildability in mind from day one.',
  },
  {
    id: 'eng',
    title: 'Structural Engineering',
    role: 'IS-456 Rigor & Safety',
    icon: ShieldCheck,
    accent: 'text-blue-500 border-blue-300 bg-blue-50',
    detail: 'Structural coordination ensuring foundations, RCC frames, and load-bearing elements match architectural calculations exactly.',
  },
  {
    id: 'const',
    title: 'Civil Construction',
    role: 'Site Execution & Supervision',
    icon: Building2,
    accent: 'text-red-500 border-red-300 bg-red-50',
    detail: 'On-site execution with dedicated site engineers, material quality checks, and scheduled milestone verification.',
  },
  {
    id: 'int',
    title: 'Turnkey Interiors',
    role: 'Material & Joinery Polish',
    icon: Layers,
    accent: 'text-rose-500 border-rose-300 bg-rose-50',
    detail: 'Seamless transition into cabinetry, lighting, and finishes without contractor disputes or rework.',
  },
]

function HomeResponsibility() {
  const [activeNode, setActiveNode] = useState('arch')
  const shouldReduceMotion = useReducedMotion()

  const currentNode = INTEGRATED_NODES.find((n) => n.id === activeNode) || INTEGRATED_NODES[0]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
              CORE ADVITH PHILOSOPHY
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-6">
            One team. <br />
            <span className="text-red-600">Complete responsibility.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Conventional projects hire an architect, a separate civil contractor, and an independent
            interior designer. When problems arise on site, accountability fractures. We replace that
            friction with single-source accountability.
          </p>
        </div>

        {/* Contrast Grid: Fragmented Approach vs. The Advith Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: The Traditional Model (Fragmented) */}
          <div className="p-7 sm:p-8 bg-[#FAF6F6] border border-red-200/70 rounded-xl relative">
            <div className="flex items-center gap-2 text-red-700 font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <AlertTriangle className="w-4 h-4" />
              <span>THE FRAGMENTED MODEL (TRADITIONAL)</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-6 font-light">
              Hiring disconnected third parties inevitably leads to misaligned drawings, site revisions,
              finger-pointing between builder and architect, and budget escalation.
            </p>
            <div className="space-y-3 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-red-100">
                <span className="text-red-500 font-bold">✕</span>
                <span>Communication gaps between designer and civil contractor</span>
              </div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-red-100">
                <span className="text-red-500 font-bold">✕</span>
                <span>Conflicting drawings discovered during live execution</span>
              </div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-red-100">
                <span className="text-red-500 font-bold">✕</span>
                <span>Schedule drift and unexpected variation costs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>No single entity takes full ownership of the final outcome</span>
              </div>
            </div>
          </div>

          {/* Right: The Advith Solution (Unified) */}
          <div className="p-7 sm:p-8 bg-[#F4F9F6] border border-emerald-200/80 rounded-xl relative">
            <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>THE ADVITH INTEGRATED MODEL</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-6 font-light">
              One unified studio manages architectural design, structural engineering, civil construction,
              and turnkey interiors. A single team carries responsibility from start to finish.
            </p>
            <div className="space-y-3 font-mono text-xs text-slate-700">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Unified drawings coordinated with site engineering before pouring concrete</span>
              </div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Continuous quality control and IS-456 structural standards adherence</span>
              </div>
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-100">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Transparent milestone scheduling and proactive progress reports</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Single point of accountability for design, civil, and interior finish</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Visual Flow: PLAN → DESIGN → ENGINEER → BUILD → HANDOVER ── */}
        <div className="mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
            UNIFIED EXECUTION PIPELINE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="p-4 bg-slate-50 border border-slate-200/90 rounded-lg text-center relative group hover:border-slate-400 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest block mb-1">
                  STAGE {step.step}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-500 font-light leading-snug">{step.desc}</p>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Interactive Architectural Responsibility Diagram ── */}
        <div className="bg-[#FAF9F6] border border-slate-200/90 p-6 sm:p-10 rounded-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 block mb-1">
              STRUCTURAL COORDINATION SCHEMATIC
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              All Disciplines Governed By One Lead Team
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-1">
              Click or hover on any discipline node below to inspect its role within the coordinated workflow.
            </p>
          </div>

          {/* Central Hub and 4 Interactive Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {INTEGRATED_NODES.map((node) => {
              const Icon = node.icon
              const isSelected = activeNode === node.id

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  onMouseEnter={() => setActiveNode(node.id)}
                  className={`p-5 text-left transition-all duration-200 border rounded-xl cursor-pointer ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${node.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{node.title}</h4>
                  <p className="text-[11px] font-mono text-slate-500 uppercase">{node.role}</p>
                </button>
              )
            })}
          </div>

          {/* Active Node Detail Context Box */}
          <motion.div
            key={activeNode}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EXPO }}
            className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
          >
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">
                {currentNode.title}
              </span>
              <p className="text-slate-700 font-sans text-sm leading-relaxed">
                {currentNode.detail}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Single Accountability</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeResponsibility)
