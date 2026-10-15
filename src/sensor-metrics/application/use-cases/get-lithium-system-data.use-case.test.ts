import { SensorDataSource, SensorLocation, SensorOrigin } from '../../domain/enums'
import { SensorMetric } from '../../domain/entities/sensor-metric.entity'
import type { SensorMetricsRepository } from '../../domain/contracts/sensor-metrics.repository'

import { GetLithiumSystemDataUseCase } from './get-lithium-system-data.use-case'

describe('GetLithiumSystemDataUseCase', () => {
  const metrics = [
    SensorMetric.create({
      sensorId: 'pressure-sensor-1',
      value: 120,
      timestamp: 1_725_189_600_000,
      dataFrom: SensorDataSource.EPICS_SERVER_01,
      origin: SensorOrigin.CYLINDER01,
      location: SensorLocation.CYLINDER_INLET,
      variable: 'pressure',
    }),
  ]

  let repository: jest.Mocked<SensorMetricsRepository>
  let useCase: GetLithiumSystemDataUseCase

  beforeEach(() => {
    repository = {
      getLithiumSystemData: jest.fn().mockResolvedValue(metrics),
    }
    useCase = new GetLithiumSystemDataUseCase(repository)
  })

  it('gets all lithium system metrics when sensor ids are omitted', async () => {
    const result = await useCase.execute({})

    expect(repository.getLithiumSystemData).toHaveBeenCalledWith(undefined)
    expect(result).toEqual(metrics.map((metric) => metric.value))
  })

  it('gets lithium system metrics for the requested sensor ids', async () => {
    const sensorIds = ['pressure-sensor-1', 'temperature-sensor-1']

    const result = await useCase.execute({ sensorIds })

    expect(repository.getLithiumSystemData).toHaveBeenCalledWith(sensorIds)
    expect(result).toEqual(metrics.map((metric) => metric.value))
  })

  it('returns an empty array when the repository has no metrics', async () => {
    repository.getLithiumSystemData.mockResolvedValue([])

    await expect(useCase.execute({ sensorIds: [] })).resolves.toEqual([])
  })

  it('propagates repository errors', async () => {
    const error = new Error('Unable to get lithium system data')
    repository.getLithiumSystemData.mockRejectedValue(error)

    await expect(useCase.execute({})).rejects.toBe(error)
  })
})
