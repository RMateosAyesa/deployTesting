import type { SensorDataConfigTemplateData } from '../../components/Templates/SensorDataConfigTemplate'
import type { SidebarProps } from '../../components/Organisms/Sidebar'

export const sensorDataConfigSidebar: SidebarProps = {
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

export const sensorDataConfigData: SensorDataConfigTemplateData = {
  title: 'Sensor data config',
  subtitle: 'Define how sensor values are generated to simulate system behavior under controlled conditions.',
  sensors: [
    {
      title: 'Temperature #1',
      baseValue: 300,
      unit: 'ºC',
      distributionModel: 'Normal',
      standardDeviation: 0.2,
      eventInjectionCount: 2,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.05,
    },
    {
      title: 'Temperature #2',
      baseValue: 350,
      unit: 'ºC',
      distributionModel: 'Normal',
      standardDeviation: 0.2,
      eventInjectionCount: 1,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.03,
    },
    {
      title: 'Pressure #1',
      baseValue: '--,-',
      distributionModel: '-',
      standardDeviation: '-',
      eventInjectionCount: 0,
      refreshRate: '-',
      driftFactor: '-',
    },
    {
      title: 'Pressure #2',
      baseValue: '--,-',
      distributionModel: '-',
      standardDeviation: '-',
      eventInjectionCount: 0,
      refreshRate: '-',
      driftFactor: '-',
    },
  ],
}

export async function openSensorConfiguration(sensorTitle: string): Promise<void> {
  void sensorTitle
  return Promise.resolve()
}
