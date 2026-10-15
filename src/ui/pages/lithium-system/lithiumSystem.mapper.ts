import type { SensorMetric } from '../../../sensor-metrics/domain/entities/sensor-metric.entity'
import type { CardData } from '../../components/Templates/LithiumSystemTemplate'

export function mapSensorMetricsToCards(
  metrics: readonly SensorMetric[],
  layout: readonly CardData[],
): CardData[] {
  const values = new Map(metrics.map(metric => [metric.value.sensorId, metric.value.value]))

  return layout.map(card => {
    const value = values.get(card.id)
    return {
      ...card,
      value: value === undefined ? '--' : typeof value === 'boolean' ? String(value) : value,
    }
  })
}
