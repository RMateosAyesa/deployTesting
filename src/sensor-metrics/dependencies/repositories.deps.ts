import type { SensorMetricsRepository } from '../domain/contracts/sensor-metrics.repository'
import { AxiosSensorMetricsRepository } from '../infrastructure/rest/axios/repositories/axios-sensor-metrics.repository'

export const sensorMetricsRepository: SensorMetricsRepository =
  new AxiosSensorMetricsRepository()
