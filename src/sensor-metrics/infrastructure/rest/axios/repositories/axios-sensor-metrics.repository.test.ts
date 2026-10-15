import { axiosInstance } from '../../../../../shared/instances/axios-instance-api'
import { SensorDataSource, SensorLocation, SensorOrigin } from '../../../../domain/enums'

import { AxiosSensorMetricsRepository } from './axios-sensor-metrics.repository'

jest.mock('../../../../../shared/instances/axios-instance-api', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}))

describe('AxiosSensorMetricsRepository', () => {
  const postMock = axiosInstance.post as jest.Mock
  let repository: AxiosSensorMetricsRepository

  beforeEach(() => {
    repository = new AxiosSensorMetricsRepository()
    postMock.mockReset()
  })

  it('requests and maps lithium system data', async () => {
    postMock.mockResolvedValue({
      data: {
        items: [
          {
            sensor: 'pressure-sensor-1',
            timestamp: '2024-09-01T12:00:00.000Z',
            value: 120,
            dataFrom: SensorDataSource.EPICS_SERVER_01,
            origin: SensorOrigin.CYLINDER01,
            location: SensorLocation.CYLINDER_INLET,
            variable: 'pressure',
          },
        ],
      },
    })

    const result = await repository.getLithiumSystemData(['pressure-sensor-1'])

    expect(postMock).toHaveBeenCalledWith(
      '/sensor-metrics/lithium-system-data',
      { sensors: ['pressure-sensor-1'] },
    )
    expect(result[0].value).toEqual({
      sensorId: 'pressure-sensor-1',
      timestamp: new Date('2024-09-01T12:00:00.000Z').getTime(),
      value: 120,
      dataFrom: SensorDataSource.EPICS_SERVER_01,
      origin: SensorOrigin.CYLINDER01,
      location: SensorLocation.CYLINDER_INLET,
      variable: 'pressure',
    })
  })

  it('sends an empty sensors array when sensor ids are omitted', async () => {
    postMock.mockResolvedValue({ data: { items: [] } })

    await expect(repository.getLithiumSystemData()).resolves.toEqual([])

    expect(postMock).toHaveBeenCalledWith(
      '/sensor-metrics/lithium-system-data',
      { sensors: [] },
    )
  })
})
