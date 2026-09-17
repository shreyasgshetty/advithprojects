/**
 * Projects data — structured for future backend API replacement.
 *
 * CATEGORIES (only these three are valid):
 *   'architecture'  — architectural design, planning, documentation
 *   'construction'  — civil/structural construction works
 *   'interiors'     — interior design and fit-out
 *
 * Each project has ONE primary category.
 * A project may involve multiple services (architecture, construction, interiors).
 *
 * STATUS: 'completed' | 'ongoing'
 *
 * IDENTIFIER
 * ─────────────────────────────────────────────────────────────────────────────
 * id  {string}  — the single identifier used for:
 *                   • UI display  (shown as uppercase, e.g. AP-001)
 *                   • URL         (/projects/ap-001)
 *                   • Lookup      getProject('ap-001')
 *                   • Image folder (public/projects/{category}/ap-001/)
 *
 * There is NO title and NO slug field.
 *
 * IMAGE FIELDS
 * ─────────────────────────────────────────────────────────────────────────────
 * coverImage  {string|null}   — path to the hero/card cover image.
 *                               Served from /public, e.g. '/projects/architecture/ap-001/cover.jpg'
 *
 * images      {string[]}      — ordered gallery images for the detail page.
 *                               Same path convention: '/projects/{category}/{id}/01.jpg'
 *
 * To add real photos:
 *   1. Drop files into  client/public/projects/{category}/{id}/
 *   2. Set coverImage and images paths below accordingly.
 *   3. Remove the null / empty-array placeholders.
 */

