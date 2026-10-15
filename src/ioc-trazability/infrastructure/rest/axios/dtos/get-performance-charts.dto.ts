export type BarChartMetricDto = "cpu" | "ram" | "disk";

export interface IocServerChartPointDto {
  time: string;
  value: number;
}

export interface IocServerChartDto {
  title: string;
  metric: BarChartMetricDto;
  data: IocServerChartPointDto[];
}

export type GetPerformanceChartsResponseDto = IocServerChartDto[];
