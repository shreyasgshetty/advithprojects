import { Outlet } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'
import ScrollToTop from '../components/navigation/ScrollToTop'
import SmoothScroll from '../components/navigation/SmoothScroll'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased">
      {/*
        ScrollToTop and SmoothScroll are inside Router context,
        applying smoothly and globally to all routes.
      */}
      <SmoothScroll />
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
