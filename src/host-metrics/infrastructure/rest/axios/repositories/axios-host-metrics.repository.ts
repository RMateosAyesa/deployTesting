import { axiosInstance } from '../../../../../shared/instances/axios-instance-api'
import { HostMetricsRepository } from '../../../../domain/contracts/host-metrics.repository'
import { HostMetric } from '../../../../domain/entities/host-metric.entity'
import type { HostMetricType } from '../../../../domain/enums/host-metric-type.enum'

import type { GetHostMetricsResponseDto } from '../dtos/get-host-metrics.dto'

const HOST_METRICS_ENDPOINT = '/host-metrics'

export class AxiosHostMetricsRepository implements HostMetricsRepository {
  async findOverviewMetrics(
    type: HostMetricType,
    subtype: string,
    minutes?: number,
  ): Promise<HostMetric[]> {
    const { data } = await axiosInstance.get<GetHostMetricsResponseDto>(
      HOST_METRICS_ENDPOINT,
      { params: { type, subtype, minutes } },
    )

    return data.flatMap(overview =>
      overview.metrics.map(point =>
        HostMetric.create({
          type: overview.type,
          subtype: point.subtype,
          value: point.value,
          timestamp: point.timestamp,
          visibleName: point.visible_name,
        }),
      ),
    )
  }
}