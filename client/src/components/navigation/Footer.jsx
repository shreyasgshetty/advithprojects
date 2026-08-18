import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm font-semibold text-slate-800">Advith Projects</p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Advith Projects. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <Link to="/services" className="hover:text-red-600 transition-colors">Services</Link>
            <Link to="/projects" className="hover:text-red-600 transition-colors">Projects</Link>
            <Link to="/about" className="hover:text-red-600 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-slate-400 uppercase tracking-widest text-center md:text-right">
            Construction · Architecture · Interior Design
          </p>
        </div>
      </div>
    </footer>
  )
}
