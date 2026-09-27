import { memo } from 'react'
import HomeHero from '../../components/home/HomeHero'
import HomeTrustStrip from '../../components/home/HomeTrustStrip'
import HomeServices from '../../components/home/HomeServices'
import HomeResponsibility from '../../components/home/HomeResponsibility'
import HomeFeaturedProjects from '../../components/home/HomeFeaturedProjects'
import HomeProcess from '../../components/home/HomeProcess'
import HomeWhyAdvith from '../../components/home/HomeWhyAdvith'
import HomeQualityCraft from '../../components/home/HomeQualityCraft'
import HomeTestimonials from '../../components/home/HomeTestimonials'
import HomeKarnatakaPresence from '../../components/home/HomeKarnatakaPresence'
import HomeCTA from '../../components/home/HomeCTA'

function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-red-600 selection:text-white">
      {/* ── 1. Architectural Hero with Presentation Board ────────────── */}
      <HomeHero />

      {/* ── 2. Quick Trust Strip: One Team. Three Disciplines. ───────── */}
      <HomeTrustStrip />

      {/* ── 3. What We Do: Editorial Discipline Presentation ─────────── */}
      <HomeServices />

      {/* ── 4. Selected Work: Architectural Magazine Showcase ────────── */}
      <HomeFeaturedProjects />

      {/* ── 5. How We Work: Linear Construction Timeline ─────────────── */}
      <HomeProcess />

      {/* ── 6. Differentiator: One Team. Complete Responsibility. ────── */}
      <HomeResponsibility />

      {/* ── 7. Architectural Principles: Four Core Tenets ───────────── */}
      <HomeWhyAdvith />

      {/* ── 8. Engineering & Quality: Designed Carefully. Built Properly. */}
      <HomeQualityCraft />

      {/* ── 9. Geographic Footprint: Working Across Karnataka ───────── */}
      <HomeKarnatakaPresence />

      {/* ── 10. Client Experience: Editorial Accounts ────────────────── */}
      <HomeTestimonials />

      {/* ── 11. Final Action: Start a Project With Advith ────────────── */}
      <HomeCTA />
    </main>
  )
}

export default memo(Home)
