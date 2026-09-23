import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { theme } from '../../../../styles/theme'

import { Text } from '../../Atoms/Text'
import { SwitchButton } from '../../Atoms/SwitchButton'
import { Divider } from '../../Atoms/Divider'
import { Accordion } from '../../Atoms/Accordion'
import { CountBadge } from '../../Molecules/CountBadge'

export interface MetricItem {
  id: string
  label: string
  enabled?: boolean
  flagged?: boolean
}

export interface MetricGroup {
  id: string
  title: string
  metrics: MetricItem[]
  hideSwitch?: boolean
}

export interface MetricSelectorProps {
  title?: string
  groups: MetricGroup[]
  onToggleEnabled?: (enabled: boolean) => void
  onMetricToggle?: (
    groupId: string,
    metricId: string,
    enabled: boolean
  ) => void
}

const Container = styled.div`
  width: 100%;
  max-width: 340px;
  background-color: ${theme.colors.backgroundHigh};
  border: 1px solid ${theme.colors.borderMid};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.padding.card};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  white-space: nowrap;
`

const Groups = styled.div`
  display: flex;
  flex-direction: column;
`

const MetricsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  padding-left: ${theme.spacing.sm};
`

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MetricLabelWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
`

const FlagDot = styled.div`
  position: absolute;

  top: 2px;
  right: -10px;

  width: 6px;
  height: 6px;

  border-radius: 50%;
  background-color: ${theme.colors.anomalyFlag};

  box-shadow: 0 0 6px ${theme.colors.anomalyFlag};
`
const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.spacing.lg};
`

export function MetricSelector({
  title = 'Show metrics affected by anomaly',
  groups,
  onToggleEnabled,
  onMetricToggle,
}: MetricSelectorProps): React.ReactElement {
  const [internalGroups, setInternalGroups] =
    useState<MetricGroup[]>(groups)

  const flaggedMetrics = useMemo(
    () =>
      internalGroups.flatMap((group) =>
        group.metrics.filter((metric) => metric.flagged)
      ),
    [internalGroups]
  )

  const enabled = flaggedMetrics.every(
    (metric) => metric.enabled
  )

  const handleMetricToggle = (
    groupId: string,
    metricId: string,
    checked: boolean
  ) => {
    setInternalGroups((prev) =>
      prev.map((group) => ({
        ...group,
        metrics: group.metrics.map((metric) =>
          metric.id === metricId
            ? { ...metric, enabled: checked }
            : metric
        ),
      }))
    )

    onMetricToggle?.(groupId, metricId, checked)
  }

  const handleToggleAll = (checked: boolean) => {
    setInternalGroups((prev) =>
      prev.map((group) => ({
        ...group,
        metrics: group.metrics.map((metric) =>
          metric.flagged
            ? { ...metric, enabled: checked }
            : metric
        ),
      }))
    )

    onToggleEnabled?.(checked)
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Text
            variant="bodyMedium"
            color={theme.colors.contentHigh}
          >
            {title}
          </Text>

          <CountBadge
            count={flaggedMetrics.length}
            items={flaggedMetrics.map(
              (metric) => metric.label
            )}
            variant="metricSelector"
          />
        </HeaderLeft>

        <SwitchButton
          checked={enabled}
          onChange={handleToggleAll}
        />
      </Header>

      <DividerWrapper>
        <Divider />
      </DividerWrapper>

      <Groups>
        <Accordion
          variant="metricSelector"
          ghost
          items={internalGroups.map((group) => ({
            key: group.id,
            label: group.title,
            children: (
              <MetricsList>
                {group.metrics.map((metric) => (
                  <MetricRow key={metric.id}>
                    <MetricLabelWrapper>
                      <Text
                        variant="bodyMedium"
                        color={theme.colors.contentHigh}
                      >
                        {metric.label}
                      </Text>

                      {metric.flagged && <FlagDot />}
                    </MetricLabelWrapper>

                    {!group.hideSwitch && (
                    <SwitchButton
                      checked={metric.enabled}
                      onChange={(checked) =>
                        handleMetricToggle(
                          group.id,
                          metric.id,
                          checked
                        )
                      }
                    />
                  )}
                  </MetricRow>
                ))}
              </MetricsList>
            ),
          }))}
        />
      </Groups>
    </Container>
  )
}