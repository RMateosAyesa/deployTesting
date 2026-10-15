import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
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
  margin-top: ${({ theme }) => theme.spacing.md};
`

const AccordionHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const AddMetricsWrapper = styled.div`
  position: relative;
`

const AddMetricsButton = styled(Button)`
  height: 28px;
  padding: 4px 12px;
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  line-height: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`

const MetricSelectorWrapper = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  z-index: 10;
  width: min(340px, calc(100vw - 48px));
`

const IocCardsGrid = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const IocPerformanceSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textColor};
`

const IocSectionTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
  line-height: 18px;
`

const CylinderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: 12px;
`

const CylinderToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  background: transparent;
  border: 0;
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.colors.semanticPrimary};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
  &[aria-expanded='true'] { border-bottom-color: currentColor; }
`

const CylinderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 600px) { grid-template-columns: minmax(0, 1fr); }
`

function CylinderPerformance({ node }: { node: NodeMetrics }) {
  const [openCylinderId, setOpenCylinderId] = useState<string | null>(
    node.iocCylinders?.[0]?.id ?? null,
  )
  return (
    <IocPerformanceSection aria-label="IOC Performance">
      <IocSectionTitle>IOC Performance</IocSectionTitle>
      <CylinderActions>
        {node.iocCylinders?.map(cylinder => (
          <CylinderToggle
            key={cylinder.id}
            aria-expanded={openCylinderId === cylinder.id}
            aria-controls={`${node.id}-${cylinder.id}`}
            onClick={() => {
              node.onShowIOC?.()
              setOpenCylinderId(previous => previous === cylinder.id ? null : cylinder.id)
            }}
          >
            {openCylinderId === cylinder.id ? <EyeIcon size={16} /> : <EyeSlashIcon size={16} />}
            {openCylinderId === cylinder.id ? 'Hide' : 'Show'} {cylinder.title}
            <CountBadge count={cylinder.cards.length} items={cylinder.cards.map(card => card.title)} />
          </CylinderToggle>
        ))}
      </CylinderActions>
      {node.iocCylinders?.map(cylinder => (
        <div key={cylinder.id} id={`${node.id}-${cylinder.id}`} hidden={openCylinderId !== cylinder.id}>
          {openCylinderId === cylinder.id && (
            <CylinderGrid aria-label={cylinder.title}>
              {cylinder.cards.map(card => <IocServerCard key={card.dataTestId} {...card} compact />)}
            </CylinderGrid>
          )}
        </div>
      ))}
    </IocPerformanceSection>
  )
}

export interface NodeMetrics {
  id: string
  title: string
  metrics: MetricItemProps[]
  iocCylinders?: { id: string; title: string; cards: IocServerCardProps[] }[]
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
                      <AddMetricsButton
                        variant="outlined"
                        onClick={() => {
                          node.onAddMetrics?.()
                          toggleMetricSelector(node.id)
                        }}
                      >
                        Add more metrics
                      </AddMetricsButton>

                      {metricSelectorOpen[node.id] && metricSelectorGroups && (
                        <MetricSelectorWrapper>
                          <MetricSelector groups={metricSelectorGroups} />
                        </MetricSelectorWrapper>
                      )}
                    </AddMetricsWrapper>

                    {!node.iocCylinders && <Button
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
                        count={node.iocServerCards?.length ?? 0}
                        items={node.iocServerCards?.map(card => card.title) ?? []}
                      />
                    </Button>}
                  </NodeActions>

                  {node.iocCylinders && <CylinderPerformance node={node} />}

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