export type ScanLatencyChartPoint = {
  time: string
  value: number
}

export type ScanLatencyChart = {
  title: string
  data: ScanLatencyChartPoint[]
}

export interface GetLatencyChartsInput {
  iocName: string
}
