import { axiosInstance } from "../../../../../shared/instances/axios-instance-api";
import {
  IocTrazabilityDataFrom,
  IocTrazabilityEventEnum,
  IocTrazabilityLocation,
  IocTrazabilityOrigin,
  IocTrazabilityTableEnum,
} from "../../../../domain/enums";

import { AxiosIocTrazabilityRepository } from "./axios-ioc-trazability.repository";

jest.mock("../../../../../shared/instances/axios-instance-api", () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe("AxiosIocTrazabilityRepository", () => {
  const getMock = axiosInstance.get as jest.Mock;
  let repository: AxiosIocTrazabilityRepository;

  beforeEach(() => {
    repository = new AxiosIocTrazabilityRepository();
    getMock.mockReset();
  });

  it("requests and maps trazability metrics for the given event", async () => {
    getMock.mockResolvedValue({
      data: [
        {
          id: "fbee644b-27ff-436f-80ee-b87cd5779c6c",
          timestamp: 1782320500053,
          server: "host-02-ioc-01-pres",
          dataFrom: IocTrazabilityDataFrom.EPICS_SERVER_02,
          origin: IocTrazabilityOrigin.MAIN_CIRCUIT,
          location: IocTrazabilityLocation.MAIN_CIRCUIT_INLET,
          variable: IocTrazabilityEventEnum.PV_CHANGED_VALUE,
          value: 0.6934065766384374,
          url: "http://host-02-ioc-01-pres:9273/metrics",
          name: "ioc-01-pres",
        },
      ],
    });

    const result = await repository.findByEvent(
      "ioc-01-pres",
      IocTrazabilityEventEnum.PV_CHANGED_VALUE,
    );

    expect(getMock).toHaveBeenCalledWith("/iocs/ioc-01-pres/trazability", {
      params: { event: IocTrazabilityEventEnum.PV_CHANGED_VALUE },
    });
    expect(result[0].value).toEqual({
      id: "fbee644b-27ff-436f-80ee-b87cd5779c6c",
      timestamp: 1782320500053,
      server: "host-02-ioc-01-pres",
      dataFrom: IocTrazabilityDataFrom.EPICS_SERVER_02,
      origin: IocTrazabilityOrigin.MAIN_CIRCUIT,
      location: IocTrazabilityLocation.MAIN_CIRCUIT_INLET,
      variable: IocTrazabilityEventEnum.PV_CHANGED_VALUE,
      value: 0.6934065766384374,
      status: undefined,
      url: "http://host-02-ioc-01-pres:9273/metrics",
      name: "ioc-01-pres",
    });
  });

  it("requests without an event filter when event is omitted", async () => {
    getMock.mockResolvedValue({ data: [] });

    await repository.findByEvent("ioc-01-pres");

    expect(getMock).toHaveBeenCalledWith("/iocs/ioc-01-pres/trazability", {
      params: { event: undefined },
    });
  });

  it("returns an empty list when the response has no items", async () => {
    getMock.mockResolvedValue({ data: [] });

    const result = await repository.findByEvent("ioc-01-pres");

    expect(result).toEqual([]);
  });

  it("requests the csv as a blob and extracts the filename from the response headers", async () => {
    const blob = new Blob(["timestamp,value\n1700000000,12.5"], {
      type: "text/csv",
    });
    getMock.mockResolvedValue({
      data: blob,
      headers: {
        "content-disposition":
          'attachment; filename="ioc-01-pres-traceability.csv"',
      },
    });

    const result = await repository.exportCsv(
      "ioc-01-pres",
      IocTrazabilityTableEnum.TRACEABILITY,
    );

    expect(getMock).toHaveBeenCalledWith(
      "/iocs/ioc-01-pres/trazability/export-csv",
      {
        params: { table: IocTrazabilityTableEnum.TRACEABILITY },
        responseType: "blob",
      },
    );
    expect(result).toEqual({ filename: "ioc-01-pres-traceability.csv", blob });
  });

  const charts = [
    {
      title: "CPU performance (%)",
      metric: "cpu",
      data: [{ time: "08:15", value: 42.5 }],
    },
    {
      title: "RAM performance (%)",
      metric: "ram",
      data: [{ time: "08:15", value: 63.2 }],
    },
    {
      title: "Disk performance (%)",
      metric: "disk",
      data: [{ time: "08:15", value: 78.9 }],
    },
  ];

  it("requests performance charts for the given IoC", async () => {
    getMock.mockResolvedValue({ data: charts });

    const result = await repository.findPerformanceChartsByIoc("ioc-11-temp");

    expect(getMock).toHaveBeenCalledWith(
      "/iocs/ioc-11-temp/trazability/performance-chart",
    );
    expect(result).toEqual(charts);
  });

  it("returns an empty list when the backend has no performance charts", async () => {
    getMock.mockResolvedValue({ data: [] });

    const result = await repository.findPerformanceChartsByIoc("ioc-11-temp");

    expect(result).toEqual([]);
  });

  const scanLatencyChart = {
    title: "Scan latency",
    data: [{ time: "08:15", value: 132 }],
  };

  it("requests the scan latency chart for the given IoC", async () => {
    getMock.mockResolvedValue({ data: scanLatencyChart });

    const result = await repository.findScanLatencyChartByIoc("ioc-11-temp");

    expect(getMock).toHaveBeenCalledWith(
      "/iocs/ioc-11-temp/trazability/scan-latency-chart",
    );
    expect(result).toEqual(scanLatencyChart);
  });

  it("returns an empty chart when the backend has no latency data points", async () => {
    getMock.mockResolvedValue({
      data: { title: "Scan latency", data: [] },
    });

    const result = await repository.findScanLatencyChartByIoc("ioc-11-temp");

    expect(result).toEqual({ title: "Scan latency", data: [] });
  });

  it("falls back to a default filename when the content-disposition header is missing", async () => {
    const blob = new Blob([""], { type: "text/csv" });
    getMock.mockResolvedValue({ data: blob, headers: {} });

    const result = await repository.exportCsv(
      "ioc-01-pres",
      IocTrazabilityTableEnum.EVENTS,
    );

    expect(result.filename).toBe("trazability.csv");
  });
});
