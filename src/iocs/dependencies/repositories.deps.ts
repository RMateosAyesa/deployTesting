import { IocRepository } from '../domain/contracts/ioc.repository'
import { AxiosIocRepository } from '../infrastructure/rest/axios/repositories/axios-ioc.repository'

export const iocRepository: IocRepository = new AxiosIocRepository()
