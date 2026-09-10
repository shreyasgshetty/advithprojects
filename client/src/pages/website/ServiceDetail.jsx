import { useParams, Navigate } from 'react-router-dom'
import { getService } from '../../data/services'
import CivilConstructionView from '../../components/services/construction/CivilConstructionView'
import ArchitectureView from '../../components/services/architecture/ArchitectureView'
import InteriorsView from '../../components/services/interiors/InteriorsView'

/**
 * ServiceDetail
 *
 * Dispatches to discipline-specific architectural presentations:
 * - `/services/construction` -> CivilConstructionView (Red, Structural/Execution)
 * - `/services/architecture` -> ArchitectureView (Amber, Form/Space/Planning)
 * - `/services/interiors`    -> InteriorsView (Rose, Material/Detail/Atmosphere)
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  if (slug === 'construction') {
    return <CivilConstructionView service={service} />
  }

  if (slug === 'architecture') {
    return <ArchitectureView service={service} />
  }

  if (slug === 'interiors') {
    return <InteriorsView service={service} />
  }

  return <Navigate to="/services" replace />
}
