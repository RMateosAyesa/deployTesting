import { axiosInstance } from '../../../../../shared/instances/axios-instance-api'
import { HostMetricType } from '../../../../domain/enums'

import { AxiosHostMetricsRepository } from './axios-host-metrics.repository'

jest.mock('../../../../../shared/instances/axios-instance-api', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}))

describe('AxiosHostMetricsRepository', () => {
  const getMock = axiosInstance.get as jest.Mock
  let repository: AxiosHostMetricsRepository

  beforeEach(() => {
    repository = new AxiosHostMetricsRepository()
    getMock.mockReset()
  })

  it('requests host metrics for the selected type, subtype and minutes', async () => {
    getMock.mockResolvedValue({
      data: [
        {
          type: HostMetricType.CPU,
          metrics: [
            {
              subtype: 'cpu_usage_user',
              value: 42,
              timestamp: 1_778_615_200,
              visible_name: 'CPU usage user',
            },
          ],
        },
      ],
    })

    const result = await repository.findOverviewMetrics(
      HostMetricType.CPU,
      'cpu_usage_user',
      15,
    )

    expect(getMock).toHaveBeenCalledWith('/host-metrics', {
      params: {
        type: HostMetricType.CPU,
        subtype: 'cpu_usage_user',
        minutes: 15,
      },
    })
    expect(result.map(metric => metric.value)).toEqual([
      {
        type: HostMetricType.CPU,
        subtype: 'cpu_usage_user',
        value: 42,
        timestamp: 1_778_615_200,
        visibleName: 'CPU usage user',
      },
    ])
  })

  it('omits minutes when not provided', async () => {
    getMock.mockResolvedValue({ data: [] })

    await repository.findOverviewMetrics(HostMetricType.RAM, 'mem_free')

    expect(getMock).toHaveBeenCalledWith('/host-metrics', {
      params: {
        type: HostMetricType.RAM,
        subtype: 'mem_free',
        minutes: undefined,
      },
    })
  })

  it('flattens every point across overview groups', async () => {
    getMock.mockResolvedValue({
      data: [
        {
          type: HostMetricType.NET,
          metrics: [
            { subtype: 'net_bytes_recv', value: 1, timestamp: 100, visible_name: 'Net recv' },
            { subtype: 'net_bytes_sent', value: 2, timestamp: 200, visible_name: 'Net sent' },
          ],
        },
      ],
    })

    const result = await repository.findOverviewMetrics(
      HostMetricType.NET,
      'net_bytes_recv',
    )

    expect(result).toHaveLength(2)
    expect(result[1].value).toEqual({
      type: HostMetricType.NET,
      subtype: 'net_bytes_sent',
      value: 2,
      timestamp: 200,
      visibleName: 'Net sent',
    })
  })

  it('returns an empty array when the endpoint has no metrics', async () => {
    getMock.mockResolvedValue({ data: [] })

    await expect(
      repository.findOverviewMetrics(HostMetricType.CPU, 'cpu_usage_user'),
    ).resolves.toEqual([])
  })
})