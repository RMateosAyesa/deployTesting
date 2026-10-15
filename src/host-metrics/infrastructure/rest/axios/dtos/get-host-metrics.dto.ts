import type { HostMetricType } from '../../../../domain/enums'

export interface GetOverviewMetricsPointDto {
  subtype: string
  value: number
  timestamp: number
  visible_name: string
}

export interface GetOverviewMetricsDto {
  type: HostMetricType
  metrics: GetOverviewMetricsPointDto[]
}

export type GetHostMetricsResponseDto = GetOverviewMetricsDto[]