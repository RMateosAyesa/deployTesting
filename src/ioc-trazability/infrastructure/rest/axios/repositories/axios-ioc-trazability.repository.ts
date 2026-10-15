import { axiosInstance } from "../../../../../shared/instances/axios-instance-api";
import type {
  ExportTrazabilityCsvResult,
  IocTrazabilityRepository,
} from "../../../../domain/contracts/ioc-trazability.repository";
import type { IocServerChart } from "../../../../domain/types/get-performance-charts-types";
import type { ScanLatencyChart } from "../../../../domain/types/get-latency-charts-types";
import { IocTrazabilityMetric } from "../../../../domain/entities/ioc-trazability-metric.entity";
import type {
  IocTrazabilityEventEnum,
  IocTrazabilityTableEnum,
} from "../../../../domain/enums";

import type {
  GetPerformanceChartsResponseDto,
  IocServerChartDto,
} from "../dtos/get-performance-charts.dto";
import type { GetScanLatencyChartResponseDto } from "../dtos/get-latency-charts.dto";
import type {
  GetTrazabilityByEventResponseDto,
  IocTrazabilityMetricDto,
} from "../dtos/get-trazability-by-event.dto";

const DEFAULT_FILENAME = "trazability.csv";
const FILENAME_REGEX = /filename="?([^"]+)"?/;

export class AxiosIocTrazabilityRepository implements IocTrazabilityRepository {
  async findByEvent(
    iocName: string,
    event?: IocTrazabilityEventEnum,
  ): Promise<IocTrazabilityMetric[]> {
    const { data } = await axiosInstance.get<GetTrazabilityByEventResponseDto>(
      `/iocs/${iocName}/trazability`,
      { params: { event } },
    );

    return data.map((item) => this.toDomain(item));
  }

  async findPerformanceChartsByIoc(iocName: string): Promise<IocServerChart[]> {
    const { data } = await axiosInstance.get<GetPerformanceChartsResponseDto>(
      `/iocs/${iocName}/trazability/performance-chart`,
    );

    return data.map((item) => this.toChart(item));
  }

  async findScanLatencyChartByIoc(iocName: string): Promise<ScanLatencyChart> {
    const { data } = await axiosInstance.get<GetScanLatencyChartResponseDto>(
      `/iocs/${iocName}/trazability/scan-latency-chart`,
    );

    return {
      title: data.title,
      data: data.data.map((point) => ({
        time: point.time,
        value: point.value,
      })),
    };
  }

  async exportCsv(
    iocName: string,
    table: IocTrazabilityTableEnum,
  ): Promise<ExportTrazabilityCsvResult> {
    const response = await axiosInstance.get(
      `/iocs/${iocName}/trazability/export-csv`,
      {
        params: { table },
        responseType: "blob",
      },
    );

    return {
      filename: this.extractFilename(response.headers["content-disposition"]),
      blob: response.data,
    };
  }

  private toChart(item: IocServerChartDto): IocServerChart {
    return {
      title: item.title,
      metric: item.metric,
      data: item.data.map((point) => ({
        time: point.time,
        value: point.value,
      })),
    };
  }

  private toDomain(item: IocTrazabilityMetricDto): IocTrazabilityMetric {
    return IocTrazabilityMetric.create({
      id: item.id,
      timestamp: item.timestamp,
      server: item.server,
      dataFrom: item.dataFrom,
      origin: item.origin,
      location: item.location,
      variable: item.variable,
      value: item.value,
      status: item.status,
      url: item.url,
      name: item.name,
    });
  }

  private extractFilename(contentDisposition?: string): string {
    if (contentDisposition == null) {
      return DEFAULT_FILENAME;
    }

    const match = FILENAME_REGEX.exec(contentDisposition);
    return match?.[1] ?? DEFAULT_FILENAME;
  }
}
