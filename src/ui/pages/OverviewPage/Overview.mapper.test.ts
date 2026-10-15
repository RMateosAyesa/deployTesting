import type { HostMetricValue } from '../../../host-metrics/domain/entities/host-metric.entity'
import {
  HostMetricSubtype,
  HostMetricType,
} from '../../../host-metrics/domain/enums'
import type { NodeMetrics } from '../../components/Templates/OverviewTemplate'

import { mapOverviewMetricsToNodes } from './Overview.mapper'

const createLayout = (): NodeMetrics[] => [
  {
    id: 'node-01',
    title: 'Host Server - Node 01',
    timeRangeValue: 'realtime',
    metrics: [
      {
        metricCardProps: {
          iconName: 'cpu',
          iconText: 'CPU usage',
          progressPercent: 99,
          metricType: 'cpu',
        },
        chartData: [{ time: 'mock', value: 99 }],
        metric: 'cpu',
      },
      {
        metricCardProps: {
          iconName: 'cellTower',
          iconText: 'Network',
          progressPercent: 99,
          metricType: 'network',
        },
        chartData: [{ time: 'mock', value: 99 }],
        metric: 'network',
      },
    ],
  },
]

describe('Overview domain to UI mapper', () => {
  it('maps current values and chronological series to NodeMetrics props', () => {
    const metrics: HostMetricValue[] = [
      {
        type: HostMetricType.CPU,
        subtype: HostMetricSubtype.CPU_USAGE_USER,
        value: 42,
        timestamp: Date.UTC(2026, 8, 17, 12, 35) / 1000,
        visibleName: 'CPU usage user',
      },
      {
        type: HostMetricType.NET,
        subtype: HostMetricSubtype.NET_BYTES_RECV,
        value: 120,
        timestamp: Date.UTC(2026, 8, 17, 12, 34) / 1000,
        visibleName: 'Net bytes recv',
      },
      {
        type: HostMetricType.CPU,
        subtype: HostMetricSubtype.CPU_USAGE_USER,
        value: 30,
        timestamp: Date.UTC(2026, 8, 17, 12, 34) / 1000,
        visibleName: 'CPU usage user',
      },
    ]

    const [node] = mapOverviewMetricsToNodes(metrics, createLayout())

    expect(node.metrics[0].metricCardProps.progressPercent).toBe(42)
    expect(node.metrics[0].chartData).toEqual([
      { time: '12:34', value: 30 },
      { time: '12:35', value: 42 },
    ])
    expect(node.metrics[1].metricCardProps.progressPercent).toBe(120)
    expect(node.metrics[1].chartData).toEqual([
      { time: '12:34', value: 120 },
    ])
  })

  it('replaces mock values with empty UI data when metrics are unavailable', () => {
    const [node] = mapOverviewMetricsToNodes([], createLayout())

    expect(node.metrics).toEqual([
      expect.objectContaining({
        metricCardProps: expect.objectContaining({ progressPercent: 0 }),
        chartData: [],
      }),
      expect.objectContaining({
        metricCardProps: expect.objectContaining({ progressPercent: 0 }),
        chartData: [],
      }),
    ])
  })

  it('ignores metrics of types that are not part of the layout', () => {
    const metrics: HostMetricValue[] = [
      {
        type: HostMetricType.RAM,
        subtype: HostMetricSubtype.MEM_USED_PERCENT,
        value: 66,
        timestamp: Date.UTC(2026, 8, 17, 12, 34) / 1000,
        visibleName: 'Memory used',
      },
    ]

    const [node] = mapOverviewMetricsToNodes(metrics, createLayout())

    expect(node.metrics[0].metricCardProps.progressPercent).toBe(0)
    expect(node.metrics[0].chartData).toEqual([])
    expect(node.metrics[1].metricCardProps.progressPercent).toBe(0)
    expect(node.metrics[1].chartData).toEqual([])
  })

  it('preserves layout configuration without mutating the input', () => {
    const layout = createLayout()
    const originalLayout = JSON.parse(JSON.stringify(layout)) as NodeMetrics[]

    const result = mapOverviewMetricsToNodes([], layout)

    expect(layout).toEqual(originalLayout)
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 'node-01',
        title: 'Host Server - Node 01',
        timeRangeValue: 'realtime',
      }),
    )
    expect(result).not.toBe(layout)
    expect(result[0]).not.toBe(layout[0])
  })
})