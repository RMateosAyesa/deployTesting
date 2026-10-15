import type { UseCase } from '../../../shared/types/use-case'
import type { SensorMetricsRepository } from '../../domain/contracts/sensor-metrics.repository'
import type {
  SensorMetric,
  SensorMetricValue,
} from '../../domain/entities/sensor-metric.entity'

export interface GetLithiumSystemDataInput {
  sensorIds?: string[]
}

export class GetLithiumSystemDataUseCase
  implements UseCase<GetLithiumSystemDataInput, SensorMetricValue[]>
{
  constructor(
    private readonly sensorMetricsRepository: SensorMetricsRepository,
  ) {}

  async execute(
    input: GetLithiumSystemDataInput,
  ): Promise<SensorMetricValue[]> {
    const sensorMetrics =
      await this.sensorMetricsRepository.getLithiumSystemData(input.sensorIds)

    return sensorMetrics.map((sensorMetric: SensorMetric) => sensorMetric.value)
  }
}
