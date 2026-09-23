import React from 'react'
import styled from 'styled-components'
import type { SidebarProps } from '../../Organisms/Sidebar'
import { BaseTemplate } from '../BaseTemplate'
import { SensorSummaryCard, type SensorSummaryCardData } from '../../Molecules/SensorSummaryCard'

export interface SensorDataConfigTemplateData {
  title: string
  subtitle?: string
  sensors: SensorSummaryCardData[]
}

export interface SensorDataConfigTemplateProps {
  sidebar: SidebarProps
  data: SensorDataConfigTemplateData
  onSensorSettingsClick?: (sensorTitle: string) => void
}

const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const SummaryCard = styled(SensorSummaryCard)`
  && {
    width: 100%;
    max-width: none;
    box-sizing: border-box;
  }
`

export function SensorDataConfigTemplate({
  sidebar,
  data,
  onSensorSettingsClick,
}: SensorDataConfigTemplateProps): React.ReactElement {
  return (
    <BaseTemplate sidebar={sidebar} title={data.title} description={data.subtitle}>
      <SummaryGrid aria-label="Sensor summaries">
        {data.sensors.map((sensor) => (
          <SummaryCard
            key={sensor.title}
            data={sensor}
            onSettingsClick={() => onSensorSettingsClick?.(sensor.title)}
          />
        ))}
      </SummaryGrid>
    </BaseTemplate>
  )
}
