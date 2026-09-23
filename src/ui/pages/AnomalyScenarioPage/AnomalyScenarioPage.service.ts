import type { SidebarProps } from '../../components/Organisms/Sidebar'
import type { NodeCardData } from '../../components/Organisms/NodeCard'

export const anomalyScenarioSidebar: SidebarProps = {
  items: [
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
  ],
  activeId: 'anomaly',
}

export const anomalyActions = {
  network: [
    'Network interface disconnection',
    'IOC service restart',
    'Full server reboot',
  ],
  resource: [
    'Progressive memory leak',
    'CPU hog (CPU burn)',
    'Fork bomb / zombie processes',
    'File descriptor leak',
    'TCP connection saturation',
  ],
  disk: [
    'Log flooding (massive disk writes)',
    'Disk fill',
  ],
}

export const initialActiveAnomalies = [
  {
    id: '1',
    name: 'Network interface disconnection',
    status: 'running',
  },
  {
    id: '2',
    name: 'CPU hog (CPU burn)',
    status: 'scheduled',
    scheduledAt: 'Tue 31 - 13:30',
  },
]
export async function startAnomaly(action: string): Promise<void> {
  console.log('START anomaly:', action)
  return Promise.resolve()
}

export async function stopAnomaly(id: string): Promise<void> {
  console.log('STOP anomaly:', id)
  return Promise.resolve()
}

export async function scheduleAnomaly(action: string): Promise<void> {
  console.log('SCHEDULE anomaly:', action)
  return Promise.resolve()
}

export interface AnomalyScenarioPageData {
  title: string
  description: string
  nodeCardData: NodeCardData
}

export const anomalyScenarioPageData: AnomalyScenarioPageData = {
  title: 'Anomaly Scenario',
  description:
    'Define anomaly scenarios that affect host server performance and influence system behavior across the platform.',
  nodeCardData: {
    title: 'Host Server — Node 01',
    iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
  },
}

export async function handleAnomalyOptionChange(
  value: string
): Promise<void> {
  void value
  return Promise.resolve()
}

