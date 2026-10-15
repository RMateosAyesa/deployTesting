import type { UseCase } from '../../shared/types/use-case'
import {
  GetLithiumSystemDataUseCase,
  type GetLithiumSystemDataInput,
} from '../application/use-cases/get-lithium-system-data.use-case'
import type { SensorMetricValue } from '../domain/entities/sensor-metric.entity'

import { sensorMetricsRepository } from './repositories.deps'

export const getLithiumSystemData: UseCase<
  GetLithiumSystemDataInput,
  SensorMetricValue[]
> = new GetLithiumSystemDataUseCase(sensorMetricsRepository)
