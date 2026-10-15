import { UseCase } from '../../shared/types/use-case'
import { HostMetricChartValue } from '../domain/entities/host-metric-chart.entity'
import {
  GetChartMetricsInput,
  GetChartMetricsUseCase,
} from '../application/use-cases/get-chart-metrics.use-case'
import { hostMetricsRepository, hostMetricsChartRepository } from './repositories.deps'
import {
  GetOverviewMetricsInput,
  GetOverviewMetricsUseCase,
} from '../application/use-cases/get-overview-metrics.use-case'
import { HostMetricValue } from '../domain/entities/host-metric.entity'

export const getChartMetrics: UseCase<
  GetChartMetricsInput,
  HostMetricChartValue[]
> = new GetChartMetricsUseCase(hostMetricsChartRepository)

export const getOverviewMetrics: UseCase<
  GetOverviewMetricsInput,
  HostMetricValue[]
> = new GetOverviewMetricsUseCase(hostMetricsRepository)