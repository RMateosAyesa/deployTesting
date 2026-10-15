import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import { SensorDataSource, SensorLocation, SensorOrigin } from '../enums'

import { SensorMetric } from './sensor-metric.entity'

describe('SensorMetric', () => {
  const rawSensorMetric = {
    sensorId: 'pressure-sensor-1',
    value: 120,
    timestamp: 1_725_189_600_000,
    dataFrom: SensorDataSource.EPICS_SERVER_01,
    origin: SensorOrigin.CYLINDER01,
    location: SensorLocation.CYLINDER_INLET,
    variable: 'pressure',
  }

  it('creates a sensor metric from primitive values', () => {
    expect(SensorMetric.create(rawSensorMetric).value).toEqual(rawSensorMetric)
  })

  it('rejects an empty sensor id', () => {
    expect(() =>
      SensorMetric.create({ ...rawSensorMetric, sensorId: '' }),
    ).toThrow(FieldValidationError)
  })

  it.each([
    ['number', 120],
    ['string', 'open'],
    ['boolean', false],
  ])('accepts a %s metric value', (_type, value) => {
    expect(SensorMetric.create({ ...rawSensorMetric, value }).value.value).toBe(value)
  })

  it('rejects an invalid numeric metric value', () => {
    expect(() =>
      SensorMetric.create({
        ...rawSensorMetric,
        value: Number.NaN,
      }),
    ).toThrow(FieldValidationError)
  })

  it('rejects an invalid timestamp', () => {
    expect(() =>
      SensorMetric.create({ ...rawSensorMetric, timestamp: -1 }),
    ).toThrow(FieldValidationError)
  })

  it.each(['dataFrom', 'origin', 'location', 'variable'] as const)(
    'rejects an empty %s',
    (property) => {
      expect(() =>
        SensorMetric.create({ ...rawSensorMetric, [property]: '' }),
      ).toThrow(FieldValidationError)
    },
  )

  it.each(['dataFrom', 'origin', 'location'] as const)(
    'rejects an invalid %s enum value',
    (property) => {
      expect(() =>
        SensorMetric.create({ ...rawSensorMetric, [property]: 'invalid-value' }),
      ).toThrow(FieldValidationError)
    },
  )
})
