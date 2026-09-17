import ConstructionHero from './ConstructionHero'
import ConstructionOverview from './ConstructionOverview'
import ConstructionScopeTable from './ConstructionScopeTable'
import ConstructionProcessTimeline from './ConstructionProcessTimeline'
import ConstructionGovernance from './ConstructionGovernance'
import ConstructionCTASection from './ConstructionCTASection'

/**
 * CivilConstructionView
 *
 * Streamlined, professional, architectural presentation for `/services/construction`.
 * Follows a focused 5-part construction client narrative:
 * 1. Hero: Precision headline, technical metadata indicators, CAD elevation linework, and primary CTAs.
 * 2. 01 / Overview: Two-column editorial introduction bridging plans and physical reality.
 * 3. 02 / Scope: 3 structured engineering clusters (Substructure, Superstructure, Finishing).
 * 4. 03 / Process: Verified 7-stage linear construction methodology timeline.
 * 5. 04 / Governance: 6 site governance and quality oversight pillars from services.js.
 * 6. 05 / Conversion: Cross-discipline navigation and grounded consultation CTA.
 */
export default function CivilConstructionView({ service }) {
  return (
    <div className="antialiased bg-[#F7F7F5] selection:bg-red-600 selection:text-white min-h-screen">
      {/* 1. Hero Section */}
      <ConstructionHero service={service} />

      {/* 2. Overview & Execution Philosophy (01 / Execution Philosophy) */}
      <ConstructionOverview />

      {/* 3. Execution Scope (02 / Execution Scope) */}
      <ConstructionScopeTable />

      {/* 4. 7-Stage Construction Methodology Timeline (03 / Execution Methodology) */}
      <ConstructionProcessTimeline />

      {/* 5. Site Governance & Quality Standards (04 / Site Governance) */}
      <ConstructionGovernance />

      {/* 6. Cross-Discipline & Grounded Final CTA */}
      <ConstructionCTASection />
    </div>
  )
}
