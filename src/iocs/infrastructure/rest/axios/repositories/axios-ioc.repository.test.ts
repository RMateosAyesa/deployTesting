import { axiosInstance } from "../../../../../shared/instances/axios-instance-api";
import { IocLocation, IocOrigin, IocServer } from "../../../../domain/enums";

import { AxiosIocRepository } from "./axios-ioc.repository";

jest.mock("../../../../../shared/instances/axios-instance-api", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe("AxiosIocRepository", () => {
  const getMock = axiosInstance.get as jest.Mock;
  let repository: AxiosIocRepository;

  beforeEach(() => {
    repository = new AxiosIocRepository();
    getMock.mockReset();
  });

  it("requests and maps iocs", async () => {
    getMock.mockResolvedValue({
      data: {
        total: 1,
        page: 1,
        pages: 1,
        items: [
          {
            name: "ioc-01-pres",
            origin: IocOrigin.MAIN_CIRCUIT,
            location: IocLocation.MAIN_CIRCUIT_INLET,
            server: IocServer.EPICS_SERVER_02,
          },
        ],
      },
    });

    const result = await repository.findAll(1, 10);

    expect(getMock).toHaveBeenCalledWith("/iocs", {
      params: { page: 1, pageSize: 10 },
    });
    expect(result).toEqual({
      total: 1,
      page: 1,
      pages: 1,
      items: [
        expect.objectContaining({
          value: {
            name: "ioc-01-pres",
            origin: IocOrigin.MAIN_CIRCUIT,
            location: IocLocation.MAIN_CIRCUIT_INLET,
            server: IocServer.EPICS_SERVER_02,
          },
        }),
      ],
    });
  });

  it("requests without pagination params when page and pageSize are omitted", async () => {
    getMock.mockResolvedValue({
      data: { total: 0, page: 0, pages: 0, items: [] },
    });

    await repository.findAll();

    expect(getMock).toHaveBeenCalledWith("/iocs", {
      params: { page: undefined, pageSize: undefined },
    });
  });

  it("returns an empty list when the response has no items", async () => {
    getMock.mockResolvedValue({
      data: { total: 0, page: 1, pages: 1, items: [] },
    });

    const result = await repository.findAll();

    expect(result.items).toEqual([]);
  });
});
