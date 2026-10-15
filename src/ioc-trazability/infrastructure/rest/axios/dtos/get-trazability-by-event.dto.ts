export interface IocTrazabilityMetricDto {
  id: string;
  timestamp: number;
  server: string;
  dataFrom: string;
  origin: string;
  location: string;
  variable: string;
  value: number;
  status?: string;
  url: string;
  name: string;
}

export type GetTrazabilityByEventResponseDto = IocTrazabilityMetricDto[];
