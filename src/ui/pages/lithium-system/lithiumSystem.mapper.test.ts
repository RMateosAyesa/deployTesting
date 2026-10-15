import { SensorMetric } from '../../../sensor-metrics/domain/entities/sensor-metric.entity'
import { SensorDataSource, SensorLocation, SensorOrigin } from '../../../sensor-metrics/domain/enums'
import { mapSensorMetricsToCards } from './lithiumSystem.mapper'
import { getLithiumSystemData } from './lithiumSystem.service'

const reading = (sensorId: string, value: number | string | boolean) => SensorMetric.create({
  sensorId, value, timestamp: 1000, dataFrom: SensorDataSource.EPICS_SERVER_01,
  origin: SensorOrigin.CYLINDER01, location: SensorLocation.CYLINDER_INLET, variable: 'pressure',
})

describe('Lithium domain to UI mapper', () => {
  it.each([6.2, 0, 'Open', false])('matches card.id to sensorId and injects %s', async value => {
    const { cards: layout } = await getLithiumSystemData()
    const cards = mapSensorMetricsToCards([reading('p1', value)], layout)
    expect(cards.find(card => card.id === 'p1')).toEqual({
      ...layout.find(card => card.id === 'p1'),
      value: typeof value === 'boolean' ? String(value) : value,
    })
  })

  it.each([0, 1, 2])('preserves every layout property for cylinder %s', async cylinder => {
    const { cards: layout } = await getLithiumSystemData(cylinder)
    const cards = mapSensorMetricsToCards([reading('t2', 42)], layout)
    expect(cards).toEqual(layout.map(card => ({ ...card, value: card.id === 't2' ? 42 : '--' })))
  })

  it('keeps missing sensors with a placeholder and ignores unregistered sensors', async () => {
    const { cards: layout } = await getLithiumSystemData()
    expect(mapSensorMetricsToCards([reading('unknown', 99)], layout)).toEqual(
      layout.map(card => ({ ...card, value: '--' })),
    )
  })

  it('does not mutate the static cards or retain readings between calls', async () => {
    const { cards: original } = await getLithiumSystemData()
    const layout = Object.freeze(original.map(card => Object.freeze({ ...card })))
    const cards = mapSensorMetricsToCards([reading('p1', 6.2)], layout)
    cards[0].title = 'changed'
    expect(layout).toEqual(original)
    expect(mapSensorMetricsToCards([], layout)).toEqual(layout.map(card => ({ ...card, value: '--' })))
  })
})
