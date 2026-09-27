import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../../assets/logo.webp'

// ─── Easing ────────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

// ─── Timing (ms) ───────────────────────────────────────────────────────────
// step 1: grid lines appear immediately
// step 2: logo reveals          450ms
// step 3: primary tagline       1200ms  (staggered words)
// step 4: secondary line        1950ms
// step 5: text + bg fade out    3100ms  (logo stays, layoutId hands off)
// onComplete                    3700ms  → Home mounts, layoutId travels
const T = { logo: 450, tag1: 1200, tag2: 1950, exit: 3100, done: 3700 }

// Primary tagline — each token gets its own staggered reveal
const TAG1 = [
  { id: 'w1', text: 'Build',   type: 'word' },
  { id: 'd1', text: '·',       type: 'dot'  },
  { id: 'w2', text: 'Design',  type: 'word' },
  { id: 'd2', text: '·',       type: 'dot'  },
  { id: 'w3', text: 'Inspire', type: 'word' },
]
const WORD_STAGGER = 0.14  // seconds between each token

export default function CinematicIntro({ onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 0)
    const t2 = setTimeout(() => setStep(2), T.logo)
    const t3 = setTimeout(() => setStep(3), T.tag1)
    const t4 = setTimeout(() => setStep(4), T.tag2)
    const t5 = setTimeout(() => setStep(5), T.exit)
    const t6 = setTimeout(() => onComplete?.(), T.done)
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
  }, [onComplete])

  const skip = () => {
    setStep(5)
    setTimeout(() => onComplete?.(), 620)
  }

  // Whether text/bg should be fading out (step 5)
  const exiting = step >= 5

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden select-none"
      style={{ minHeight: '100svh', background: 'white' }}
    >
      {/* ══ LAYER 1 — Background: grid + architectural lines ══════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ap-grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="0.6" />
            </pattern>
          </defs>

          <motion.rect
            width="100%" height="100%"
            fill="url(#ap-grid)"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          <motion.line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="rgba(15,23,42,0.06)" strokeWidth="0.75" strokeDasharray="5 7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1.8, ease: EASE }}
          />

          <motion.line
            x1="50%" y1="0" x2="50%" y2="100%"
            stroke="rgba(15,23,42,0.06)" strokeWidth="0.75" strokeDasharray="5 7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
            transition={{ duration: 1.8, delay: 0.12, ease: EASE }}
          />

          {/* Red corner bracket — top-left */}
          <motion.path
            d="M 36 96 L 36 36 L 96 36"
            fill="none" stroke="rgba(185,28,28,0.32)" strokeWidth="1.2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.85, ease: EXPO }}
          />

          {/* Red corner bracket — bottom-right (rotated) */}
          <motion.path
            d="M 36 96 L 36 36 L 96 36"
            fill="none" stroke="rgba(185,28,28,0.32)" strokeWidth="1.2" strokeLinecap="round"
            style={{ transformOrigin: '50% 50%', transform: 'rotate(180deg)' }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: EXPO }}
          />
        </svg>

        {/* Ambient red glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 55% 40% at 50% 44%, rgba(220,38,38,0.07) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </motion.div>

      {/* ══ LAYER 2 — Center composition ══════════════════════════════════ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

        {/* ── LOGO — layoutId links this to the navbar logo in Home ──────── */}
        <motion.img
          layoutId="advith-logo"
          src={logoImg}
          alt="Advith Projects"
          draggable={false}
          // Responsive intro size: 140 / 180 / 220px tall
          className="h-[140px] sm:h-[180px] md:h-[220px] w-auto object-contain flex-shrink-0"
          style={{ filter: 'drop-shadow(0 10px 32px rgba(185,28,28,0.16))' }}
          // Reveal animation
          initial={{ opacity: 0, scale: 0.84, filter: 'blur(12px)' }}
          animate={
            step >= 2
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.84, filter: 'blur(12px)' }
          }
          transition={{ duration: 1.05, ease: EXPO }}
        />

        {/* Shimmer sweep — only during active display */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="shimmer"
              className="absolute pointer-events-none overflow-hidden"
              style={{
                // Approximate logo bounding box; shimmer is decorative
                width: 'clamp(140px, 35vw, 220px)',
                height: 'clamp(140px, 35vw, 220px)',
              }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(108deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%)',
                }}
                initial={{ x: '-110%' }}
                animate={{ x: '210%' }}
                transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TAGLINES ─────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center"
          style={{ marginTop: 'clamp(16px, 4vw, 30px)' }}
        >
          {/* Hairline divider */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                key="divider"
                className="h-px bg-gradient-to-r from-transparent via-red-500/45 to-transparent origin-center mb-4"
                style={{ width: 'clamp(48px, 10vw, 80px)' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: exiting ? 0 : 1, opacity: exiting ? 0 : 1 }}
                transition={{ duration: 0.5, ease: EXPO }}
              />
            )}
          </AnimatePresence>

          {/* PRIMARY — staggered word-by-word reveal */}
          <div
            className="flex items-center"
            style={{ gap: 'clamp(4px, 1.2vw, 10px)' }}
          >
            {TAG1.map(({ id, text, type }, i) => (
              <AnimatePresence key={id}>
                {step >= 3 && (
                  <motion.span
                    key={id}
                    className={type === 'dot' ? 'text-red-600' : 'font-semibold text-slate-800'}
                    style={{
                      fontSize: 'clamp(10px, 2.4vw, 14px)',
                      letterSpacing: type === 'word' ? 'clamp(0.14em, 1vw, 0.28em)' : '0',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                    }}
                    initial={{ opacity: 0, y: 7, filter: 'blur(4px)' }}
                    animate={
                      exiting
                        ? { opacity: 0, y: 4, filter: 'blur(3px)' }
                        : { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }
                    exit={{ opacity: 0 }}
                    transition={{
                      // Stagger each token: words get full delay, dots get half-step
                      delay: exiting ? 0 : i * WORD_STAGGER,
                      duration: exiting ? 0.3 : 0.45,
                      ease: EXPO,
                    }}
                  >
                    {text}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* SECONDARY — appears after primary, fades before it */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.p
                key="secondary"
                className="text-slate-400 font-light uppercase text-center px-4"
                style={{
                  fontSize: 'clamp(9px, 1.8vw, 11px)',
                  letterSpacing: 'clamp(0.08em, 0.7vw, 0.2em)',
                  marginTop: 'clamp(6px, 1.5vw, 10px)',
                }}
                initial={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
                animate={
                  exiting
                    ? { opacity: 0, y: 3, filter: 'blur(2px)' }
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                exit={{ opacity: 0 }}
                transition={{ duration: exiting ? 0.25 : 0.65, ease: EXPO }}
              >
                Construction&nbsp;·&nbsp;Architecture&nbsp;·&nbsp;Interiors
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ LAYER 3 — Progress bar + Skip ════════════════════════════════ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px) + 16px, 28px)' }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-28 sm:w-32 h-[1.5px] bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #b91c1c, #ef4444, #f87171)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: T.exit / 1000, ease: 'linear' }}
          />
        </div>
        <button
          onClick={skip}
          className="text-[10px] sm:text-[11px] uppercase text-slate-400 hover:text-slate-600 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded px-2 py-1"
          style={{ letterSpacing: '0.2em' }}
        >
          skip
        </button>
      </motion.div>
    </div>
  )
}
