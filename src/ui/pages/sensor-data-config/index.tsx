import React from 'react'
import { SensorDataConfigTemplate } from '../../components/Templates/SensorDataConfigTemplate'
import type { SidebarProps } from '../../components/Organisms/Sidebar'
import {
  openSensorConfiguration,
  sensorDataConfigData,
  sensorDataConfigSidebar,
} from './sensor-data-config.service'

export interface SensorDataConfigPageProps {
  sidebar?: SidebarProps
  onSensorSettingsOpen?: (sensorTitle: string) => Promise<void> | void
}

export function SensorDataConfigPage({
  sidebar,
  onSensorSettingsOpen = openSensorConfiguration,
}: SensorDataConfigPageProps): React.ReactElement {
  const handleSensorSettingsClick = (sensorTitle: string) => {
    void onSensorSettingsOpen(sensorTitle)
  }

  return (
    <SensorDataConfigTemplate
      sidebar={sidebar ?? sensorDataConfigSidebar}
      data={sensorDataConfigData}
      onSensorSettingsClick={handleSensorSettingsClick}
    />
  )
}

export default SensorDataConfigPage