export const projects = [
  // ── ARCHITECTURE ──────────────────────────────────────────────────────────
  {
    id: 'ap-001',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    scope:
      'Complete architectural design documentation including concept development, floor plans, sections, elevations, and 3D visualisation for a contemporary four-bedroom villa.',
    description:
      'A contemporary family villa designed to balance openness and privacy. The project encompasses site planning, spatial organisation, and a full set of architectural drawings from concept through to construction documentation.',
    highlights: [
      'Open-plan living and dining design',
      'Passive ventilation and natural-light strategy',
      'Integrated landscape coordination',
      'Complete working drawing set',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: '/projects/architecture/ap-ckm2025-01/cover.jpeg',
    images: ['/projects/architecture/ap-ckm2025-01/cover.jpeg'],
  },
  {
    id: 'ap-002',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Mysore, Karnataka',
    area: '12,000 sq ft',
    scope:
      'Full architectural documentation for a multi-floor commercial building including concept, floor plans, elevations, structural coordination drawings, and regulatory submissions.',
    description:
      'A multi-floor commercial building designed for functional efficiency and a strong architectural presence. The project involved complete design documentation from concept stage through approvals and construction drawing sets.',
    highlights: [
      'Multi-floor commercial floor planning',
      'Modern facade expression',
      'Regulatory submission drawings',
      'Structural coordination',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/architecture/ap-002/cover.jpg'
    images: [],       // ['/projects/architecture/ap-002/01.jpg', ...]
  },
  {
    id: 'ap-003',
    category: 'architecture',
    services: ['architecture'],
    status: 'ongoing',
    location: 'Hubli, Karnataka',
    area: '4,500 sq ft',
    scope:
      'Full architectural design commission for a large contemporary residence including concept development, floor plans, elevations, sections, and 3D visualisation package.',
    description:
      'An ongoing architectural design commission for a large contemporary residence. The project explores contextual design, internal spatial planning, and contemporary elevation expression.',
    highlights: [
      'Contextual site-sensitive design',
      'Open courtyard spatial strategy',
      '3D visualisation package',
      'Regulatory documentation',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/architecture/ap-003/cover.jpg'
    images: [],       // ['/projects/architecture/ap-003/01.jpg', ...]
  },

  // ── CONSTRUCTION ──────────────────────────────────────────────────────────
  {
    id: 'ap-004',
    category: 'construction',
    services: ['construction'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '2,600 sq ft',
    scope:
      'Complete civil and structural construction of a contemporary residence including foundation, RCC framing, masonry, roofing, and external finishes.',
    description:
      'A contemporary residential construction project executed to high standards of structural quality and site management. The project covered all civil works from foundation through to finished external envelope.',
    highlights: [
      'RCC structural framework',
      'Quality masonry and plastering',
      'Roofing and waterproofing',
      'External finish and site clean-up',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/construction/ap-004/cover.jpg'
    images: [],       // ['/projects/construction/ap-004/01.jpg', ...]
  },
  {
    id: 'ap-005',
    category: 'construction',
    services: ['construction', 'architecture'],
    status: 'completed',
    location: 'Karnataka',
    area: '1,800 sq ft per unit',
    scope:
      'Design and construction of a series of contemporary row-house units including architectural planning and complete structural works across multiple units.',
    description:
      'A series of contemporary row-house units executed with consistent quality and an efficient construction programme. Each unit features clean architectural expression and durable structural construction.',
    highlights: [
      'Multi-unit construction programme',
      'Consistent architectural language across units',
      'Efficient structural methodology',
      'Low-maintenance external finishes',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/construction/ap-005/cover.jpg'
    images: [],       // ['/projects/construction/ap-005/01.jpg', ...]
  },
  {
    id: 'ap-006',
    category: 'construction',
    services: ['construction'],
    status: 'completed',
    location: 'Karnataka',
    area: '8,000 sq ft',
    scope:
      'Structural construction of a commercial building including foundation design coordination, RCC framing, brickwork, roofing, and external envelope works.',
    description:
      'A commercial building construction project managed from foundation through to finished shell. The project prioritised structural integrity, schedule adherence, and quality of workmanship.',
    highlights: [
      'Deep foundation and plinth works',
      'RCC multi-floor framing',
      'External brick and plaster envelope',
      'Roofing and waterproofing systems',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/construction/ap-006/cover.jpg'
    images: [],       // ['/projects/construction/ap-006/01.jpg', ...]
  },

  // ── INTERIORS ─────────────────────────────────────────────────────────────
  {
    id: 'ap-007',
    category: 'interiors',
    services: ['interiors'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '2,200 sq ft',
    scope:
      'Complete interior design and turnkey execution for a high-end three-bedroom apartment including custom furniture, joinery, lighting design, and material specification.',
    description:
      'A refined luxury interior combining contemporary aesthetics with warm material choices. The project involved complete space planning, custom cabinetry, curated material selection, and full turnkey execution.',
    highlights: [
      'Custom walnut joinery and wardrobes',
      'Layered lighting design',
      'Premium stone and tile finishes',
      'Bespoke furniture and styling',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/interiors/ap-007/cover.jpg'
    images: [],       // ['/projects/interiors/ap-007/01.jpg', ...]
  },
  {
    id: 'ap-008',
    category: 'interiors',
    services: ['interiors'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '3,500 sq ft',
    scope:
      'Complete interior design and execution for a commercial office environment including workstation design, meeting rooms, reception areas, and branded interior elements.',
    description:
      'A complete commercial office interior focused on productivity, brand expression, and spatial quality. The project involved detailed space planning, furniture specification, lighting design, and full site execution.',
    highlights: [
      'Activity-based work zone planning',
      'Branded reception and lobby design',
      'Acoustic treatment solutions',
      'Ergonomic furniture specification',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/interiors/ap-008/cover.jpg'
    images: [],       // ['/projects/interiors/ap-008/01.jpg', ...]
  },
  {
    id: 'ap-009',
    category: 'interiors',
    services: ['interiors'],
    status: 'ongoing',
    location: 'Karnataka',
    area: '3,200 sq ft',
    scope:
      'Interior design and partial fit-out for an independent residential home including living areas, bedrooms, kitchen, and utility spaces.',
    description:
      'An ongoing residential interior project combining warm tones, natural materials, and considered spatial planning. The design focuses on a comfortable, liveable aesthetic with a long-lasting material palette.',
    highlights: [
      'Warm material and colour palette',
      'Custom kitchen design',
      'Bedroom joinery and wardrobes',
      'Coordinated loose furniture selection',
    ],
    // PLACEHOLDER — replace with real photo paths when available
    coverImage: null, // '/projects/interiors/ap-009/cover.jpg'
    images: [],       // ['/projects/interiors/ap-009/01.jpg', ...]
  },
]

/**
 * Filter helpers.
 *
 * Valid filter values:
 *   'all' | 'architecture' | 'construction' | 'interiors' | 'completed' | 'ongoing'
 *
 * @param {string} category
 * @returns {Array}
 */
export function filterProjects(category = 'all') {
  if (category === 'all') return projects
  if (category === 'completed' || category === 'ongoing') {
    return projects.filter((p) => p.status === category)
  }
  return projects.filter((p) => p.category === category)
}

/**
 * Get a single project by id.
 * @param {string} id  e.g. 'ap-001'
 * @returns {object|null}
 */
export function getProject(id) {
  return projects.find((p) => p.id === id) ?? null
}

