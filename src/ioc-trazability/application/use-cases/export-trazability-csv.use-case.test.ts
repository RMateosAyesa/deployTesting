import { IocTrazabilityRepository } from "../../domain/contracts/ioc-trazability.repository";
import { IocTrazabilityTableEnum } from "../../domain/enums";

import { ExportTrazabilityCsvUseCase } from "./export-trazability-csv.use-case";

describe("ExportTrazabilityCsvUseCase", () => {
  let repositoryMock: jest.Mocked<IocTrazabilityRepository>;
  let useCase: ExportTrazabilityCsvUseCase;

  beforeEach(() => {
    repositoryMock = {
      findByEvent: jest.fn(),
      exportCsv: jest.fn(),
    };
    useCase = new ExportTrazabilityCsvUseCase(repositoryMock);
  });

  it("requests the csv export for the given iocName and table", async () => {
    const result = {
      filename: "ioc-01-pres-traceability.csv",
      blob: new Blob(),
    };
    repositoryMock.exportCsv.mockResolvedValue(result);

    const response = await useCase.execute({
      iocName: "ioc-01-pres",
      table: IocTrazabilityTableEnum.TRACEABILITY,
    });

    expect(repositoryMock.exportCsv).toHaveBeenCalledWith(
      "ioc-01-pres",
      IocTrazabilityTableEnum.TRACEABILITY,
    );
    expect(response).toBe(result);
  });

  it("rejects an empty iocName", async () => {
    await expect(
      useCase.execute({
        iocName: "",
        table: IocTrazabilityTableEnum.TRACEABILITY,
      }),
    ).rejects.toThrow("Property iocName must be a non-empty string");

    expect(repositoryMock.exportCsv).not.toHaveBeenCalled();
  });

  it("rejects an invalid table", async () => {
    await expect(
      useCase.execute({
        iocName: "ioc-01-pres",
        table: "invalid-table" as IocTrazabilityTableEnum,
      }),
    ).rejects.toThrow("Property table must be one of traceability, events");

    expect(repositoryMock.exportCsv).not.toHaveBeenCalled();
  });

  it("propagates a repository failure", async () => {
    repositoryMock.exportCsv.mockRejectedValue(new Error("network error"));

    await expect(
      useCase.execute({
        iocName: "ioc-01-pres",
        table: IocTrazabilityTableEnum.EVENTS,
      }),
    ).rejects.toThrow("network error");
  });
});