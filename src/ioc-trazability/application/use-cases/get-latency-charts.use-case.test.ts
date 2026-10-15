import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import type { IocTrazabilityRepository } from '../../domain/contracts/ioc-trazability.repository'
import type { ScanLatencyChart } from '../../domain/types/get-latency-charts-types'

import { GetLatencyChartsUseCase } from './get-latency-charts.use-case'

describe('GetLatencyChartsUseCase', () => {
  const repository: IocTrazabilityRepository = {
    findByEvent: jest.fn(),
    exportCsv: jest.fn(),
    findPerformanceChartsByIoc: jest.fn(),
    findScanLatencyChartByIoc: jest.fn(),
  }
  const useCase = new GetLatencyChartsUseCase(repository)
  const iocName = 'ioc-11-temp'

  const chart: ScanLatencyChart = {
    title: 'Scan latency',
    data: [{ time: '08:15', value: 132 }],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(repository.findScanLatencyChartByIoc as jest.Mock).mockResolvedValue(chart)
  })

  it('should request the scan latency chart of the given IoC', async () => {
    await useCase.execute({ iocName })

    expect(repository.findScanLatencyChartByIoc).toHaveBeenCalledWith(iocName)
  })

  it('should return the chart received from the backend use case', async () => {
    const result = await useCase.execute({ iocName })

    expect(result).toEqual(chart)
  })

  it('should return an empty chart when the backend has no data points', async () => {
    ;(repository.findScanLatencyChartByIoc as jest.Mock).mockResolvedValue({
      title: 'Scan latency',
      data: [],
    })

    await expect(useCase.execute({ iocName })).resolves.toEqual({
      title: 'Scan latency',
      data: [],
    })
  })

  it('should reject a missing iocName and not call the repository', async () => {
    await expect(
      useCase.execute({ iocName: null as unknown as string }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findScanLatencyChartByIoc).not.toHaveBeenCalled()
  })

  it('should reject a non-string iocName and not call the repository', async () => {
    await expect(
      useCase.execute({ iocName: 11 as unknown as string }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findScanLatencyChartByIoc).not.toHaveBeenCalled()
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Unable to get scan latency chart')
    ;(repository.findScanLatencyChartByIoc as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute({ iocName })).rejects.toBe(error)
  })
})
