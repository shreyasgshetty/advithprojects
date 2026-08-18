import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { X, PhoneCall } from 'lucide-react'
import logoImg from '../../assets/logo.webp'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function MobileNavigation({ isOpen, onClose }) {
  // Close menu on Escape key press and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
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
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col justify-between p-6 z-10 border-l border-slate-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link to="/" onClick={onClose} className="flex items-center">
                  <img
                    src={logoImg}
                    alt="Advith Projects"
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation links list */}
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? 'bg-red-50 text-red-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                        }`
                      }
                      end={link.path === '/'}
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom CTA section */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md shadow-red-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Enquire Now</span>
              </Link>
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest">
                  Advith Projects · Architecture · Interiors
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
