import { HostMetricChart } from '../entities/host-metric-chart.entity'

export interface HostMetricsChartRepository {
  findChartMetrics(
    type: string,
    subtype: string,
    timeRange: string,
  ): Promise<HostMetricChart[]>
}
