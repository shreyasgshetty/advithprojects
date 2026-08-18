import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { PhoneCall, Menu } from 'lucide-react'
import logoImg from '../../assets/logo.webp'
import MobileNavigation from './MobileNavigation'

const EXPO = [0.16, 1, 0.3, 1]
const EASE = [0.22, 1, 0.36, 1]

const navItems = [
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          {/* Brand Logo with shared layoutId transition */}
          <Link to="/" className="flex items-center" aria-label="Advith Projects Home">
            <motion.img
              layoutId="advith-logo"
              src={logoImg}
              alt="Advith Projects"
              className="h-12 w-auto object-contain"
              transition={{ type: 'spring', stiffness: 280, damping: 32, mass: 1 }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.45, ease: EXPO }}
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

          {/* Action Button (Desktop) & Hamburger Menu (Mobile) */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
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

            {/* Mobile Menu Trigger */}
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

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
