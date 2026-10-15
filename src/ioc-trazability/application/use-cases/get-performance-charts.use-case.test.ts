import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import type { IocTrazabilityRepository } from '../../domain/contracts/ioc-trazability.repository'

import { GetPerformanceChartsUseCase } from './get-performance-charts.use-case'
import type { IocServerChart } from '../../domain/types/get-performance-charts-types'

describe('GetPerformanceChartsUseCase', () => {
  const repository: IocTrazabilityRepository = {
    findByEvent: jest.fn(),
    exportCsv: jest.fn(),
    findPerformanceChartsByIoc: jest.fn(),
  }
  const useCase = new GetPerformanceChartsUseCase(repository)
  const iocName = 'ioc-11-temp'

  const charts: IocServerChart[] = [
    {
      title: 'CPU performance (%)',
      metric: 'cpu',
      data: [{ time: '08:15', value: 42.5 }],
    },
    {
      title: 'RAM performance (%)',
      metric: 'ram',
      data: [{ time: '08:15', value: 63.2 }],
    },
    {
      title: 'Disk performance (%)',
      metric: 'disk',
      data: [{ time: '08:15', value: 78.9 }],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(repository.findPerformanceChartsByIoc as jest.Mock).mockResolvedValue(charts)
  })

  it('should request the performance charts of the given IoC', async () => {
    await useCase.execute({ iocName })

    expect(repository.findPerformanceChartsByIoc).toHaveBeenCalledWith(iocName)
  })

  it('should return the charts received from the backend use case', async () => {
    const result = await useCase.execute({ iocName })

    expect(result).toEqual(charts)
  })

  it('should return an empty list when the backend has no charts', async () => {
    ;(repository.findPerformanceChartsByIoc as jest.Mock).mockResolvedValue([])

    await expect(useCase.execute({ iocName })).resolves.toEqual([])
  })

  it('should reject a missing iocName and not call the repository', async () => {
    await expect(
      useCase.execute({ iocName: null as unknown as string }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findPerformanceChartsByIoc).not.toHaveBeenCalled()
  })

  it('should reject a non-string iocName and not call the repository', async () => {
    await expect(
      useCase.execute({ iocName: 11 as unknown as string }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findPerformanceChartsByIoc).not.toHaveBeenCalled()
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Unable to get performance charts')
    ;(repository.findPerformanceChartsByIoc as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute({ iocName })).rejects.toBe(error)
  })
})
