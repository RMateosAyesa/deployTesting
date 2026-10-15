import { HostMetricsChartRepository } from '../domain/contracts/host-metrics-chart.repository'
import { HostMetricsRepository } from '../domain/contracts/host-metrics.repository'
import { AxiosHostMetricsChartRepository } from '../infrastructure/rest/axios/repositories/axios-host-metrics-chart.repository'
import { AxiosHostMetricsRepository } from '../infrastructure/rest/axios/repositories/axios-host-metrics.repository'

export const hostMetricsRepository: HostMetricsRepository =
  new AxiosHostMetricsRepository()

export const hostMetricsChartRepository: HostMetricsChartRepository =
  new AxiosHostMetricsChartRepository()
