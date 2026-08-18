import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { PhoneCall, Menu, ChevronDown, Building2, Compass, Layers } from 'lucide-react'
import logoImg from '../../assets/logo.webp'
import MobileNavigation from './MobileNavigation'

const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

const serviceDropdownItems = [
  {
    icon: Building2,
    name: 'Civil Construction',
    desc: 'End-to-end construction solutions focused on structural quality, execution, safety, and timely delivery.',
    path: '/services/construction',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
  },
  {
    icon: Compass,
    name: 'Architecture',
    desc: 'Thoughtful architectural planning combining functionality, aesthetics, engineering, and site context.',
    path: '/services/architecture',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
  },
  {
    icon: Layers,
    name: 'Interior Design',
    desc: 'Complete interior environments combining materials, lighting, spatial planning, detailing, and execution.',
    path: '/services/interiors',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-600',
  },
]

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.25, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleServiceNavigate = (path) => {
    setServicesOpen(false)
    navigate(path)
  }

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Navbar background */}
        <motion.div
          className="absolute inset-0 bg-white/90 backdrop-blur-lg border-b border-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center" aria-label="Advith Projects Home">
            <motion.img
              layoutId="advith-logo"
              src={logoImg}
              alt="Advith Projects"
              className="h-12 w-auto object-contain"
              transition={{ type: 'spring', stiffness: 280, damping: 32, mass: 1 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {/* Services with dropdown */}
            <motion.div
              ref={dropdownRef}
              className="relative"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45, ease: EXPO }}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1 transition-colors duration-200 hover:text-red-600 focus:outline-none ${
                  servicesOpen ? 'text-red-600' : 'text-slate-600'
                }`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-label="Services menu"
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseLeave={() => setServicesOpen(false)}
                    role="menu"
                  >
                    <div className="grid grid-cols-1 divide-y divide-slate-50">
                      {serviceDropdownItems.map((item, i) => {
                        const Icon = item.icon
                        return (
                          <motion.button
                            key={item.path}
                            type="button"
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={() => handleServiceNavigate(item.path)}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                            role="menuitem"
                          >
                            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.bgClass} ${item.textClass}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90 group-hover:text-red-400 transition-colors shrink-0 mt-0.5" />
                          </motion.button>
                        )
                      })}
                    </div>
                    {/* All services link */}
                    <div className="mt-1 pt-2 border-t border-slate-50">
                      <button
                        type="button"
                        onClick={() => handleServiceNavigate('/services')}
                        className="w-full text-center text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors py-2 focus:outline-none"
                      >
                        View All Services →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other nav links */}
            {[
              { name: 'Projects', path: '/projects', delay: 0.52 },
              { name: 'About', path: '/about', delay: 0.59 },
              { name: 'Contact', path: '/contact', delay: 0.66 },
            ].map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.45, ease: EXPO }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors duration-200 hover:text-red-600 ${
                      isActive ? 'text-red-600 font-semibold' : 'text-slate-600'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.div
              className="hidden sm:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.45, ease: EXPO }}
            >
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-red-500/20"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
