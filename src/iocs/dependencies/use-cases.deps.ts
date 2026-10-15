import { FindAllResponse } from '../../shared/types/find-all-response.type'
import { UseCase } from '../../shared/types/use-case'
import {
  GetIocServersInput,
  GetIocServersUseCase,
} from '../application/use-cases/get-ioc-servers.use-case'
import { IocValue } from '../domain/entities/ioc.entity'
import { IocServerStatusValue } from '../domain/entities/ioc-server-status.entity'
import { iocRepository } from './repositories.deps'
import { GetIocServerStatusInput, GetIocServerStatusUseCase } from '../application/use-cases/get-ioc-servers-status.use-case'

export const getIocServers: UseCase<
  GetIocServersInput | undefined,
  FindAllResponse<IocValue>
> = new GetIocServersUseCase(iocRepository)

export const getIocServerStatus: UseCase<
  GetIocServerStatusInput,
  IocServerStatusValue
> = new GetIocServerStatusUseCase(iocRepository)
