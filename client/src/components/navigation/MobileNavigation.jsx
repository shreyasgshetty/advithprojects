import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { X, PhoneCall, ChevronDown, Building2, Compass, Layers } from 'lucide-react'
import logoImg from '../../assets/logo.webp'

const EXPO = [0.16, 1, 0.3, 1]

const serviceLinks = [
  { icon: Building2, name: 'Civil Construction', path: '/services/construction', bgClass: 'bg-red-50', textClass: 'text-red-600' },
  { icon: Compass, name: 'Architecture', path: '/services/architecture', bgClass: 'bg-amber-50', textClass: 'text-amber-600' },
  { icon: Layers, name: 'Interior Design', path: '/services/interiors', bgClass: 'bg-rose-50', textClass: 'text-rose-600' },
]

const topLinks = [
  { name: 'Home', path: '/', exact: true },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function MobileNavigation({ isOpen, onClose }) {
  const [servicesExpanded, setServicesExpanded] = useState(false)

  // Reset sub-menu on drawer close
  useEffect(() => {
    if (!isOpen) setServicesExpanded(false)
  }, [isOpen])

  // Escape key + body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-10 border-l border-slate-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <Link to="/" onClick={onClose}>
                <img src={logoImg} alt="Advith Projects" className="h-10 w-auto object-contain" />
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable nav area */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {/* Home */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.3, ease: EXPO }}
              >
                <NavLink
                  to="/"
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>Home</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                    </>
                  )}
                </NavLink>
              </motion.div>

              {/* Services expandable */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.3, ease: EXPO }}
              >
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-all"
                  aria-expanded={servicesExpanded}
                >
                  <span>Services</span>
                  <motion.span animate={{ rotate: servicesExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {servicesExpanded && (
                    <motion.div
                      className="ml-2 mt-1 space-y-1 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* All services link */}
                      <NavLink
                        to="/services"
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'
                          }`
                        }
                        end
                      >
                        All Services
                      </NavLink>

                      {serviceLinks.map((svc) => {
                        const Icon = svc.icon
                        return (
                          <NavLink
                            key={svc.path}
                            to={svc.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'
                              }`
                            }
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${svc.bgClass} ${svc.textClass} shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            {svc.name}
                          </NavLink>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remaining top-level links */}
              {topLinks.slice(1).map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16 + idx * 0.05, duration: 0.3, ease: EXPO }}
                >
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                        isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 py-6 border-t border-slate-100 space-y-3">
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md shadow-red-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Enquire Now</span>
              </Link>
              <p className="text-center text-xs text-slate-400 uppercase tracking-widest">
                Construction · Architecture · Interiors
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
