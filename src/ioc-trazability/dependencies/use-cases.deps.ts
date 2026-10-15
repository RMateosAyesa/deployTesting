import { UseCase } from "../../shared/types/use-case";
import { ExportTrazabilityCsvResult } from "../domain/contracts/ioc-trazability.repository";
import {
  ExportTrazabilityCsvInput,
  ExportTrazabilityCsvUseCase,
} from "../application/use-cases/export-trazability-csv.use-case";
import { GetLatencyChartsUseCase } from "../application/use-cases/get-latency-charts.use-case";
import { GetPerformanceChartsUseCase } from "../application/use-cases/get-performance-charts.use-case";
import {
  GetTrazabilityByEventInput,
  GetTrazabilityByEventUseCase,
} from "../application/use-cases/get-trazability-by-event.use-case";
import { IocTrazabilityMetric } from "../domain/entities/ioc-trazability-metric.entity";
import type {
  GetPerformanceChartsInput,
  IocServerChart,
} from "../domain/types/get-performance-charts-types";
import type {
  GetLatencyChartsInput,
  ScanLatencyChart,
} from "../domain/types/get-latency-charts-types";
import { iocTrazabilityRepository } from "./repositories.deps";

export const getTrazabilityByEvent: UseCase<
  GetTrazabilityByEventInput,
  IocTrazabilityMetric[]
> = new GetTrazabilityByEventUseCase(iocTrazabilityRepository);

export const exportTrazabilityCsv: UseCase<
  ExportTrazabilityCsvInput,
  ExportTrazabilityCsvResult
> = new ExportTrazabilityCsvUseCase(iocTrazabilityRepository);

export const getPerformanceCharts: UseCase<
  GetPerformanceChartsInput,
  IocServerChart[]
> = new GetPerformanceChartsUseCase(iocTrazabilityRepository);

export const getLatencyCharts: UseCase<
  GetLatencyChartsInput,
  ScanLatencyChart
> = new GetLatencyChartsUseCase(iocTrazabilityRepository);
