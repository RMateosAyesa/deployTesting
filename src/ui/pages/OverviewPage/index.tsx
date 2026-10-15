import React, { useEffect, useState } from 'react'

import type { GetOverviewMetricsInput } from '../../../host-metrics/application/use-cases/get-overview-metrics.use-case'
import { getOverviewMetrics } from '../../../host-metrics/dependencies/use-cases.deps'
import type { HostMetricValue } from '../../../host-metrics/domain/entities/host-metric.entity'
import { OverviewMetricsTimeRange } from '../../../host-metrics/domain/enums'
import { useAxios } from '../../../shared/hooks/useAxios/useAxios'

import {
  OverviewTemplate,
  type NodeMetrics,
} from '../../components/Templates/OverviewTemplate'
import type { SidebarProps } from '../../components/Organisms/Sidebar'

import {
  overviewSidebar,
  overviewPageData,
  overviewNodes,
  metricSelectorGroups,
  addMetrics,
  showIOC,
  changeTimeRange,
  DEFAULT_SUBTYPE_BY_METRIC,
  OVERVIEW_METRICS,
} from './Overview.service'
import { mapOverviewMetricsToNodes } from './Overview.mapper'

type OverviewPageTimeRange =
  | OverviewMetricsTimeRange.REALTIME
  | OverviewMetricsTimeRange.LAST_HOUR
  | OverviewMetricsTimeRange.LAST_DAY

const UI_TIME_RANGE_BY_DOMAIN: Record<OverviewPageTimeRange, string> = {
  [OverviewMetricsTimeRange.REALTIME]: 'realtime',
  [OverviewMetricsTimeRange.LAST_HOUR]: '1h',
  [OverviewMetricsTimeRange.LAST_DAY]: '24h',
}

const DOMAIN_TIME_RANGE_BY_UI: Partial<
  Record<string, OverviewPageTimeRange>
> = {
  realtime: OverviewMetricsTimeRange.REALTIME,
  '1h': OverviewMetricsTimeRange.LAST_HOUR,
  '24h': OverviewMetricsTimeRange.LAST_DAY,
}

const emptyOverviewNodes = mapOverviewMetricsToNodes([], overviewNodes)

const MINUTES_BY_TIME_RANGE: Record<OverviewPageTimeRange, number | undefined> =
  {
    [OverviewMetricsTimeRange.REALTIME]: undefined,
    [OverviewMetricsTimeRange.LAST_HOUR]: 60,
    [OverviewMetricsTimeRange.LAST_DAY]: 1440,
  }

const fetchOverviewMetrics = async (
  timeRange: OverviewPageTimeRange,
): Promise<HostMetricValue[]> => {
  const minutes = MINUTES_BY_TIME_RANGE[timeRange]

  const inputs: GetOverviewMetricsInput[] = OVERVIEW_METRICS.map(metric => ({
    type: metric,
    subtype: DEFAULT_SUBTYPE_BY_METRIC[metric],
    ...(minutes === undefined ? {} : { minutes }),
  }))

  const results = await Promise.all(
    inputs.map(input => getOverviewMetrics.execute(input)),
  )

  return results.flat()
}

const adaptOverviewMetrics = (metrics: HostMetricValue[]) =>
  mapOverviewMetricsToNodes(metrics, overviewNodes)

export interface OverviewPageProps {
  sidebar?: SidebarProps
  onAddMetrics?: (nodeId: string) => Promise<void>
  onShowIOC?: (nodeId: string) => Promise<void>
  onTimeRangeChange?: (
    nodeId: string,
    value: string
  ) => Promise<void>
  onFetchOverviewMetrics?: (
    timeRange: OverviewPageTimeRange,
  ) => Promise<HostMetricValue[]>
}

export function OverviewPage({
  sidebar,
  onAddMetrics = addMetrics,
  onShowIOC = showIOC,
  onTimeRangeChange = changeTimeRange,
  onFetchOverviewMetrics = fetchOverviewMetrics,
}: OverviewPageProps): React.ReactElement {
  const [timeRange, setTimeRange] = useState<OverviewPageTimeRange>(
    OverviewMetricsTimeRange.REALTIME,
  )
  const { data, fireOperation } = useAxios<HostMetricValue[], NodeMetrics[]>(
    onFetchOverviewMetrics,
    { initData: emptyOverviewNodes },
    adaptOverviewMetrics,
  )

  useEffect(() => {
    fireOperation(timeRange)
  }, [fireOperation, timeRange])

  const nodes = (data ?? emptyOverviewNodes).map((node) => ({
    ...node,
    timeRangeValue: UI_TIME_RANGE_BY_DOMAIN[timeRange],

    onAddMetrics: async () => {
      await onAddMetrics(node.id)
    },

    onShowIOC: () => {
      void onShowIOC(node.id)
    },

    onTimeRangeChange: (value: string) => {
      const nextTimeRange = DOMAIN_TIME_RANGE_BY_UI[value]

      if (nextTimeRange !== undefined) {
        setTimeRange(nextTimeRange)
      }

      void onTimeRangeChange(node.id, value)
    },
  }))

  return (
    <OverviewTemplate
      sidebar={sidebar ?? overviewSidebar}
      title={overviewPageData.title}
      description={overviewPageData.description}
      nodes={nodes}
      metricSelectorGroups={metricSelectorGroups}
    />
  )
}

export default OverviewPage