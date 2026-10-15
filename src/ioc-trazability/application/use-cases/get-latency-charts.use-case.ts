import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'
import type { UseCase } from '../../../shared/types/use-case'
import type { IocTrazabilityRepository } from '../../domain/contracts/ioc-trazability.repository'
import type {
  GetLatencyChartsInput,
  ScanLatencyChart,
} from '../../domain/types/get-latency-charts-types'

export class GetLatencyChartsUseCase
  implements UseCase<GetLatencyChartsInput, ScanLatencyChart>
{
  constructor(
    private readonly iocTrazabilityRepository: IocTrazabilityRepository,
  ) {}

  async execute(input: GetLatencyChartsInput): Promise<ScanLatencyChart> {
    const iocName = StringValueObject.create('iocName', input.iocName)

    return this.iocTrazabilityRepository.findScanLatencyChartByIoc(iocName.value)
  }
}
