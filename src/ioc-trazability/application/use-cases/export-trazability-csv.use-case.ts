import { EnumValueObject } from "../../../shared/domain/value-objects/enum.value-object";
import { StringValueObject } from "../../../shared/domain/value-objects/string.value-object";
import type { UseCase } from "../../../shared/types/use-case";
import type {
  ExportTrazabilityCsvResult,
  IocTrazabilityRepository,
} from "../../domain/contracts/ioc-trazability.repository";
import { IocTrazabilityTableEnum } from "../../domain/enums";

export interface ExportTrazabilityCsvInput {
  iocName: string;
  table: IocTrazabilityTableEnum;
}

export class ExportTrazabilityCsvUseCase implements UseCase<
  ExportTrazabilityCsvInput,
  ExportTrazabilityCsvResult
> {
  constructor(
    private readonly iocTrazabilityRepository: IocTrazabilityRepository,
  ) {}

  async execute(
    input: ExportTrazabilityCsvInput,
  ): Promise<ExportTrazabilityCsvResult> {
    StringValueObject.create("iocName", input.iocName);
    EnumValueObject.initiate("table", input.table, IocTrazabilityTableEnum);

    return this.iocTrazabilityRepository.exportCsv(
      input.iocName,
      input.table,
    );
  }
}