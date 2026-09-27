/**
 * Services data — structured as a plain JS array so it can later be
 * swapped with a backend API call without touching page/component code.
 *
 * Each service now includes:
 *   - atAGlance  — compact summary for the "At a Glance" section
 *   - whoFor     — target audience cards
 *   - deliverables — what the client receives (object format for all three)
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
    atAGlance: {
      bestFor: ['New Homes', 'Villas', 'Row Houses', 'Commercial Buildings', 'Renovation'],
      coreFocus: ['Execution', 'Quality', 'Coordination'],
      typicalScope: ['Structure', 'Finishes', 'Waterproofing', 'Turnkey'],
      processStageCount: 7,
    },
    whoFor: [
      {
        id: 'new-home-const',
        label: 'New Home Construction',
        desc: 'From foundation to handover for residential projects — independent homes, villas, and bungalows.',
      },
      {
        id: 'row-houses',
        label: 'Row Houses',
        desc: 'Series of residential units with consistent architectural quality and structural precision across each unit.',
      },
      {
        id: 'commercial-const',
        label: 'Commercial Buildings',
        desc: 'Office complexes, showrooms, and retail developments built to functional and structural specification.',
      },
      {
        id: 'renovation',
        label: 'Renovation Projects',
        desc: 'Careful structural and aesthetic refurbishment of existing buildings with minimal disruption.',
      },
      {
        id: 'turnkey',
        label: 'Turnkey Requirements',
        desc: 'Complete project management from design coordination, material procurement, through to final handover.',
      },
    ],
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
      { title: 'Material Quality', desc: 'Specified materials sourced from reliable suppliers and verified before use on site.' },
      { title: 'Workmanship', desc: 'Skilled tradespeople with consistent quality monitoring across all work packages.' },
      { title: 'Safety First', desc: 'Site safety protocols, protective equipment requirements, and regular safety audits.' },
      { title: 'Schedule Discipline', desc: 'Planned milestones with proactive identification and mitigation of schedule risks.' },
      { title: 'Client Communication', desc: 'Transparent reporting, regular site updates, and accessible project team throughout.' },
      { title: 'Site Coordination', desc: 'Managed subcontractors, supplier relationships, and on-site team coordination.' },
    ],
    deliverables: [
      {
        label: 'Structural Execution',
        desc: 'Foundation, framing, and all structural elements built to design intent and project specification.',
      },
      {
        label: 'Quality Supervision',
        desc: 'Regular material and workmanship inspections documented throughout the construction process.',
      },
      {
        label: 'Finishing Works',
        desc: 'Internal and external plaster, flooring, painting, and building finishes delivered to specification.',
      },
      {
        label: 'Site Coordination',
        desc: 'Managed subcontractors, material procurement, scheduling, and on-site progress tracking.',
      },
      {
        label: 'Safety Management',
        desc: 'Site safety protocols, protective equipment requirements, and regular compliance audits throughout.',
      },
      {
        label: 'Project Handover',
        desc: 'Final walkthrough, quality acceptance, documentation package, and structured project closeout.',
      },
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
    atAGlance: {
      bestFor: ['New Residences', 'Site Planning', 'Architectural Design', 'Documentation'],
      coreFocus: ['Planning', 'Design', 'Visualization'],
      typicalScope: ['Concept', 'Floor Plans', 'Elevations', '3D Renders'],
      processStageCount: 6,
    },
    whoFor: [
      {
        id: 'new-residential',
        label: 'New Residential Projects',
        desc: 'Concept to construction documentation for homes, villas, and bungalows.',
      },
      {
        id: 'site-planning',
        label: 'Site Planning',
        desc: 'Orientation, setbacks, access analysis, and regulatory constraints resolved before design begins.',
      },
      {
        id: 'arch-design',
        label: 'Full Architectural Design',
        desc: 'Complete design development across all building elements, spatial relationships, and elevations.',
      },
      {
        id: 'visualization-arch',
        label: 'Planning & Visualization',
        desc: '3D renders and spatial presentations that communicate design intent before any construction begins.',
      },
      {
        id: 'documentation',
        label: 'Construction Documentation',
        desc: 'Complete drawing sets for structural coordination and statutory submission requirements.',
      },
    ],
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
    deliverables: [
      {
        label: 'Floor Plans',
        desc: 'Detailed plans optimised for spatial flow, natural light, ventilation, and functional requirements.',
      },
      {
        label: 'Elevations & Sections',
        desc: 'Facade design and cross-sections integrating material, proportion, and contextual considerations.',
      },
      {
        label: '3D Visualizations',
        desc: 'Realistic renderings and walkthroughs to communicate design intent before construction begins.',
      },
      {
        label: 'Site Plans',
        desc: 'Site analysis, orientation, setbacks, access routes, and landscape considerations documented.',
      },
      {
        label: 'Material Concepts',
        desc: 'Material strategies that define character, durability, and the sensory experience of the space.',
      },
      {
        label: 'Construction Documents',
        desc: 'Complete architectural drawing sets for structural, MEP coordination, and statutory approvals.',
      },
    ],
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
    atAGlance: {
      bestFor: ['New Homes', 'Apartments', 'Villa Interiors', 'Office Spaces', 'Commercial Fit-outs'],
      coreFocus: ['Space', 'Material', 'Detail'],
      typicalScope: ['Planning', 'Materials', 'Furniture', 'Lighting'],
      processStageCount: 6,
    },
    whoFor: [
      {
        id: 'new-homes-int',
        label: 'New Homes & Apartments',
        desc: 'Complete interior design for newly constructed or recently purchased homes.',
      },
      {
        id: 'villa-int',
        label: 'Villa Interiors',
        desc: 'High-quality interior environments for standalone villas and premium residences.',
      },
      {
        id: 'office-int',
        label: 'Office Spaces',
        desc: 'Productive, professionally designed commercial work environments reflecting brand and function.',
      },
      {
        id: 'commercial-int',
        label: 'Commercial Fit-outs',
        desc: 'Retail, hospitality, and commercial spaces balancing brand identity with operational performance.',
      },
      {
        id: 'renovation-int',
        label: 'Renovation Interiors',
        desc: 'Refreshing and redesigning existing interior spaces with considered material and layout changes.',
      },
    ],
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
    deliverables: [
      {
        label: 'Space Planning Drawings',
        desc: 'Detailed layouts optimised for flow, use, and proportional relationships across all rooms.',
      },
      {
        label: 'Material & Finish Schedule',
        desc: 'Curated selection of flooring, wall finishes, and surface materials with sample approvals.',
      },
      {
        label: 'Furniture Layout Plans',
        desc: 'Custom and specified furniture arrangements designed for both form and daily function.',
      },
      {
        label: 'Lighting Design',
        desc: 'Layered ambient, task, and accent lighting schemes enhancing atmosphere and visual comfort.',
      },
      {
        label: 'Kitchen & Wardrobe Design',
        desc: 'Efficient kitchen layouts, custom cabinetry, countertop planning, and wardrobe design.',
      },
      {
        label: 'Interior Execution',
        desc: 'Coordinated on-site delivery from concept through procurement to final installation.',
      },
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
