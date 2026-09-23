import React from 'react'
import styled from 'styled-components'
import { Accordion } from '../../Atoms/Accordion'
import { Card } from '../../Atoms/Card'
import { Text } from '../../Atoms/Text'
import { ActiveAnomalyRow, ActiveAnomalyRowProps } from '../../Molecules/ActiveAnomalyRow'
import { AnomalyOption } from '../../Molecules/AnomalyOption'
import { CountBadge } from '../../Molecules/CountBadge'
import { theme } from '../../../../styles/theme'

export interface NodeCardData {
  title: string
  iocInstances: string[]
  activeAnomaly?: ActiveAnomalyRowProps['data']
}

export interface NodeCardProps {
  data: NodeCardData
  actionPanelTitle?: string
  defaultActionPanelOpen?: boolean
  onAnomalyOptionChange?: (value: string) => void
  className?: string
  style?: React.CSSProperties
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.contentHigh};
  box-sizing: border-box;
`

const Summary = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding: 10px ${({ theme }) => theme.spacing.md} 0px ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
  line-height: ${({ theme }) => theme.typography.h5.lineHeight};
`

const IocInstances = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ActiveAnomalies = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const EmptyAnomalyRow = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.row};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
`

const ActionAccordion = styled(Accordion)`
  &.ant-collapse {
    background-color: ${({ theme }) => theme.colors.backgroundLowest};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: 0px ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};

    .ant-collapse-header {
      min-height: 62px;
      align-items: center !important;
      padding: 0 ${({ theme }) => theme.spacing.lg} !important;
      gap: ${({ theme }) => theme.spacing.md};
      color: ${({ theme }) => theme.colors.contentHigh};
    }

    .ant-collapse-expand-icon {
      align-items: center;
      padding-inline-end: ${({ theme }) => theme.spacing.md} !important;
    }

    .ant-collapse-content {
      background-color: ${({ theme }) => theme.colors.backgroundLowest};
      border-top: none;
    }

    .ant-collapse-content-box {
      padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
    }
  }
`

const DefaultActionPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.anomalyPanel};
`

export function NodeCard({
  data,
  actionPanelTitle = 'Anomaly Action Panel',
  defaultActionPanelOpen = false,
  onAnomalyOptionChange,
  className,
  style,
}: NodeCardProps): React.ReactElement {
  const {
    title,
    iocInstances,
    activeAnomaly,
  } = data

  const handleAnomalyOptionChange = onAnomalyOptionChange || (() => undefined)

  return (
    <Container background="low" padding="card" className={className} style={style}>
      <Summary>
        <Header>
          <Title variant="h5" color={theme.colors.contentHigh}>{title}</Title>
          <IocInstances>
            <Text variant="bodyMedium" color={theme.colors.contentMid}>
              IOC Instances:
            </Text>
            <CountBadge count={iocInstances.length} items={iocInstances} />
          </IocInstances>
        </Header>

        <ActiveAnomalies>
          <Text variant="bodyMediumBold" color={theme.colors.contentHigh}>Active anomalies</Text>
          {activeAnomaly ? (
            <ActiveAnomalyRow data={activeAnomaly} />
          ) : (
            <EmptyAnomalyRow>
              <Text variant="bodyMedium" color={theme.colors.contentMid}>
                None
              </Text>
            </EmptyAnomalyRow>
          )}
        </ActiveAnomalies>
      </Summary>

      <ActionAccordion
        variant="default"
        defaultActiveKey={defaultActionPanelOpen ? ['anomaly-action-panel'] : undefined}
        items={[
          {
            key: 'anomaly-action-panel',
            label: actionPanelTitle,
            children: (
              <DefaultActionPanelContent>
                <AnomalyOption type="network" onChange={handleAnomalyOptionChange} />
                <AnomalyOption type="resource" onChange={handleAnomalyOptionChange} />
                <AnomalyOption type="disk" onChange={handleAnomalyOptionChange} />
              </DefaultActionPanelContent>
            ),
          },
        ]}
      />
    </Container>
  )
}
