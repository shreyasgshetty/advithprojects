/**
 * Services data — structured as a plain JS array so it can later be
 * swapped with a backend API call without touching page/component code.
 */

export const services = [
  {
    slug: 'construction',
    path: '/services/construction',
    title: 'Civil Construction',
    shortTitle: 'Construction',
    tagline: 'Built to last. Delivered on time.',
    navDescription:
      'End-to-end construction solutions focused on structural quality, execution, safety, and timely delivery.',
    heroDescription:
      'From ground-breaking to handover, Advith Projects manages every phase of civil construction with meticulous planning, rigorous quality standards, and dependable execution.',
    capabilities: [
      {
        id: 'residential',
        title: 'Residential Construction',
        desc: 'Bungalows, row-houses, independent villas, and multi-unit residences crafted with care and precision.',
      },
      {
        id: 'commercial',
        title: 'Commercial Construction',
        desc: 'Office spaces, retail units, showrooms, and commercial complexes built to exacting functional specifications.',
      },
      {
        id: 'rcc',
        title: 'RCC & Structural Works',
        desc: 'Reinforced cement concrete foundations, slabs, columns, and structural framing executed to design intent.',
      },
      {
        id: 'masonry',
        title: 'Masonry & Brickwork',
        desc: 'Precision brickwork, block masonry, load-bearing walls, and partition systems with quality material selection.',
      },
      {
        id: 'waterproofing',
        title: 'Waterproofing & Damp-proofing',
        desc: 'Comprehensive waterproofing for rooftops, basements, wet areas, and external facades to ensure long-term protection.',
      },
      {
        id: 'finishing',
        title: 'Plastering & Finishing Works',
        desc: 'Internal and external plaster, flooring, painting, and building finishes delivered to specification.',
      },
      {
        id: 'renovation',
        title: 'Renovation & Refurbishment',
        desc: 'Careful structural and aesthetic renovation of existing buildings with minimal disruption and maximum improvement.',
      },
      {
        id: 'turnkey',
        title: 'Turnkey Construction',
        desc: 'Complete project management from design coordination through material procurement to final handover.',
      },
    ],
    process: [
      { step: '01', title: 'Requirement & Site Understanding', desc: 'Detailed discussion of client requirements, site conditions, and project scope.' },
      { step: '02', title: 'Planning & Estimation', desc: 'Preparation of preliminary design, scope of work, and budget estimation.' },
      { step: '03', title: 'Structural & Execution Planning', desc: 'Structural design coordination, material scheduling, and execution sequencing.' },
      { step: '04', title: 'Construction', desc: 'Phased execution with site supervision, material quality control, and progress tracking.' },
      { step: '05', title: 'Quality & Safety Checks', desc: 'Regular inspections, structural checks, and safety protocol adherence throughout.' },
      { step: '06', title: 'Finishing', desc: 'Interior and exterior finishing works, systems integration, and site clean-up.' },
      { step: '07', title: 'Handover', desc: 'Final walkthrough, client acceptance, documentation, and project closeout.' },
    ],
    principles: [
      { title: 'Material Quality', desc: 'Specified materials sourced from reliable suppliers and tested before use.' },
      { title: 'Workmanship', desc: 'Skilled tradespeople with consistent quality monitoring across all work packages.' },
      { title: 'Safety First', desc: 'Site safety protocols, protective equipment, and regular safety audits.' },
      { title: 'Schedule Discipline', desc: 'Planned milestones with proactive mitigation of schedule risks.' },
      { title: 'Client Communication', desc: 'Transparent reporting and regular site updates throughout construction.' },
      { title: 'Site Coordination', desc: 'Coordinated management of subcontractors, suppliers, and on-site teams.' },
    ],
    projectTypes: ['Residential Villas', 'Commercial Complexes', 'Row Houses', 'Renovations', 'Turnkey Builds'],
    icon: 'building2',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    borderClass: 'border-red-100',
  },
  {
    slug: 'architecture',
    path: '/services/architecture',
    title: 'Architecture',
    shortTitle: 'Architecture',
    tagline: 'Spaces begin with thoughtful planning.',
    navDescription:
      'Thoughtful architectural planning combining functionality, aesthetics, engineering, and site context.',
    heroDescription:
      'Architecture shapes how people live, work, and experience space. Advith Projects approaches every project with a disciplined design process that balances function, context, material, and light.',
    capabilities: [
      {
        id: 'concept',
        title: 'Concept Development',
        desc: 'Early-stage design exploration translating client vision and site conditions into spatial concepts.',
      },
      {
        id: 'site-planning',
        title: 'Site Planning',
        desc: 'Careful analysis of site orientation, setbacks, access, landscape, and regulatory constraints.',
      },
      {
        id: 'floor-plans',
        title: 'Floor Plan Development',
        desc: 'Detailed floor plans optimised for spatial flow, natural light, ventilation, and functional requirements.',
      },
      {
        id: 'design',
        title: 'Architectural Design',
        desc: 'Development of complete architectural design across all building elements and spatial relationships.',
      },
      {
        id: 'elevation',
        title: 'Elevation Design',
        desc: 'Facade design integrating material, proportion, fenestration, and contextual considerations.',
      },
      {
        id: 'visualization',
        title: '3D Visualization',
        desc: 'Realistic 3D renderings and walkthroughs to communicate design intent before construction begins.',
      },
      {
        id: 'documentation',
        title: 'Construction Documentation',
        desc: 'Complete architectural drawing sets for structural, MEP coordination, and statutory approvals.',
      },
      {
        id: 'coordination',
        title: 'Design Coordination',
        desc: 'Integration of architectural, structural, and MEP design to ensure buildable, coordinated documentation.',
      },
    ],
    process: [
      { step: '01', title: 'Understand', desc: 'Client brief, site conditions, regulatory framework, and aspirational intent.' },
      { step: '02', title: 'Conceptualize', desc: 'Develop spatial concepts, form studies, and design direction options.' },
      { step: '03', title: 'Develop', desc: 'Refine selected concept into detailed architectural design across all aspects.' },
      { step: '04', title: 'Visualize', desc: 'Produce 3D visualizations, material studies, and spatial presentations.' },
      { step: '05', title: 'Document', desc: 'Produce complete construction documentation and coordinated drawing sets.' },
      { step: '06', title: 'Coordinate', desc: 'Support construction through design clarifications and site coordination.' },
    ],
    deliverables: ['Floor Plans', 'Elevations & Sections', '3D Visualizations', 'Site Plans', 'Material Concepts', 'Construction Documents'],
    philosophy: [
      { label: 'Function', desc: 'Every space must work beautifully for the people who use it.' },
      { label: 'Context', desc: 'Architecture responds to its site, climate, and surroundings.' },
      { label: 'Material', desc: 'Materials define character, durability, and the sensory experience of space.' },
      { label: 'Light', desc: 'Natural light shapes atmosphere and connects occupants to the environment.' },
      { label: 'Structure', desc: 'Good design integrates structural logic with spatial intent.' },
    ],
    icon: 'compass',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-100',
  },
  {
    slug: 'interiors',
    path: '/services/interiors',
    title: 'Interior Design',
    shortTitle: 'Interiors',
    tagline: 'Spaces that reflect who you are.',
    navDescription:
      'Complete interior environments combining materials, lighting, spatial planning, detailing, and execution.',
    heroDescription:
      'Interior design at Advith Projects is about creating environments that are beautiful, functional, and deeply personal. We approach every project with careful attention to material, light, proportion, and craft.',
    capabilities: [
      {
        id: 'space-planning',
        title: 'Space Planning',
        desc: 'Functional planning of internal spaces to optimise flow, use, and proportional relationships.',
      },
      {
        id: 'material',
        title: 'Material & Finish Selection',
        desc: 'Curated selection of flooring, wall finishes, cladding, and surface materials.',
      },
      {
        id: 'furniture',
        title: 'Furniture Planning & Selection',
        desc: 'Custom and specified furniture layouts designed for both form and daily function.',
      },
      {
        id: 'lighting',
        title: 'Lighting Design',
        desc: 'Layered ambient, task, and accent lighting schemes enhancing atmosphere and visual comfort.',
      },
      {
        id: 'kitchen',
        title: 'Kitchen Design',
        desc: 'Efficient, beautiful kitchen layouts with custom cabinetry, counters, and appliance integration.',
      },
      {
        id: 'living',
        title: 'Living & Dining Spaces',
        desc: 'Holistic living room and dining space design around comfort, character, and lifestyle.',
      },
      {
        id: 'bedroom',
        title: 'Bedroom & Private Spaces',
        desc: 'Restful bedroom environments with thoughtful wardrobe design, textures, and personal touches.',
      },
      {
        id: 'commercial-interiors',
        title: 'Commercial Interiors',
        desc: 'Office, hospitality, and retail interiors balancing brand identity with operational performance.',
      },
      {
        id: 'turnkey-execution',
        title: 'Turnkey Execution',
        desc: 'End-to-end interior delivery from design concept through procurement to final installation.',
      },
    ],
    process: [
      { step: '01', title: 'Understand the Space', desc: 'Site measurement, existing conditions, architectural context, and structural constraints.' },
      { step: '02', title: 'Understand the Client', desc: 'Lifestyle, preferences, aspirations, functional requirements, and budget parameters.' },
      { step: '03', title: 'Develop the Concept', desc: 'Design direction, mood, spatial organisation, and material palette.' },
      { step: '04', title: 'Select Materials', desc: 'Detailed material, finish, and furniture selection with sample approvals.' },
      { step: '05', title: 'Visualize', desc: 'Rendered 3D visuals, mood boards, and layout drawings for client review.' },
      { step: '06', title: 'Execute', desc: 'Coordinated on-site execution, vendor management, and quality supervision to completion.' },
    ],
    styles: [
      { name: 'Contemporary', desc: 'Clean forms, neutral palette, and refined material combinations.' },
      { name: 'Minimal', desc: 'Considered reduction to essentials with extraordinary attention to detail.' },
      { name: 'Modern', desc: 'Confident forms, strong geometry, and curated material expression.' },
      { name: 'Luxury', desc: 'Premium materials, bespoke furniture, and carefully crafted detail.' },
      { name: 'Warm & Natural', desc: 'Organic materials, soft tones, and inviting textures.' },
    ],
    materialFocus: [
      { label: 'Materials', desc: 'Stone, wood, metal, and composite surfaces selected for quality and character.' },
      { label: 'Lighting', desc: 'Carefully specified lighting to support function, ambiance, and spatial hierarchy.' },
      { label: 'Texture', desc: 'Tactile variety across surfaces creating depth and sensory richness.' },
      { label: 'Colour', desc: 'Considered colour palettes anchored in a primary tone with complementary accents.' },
      { label: 'Furniture', desc: 'Custom and specified pieces contributing to both comfort and aesthetic coherence.' },
      { label: 'Detailing', desc: 'Joinery, profiles, hardware, and transitions that distinguish quality interiors.' },
    ],
    icon: 'layers',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-600',
    borderClass: 'border-rose-100',
  },
]

/**
 * Helper — get a single service by slug.
 * @param {string} slug
 */
export function getService(slug) {
  return services.find((s) => s.slug === slug) ?? null
}
