import ArchitectureHero from './ArchitectureHero'
import ArchitectureApproach from './ArchitectureApproach'
import ArchitectureScope from './ArchitectureScope'
import ArchitectureProcess from './ArchitectureProcess'
import ArchitecturePrinciples from './ArchitecturePrinciples'
import ArchitectureCTASection from './ArchitectureCTASection'

/**
 * ArchitectureView
 *
 * Professional, contextual architectural design presentation for `/services/architecture`.
 * Matches the Civil Construction design system with an architecture-specific identity:
 * 1. Hero: Editorial headline, drafting grid, schematic plan CAD linework, and dual CTAs.
 * 2. 01 / Approach: Two-column narrative balancing context, light, and structural logic.
 * 3. 02 / Scope: 3 structured phases (Concept, Spatial Planning, Construction Docs).
 * 4. 03 / Process: Verified 6-stage linear design methodology timeline.
 * 5. 04 / Principles: 5 core architectural standards (Function, Context, Material, Light, Structure).
 * 6. 05 / Conversion: Cross-discipline navigation and grounded consultation CTA.
 */
export default function ArchitectureView({ service }) {
  return (
    <div className="antialiased bg-[#F7F7F5] selection:bg-amber-600 selection:text-white min-h-screen">
      {/* 1. Hero Section */}
      <ArchitectureHero service={service} />

      {/* 2. Approach & Philosophy (01 / Design Approach) */}
      <ArchitectureApproach />

      {/* 3. Architectural Scope (02 / Architectural Scope) */}
      <ArchitectureScope />

      {/* 4. 6-Stage Design Methodology Timeline (03 / Design Methodology) */}
      <ArchitectureProcess />

      {/* 5. Core Architectural Standards (04 / Design Principles) */}
      <ArchitecturePrinciples />

      {/* 6. Cross-Discipline & Grounded Final CTA */}
      <ArchitectureCTASection />
    </div>
  )
}
