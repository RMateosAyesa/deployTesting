import { HostMetricChart } from './host-metric-chart.entity'
import { HostMetricType } from '../enums/host-metric-type.enum'

const validPoints = [
  { timestamp: 1_700_000_000, measurement: 30 },
  { timestamp: 1_700_000_060, measurement: 32 },
]

describe('HostMetricChart', () => {
  describe('create', () => {
    it('creates a chart from valid primitives', () => {
      const chart = HostMetricChart.create({
        type: HostMetricType.CPU,
        subtype: 'cpu_usage_user',
        points: validPoints,
      })
      expect(chart).toBeInstanceOf(HostMetricChart)
    })

    it('creates a chart with empty points', () => {
      const chart = HostMetricChart.create({
        type: HostMetricType.RAM,
        subtype: 'mem_used_percent',
        points: [],
      })
      expect(chart.value.points).toEqual([])
    })

    it('rejects an invalid type', () => {
      expect(() =>
        HostMetricChart.create({
          type: 'invalid-type',
          subtype: 'cpu_usage_user',
          points: validPoints,
        }),
      ).toThrow()
    })

    it('rejects an empty subtype', () => {
      expect(() =>
        HostMetricChart.create({
          type: HostMetricType.CPU,
          subtype: '',
          points: validPoints,
        }),
      ).toThrow()
    })
  })

  describe('value', () => {
    it('returns primitives correctly', () => {
      const chart = HostMetricChart.create({
        type: HostMetricType.NET,
        subtype: 'net_bytes_recv',
        points: validPoints,
      })
      expect(chart.value).toEqual({
        type: HostMetricType.NET,
        subtype: 'net_bytes_recv',
        points: validPoints,
      })
    })
  })
})
