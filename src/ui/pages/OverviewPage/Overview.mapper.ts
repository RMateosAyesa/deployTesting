import type { HostMetricValue } from '../../../host-metrics/domain/entities/host-metric.entity'
import { HostMetricType } from '../../../host-metrics/domain/enums'
import type { NodeMetrics } from '../../components/Templates/OverviewTemplate'

type UiMetric = NodeMetrics['metrics'][number]['metric']

const DOMAIN_TYPE_BY_UI_METRIC: Partial<Record<UiMetric, HostMetricType>> = {
  cpu: HostMetricType.CPU,
  ram: HostMetricType.RAM,
  disk: HostMetricType.DISK,
  network: HostMetricType.NET,
}

const EPOCH_MILLISECONDS_THRESHOLD = 1_000_000_000_000

function formatEpochTime(timestamp: number): string {
  const milliseconds =
    timestamp < EPOCH_MILLISECONDS_THRESHOLD ? timestamp * 1000 : timestamp

  return new Date(milliseconds).toISOString().slice(11, 16)
}

export function mapOverviewMetricsToNodes(
  metrics: readonly HostMetricValue[],
  layout: readonly NodeMetrics[],
): NodeMetrics[] {
  return layout.map(node => ({
    ...node,
    metrics: node.metrics.map(metricItem => {
      const domainType = DOMAIN_TYPE_BY_UI_METRIC[metricItem.metric]

      if (domainType === undefined) {
        return {
          ...metricItem,
          metricCardProps: { ...metricItem.metricCardProps },
          chartData: [...metricItem.chartData],
        }
      }

      const domainMetrics = metrics
        .filter(metric => metric.type === domainType)
        .sort(
          (first, second) => first.timestamp - second.timestamp,
        )
      const latestMetric = domainMetrics[domainMetrics.length - 1]

      return {
        ...metricItem,
        metricCardProps: {
          ...metricItem.metricCardProps,
          progressPercent: latestMetric?.value ?? 0,
        },
        chartData: domainMetrics.map(metric => ({
          time: formatEpochTime(metric.timestamp),
          value: metric.value,
        })),
      }
    }),
  }))
}