import InteriorsHero from './InteriorsHero'
import InteriorsApproach from './InteriorsApproach'
import InteriorsScope from './InteriorsScope'
import InteriorsProcess from './InteriorsProcess'
import InteriorsMaterials from './InteriorsMaterials'
import InteriorsCTASection from './InteriorsCTASection'

/**
 * InteriorsView
 *
 * Professional, material-focused interior design presentation for `/services/interiors`.
 * Matches the Civil Construction and Architecture design system with an interior-specific identity:
 * 1. Hero: Editorial headline, drafting grid, custom joinery CAD linework, and dual CTAs.
 * 2. 01 / Approach: Two-column narrative balancing lifestyle, tactile surfaces, and spatial flow.
 * 3. 02 / Scope: 3 structured phases (Space Planning, Custom Joinery, Turnkey Delivery).
 * 4. 03 / Process: Verified 6-stage linear interior workflow timeline.
 * 5. 04 / Materials: 6 core tactile and detailing focus standards from services.js.
 * 6. 05 / Conversion: Cross-discipline navigation and grounded consultation CTA.
 */
export default function InteriorsView({ service }) {
  return (
    <div className="antialiased bg-[#F7F7F5] selection:bg-rose-600 selection:text-white min-h-screen">
      {/* 1. Hero Section */}
      <InteriorsHero service={service} />

      {/* 2. Approach & Philosophy (01 / Interior Philosophy) */}
      <InteriorsApproach />

      {/* 3. Interior Scope (02 / Interior Scope) */}
      <InteriorsScope />

      {/* 4. 6-Stage Interior Workflow Timeline (03 / Interior Workflow) */}
      <InteriorsProcess />

      {/* 5. Material & Detail Focus (04 / Material & Detail Focus) */}
      <InteriorsMaterials />

      {/* 6. Cross-Discipline & Grounded Final CTA */}
      <InteriorsCTASection />
    </div>
  )
}
