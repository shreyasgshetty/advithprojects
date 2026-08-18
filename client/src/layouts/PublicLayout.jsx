import { Outlet } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
