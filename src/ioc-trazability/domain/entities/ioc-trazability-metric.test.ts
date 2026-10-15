import { IocTrazabilityMetric } from "./ioc-trazability-metric.entity";
import {
  IocTrazabilityDataFrom,
  IocTrazabilityEventEnum,
  IocTrazabilityLocation,
  IocTrazabilityOrigin,
} from "../enums";

const validProps = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  timestamp: 1700000000,
  server: "server-01",
  dataFrom: IocTrazabilityDataFrom.EPICS_SERVER_01,
  origin: IocTrazabilityOrigin.CYLINDER_01,
  location: IocTrazabilityLocation.CYLINDER_INLET,
  variable: IocTrazabilityEventEnum.PV_CHANGED_VALUE,
  value: 12.5,
  url: "http://server-01",
  name: "ioc-1",
};

describe("IocTrazabilityMetric", () => {
  describe("create", () => {
    it("should create an IocTrazabilityMetric when input is valid", () => {
      const metric = IocTrazabilityMetric.create(validProps);
      expect(metric).toBeInstanceOf(IocTrazabilityMetric);
    });

    it("should accept timestamp as string", () => {
      const metric = IocTrazabilityMetric.create({
        ...validProps,
        timestamp: "2024-01-01T00:00:00.000Z",
      });
      expect(metric).toBeInstanceOf(IocTrazabilityMetric);
    });

    it("should throw error when variable is invalid", () => {
      expect(() =>
        IocTrazabilityMetric.create({ ...validProps, variable: "invalid" }),
      ).toThrow();
    });

    it("should throw error when dataFrom is invalid", () => {
      expect(() =>
        IocTrazabilityMetric.create({ ...validProps, dataFrom: "invalid" }),
      ).toThrow();
    });

    it("should create without status when not provided", () => {
      const metric = IocTrazabilityMetric.create(validProps);
      expect(metric.value.status).toBeUndefined();
    });

    it("should create with status when variable is ioc_healthy and status is valid", () => {
      const metric = IocTrazabilityMetric.create({
        ...validProps,
        variable: IocTrazabilityEventEnum.IOC_HEALTHY,
        status: "connected",
      });
      expect(metric.value.status).toBe("connected");
    });

    it("should throw error when status is provided for non ioc_healthy variable", () => {
      expect(() =>
        IocTrazabilityMetric.create({
          ...validProps,
          variable: IocTrazabilityEventEnum.PV_CHANGED_VALUE,
          status: "connected",
        }),
      ).toThrow();
    });

    it("should throw error when status has invalid value", () => {
      expect(() =>
        IocTrazabilityMetric.create({
          ...validProps,
          variable: IocTrazabilityEventEnum.IOC_HEALTHY,
          status: "invalid-status",
        }),
      ).toThrow();
    });
  });

  describe("value", () => {
    it("should return primitives correctly", () => {
      const metric = IocTrazabilityMetric.create(validProps);
      expect(metric.value).toEqual({
        id: validProps.id,
        timestamp: validProps.timestamp,
        server: validProps.server,
        dataFrom: validProps.dataFrom,
        origin: validProps.origin,
        location: validProps.location,
        variable: validProps.variable,
        value: validProps.value,
        status: undefined,
        url: validProps.url,
        name: validProps.name,
      });
    });
  });
});
