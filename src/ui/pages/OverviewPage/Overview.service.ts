import type { SidebarProps } from '../../components/Organisms/Sidebar'
import type { NodeMetrics } from '../../components/Templates/OverviewTemplate'
import type { MetricGroup } from '../../components/Organisms/MetricSelector'
import type { IocServerCardProps } from '../../components/Molecules/IocServerCard'

export const overviewSidebar: SidebarProps = {
  items: [
    { id: 'overview', label: 'Overview', iconName: 'globe', badge: '' },
    { id: 'lithium', label: 'Lithium System', iconName: 'cube', badge: '' },
    {
      id: 'datalab',
      label: 'Data Lab',
      iconName: 'flask',
      badge: '',
      children: [
        { id: 'anomaly', label: 'Anomaly scenarios', iconName: 'arrowRight', badge: '' },
        { id: 'sensor-data-config', label: 'Sensor data config', iconName: 'arrowRight', badge: '' },
      ],
    },
  ],
  activeId: 'overview',
}

export interface OverviewPageData {
  title: string
  description: string
}

export const overviewPageData: OverviewPageData = {
  title: 'Lithium Server Overview',
  description:
    'View real-time performance metrics for each host server',
}

export type OverviewMetricKey = 'cpu' | 'ram' | 'disk' | 'network'

export const OVERVIEW_METRICS: readonly OverviewMetricKey[] = [
  'cpu',
  'ram',
  'disk',
  'network',
]

export const DEFAULT_SUBTYPE_BY_METRIC: Record<
  OverviewMetricKey,
  string
> = {
  cpu: 'cpu_usage_user',
  ram: 'mem_used_percent',
  disk: 'disk_used_percent',
  network: 'net_bytes_recv',
}

const mockChartData = [
  { time: '00:00', value: 20 },
  { time: '04:00', value: 35 },
  { time: '08:00', value: 42 },
  { time: '12:00', value: 25 },
  { time: '16:00', value: 31 },
  { time: '20:00', value: 40 },
]

// Local demo data for the IOC performance design; no API requests.
const node01IocCylinders = Array.from({ length: 3 }, (_, cylinderIndex) => ({
  id: `cylinder-${cylinderIndex + 1}`,
  title: `cylinder ${cylinderIndex + 1}`,
  cards: Array.from({ length: 12 }, (_, index): IocServerCardProps => ({
    dataTestId: `ioc-card-node-01-cylinder-${cylinderIndex + 1}-${index + 1}`,
    title: index % 3 === 2 ? `Temperature #${index + 1}` : `Pressure Sensor #${index + 1}`,
    subtitle: '',
    iconName: index % 3 === 2 ? 'thermometer' : 'speedometer',
    metrics: [
      { label: 'CPU', value: [87, 50, 33][index % 3] },
      { label: 'Disk', value: [53, 53, 43][index % 3] },
      { label: 'RAM', value: [39, 80, 53][index % 3] },
    ],
  })),
}))

const node02IocCards: IocServerCardProps[] = [
  {
    dataTestId: 'ioc-card-node-02-temp',
    title: 'IOC Temp Server',
    subtitle: 'Temperature Sensor #1',
    iconName: 'thermometer',
    metrics: [
      { label: 'CPU', value: 38 },
      { label: 'RAM', value: 44 },
      { label: 'Disk', value: 29 },
    ],
  },
]

export const overviewNodes: NodeMetrics[] = [
  {
    id: 'node-01',
    title: 'Host Server — Node 01',
    iocCylinders: node01IocCylinders,
    metrics: [
      {
        metricCardProps: {
          iconName: 'cpu',
          iconText: 'CPU usage',
          progressPercent: 21.62,
          metricType: 'cpu',
        },
        chartData: mockChartData,
        metric: 'cpu',
      },
      {
        metricCardProps: {
          iconName: 'memory',
          iconText: 'RAM usage',
          progressPercent: 74,
          metricType: 'ram',
        },
        chartData: mockChartData,
        metric: 'ram',
      },
      {
        metricCardProps: {
          iconName: 'disc',
          iconText: 'Disk usage',
          progressPercent: 38,
          metricType: 'disk',
        },
        chartData: mockChartData,
        metric: 'disk',
      },
      {
        metricCardProps: {
          iconName: 'cellTower',
          iconText: 'Network',
          progressPercent: 57,
          metricType: 'network',
        },
        chartData: mockChartData,
        metric: 'network',
      },
    ],
    timeRangeValue: 'realtime',
  },
  {
    id: 'node-02',
    title: 'Host Server — Node 02',
    iocServerCards: node02IocCards,
    metrics: [
      {
        metricCardProps: {
          iconName: 'cpu',
          iconText: 'CPU usage',
          progressPercent: 44,
          metricType: 'cpu',
        },
        chartData: mockChartData,
        metric: 'cpu',
      },
    ],
    timeRangeValue: 'realtime',
  },
]

export const metricSelectorGroups: MetricGroup[] = [
  {
    id: 'cpu',
    title: 'CPU Metrics',
    metrics: [
      {
        id: 'cpu-usage',
        label: 'CPU Usage',
        enabled: true,
      },
      {
        id: 'cpu-load',
        label: 'CPU Load',
        enabled: false,
        flagged: true,
      },
    ],
  },
  {
    id: 'ram',
    title: 'RAM Metrics',
    metrics: [
      {
        id: 'memory-usage',
        label: 'Memory Usage',
        enabled: true,
      },
      {
        id: 'swap-usage',
        label: 'Swap Usage',
        enabled: false,
        flagged: true,
      },
    ],
  },
  {
    id: 'disk',
    title: 'Disk Metrics',
    metrics: [
      {
        id: 'disk-usage',
        label: 'Disk Usage',
        enabled: true,
      },
    ],
  },
  {
    id: 'network',
    title: 'Network Metrics',
    hideSwitch: true,
    metrics: [
      {
        id: 'networks',
        label: 'Networks',
        enabled: false,
      },
    ],
  },
]

export async function addMetrics(nodeId: string): Promise<void> {
  console.log('ADD METRICS', nodeId)
}

export async function showIOC(nodeId: string): Promise<void> {
  console.log('SHOW IOC', nodeId)
}

export async function changeTimeRange(
  nodeId: string,
  value: string
): Promise<void> {
  console.log('TIME RANGE', nodeId, value)
}