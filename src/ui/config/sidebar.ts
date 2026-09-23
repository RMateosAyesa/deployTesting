import type { NavItemData } from '../components/Molecules/NavItem'

export const sidebarItems: NavItemData[] = [
  { id: 'overview', label: 'Overview', iconName: 'globe', badge: '' },
  { id: 'lithium', label: 'Lithium System', iconName: 'cube', badge: '' },
  {
    id: 'datalab',
    label: 'Data Lab',
    iconName: 'flask',
    badge: '',
    children: [
      { id: 'anomaly', label: 'Anomaly scenarios', iconName: 'arrowRight', badge: '' },
      { id: 'sensor-data-config', label: 'Sensor data config', iconName: 'arrowRight', badge: '' },
    ],
  },
]
