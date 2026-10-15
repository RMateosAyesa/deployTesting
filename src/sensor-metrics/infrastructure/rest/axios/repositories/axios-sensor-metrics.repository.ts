import { axiosInstance } from '../../../../../shared/instances/axios-instance-api'
import type { SensorMetricsRepository } from '../../../../domain/contracts/sensor-metrics.repository'
import { SensorMetric } from '../../../../domain/entities/sensor-metric.entity'

import type {
  GetLithiumSystemDataRequestDto,
  GetLithiumSystemDataResponseDto,
  LithiumSystemSensorDataDto,
} from '../dtos/get-lithium-system-data.dto'

const LITHIUM_SYSTEM_DATA_ENDPOINT = '/sensor-metrics/lithium-system-data'

export class AxiosSensorMetricsRepository implements SensorMetricsRepository {
  async getLithiumSystemData(sensorIds: string[] = []): Promise<SensorMetric[]> {
    const request: GetLithiumSystemDataRequestDto = { sensors: sensorIds }
    const { data } = await axiosInstance.post<GetLithiumSystemDataResponseDto>(
      LITHIUM_SYSTEM_DATA_ENDPOINT,
      request,
    )

    return data.items.map((item) => this.toDomain(item))
  }

  private toDomain(item: LithiumSystemSensorDataDto): SensorMetric {
    return SensorMetric.create({
      sensorId: item.sensor,
      timestamp: new Date(item.timestamp).getTime(),
      value: item.value,
      dataFrom: item.dataFrom,
      origin: item.origin,
      location: item.location,
      variable: item.variable,
    })
  }
}
