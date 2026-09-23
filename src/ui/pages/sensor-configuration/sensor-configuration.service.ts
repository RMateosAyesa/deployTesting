import type { SidebarProps } from '../../components/Organisms/Sidebar'
import type { SensorConfigFormData } from '../../components/Organisms/SensorConfigForm'

export const sensorConfigurationSidebar: SidebarProps = {
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
  activeId: 'sensor-data-config',
}

export const sensorConfigurationData: SensorConfigFormData = {
  title: 'Sensor configuration',
  subtitle: 'Temperature #1 Sensor [ID: 04]',
  identity: {
    processVariableName: 'DONES-Li:Purif:HT1-T-In',
    description: '',
    variableType: 'float64',
    unit: 'Cº',
  },
  baseline: {
    baseValue: '300',
    rangeMin: '250',
    rangeMax: '350',
    refreshRate: '5',
    distributionModel: 'Normal',
    standardDeviation: '0.2',
    driftFactor: '0.05',
  },
  eventInjections: [
    {
      id: '1',
      eventName: 'Simulation name #1',
      eventType: 'Spike',
      intensity: '1.5',
      chance: '0.15',
      startTime: '13/04/2026 - 14:00',
      endTime: '17/04/2026 - 22:00',
    },
    {
      id: '2',
      eventName: 'Simulation name #2',
      eventType: 'Drift high (↑)',
      intensity: '1',
      chance: '0.10',
      startTime: '13/04/2026 - 14:00',
      endTime: '17/04/2026 - 18:30',
    },
  ],
  historicalLogEntries: [
    {
      id: '1',
      eventType: 'Drift low (↓)',
      eventName: 'Drift Simulation #11',
      startDate: '13/02/2026 - 13:00',
      starDate: '13/03/2026 - 13:00',
      intensity: '0.1',
      driftFactor: '0.05',
    },
    {
      id: '2',
      eventType: 'Noise burst',
      eventName: 'Noise Simulation #33',
      startDate: '11/02/2026 - 12:00',
      starDate: '11/03/2026 - 12:00',
      intensity: '0.15',
      driftFactor: '0.08',
    },
  ],
}

export async function goBackToSensorDataConfig(): Promise<void> {
  return Promise.resolve()
}

export async function addSensorEvent(): Promise<void> {
  return Promise.resolve()
}

export async function removeSensorEvent(eventId: string): Promise<void> {
  void eventId
  return Promise.resolve()
}

export async function saveSensorConfiguration(data: SensorConfigFormData): Promise<void> {
  void data
  return Promise.resolve()
}

export async function clearSensorHistoricalLogEntries(): Promise<void> {
  return Promise.resolve()
}
