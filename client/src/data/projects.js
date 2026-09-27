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

  // ── CONSTRUCTION ──────────────────────────────────────────────────────────
  {
    id: 'ap-004',
    category: 'construction',
    services: ['construction'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
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
    coverImage: '/projects/construction/ap-ckm2024-01/cover.jpeg',
    images: [
      '/projects/construction/ap-ckm2024-01/cover.jpeg',
      '/projects/construction/ap-ckm2024-01/1.jpeg',
      '/projects/construction/ap-ckm2024-01/2.jpeg',
      '/projects/construction/ap-ckm2024-01/3.jpeg',
    ],
  },
  {
    id: 'ap-005',
    category: 'construction',
    services: ['construction', 'architecture'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
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
    coverImage: '/projects/construction/ap-ckm2025-01/cover.jpeg',
    images: [
      '/projects/construction/ap-ckm2025-01/cover.jpeg',
      '/projects/construction/ap-ckm2025-01/1.jpeg',
      '/projects/construction/ap-ckm2025-01/2.jpeg',
      '/projects/construction/ap-ckm2025-01/3.jpeg',
    ],
  },
  {
    id: 'ap-006',
    category: 'construction',
    services: ['construction'],
    status: 'completed',
    location: 'Mysore, Karnataka',
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
    coverImage: '/projects/construction/ap-mys2024-01/cover.jpeg',
    images: ['/projects/construction/ap-mys2024-01/cover.jpeg'],
  },

  // ── INTERIORS ─────────────────────────────────────────────────────────────
  {
    id: 'ap-007',
    category: 'interiors',
    services: ['interiors'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
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
    coverImage: '/projects/interior/ap-ckm2025-02/cover.jpeg',
    images: [
      '/projects/interior/ap-ckm2025-02/cover.jpeg',
      '/projects/interior/ap-ckm2025-02/1.jpeg',
    ],
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
    coverImage: '/projects/interior/ap-bng2025-01/cover.jpeg',
    images: [
      '/projects/interior/ap-bng2025-01/cover.jpeg',
      '/projects/interior/ap-bng2025-01/1.jpeg',
      '/projects/interior/ap-bng2025-01/2.jpeg',
    ],
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

