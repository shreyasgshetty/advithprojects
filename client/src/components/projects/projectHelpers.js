/**
 * Project UI Helpers & Formatters
 * 
 * Provides editorial titles, category metadata, and dynamic stats calculations
 * without modifying the underlying data/projects.js file.
 */

export const PROJECT_TITLES = {
  'ap-ckm2024-01': 'Nature-Integrated Homestay',
  'ap-ckm2025-01': 'Contemporary Residential House',
  'ap-mys2024-01': 'Multi-Level Residence',
  'ap-ckm2025-02': 'Refined Residential Interiors',
  'ap-bng2025-01': 'Contemporary Urban Residence & Workspace',
  'ap-001': 'Contemporary Villa Residence',
  'ap-002': 'Multi-Storey Commercial Complex',
  'ap-003': 'Courtyard Villa Residence',
  'ap-004': 'Private Residence Civil Build',
  'ap-005': 'Row-House Residential Community',
  'ap-006': 'Commercial Structural Shell',
  'ap-007': 'Luxury Apartment Interior Fit-Out',
  'ap-008': 'Corporate Workspace Environment',
  'ap-009': 'Independent Residence Interior Design',
}

export const CATEGORY_LABELS = {
  architecture: 'Architecture & Planning',
  construction: 'Civil Construction',
  interiors: 'Turnkey Interior Design',
}

export const CATEGORY_SHORT = {
  architecture: 'Architecture',
  construction: 'Construction',
  interiors: 'Interiors',
}

export const CATEGORY_ACCENTS = {
  architecture: {
    badge: 'text-amber-700 bg-amber-50/90 border-amber-200/70',
    dot: 'bg-amber-500',
    border: 'hover:border-amber-400',
    text: 'text-amber-600',
  },
  construction: {
    badge: 'text-red-700 bg-red-50/90 border-red-200/70',
    dot: 'bg-red-600',
    border: 'hover:border-red-400',
    text: 'text-red-600',
  },
  interiors: {
    badge: 'text-rose-700 bg-rose-50/90 border-rose-200/70',
    dot: 'bg-rose-500',
    border: 'hover:border-rose-400',
    text: 'text-rose-600',
  },
}

/**
 * Returns clean editorial title for a project.
 */
export function getProjectTitle(project) {
  if (!project) return ''
  return project.title || PROJECT_TITLES[project.id] || project.id.toUpperCase()
}

export const PROJECT_COVERS = {
  'ap-ckm2024-01': '/projects/construction/ap-ckm2024-01/cover.jpeg',
  'ap-ckm2025-01': '/projects/construction/ap-ckm2025-01/cover.jpeg',
  'ap-mys2024-01': '/projects/construction/ap-mys2024-01/cover.jpeg',
  'ap-ckm2025-02': '/projects/interior/ap-ckm2025-02/cover.jpeg',
  'ap-bng2025-01': '/projects/interior/ap-bng2025-01/cover.jpeg',
  'ap-001': '/projects/architecture/ap-ckm2025-01/cover.jpeg',
  'ap-002': '/projects/architecture/ap-002/cover.jpg',
  'ap-003': '/projects/architecture/ap-003/cover.jpg',
  'ap-004': '/projects/construction/ap-004/cover.jpg',
  'ap-005': '/projects/construction/ap-005/cover.jpg',
  'ap-006': '/projects/construction/ap-006/cover.jpg',
  'ap-007': '/projects/interiors/ap-007/cover.jpg',
  'ap-008': '/projects/interiors/ap-008/cover.jpg',
  'ap-009': '/projects/interiors/ap-009/cover.jpg',
}

/**
 * Returns project cover photo path.
 */
export function getProjectCover(project) {
  if (!project) return null
  return project.coverImage || PROJECT_COVERS[project.id] || null
}

const DEFAULT_AREAS = {
  'ap-ckm2024-01': '5,200 sq ft',
  'ap-ckm2025-01': '3,400 sq ft',
  'ap-mys2024-01': '4,100 sq ft',
  'ap-ckm2025-02': '2,600 sq ft',
  'ap-bng2025-01': '3,800 sq ft',
  'ap-001': '3,800 sq ft',
}

/**
 * Returns area string or sensible default.
 */
export function getProjectArea(project) {
  if (!project) return ''
  if (project.area && project.area.trim()) return project.area
  return DEFAULT_AREAS[project.id] || '3,200 sq ft'
}

/**
 * Calculates live portfolio statistics dynamically from dataset.
 */
export function calculateProjectStats(projectsList = []) {
  const total = projectsList.length
  const completed = projectsList.filter((p) => p.status === 'completed').length
  const ongoing = projectsList.filter((p) => p.status === 'ongoing').length
  const disciplines = new Set(projectsList.map((p) => p.category)).size

  // Extract distinct districts/cities (e.g. Bangalore, Mysore, Chikkamagaluru)
  const cities = new Set(
    projectsList
      .map((p) => {
        const parts = (p.location || '').split(',')
        return parts[0].trim()
      })
      .filter(Boolean)
  )

  const cityCount = cities.size

  return {
    total: total < 10 ? `0${total}` : `${total}`,
    completed: completed < 10 ? `0${completed}` : `${completed}`,
    ongoing: ongoing < 10 ? `0${ongoing}` : `${ongoing}`,
    disciplines: disciplines < 10 ? `0${disciplines}` : `${disciplines}`,
    regionsCount: `${cityCount < 10 ? '0' + cityCount : cityCount}`,
    locationsList: Array.from(cities).join(' · '),
  }
}
