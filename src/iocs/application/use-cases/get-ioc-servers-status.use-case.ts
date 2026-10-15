import type { UseCase } from '../../../shared/types/use-case'
import type { IocRepository } from '../../domain/contracts/ioc.repository'
import type { IocServerStatusValue } from '../../domain/entities/ioc-server-status.entity'

export interface GetIocServerStatusInput {
  iocName: string
}

export class GetIocServerStatusUseCase
  implements UseCase<GetIocServerStatusInput, IocServerStatusValue>
{
  constructor(private readonly iocRepository: IocRepository) {}

  async execute(input: GetIocServerStatusInput): Promise<IocServerStatusValue> {
    const status = await this.iocRepository.findStatus(input.iocName)

    return status.value
  }
}