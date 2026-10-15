import type { SensorMetric } from '../entities/sensor-metric.entity'

export interface SensorMetricsRepository {
  getLithiumSystemData(sensorIds?: string[]): Promise<SensorMetric[]>
}
