import { HostMetric } from '../entities/host-metric.entity'
import type { HostMetricType } from '../enums/host-metric-type.enum'

export interface HostMetricsRepository {
  findOverviewMetrics(
    type: HostMetricType,
    subtype: string,
    minutes?: number,
  ): Promise<HostMetric[]>
}