import React from 'react'
import styled from 'styled-components'
import { BaseTemplate, type BaseTemplateProps } from '../BaseTemplate'
import { LineChart, type LineChartDataPoint, type LineChartMetric } from '../../Atoms/LineChart'
import { Button } from '../../Atoms/Button'
import { Text } from '../../Atoms/Text'
import { SystemStatusCard, type SystemStatusCardProps } from '../../Molecules/SystemStatusCard'
import { SystemTraceabilityTable, type SystemTraceabilityTableProps } from '../../Molecules/SystemTraceabilityTable'
import { theme } from '../../../../styles/theme'

export type IocServerStatusCard = Pick<SystemStatusCardProps, 'iconName' | 'title' | 'label' | 'value' | 'unit'>

export interface IocServerTable extends Pick<SystemTraceabilityTableProps, 'title' | 'columns' | 'data'> {
  actionLabel?: string
}

export interface IocServerChart {
  title: string
  metric: LineChartMetric
  data: LineChartDataPoint[]
}

export interface IocServerHeartbeatChart {
  title: string
  data: boolean[]
  timeLabels: string[]
  legendLabel: string
}

export interface IocServerSectionIntro {
  title: string
  description: string
}

export interface IocServerTemplateData {
  title: string
  subtitle: string
  description: string
  helperText: string
  statusCards: IocServerStatusCard[]
  heartbeatChart: IocServerHeartbeatChart
  logsSection?: IocServerSectionIntro
  traceabilityTable: IocServerTable
  eventTable: IocServerTable
  chartsSection?: IocServerSectionIntro
  performanceCharts: IocServerChart[]
  scanLatencySection?: IocServerSectionIntro
  scanLatencyChart: IocServerChart
}

export interface IocServerTemplateProps extends Omit<BaseTemplateProps, 'children' | 'title' | 'description'> {
  data: IocServerTemplateData
  onBack?: () => void
  onTraceabilityAction?: () => void
  onEventAction?: () => void
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const HeadingGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

const Subtitle = styled(Text)`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.contentMid};
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const SectionIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const StatusCard = styled(SystemStatusCard)`
  min-height: 111px;
`

const HeartbeatPanel = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: 111px;
`

const SectionDivider = styled.hr`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  border: 0;
  border-top: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
`

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`

const PerformanceChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`

const ScanLatencyPanel = styled.div`
  max-width: 1000px;
`

export function IocServerTemplate({
  sidebar,
  data,
  onBack,
  onTraceabilityAction,
  onEventAction,
}: IocServerTemplateProps): React.ReactElement {
  const heartbeatLabelStep = data.heartbeatChart.timeLabels.length > 1 && data.heartbeatChart.data.length > 1
    ? (data.heartbeatChart.data.length - 1) / (data.heartbeatChart.timeLabels.length - 1)
    : 0
  const heartbeatLabelPositions = new Map(
    data.heartbeatChart.timeLabels.map((label, index) => [
      Math.round(index * heartbeatLabelStep),
      label,
    ])
  )
  const heartbeatChartData = data.heartbeatChart.data.map((isActive, index) => ({
    time: heartbeatLabelPositions.get(index) || '',
    value: isActive ? 1 : 0,
  }))

  return (
    <BaseTemplate sidebar={sidebar}>
      <Page>
        <PageHeader>
          <HeadingGroup>
            <Button
              variant="filled"
              iconName="arrowUUpLeft"
              iconSize="xl"
              aria-label="Back"
              onClick={onBack}
            />
            <TitleGroup>
              <Text variant="h3" color={theme.colors.contentHigh}>
                {data.title}
              </Text>
              <Subtitle variant="bodyMedium">
                {data.subtitle}
              </Subtitle>
            </TitleGroup>
          </HeadingGroup>
        </PageHeader>

        <Description>
          <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>
            {data.description}
          </Text>
          <Text variant="bodyLarge" color={theme.colors.contentMid}>
            {data.helperText}
          </Text>
        </Description>

        <StatusGrid>
          {data.statusCards.slice(0, 3).map((card) => (
            <StatusCard
              key={card.title}
              iconName={card.iconName}
              title={card.title}
              label={card.label}
              value={card.value}
              unit={card.unit}
            />
          ))}
          <HeartbeatPanel>
            <Text variant="bodyMediumBold" color={theme.colors.contentHigh}>
              {data.heartbeatChart.title}
            </Text>
            <LineChart
              data={heartbeatChartData}
              metric="heartbeat"
              variant="expanded"
              height={114}
              ticks={[0, 1]}
              xAxisInterval={0}
              showDots={false}
              fillArea
              areaFill="gradient"
              showReferenceLines={false}
            />
          </HeartbeatPanel>
          {data.statusCards.slice(3).map((card) => (
            <StatusCard
              key={card.title}
              iconName={card.iconName}
              title={card.title}
              label={card.label}
              value={card.value}
              unit={card.unit}
            />
          ))}
        </StatusGrid>

        <SectionDivider />

        {data.logsSection && (
          <SectionIntro>
            <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>
              {data.logsSection.title}
            </Text>
            <Text variant="bodyLarge" color={theme.colors.contentMid}>
              {data.logsSection.description}
            </Text>
          </SectionIntro>
        )}

        <TablesGrid>
          <SystemTraceabilityTable
            title={data.traceabilityTable.title}
            exportButtonLabel={data.traceabilityTable.actionLabel}
            columns={data.traceabilityTable.columns}
            data={data.traceabilityTable.data}
            pagination={false}
            onExportCsv={onTraceabilityAction}
          />
          <SystemTraceabilityTable
            title={data.eventTable.title}
            exportButtonLabel={data.eventTable.actionLabel}
            columns={data.eventTable.columns}
            data={data.eventTable.data}
            pagination={false}
            onExportCsv={onEventAction}
          />
        </TablesGrid>

        <SectionDivider />

        {data.chartsSection && (
          <SectionIntro>
            <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>
              {data.chartsSection.title}
            </Text>
            <Text variant="bodyLarge" color={theme.colors.contentMid}>
              {data.chartsSection.description}
            </Text>
          </SectionIntro>
        )}

        <PerformanceChartsGrid>
          {data.performanceCharts.map((chart) => (
            <LineChart
              key={chart.title}
              data={chart.data}
              metric={chart.metric}
              variant="expanded"
              showDots={false}
              fillArea
              areaFill="gradient"
              showReferenceLines={false}
            />
          ))}
        </PerformanceChartsGrid>

        <SectionDivider />

        {data.scanLatencySection && (
          <SectionIntro>
            <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>
              {data.scanLatencySection.title}
            </Text>
            <Text variant="bodyLarge" color={theme.colors.contentMid}>
              {data.scanLatencySection.description}
            </Text>
          </SectionIntro>
        )}

        <ScanLatencyPanel>
          <LineChart
            data={data.scanLatencyChart.data}
            metric={data.scanLatencyChart.metric}
            variant="expanded"
            showDots={false}
            fillArea
            areaFill="gradient"
            showReferenceLines={false}
          />
        </ScanLatencyPanel>
      </Page>
    </BaseTemplate>
  )
}
