import React, { useState } from 'react'
import { AnomalyScenarioTemplate } from '../../components/Templates/AnomalyScenarioTemplate'
import { AnomalyModal, AnomalyModalFormMode } from '../../components/Organisms/AnomalyModal'
import { anomalyConfig, AnomalyOptionType } from '../../components/Molecules/AnomalyOption'
import { ActiveAnomalyRowProps } from '../../components/Molecules/ActiveAnomalyRow'
import type { SidebarProps } from '../../components/Organisms/Sidebar'
import {
  anomalyScenarioSidebar,
  anomalyScenarioPageData,
  startAnomaly,
  scheduleAnomaly,
} from './AnomalyScenarioPage.service'

export interface AnomalyScenarioPageProps {
  sidebar?: SidebarProps
  onStartAnomaly?: (action: string) => Promise<void>
  onScheduleAnomaly?: (action: string) => Promise<void>
}

const getAnomalyType = (value: string): AnomalyOptionType | undefined => {
  return (Object.entries(anomalyConfig).find(([, config]) =>
    config.options.some(option => option.value === value)
  )?.[0]) as AnomalyOptionType | undefined
}

export function AnomalyScenarioPage({
  sidebar,
  onStartAnomaly = startAnomaly,
  onScheduleAnomaly = scheduleAnomaly,
}: AnomalyScenarioPageProps): React.ReactElement {
  const [activeAnomaly, setActiveAnomaly] = useState<ActiveAnomalyRowProps['data'] | undefined>(undefined)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAnomalyType, setSelectedAnomalyType] = useState<AnomalyOptionType>('network')
  const [selectedOptionName, setSelectedOptionName] = useState('')

  const handleAnomalyOptionChange = (value: string) => {
    const anomalyType = getAnomalyType(value)

    if (!anomalyType) return

    setSelectedOptionName(value)
    setSelectedAnomalyType(anomalyType)
    setIsModalOpen(true)
  }

  const handleModalAccept = async (mode: AnomalyModalFormMode) => {
      if (mode === 'runNow') {
        await onStartAnomaly(selectedOptionName)
        setActiveAnomaly({
          type: selectedAnomalyType,
          optionValue: selectedOptionName,
          status: 'running', 
        })
      } else {
        await onScheduleAnomaly(selectedOptionName)
        setActiveAnomaly({
          type: selectedAnomalyType,
          optionValue: selectedOptionName,
          status: 'scheduled',
        })
      }
  }

  const dynamicNodeCardData = {
    ...anomalyScenarioPageData.nodeCardData,
    activeAnomaly,
  }

  const modalMockData = {
    nodeName: dynamicNodeCardData.title,
    metrics: ['node_network_receive_packets_total', 'node_network_up'],
  }

  return (
    <>
      <AnomalyScenarioTemplate
        sidebar={sidebar ?? anomalyScenarioSidebar}
        title={anomalyScenarioPageData.title}
        description={anomalyScenarioPageData.description}
        nodeCardData={dynamicNodeCardData}
        onAnomalyOptionChange={handleAnomalyOptionChange}
      />

      <AnomalyModal
        open={isModalOpen}
        anomalyType={selectedAnomalyType}
        selectedOption={selectedOptionName}
        data={modalMockData}
        onCancel={() => setIsModalOpen(false)}
        onAccept={handleModalAccept}
      />
    </>
  )
}

export default AnomalyScenarioPage