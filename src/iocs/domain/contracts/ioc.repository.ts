import type { FindAllResponse } from '../../../shared/types/find-all-response.type'

import type { Ioc } from '../entities/ioc.entity'
import type { IocServerStatus } from '../entities/ioc-server-status.entity'

export interface IocRepository {
  findAll(page?: number, pageSize?: number): Promise<FindAllResponse<Ioc>>
  findStatus(iocName: string): Promise<IocServerStatus>
}
