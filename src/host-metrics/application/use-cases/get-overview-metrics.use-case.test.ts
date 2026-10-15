import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import type { HostMetricsRepository } from '../../domain/contracts/host-metrics.repository'
import { HostMetric } from '../../domain/entities/host-metric.entity'
import {
  HostMetricSubtype,
  HostMetricType,
} from '../../domain/enums'

import { GetOverviewMetricsUseCase } from './get-overview-metrics.use-case'

describe('GetOverviewMetricsUseCase', () => {
  const repository: HostMetricsRepository = {
    findOverviewMetrics: jest.fn(),
  }
  const useCase = new GetOverviewMetricsUseCase(repository)

  const hostMetric = HostMetric.create({
    type: HostMetricType.CPU,
    subtype: HostMetricSubtype.CPU_USAGE_USER,
    value: 42.5,
    timestamp: 1_778_615_200,
    visibleName: 'CPU usage user',
  })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(repository.findOverviewMetrics as jest.Mock).mockResolvedValue([
      hostMetric,
    ])
  })

  it('requests the overview metric for the given type, subtype and minutes', async () => {
    const result = await useCase.execute({
      type: HostMetricType.CPU,
      subtype: HostMetricSubtype.CPU_USAGE_USER,
      minutes: 15,
    })

    expect(repository.findOverviewMetrics).toHaveBeenCalledWith(
      HostMetricType.CPU,
      HostMetricSubtype.CPU_USAGE_USER,
      15,
    )
    expect(result).toEqual([hostMetric.value])
  })

  it('requests the overview metric without minutes when omitted', async () => {
    await useCase.execute({
      type: HostMetricType.RAM,
      subtype: HostMetricSubtype.MEM_USED_PERCENT,
    })

    expect(repository.findOverviewMetrics).toHaveBeenCalledWith(
      HostMetricType.RAM,
      HostMetricSubtype.MEM_USED_PERCENT,
      undefined,
    )
  })

  it('rejects an invalid type before querying the repository', async () => {
    await expect(
      useCase.execute({
        type: 'gpu',
        subtype: HostMetricSubtype.CPU_USAGE_USER,
      }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findOverviewMetrics).not.toHaveBeenCalled()
  })

  it('rejects an invalid subtype before querying the repository', async () => {
    await expect(
      useCase.execute({
        type: HostMetricType.CPU,
        subtype: 'invalid_subtype',
      }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findOverviewMetrics).not.toHaveBeenCalled()
  })

  it('rejects a subtype that does not belong to the type', async () => {
    await expect(
      useCase.execute({
        type: HostMetricType.CPU,
        subtype: HostMetricSubtype.DISK_FREE,
      }),
    ).rejects.toThrow(/not valid for host metric type/)

    expect(repository.findOverviewMetrics).not.toHaveBeenCalled()
  })

  it('propagates repository errors', async () => {
    const error = new Error('Unable to get overview metrics')
    ;(repository.findOverviewMetrics as jest.Mock).mockRejectedValue(error)

    await expect(
      useCase.execute({
        type: HostMetricType.CPU,
        subtype: HostMetricSubtype.CPU_USAGE_USER,
      }),
    ).rejects.toBe(error)
  })
})