import { PositiveIntegerValueObject } from '../../../shared/domain/value-objects/positive-integer.value-object'
import type { FindAllResponse } from '../../../shared/types/find-all-response.type'
import type { UseCase } from '../../../shared/types/use-case'
import type { IocRepository } from '../../domain/contracts/ioc.repository'
import type { IocValue } from '../../domain/entities/ioc.entity'

export interface GetIocServersInput {
  pagination?: { page: number; pageSize: number }
}

export class GetIocServersUseCase
  implements UseCase<GetIocServersInput | undefined, FindAllResponse<IocValue>>
{
  constructor(private readonly iocRepository: IocRepository) {}

  async execute(input?: GetIocServersInput): Promise<FindAllResponse<IocValue>> {
    if (input?.pagination != null) {
      // Valida que los valores de la paginación sean enteros superiores a 0
      PositiveIntegerValueObject.create('page', input.pagination.page)
      PositiveIntegerValueObject.create('pageSize', input.pagination.pageSize)
    }

    const result = await this.iocRepository.findAll(
      input?.pagination?.page,
      input?.pagination?.pageSize,
    )

    return {
      ...result,
      items: result.items.map(ioc => ioc.value),
    }
  }
}
