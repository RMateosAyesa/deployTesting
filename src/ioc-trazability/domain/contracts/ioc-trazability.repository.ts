import type { IocTrazabilityMetric } from "../entities/ioc-trazability-metric.entity";
import type {
  IocTrazabilityEventEnum,
  IocTrazabilityTableEnum,
} from "../enums";
import type { IocServerChart } from "../types/get-performance-charts-types";
import type { ScanLatencyChart } from "../types/get-latency-charts-types";

export type ExportTrazabilityCsvResult = {
  filename: string;
  blob: Blob;
};

export interface IocTrazabilityRepository {
  findByEvent(
    iocName: string,
    event?: IocTrazabilityEventEnum,
  ): Promise<IocTrazabilityMetric[]>;
  exportCsv(
    iocName: string,
    table: IocTrazabilityTableEnum,
  ): Promise<ExportTrazabilityCsvResult>;
  findPerformanceChartsByIoc(iocName: string): Promise<IocServerChart[]>;
  findScanLatencyChartByIoc(iocName: string): Promise<ScanLatencyChart>;
}
