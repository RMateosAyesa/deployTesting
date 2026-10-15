export interface ScanLatencyChartPointDto {
  time: string
  value: number
}

export interface ScanLatencyChartDto {
  title: string
  data: ScanLatencyChartPointDto[]
}

export type GetScanLatencyChartResponseDto = ScanLatencyChartDto
