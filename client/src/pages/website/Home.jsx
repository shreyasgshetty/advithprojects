import { memo } from 'react'
import HomeHero from '../../components/home/HomeHero'
import HomeTrustStrip from '../../components/home/HomeTrustStrip'
import HomeServices from '../../components/home/HomeServices'
import HomeFeaturedProjects from '../../components/home/HomeFeaturedProjects'
import HomeProcess from '../../components/home/HomeProcess'
import HomeWhyAdvith from '../../components/home/HomeWhyAdvith'
import HomeQualityCraft from '../../components/home/HomeQualityCraft'
import HomeTestimonials from '../../components/home/HomeTestimonials'
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

      {/* ── 6. Architectural Principles: Four Core Tenets ───────────── */}
      <HomeWhyAdvith />

      {/* ── 7. Engineering & Quality: Designed Carefully. Built Properly. */}
      <HomeQualityCraft />

      {/* ── 8. Client Experience: Editorial Accounts ────────────────── */}
      <HomeTestimonials />

      {/* ── 9. Final Action: Start a Project With Advith ────────────── */}
      <HomeCTA />
    </main>
  )
}

export default memo(Home)

