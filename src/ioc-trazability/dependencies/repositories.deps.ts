import { IocTrazabilityRepository } from "../domain/contracts/ioc-trazability.repository";
import { AxiosIocTrazabilityRepository } from "../infrastructure/rest/axios/repositories/axios-ioc-trazability.repository";

export const iocTrazabilityRepository: IocTrazabilityRepository =
  new AxiosIocTrazabilityRepository();
