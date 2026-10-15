import { HostMetricsChartRepository } from '../../../../domain/contracts/host-metrics-chart.repository'
import { HostMetricChart } from '../../../../domain/entities/host-metric-chart.entity'

export class AxiosHostMetricsChartRepository
  implements HostMetricsChartRepository
{
  findChartMetrics(
    _type: string,
    _subtype: string,
    _timeRange: string,
  ): Promise<HostMetricChart[]> {
    return Promise.resolve([])
  }
}
