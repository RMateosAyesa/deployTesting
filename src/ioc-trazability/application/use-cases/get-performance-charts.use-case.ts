import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'
import type { UseCase } from '../../../shared/types/use-case'
import type { IocTrazabilityRepository } from '../../domain/contracts/ioc-trazability.repository'
import type { GetPerformanceChartsInput, IocServerChart } from '../../domain/types/get-performance-charts-types'

export class GetPerformanceChartsUseCase
  implements UseCase<GetPerformanceChartsInput, IocServerChart[]>
{
  constructor(
    private readonly iocTrazabilityRepository: IocTrazabilityRepository,
  ) {}

  async execute(input: GetPerformanceChartsInput): Promise<IocServerChart[]> {
    const iocName = StringValueObject.create('iocName', input.iocName)

    return this.iocTrazabilityRepository.findPerformanceChartsByIoc(iocName.value)
  }
}
