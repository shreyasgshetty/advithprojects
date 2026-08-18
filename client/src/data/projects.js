/**
 * Projects data — structured for future backend API replacement.
 * All names, locations, and descriptions are clearly demo/representative
 * content — no fabricated client names, costs, or verifiable statistics.
 */

export const projects = [
  {
    id: 'ap-001',
    title: 'Modern Residence — Villa Design',
    slug: 'modern-villa-design',
    category: 'residential',
    services: ['construction', 'architecture', 'interiors'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '3,800 sq ft',
    scope: 'Complete design and construction of a contemporary 4BHK villa including architectural drawings, structural work, and full interior fit-out.',
    description:
      'A contemporary family villa designed to balance openness and privacy. The project encompasses site planning, architectural design, structural construction, and complete turnkey interior execution.',
    highlights: ['Open-plan living areas', 'Integrated landscape design', 'Passive ventilation strategy', 'Custom interior joinery'],
    image: null,
    color: 'red',
  },
  {
    id: 'ap-002',
    title: 'Commercial Office Complex',
    slug: 'commercial-office-complex',
    category: 'commercial',
    services: ['construction', 'architecture'],
    status: 'completed',
    location: 'Mysore, Karnataka',
    area: '12,000 sq ft',
    scope: 'Multi-floor commercial building including full architectural documentation, structural construction, and external envelope works.',
    description:
      'A contemporary commercial office complex designed for operational efficiency and architectural presence. The project involved full architectural documentation and complete structural construction.',
    highlights: ['Structural RCC framing', 'Modern glass facade', 'Underground parking', 'Energy-efficient design'],
    image: null,
    color: 'amber',
  },
  {
    id: 'ap-003',
    title: 'Luxury Apartment Interior',
    slug: 'luxury-apartment-interior',
    category: 'interiors',
    services: ['interiors'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '2,200 sq ft',
    scope: 'Complete interior design and turnkey execution for a high-end 3BHK apartment including custom furniture and lighting design.',
    description:
      'A refined luxury interior combining contemporary aesthetics with warm material choices. The project involved complete space planning, custom cabinetry, curated material selection, and full turnkey execution.',
    highlights: ['Custom walnut joinery', 'Layered lighting design', 'Premium stone finishes', 'Bespoke furniture'],
    image: null,
    color: 'rose',
  },
  {
    id: 'ap-004',
    title: 'Architectural Residence Study',
    slug: 'architectural-residence-study',
    category: 'architecture',
    services: ['architecture'],
    status: 'ongoing',
    location: 'Hubli, Karnataka',
    area: '4,500 sq ft',
    scope: 'Full architectural design documentation including concept development, floor plans, elevations, and 3D visualization for a contemporary home.',
    description:
      'An ongoing architectural design commission for a large contemporary residence. The project explores contextual design, internal spatial planning, and contemporary elevation expression.',
    highlights: ['Contextual design approach', 'Open courtyard strategy', '3D visualization package', 'Regulatory documentation'],
    image: null,
    color: 'amber',
  },
  {
    id: 'ap-005',
    title: 'Row House Development',
    slug: 'row-house-development',
    category: 'residential',
    services: ['construction', 'architecture'],
    status: 'completed',
    location: 'Karnataka',
    area: '1,800 sq ft per unit',
    scope: 'Design and construction of a series of contemporary row-house units including architectural planning and complete structural works.',
    description:
      'A series of contemporary row-house units planned for efficient spatial use and consistent quality across units. Each home features clean architectural expression and durable construction.',
    highlights: ['Consistent architectural language', 'Efficient unit planning', 'Structural quality finish', 'Low maintenance design'],
    image: null,
    color: 'red',
  },
  {
    id: 'ap-006',
    title: 'Commercial Interior Fit-out',
    slug: 'commercial-interior-fitout',
    category: 'interiors',
    services: ['interiors'],
    status: 'completed',
    location: 'Bangalore, Karnataka',
    area: '3,500 sq ft',
    scope: 'Complete interior design and execution for a commercial office environment including workstation design, meeting rooms, and branded reception areas.',
    description:
      'A complete commercial office interior focusing on productivity, brand expression, and spatial quality. The project involved detailed space planning, furniture selection, lighting design, and full site execution.',
    highlights: ['Activity-based work zones', 'Branded reception design', 'Acoustic solutions', 'Ergonomic furniture specification'],
    image: null,
    color: 'rose',
  },
]

/**
 * Filter helpers — each accepts the projects array for testability.
 * @param {string} category - 'all' | 'residential' | 'commercial' | 'architecture' | 'interiors' | 'completed' | 'ongoing'
 */
export function filterProjects(category = 'all') {
  if (category === 'all') return projects
  if (category === 'completed' || category === 'ongoing') {
    return projects.filter((p) => p.status === category)
  }
  return projects.filter((p) => p.category === category || p.services.includes(category))
}

/**
 * Get a single project by slug.
 * @param {string} slug
 */
export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}
