import React from 'react'
import styled from 'styled-components'
import { Card, CardProps } from '../../Atoms/Card'
import { MetricCard, MetricCardProps, MetricCardMetricType, ProgressFixedColorKey, ProgressTrack } from '../MetricCard'
import { LineChart, LineChartAreaFill, LineChartDataPoint, LineChartMetric, LineChartVariant } from '../../Atoms/LineChart'

export interface MetricItemProps extends CardProps {
  metricCardProps: MetricCardProps
  chartData: LineChartDataPoint[]
  metric: LineChartMetric
  lineChartVariant?: LineChartVariant
  showDots?: boolean
  fillArea?: boolean
  areaFill?: LineChartAreaFill
  showReferenceLines?: boolean
  referenceLinesConfig?: { 50?: boolean; 75?: boolean }
  progressFixedColorKey?: ProgressFixedColorKey
  progressTrack?: ProgressTrack
}

const MetricItemContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  border-radius: 0;
`

export function MetricItem({
  metricCardProps,
  chartData,
  metric,
  lineChartVariant = 'standard',
  showDots = false,
  fillArea = true,
  areaFill = 'gradient',
  showReferenceLines = true,
  referenceLinesConfig = { 50: true, 75: true },
  progressFixedColorKey,
  progressTrack = 'grey',
  variant = 'default',
  background = 'high',
  padding = 'card',
  className,
  dataTestId,
}: MetricItemProps): React.ReactElement {
  const metricType: MetricCardMetricType = metric as MetricCardMetricType

  return (
    <MetricItemContainer
      variant={variant}
      background={background}
      padding={padding}
      className={className}
      dataTestId={dataTestId}
    >
      <MetricCard {...metricCardProps} metricType={metricType} progressFixedColorKey={progressFixedColorKey} progressTrack={progressTrack} />
      <LineChart
        data={chartData}
        metric={metric}
        variant={lineChartVariant}
        showDots={showDots}
        fillArea={fillArea}
        areaFill={areaFill}
        showReferenceLines={showReferenceLines}
        referenceLinesConfig={referenceLinesConfig}
      />
    </MetricItemContainer>
  )
}
