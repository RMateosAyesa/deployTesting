import { HostMetricType } from '../enums/host-metric-type.enum'

import { HostMetric } from './host-metric.entity'

describe('HostMetric', () => {
  it('creates a host metric with validated value objects', () => {
    const metric = HostMetric.create({
      type: HostMetricType.CPU,
      subtype: 'cpu_usage_user',
      value: 42.5,
      timestamp: 1_778_615_200_000,
      visibleName: 'CPU usage user',
    })

    expect(metric.value).toEqual({
      type: HostMetricType.CPU,
      subtype: 'cpu_usage_user',
      value: 42.5,
      timestamp: 1_778_615_200_000,
      visibleName: 'CPU usage user',
    })
  })

  it('rejects an invalid type', () => {
    expect(() =>
      HostMetric.create({
        type: 'gpu' as HostMetricType,
        subtype: 'cpu_usage_user',
        value: 42.5,
        timestamp: 1_778_615_200_000,
        visibleName: 'CPU usage user',
      }),
    ).toThrow(/type/)
  })

  it('rejects a non-number value', () => {
    expect(() =>
      HostMetric.create({
        type: HostMetricType.RAM,
        subtype: 'mem_used_percent',
        value: 'high' as unknown as number,
        timestamp: 1_778_615_200_000,
        visibleName: 'Memory used',
      }),
    ).toThrow(/value/)
  })

  it('rejects an invalid timestamp', () => {
    expect(() =>
      HostMetric.create({
        type: HostMetricType.DISK,
        subtype: 'disk_used_percent',
        value: 38,
        timestamp: Number.NaN,
        visibleName: 'Disk used',
      }),
    ).toThrow(/timestamp/)
  })
})