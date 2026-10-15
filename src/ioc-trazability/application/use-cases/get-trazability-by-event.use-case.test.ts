import { IocTrazabilityRepository } from "../../domain/contracts/ioc-trazability.repository";
import { IocTrazabilityMetric } from "../../domain/entities/ioc-trazability-metric.entity";
import { IocTrazabilityEventEnum } from "../../domain/enums";

import { GetTrazabilityByEventUseCase } from "./get-trazability-by-event.use-case";

describe("GetTrazabilityByEventUseCase", () => {
  let repositoryMock: jest.Mocked<IocTrazabilityRepository>;
  let useCase: GetTrazabilityByEventUseCase;

  beforeEach(() => {
    repositoryMock = {
      findByEvent: jest.fn(),
      exportCsv: jest.fn(),
      findPerformanceChartsByIoc: jest.fn(),
    };
    useCase = new GetTrazabilityByEventUseCase(repositoryMock);
  });

  it("requests metrics for the given iocName and event", async () => {
    const metrics = [{ value: {} } as IocTrazabilityMetric];
    repositoryMock.findByEvent.mockResolvedValue(metrics);

    const result = await useCase.execute({
      iocName: "ioc-01-pres",
      event: IocTrazabilityEventEnum.PV_CHANGED_VALUE,
    });

    expect(repositoryMock.findByEvent).toHaveBeenCalledWith(
      "ioc-01-pres",
      IocTrazabilityEventEnum.PV_CHANGED_VALUE,
    );
    expect(result).toBe(metrics);
  });

  it("requests metrics without an event filter when event is omitted", async () => {
    repositoryMock.findByEvent.mockResolvedValue([]);

    await useCase.execute({ iocName: "ioc-01-pres" });

    expect(repositoryMock.findByEvent).toHaveBeenCalledWith(
      "ioc-01-pres",
      undefined,
    );
  });
});
