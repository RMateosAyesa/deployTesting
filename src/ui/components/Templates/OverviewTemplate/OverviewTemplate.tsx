import React, { useState } from 'react'
import styled from 'styled-components'
import { BaseTemplate, BaseTemplateProps } from '../BaseTemplate'
import { MetricItem, MetricItemProps } from '../../Molecules/MetricItem'
import { Button } from '../../Atoms/Button'
import { Accordion } from '../../Atoms/Accordion'
import { CountBadge } from '../../Molecules/CountBadge'
import { Select } from '../../Atoms/Select'
import { MetricSelector, MetricGroup } from '../../Organisms/MetricSelector'
import { IocServerCard, IocServerCardProps } from '../../Molecules/IocServerCard'

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`

const NodeActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

const AccordionHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const AddMetricsWrapper = styled.div`
  position: relative;
  margin-left: ${({ theme }) => theme.spacing.md};
`

const MetricSelectorWrapper = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0;
  margin-left: ${({ theme }) => theme.spacing.sm};
  width: 340px;
`

const IocCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

export interface NodeMetrics {
  id: string
  title: string
  metrics: MetricItemProps[]
  iocServerCards?: IocServerCardProps[]
  onAddMetrics?: () => void
  onShowIOC?: () => void
  timeRangeValue?: string
  onTimeRangeChange?: (value: string) => void
}

export interface OverviewTemplateProps
  extends Omit<BaseTemplateProps, 'children'> {
  nodes: NodeMetrics[]
  metricSelectorGroups?: MetricGroup[]
}

export function OverviewTemplate({
  sidebar,
  title,
  description,
  nodes,
  metricSelectorGroups,
}: OverviewTemplateProps): React.ReactElement {
  const timeRangeOptions = [
    { value: 'realtime', label: 'Real-time data' },
    { value: '1h', label: 'Last hour' },
    { value: '24h', label: 'Last 24 hours' },
  ]

  const [metricSelectorOpen, setMetricSelectorOpen] = useState<
    Record<string, boolean>
  >({})

  const [iocCardsOpen, setIocCardsOpen] = useState<
    Record<string, boolean>
  >({})

  const toggleMetricSelector = (nodeId: string) =>
    setMetricSelectorOpen((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }))

  const toggleIocCards = (nodeId: string) =>
    setIocCardsOpen((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }))

  return (
    <BaseTemplate
      sidebar={sidebar}
      title={title}
      description={description}
    >
      {nodes.map((node) => (
        <Accordion
          key={node.id}
          variant="default"
          defaultActiveKey={[node.id]}
          items={[
            {
              key: node.id,
              label: (
                <AccordionHeaderWrapper>
                  <span>{node.title}</span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Select
                      variant="minimalist"
                      options={timeRangeOptions}
                      value={node.timeRangeValue || 'realtime'}
                      onChange={node.onTimeRangeChange}
                    />
                  </div>
                </AccordionHeaderWrapper>
              ),
              children: (
                <>
                  <MetricsGrid>
                    {node.metrics.map((metric) => (
                      <MetricItem
                        key={`${node.id}-${metric.metric}`}
                        {...metric}
                        dataTestId={`metric-card-${node.id}-${metric.metric}`}
                      />
                    ))}
                  </MetricsGrid>

                  <NodeActions>
                    <AddMetricsWrapper>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          node.onAddMetrics?.()
                          toggleMetricSelector(node.id)
                        }}
                      >
                        Add more metrics
                      </Button>

                      {metricSelectorOpen[node.id] && metricSelectorGroups && (
                        <MetricSelectorWrapper>
                          <MetricSelector groups={metricSelectorGroups} />
                        </MetricSelectorWrapper>
                      )}
                    </AddMetricsWrapper>

                    <Button
                      variant="filled"
                      iconName="eyeSlash"
                      iconSize="s"
                      onClick={() => {
                        node.onShowIOC?.()
                        toggleIocCards(node.id)
                      }}
                    >
                      Show IOC Performance
                      <CountBadge
                        count={3}
                        items={[
                          'CPU usage',
                          'Memory pressure',
                          'Disk latency',
                        ]}
                      />
                    </Button>
                  </NodeActions>

                  {iocCardsOpen[node.id] && node.iocServerCards && (
                    <IocCardsGrid>
                      {node.iocServerCards.map((card, index) => (
                        <IocServerCard key={`${node.id}-ioc-${index}`} {...card} />
                      ))}
                    </IocCardsGrid>
                  )}
                </>
              ),
            },
          ]}
        />
      ))}
    </BaseTemplate>
  )
}