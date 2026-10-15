import type { UseCase } from "../../../shared/types/use-case";
import type { IocTrazabilityEventEnum } from "../../domain/enums";
import type { IocTrazabilityRepository } from "../../domain/contracts/ioc-trazability.repository";
import type { IocTrazabilityMetric } from "../../domain/entities/ioc-trazability-metric.entity";

export interface GetTrazabilityByEventInput {
  iocName: string;
  event?: IocTrazabilityEventEnum;
}

export class GetTrazabilityByEventUseCase implements UseCase<
  GetTrazabilityByEventInput,
  IocTrazabilityMetric[]
> {
  constructor(
    private readonly iocTrazabilityMetricRepository: IocTrazabilityRepository,
  ) {}

  async execute(
    input: GetTrazabilityByEventInput,
  ): Promise<IocTrazabilityMetric[]> {
    return this.iocTrazabilityMetricRepository.findByEvent(
      input.iocName,
      input.event,
    );
  }
}
