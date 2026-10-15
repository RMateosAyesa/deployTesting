export type BarChartMetric = 'cpu' | 'ram' | 'disk'

export type IocServerChartPoint = {
  time: string
  value: number
}

export type IocServerChart = {
  title: string
  metric: BarChartMetric
  data: IocServerChartPoint[]
}

export interface GetPerformanceChartsInput {
  iocName: string
}