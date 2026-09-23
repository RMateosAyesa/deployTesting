import { useState, useEffect } from 'react'
import { LithiumSystemTemplate } from '../../components/Templates/LithiumSystemTemplate'
import { getLithiumSystemData, type LithiumSystemData } from './lithiumSystem.service'
import type { SidebarProps } from '../../components/Organisms/Sidebar'

const defaultSidebar: SidebarProps = {
  items: [
    { id: 'overview', label: 'Overview', iconName: 'globe', badge: '' },
    { id: 'lithium', label: 'Lithium System', iconName: 'cube', badge: '' },
    {
      id: 'datalab', label: 'Data Lab', iconName: 'flask', badge: '',
      children: [
        { id: 'anomaly', label: 'Anomaly scenarios', iconName: 'arrowRight', badge: '' },
        { id: 'sensor-data-config', label: 'Sensor data config', iconName: 'arrowRight', badge: '' },
      ],
    },
  ],
  activeId: 'lithium',
}

export interface LithiumSystemPageProps {
  sidebar?: SidebarProps
  onSidebarSelect?: (id: string) => void
  activeCylinder?: number
  onCylinderChange?: (index: number) => void
  onFetchData?: (activeCylinder: number) => Promise<LithiumSystemData>
}

export function LithiumSystemPage({
  sidebar = defaultSidebar,
  onSidebarSelect,
  activeCylinder = 0,
  onFetchData = getLithiumSystemData,
}: LithiumSystemPageProps): React.ReactElement {
  const [data, setData] = useState<LithiumSystemData>({ cards: [], lines: [] })

  useEffect(() => {
    onFetchData(activeCylinder).then(setData)
  }, [onFetchData, activeCylinder])

  const handleSidebarSelect = (id: string) => {
    onSidebarSelect?.(id)
  }

  return (
    <LithiumSystemTemplate
      sidebar={{
        ...sidebar,
        onSelect: onSidebarSelect ? handleSidebarSelect : sidebar.onSelect,
      }}
      cards={data.cards}
      lines={data.lines}
    />
  )
}

export default LithiumSystemPage
