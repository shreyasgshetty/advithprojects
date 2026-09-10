import ConstructionHero from './ConstructionHero'
import ConstructionOverview from './ConstructionOverview'
import ConstructionTypologies from './ConstructionTypologies'
import ConstructionScopeTable from './ConstructionScopeTable'
import ConstructionProcessTimeline from './ConstructionProcessTimeline'
import ConstructionGovernance from './ConstructionGovernance'
import ConstructionWhyUs from './ConstructionWhyUs'
import ConstructionProjectsShowcase from './ConstructionProjectsShowcase'
import ConstructionCTASection from './ConstructionCTASection'

/**
 * CivilConstructionView
 *
 * Professional, architectural, engineering-grounded presentation for `/services/construction`.
 * Follows a clear 8-part client narrative:
 * 1. Hero: Precision headline, technical metadata indicators, and primary CTAs.
 * 2. 01 / Overview: Two-column editorial introduction bridging plans and physical reality.
 * 3. 02 / Typologies: Real project categories directly anchored to verified projects.js data.
 * 4. 03 / Scope: 3 structured engineering clusters (Substructure, Superstructure, Finishing).
 * 5. 04 / Process: Verified 7-stage linear construction methodology timeline.
 * 6. 05 / Governance: 6 site governance and quality oversight pillars from services.js.
 * 7. 06 / Why Advith Projects: Grounded differentiators emphasizing accountability and coordination.
 * 8. 07 / Portfolio: Real civil construction case studies.
 * 9. 08 / Conversion: Cross-discipline navigation and grounded consultation CTA.
 */
export default function CivilConstructionView({ service }) {
  return (
    <div className="antialiased bg-[#F7F7F5] selection:bg-red-600 selection:text-white min-h-screen">
      {/* 1. Hero Section */}
      <ConstructionHero service={service} />

      {/* 2. Overview & Execution Philosophy */}
      <ConstructionOverview />

      {/* 3. Project Typologies (Integrated with real project data) */}
      <ConstructionTypologies />

      {/* 4. Execution Scope (Substructure, Superstructure, Finishing clusters) */}
      <ConstructionScopeTable />

      {/* 5. 7-Stage Construction Methodology Timeline */}
      <ConstructionProcessTimeline />

      {/* 6. Site Governance & Quality Standards */}
      <ConstructionGovernance />

      {/* 7. Why Advith Projects (Grounded Differentiators) */}
      <ConstructionWhyUs />

      {/* 8. Selected Construction Portfolio Projects */}
      <ConstructionProjectsShowcase />

      {/* 9. Cross-Discipline & Grounded Final CTA */}
      <ConstructionCTASection />
    </div>
  )
}
