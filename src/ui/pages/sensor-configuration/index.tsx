import React, { useState } from 'react'
import { SensorConfigurationTemplate } from '../../components/Templates/SensorConfigurationTemplate'
import type { SensorConfigFormData } from '../../components/Organisms/SensorConfigForm'
import type { SidebarProps } from '../../components/Organisms/Sidebar'
import {
  addSensorEvent,
  clearSensorHistoricalLogEntries,
  goBackToSensorDataConfig,
  removeSensorEvent,
  saveSensorConfiguration,
  sensorConfigurationData,
  sensorConfigurationSidebar,
} from './sensor-configuration.service'

type SensorConfigurationTab = 'queue' | 'history'

export interface SensorConfigurationPageProps {
  sidebar?: SidebarProps
  data?: SensorConfigFormData
  onBack?: () => Promise<void> | void
  onAddEvent?: () => Promise<void> | void
  onRemoveEvent?: (eventId: string) => Promise<void> | void
  onSaveConfiguration?: (data: SensorConfigFormData) => Promise<void> | void
  onClearHistoricalLogEntries?: () => Promise<void> | void
}

export function SensorConfigurationPage({
  sidebar,
  data = sensorConfigurationData,
  onBack = goBackToSensorDataConfig,
  onAddEvent = addSensorEvent,
  onRemoveEvent = removeSensorEvent,
  onSaveConfiguration = saveSensorConfiguration,
  onClearHistoricalLogEntries = clearSensorHistoricalLogEntries,
}: SensorConfigurationPageProps): React.ReactElement {
  const [activeEventTab, setActiveEventTab] = useState<SensorConfigurationTab>('queue')

  const handleBack = () => {
    void onBack()
  }

  const handleAddEvent = () => {
    void onAddEvent()
  }

  const handleRemoveEvent = (eventId: string) => {
    void onRemoveEvent(eventId)
  }

  const handleSaveConfiguration = () => {
    void onSaveConfiguration(data)
  }

  const handleClearHistoricalLogEntries = () => {
    void onClearHistoricalLogEntries()
  }

  return (
    <SensorConfigurationTemplate
      sidebar={sidebar ?? sensorConfigurationSidebar}
      sensorConfigForm={{
        data,
        activeEventTab,
        onBack: handleBack,
        onAddEvent: handleAddEvent,
        onRemoveEvent: handleRemoveEvent,
        onSaveConfiguration: handleSaveConfiguration,
        onEventTabChange: setActiveEventTab,
        onClearHistoricalLogEntries: handleClearHistoricalLogEntries,
      }}
    />
  )
}

export default SensorConfigurationPage
