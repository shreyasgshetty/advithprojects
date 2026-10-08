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
    id: 'ap-ckm2026-01',
    category: 'architecture',
    services: ['architecture'],
    status: 'ongoing',
    location: 'Chikkamagaluru, Karnataka',
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
    id: 'ap-ckm2026-02',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
    scope:
      'Complete architectural design for a contemporary multi-level residential house, including spatial planning, facade development, elevation detailing, balcony design, material selection, and overall architectural coordination.',
    description:
      'A contemporary multi-level residence designed with a strong modern architectural character. The house features clean geometric forms, a prominent glass-enclosed room, multiple balconies, textured stone cladding, warm wood accents, landscaped areas, and integrated exterior lighting to create a balanced and sophisticated facade.',
    highlights: [
      'Contemporary multi-level residential architecture',
      'Modern geometric facade design',
      'Glass-enclosed room as a prominent architectural feature',
      'Multiple balconies and outdoor spaces',
      'Stone cladding and wood-finish accents',
      'Integrated landscape and exterior lighting',
    ],
    coverImage: '/projects/architecture/ap-ckm2026-02/cover.jpeg',
    images: [
      '/projects/architecture/ap-ckm2026-02/cover.jpeg',
    ],
  },

  {
    id: 'ap-ckm2026-03',
    category: 'architecture',
    services: ['architecture'],
    status: 'ongoing',
    location: 'Chikkamagaluru, Karnataka',
    scope:
      'Complete architectural design for a contemporary multi-level residence, including facade development, spatial planning, elevation detailing, balcony design, material selection, and 3D visualisation.',
    description:
      'A contemporary multi-level residence designed with a clean and sophisticated architectural language. The facade combines curved geometric elements, textured stone surfaces, wood-finish detailing, glass railings, landscaped balcony spaces, and integrated lighting to create a distinctive modern identity.',
    highlights: [
      'Contemporary multi-level residential architecture',
      'Distinctive curved facade detailing',
      'Textured stone and wood-finish elements',
      'Landscaped balcony and terrace spaces',
      'Glass and metal railing details',
      'Modern facade lighting and material coordination',
    ],
    coverImage: '/projects/architecture/ap-ckm2026-03/cover.jpeg',
    images: [
      '/projects/architecture/ap-ckm2026-03/cover.jpeg',
    ],
  },

  {
    id: 'ap-ckm2026-04',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Bengaluru, Karnataka',
    scope:
      'Complete architectural design for a contemporary multi-level residential residence, including spatial planning, facade development, elevation detailing, balcony design, material selection, landscape coordination, and 3D visualisation.',
    description:
      'A contemporary multi-level residence designed with a bold and elegant architectural character. The facade combines curved balcony forms, textured stone finishes, warm wood accents, vertical metal detailing, landscaped spaces, and integrated lighting to create a refined and distinctive residential identity.',
    highlights: [
      'Contemporary multi-level residential architecture',
      'Curved balcony and facade detailing',
      'Textured stone and warm wood finishes',
      'Vertical metal screening elements',
      'Integrated landscape and terrace greenery',
      'Layered facade lighting design',
    ],
    coverImage: '/projects/architecture/ap-ckm2026-04/cover.jpeg',
    images: [
      '/projects/architecture/ap-ckm2026-04/cover.jpeg',
    ],
  },

  {
    id: 'ap-ckm2025-03',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
    scope:
      'Complete architectural design for a contemporary residential residence, including facade development, spatial planning, elevation detailing, balcony design, material selection, landscape coordination, and 3D visualisation.',
    description:
      'A contemporary residence designed with a clean and balanced architectural character. The facade combines modern geometric forms, textured stone finishes, warm wood accents, glass railings, screened balcony spaces, and integrated landscaping to create a refined and functional family home.',
    highlights: [
      'Contemporary residential architecture',
      'Modern geometric facade design',
      'Textured stone and wood-finish elements',
      'Glass balcony and screened outdoor spaces',
      'Integrated landscape design',
      'Functional and visually balanced elevation',
    ],
    coverImage: '/projects/architecture/ap-ckm2025-03/cover.jpeg',
    images: [
      '/projects/architecture/ap-ckm2025-03/cover.jpeg',
    ],
  },

  {
    id: 'ap-ckm2025-04',
    category: 'architecture',
    services: ['architecture'],
    status: 'completed',
    location: 'Chikkamagaluru, Karnataka',
    scope:
      'Complete architectural design for a contemporary residential house, including facade development, elevation detailing, balcony and terrace design, material selection, landscape coordination, and 3D visualisation.',
    description:
      'A contemporary residence designed with a bold yet functional facade. The architectural design combines exposed brick finishes, clean geometric forms, vertical screens, decorative panels, landscaped balconies, and a covered terrace to create a distinctive modern residential character.',
    highlights: [
      'Contemporary residential architecture',
      'Exposed brick facade detailing',
      'Decorative screens and vertical fins',
      'Landscaped balconies and terrace spaces',
      'Covered outdoor living areas',
      'Modern facade with integrated lighting',
    ],
    coverImage: '/projects/architecture/ap-ckm2025-04/cover.jpeg',
    images: [
      '/projects/architecture/ap-ckm2025-04/cover.jpeg',
    ],
  },

  // ── CONSTRUCTION ──────────────────────────────────────────────────────────
  {
    id: 'ap-ckm2024-01',

    category: 'construction',

    services: ['construction'],

    status: 'completed',

    location: 'Chikkamagaluru, Karnataka',

    scope:
      'Architectural planning and design for a nature-focused homestay, including building layout, roof design, exterior detailing, traditional architectural elements, and coordination of the overall site design.',

    description:
      'A homestay designed to blend traditional architectural character with its natural surroundings. The project features sloped tiled roofs, open corridors with detailed wooden columns, landscaped courtyards, and a spacious outdoor setting surrounded by greenery.',

    highlights: [
      'Nature-integrated homestay design',

      'Traditional tiled roof architecture',

      'Detailed concrete wooden columns and covered corridors',

      'Courtyard and landscaped spaces',

      'Harmonious integration with the surrounding landscape',
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
    id: 'ap-ckm2025-01',

    category: 'construction',

    services: ['architecture', 'construction'],

    status: 'completed',

    location: 'Chikkamagaluru, Karnataka',

    area: '',

    scope:
      'Complete architectural planning and construction of a modern multi-level residential house, including floor planning, elevation design, exterior finishes, interior layout coordination, electrical and plumbing coordination, and overall construction execution.',

    description:
      'A modern residential house designed with a clean contemporary elevation and functional living spaces. The project combines architectural planning with end-to-end construction, featuring a structured facade, spacious balcony, landscaped side courtyard, modern kitchen, and carefully coordinated interior and exterior finishes.',

    highlights: [
      'Contemporary residential architecture',

      'Complete construction execution',

      'Modern facade with textured exterior finishes',

      'Spacious balcony and landscaped courtyard',

      'Functional modular kitchen and interior spaces',

      'Architectural and construction coordination',
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
    id: 'ap-mys2024-01',

    category: 'construction',

    services: ['architecture', 'construction'],

    status: 'completed',

    location: 'Mysuru, Karnataka',

    area: '',

    scope:
      'Residential house construction with architectural planning, multi-level building execution, exterior elevation development, entrance detailing, and coordination of the overall residential structure.',

    description:
      'A contemporary multi-level residential house featuring a clean modern facade with layered elevations, textured exterior finishes, spacious balconies, and a defined entrance. The design combines functional residential planning with a strong exterior presence.',

    highlights: [
      'Contemporary multi-level residential design',

      'Modern exterior elevation and facade detailing',

      'Spacious balconies and covered areas',

      'Textured wall finishes and architectural lighting',

      'Residential construction execution',
    ],

    coverImage: '/projects/construction/ap-mys2024-01/cover.jpeg',
    images: ['/projects/construction/ap-mys2024-01/cover.jpeg'],
  },

  // ── INTERIORS ─────────────────────────────────────────────────────────────
  {
    id: 'ap-ckm2025-02',

    category: 'interiors',

    services: ['interiors'],

    status: 'completed',

    location: 'Chikkamagaluru, Karnataka',

    area: '',

    scope:
      'Interior design and execution for a residential home, including modular kitchen, living room TV unit, storage cabinetry, wall finishes, ceiling detailing, and coordinated interior elements.',

    description:
      'A modern residential interior designed with a clean and refined aesthetic. The spaces feature warm wood finishes, marble-inspired surfaces, built-in cabinetry, a contemporary modular kitchen, and a coordinated living room with a custom TV unit and storage solutions.',

    highlights: [
      'Modern residential interior design',

      'Custom modular kitchen',

      'Built-in storage and cabinetry',

      'Contemporary TV unit and wall design',

      'Marble-inspired finishes and detailing',

      'Clean false ceiling and lighting design',
    ],
    coverImage: '/projects/interior/ap-ckm2025-02/cover.jpeg',
    images: [
      '/projects/interior/ap-ckm2025-02/cover.jpeg',
      '/projects/interior/ap-ckm2025-02/1.jpeg',
    ],
  },
  {
    id: 'ap-bng2025-01',

    category: 'interiors',

    services: ['architecture', 'interiors'],

    status: 'completed',

    location: 'Bengaluru, Karnataka',

    area: '',

    scope:
      'Architectural and interior design for a contemporary office space, including spatial planning, interior layout, custom furniture design, ceiling treatment, lighting design, material selection, and overall aesthetic coordination.',

    description:
      'A contemporary office space designed with a warm, sophisticated character. The interiors combine rich wood finishes, textured walls, integrated lighting, custom furniture, and carefully planned spatial elements to create a cohesive and refined living and workspace environment.',

    highlights: [
      'Contemporary architectural and interior design',

      'Custom wood-finished furniture and wall panelling',

      'Integrated ambient and accent lighting',

      'Detailed ceiling and spatial treatments',

      'Warm, cohesive material palette',

      'Functional living and workspace planning',
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

