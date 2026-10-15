import { HostMetricsChartRepository } from '../../domain/contracts/host-metrics-chart.repository'
import { HostMetricChart } from '../../domain/entities/host-metric-chart.entity'
import {
  HostMetricSubtype,
  HostMetricType,
  OverviewMetricsTimeRange,
} from '../../domain/enums'
import { GetChartMetricsUseCase } from './get-chart-metrics.use-case'

describe('GetChartMetricsUseCase', () => {
  const repository: HostMetricsChartRepository = {
    findChartMetrics: jest.fn(),
  }
  const useCase = new GetChartMetricsUseCase(repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should delegate to the repository and map charts to primitive values', async () => {
    const chart = HostMetricChart.create({
      type: HostMetricType.CPU,
      subtype: HostMetricSubtype.CPU_USAGE_IDLE,
      points: [{ timestamp: 1000, measurement: 42 }],
    })
    ;(repository.findChartMetrics as jest.Mock).mockResolvedValue([chart])

    const result = await useCase.execute({
      type: HostMetricType.CPU,
      subtype: HostMetricSubtype.CPU_USAGE_IDLE,
    })

    expect(result).toEqual([chart.value])
    expect(repository.findChartMetrics).toHaveBeenCalledWith(
      HostMetricType.CPU,
      HostMetricSubtype.CPU_USAGE_IDLE,
      OverviewMetricsTimeRange.REALTIME,
    )
  })

  it('should pass through the provided time range', async () => {
    await useCase.execute({
      type: HostMetricType.RAM,
      subtype: HostMetricSubtype.MEM_FREE,
      timeRange: OverviewMetricsTimeRange.LAST_HOUR,
    })

    expect(repository.findChartMetrics).toHaveBeenCalledWith(
      HostMetricType.RAM,
      HostMetricSubtype.MEM_FREE,
      OverviewMetricsTimeRange.LAST_HOUR,
    )
  })

  it('should reject a subtype that does not belong to the given type', async () => {
    await expect(
      useCase.execute({
        type: HostMetricType.CPU,
        subtype: HostMetricSubtype.MEM_FREE,
      }),
    ).rejects.toThrow(`Subtype mem_free is not valid for host metric type cpu`)

    expect(repository.findChartMetrics).not.toHaveBeenCalled()
  })
})
