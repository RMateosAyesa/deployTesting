import { HostMetricType } from './host-metric-type.enum'

export enum HostMetricSubtype {
  CPU_USAGE_IDLE = 'cpu_usage_idle',
  CPU_USAGE_IOWAIT = 'cpu_usage_iowait',
  CPU_USAGE_NICE = 'cpu_usage_nice',
  CPU_USAGE_SOFTIRQ = 'cpu_usage_softirq',
  CPU_USAGE_SYSTEM = 'cpu_usage_system',
  CPU_USAGE_USER = 'cpu_usage_user',
  MEM_AVAILABLE_PERCENT = 'mem_available_percent',
  MEM_CACHED = 'mem_cached',
  MEM_FREE = 'mem_free',
  MEM_SWAP_FREE = 'mem_swap_free',
  MEM_USED_PERCENT = 'mem_used_percent',
  DISK_FREE = 'disk_free',
  DISK_INODES_USED_PERCENT = 'disk_inodes_used_percent',
  DISK_USED_PERCENT = 'disk_used_percent',
  DISKIO_READ_BYTES = 'diskio_read_bytes',
  DISKIO_WRITE_BYTES = 'diskio_write_bytes',
  NET_BYTES_RECV = 'net_bytes_recv',
  NET_BYTES_SENT = 'net_bytes_sent',
  NET_DROP_IN = 'net_drop_in',
  NET_DROP_OUT = 'net_drop_out',
  NET_ERR_IN = 'net_err_in',
  NET_ERR_OUT = 'net_err_out',
  NET_PACKETS_RECV = 'net_packets_recv',
  NET_PACKETS_SENT = 'net_packets_sent',
}

export const HOST_METRIC_SUBTYPES_BY_TYPE: Readonly<
  Record<HostMetricType, readonly HostMetricSubtype[]>
> = {
  [HostMetricType.CPU]: [
    HostMetricSubtype.CPU_USAGE_IDLE,
    HostMetricSubtype.CPU_USAGE_IOWAIT,
    HostMetricSubtype.CPU_USAGE_NICE,
    HostMetricSubtype.CPU_USAGE_SOFTIRQ,
    HostMetricSubtype.CPU_USAGE_SYSTEM,
    HostMetricSubtype.CPU_USAGE_USER,
  ],
  [HostMetricType.RAM]: [
    HostMetricSubtype.MEM_AVAILABLE_PERCENT,
    HostMetricSubtype.MEM_CACHED,
    HostMetricSubtype.MEM_FREE,
    HostMetricSubtype.MEM_SWAP_FREE,
    HostMetricSubtype.MEM_USED_PERCENT,
  ],
  [HostMetricType.DISK]: [
    HostMetricSubtype.DISK_FREE,
    HostMetricSubtype.DISK_INODES_USED_PERCENT,
    HostMetricSubtype.DISK_USED_PERCENT,
    HostMetricSubtype.DISKIO_READ_BYTES,
    HostMetricSubtype.DISKIO_WRITE_BYTES,
  ],
  [HostMetricType.NET]: [
    HostMetricSubtype.NET_BYTES_RECV,
    HostMetricSubtype.NET_BYTES_SENT,
    HostMetricSubtype.NET_DROP_IN,
    HostMetricSubtype.NET_DROP_OUT,
    HostMetricSubtype.NET_ERR_IN,
    HostMetricSubtype.NET_ERR_OUT,
    HostMetricSubtype.NET_PACKETS_RECV,
    HostMetricSubtype.NET_PACKETS_SENT,
  ],
}
