import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import logoImg from '../../assets/logo.webp'
import { MAILTO_URL, EMAIL } from '../../config/contact'

// Set the official Advith Projects Instagram URL when available
const INSTAGRAM_URL = 'https://www.instagram.com/advith_projects_/'

// Outlined Lucide-spec Instagram icon (lucide-react v1+ removed brand icons)
function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1220] border-t border-slate-800 text-slate-300 overflow-hidden">
      {/* Very subtle architectural accent line in background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10 sm:pt-16 sm:pb-12">
        {/* ── Closing Statement / Pre-Footer CTA ── */}
        <div className="pb-12 border-b border-slate-800/90 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-red-400">
                Start a Conversation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white">
              Have a Space in Mind?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Let’s bring your ideas to life with purposeful architecture and crafted execution.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-slate-900 hover:bg-red-600 text-white text-sm font-medium border border-slate-700/80 hover:border-red-600 transition-all duration-200 group shadow-sm hover:shadow-red-600/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="pt-12 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand & Description */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link to="/" className="inline-block group" aria-label="Advith Projects Home">
              <img
                src={logoImg}
                alt="Advith Projects"
                className="w-28 sm:w-36 md:w-44 h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                style={{ filter: 'brightness(1.08) drop-shadow(0 4px 18px rgba(220, 38, 38, 0.22))' }}
              />
            </Link>
            <p className="mt-3.5 sm:mt-5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Construction, architecture, and interior environments shaped around your vision and engineered with precision.
            </p>
          </div>

          {/* Navigation, Services, Connect */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Explore Column */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-red-600 rounded-full" aria-hidden="true" />
                Explore
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link
                    to="/services"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-slate-700 rounded-full" aria-hidden="true" />
                Services
              </p>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <Link
                    to="/services/construction"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Construction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/architecture"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Architecture &amp; Planning
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/interiors"
                    className="inline-flex items-center hover:text-white transition-all duration-200 hover:translate-x-0.5"
                  >
                    Interiors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-red-600 rounded-full" aria-hidden="true" />
                Connect
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Advith Projects on Instagram"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={MAILTO_URL}
                  aria-label={`Email Advith Projects at ${EMAIL}`}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-slate-800/90 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Advith Projects. All rights reserved.</p>

          <p className="text-slate-400 font-mono text-[11px] tracking-wide text-center">
            Bengaluru · Chikkamagaluru · Mysuru · Hassan
          </p>

          <p className="text-slate-400 font-medium">
            Construction · Architecture · Interiors
          </p>
        </div>
      </div>
    </footer>
  )
}
