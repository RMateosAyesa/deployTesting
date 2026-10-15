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

const mockChartData = [
  { time: '00:00', value: 20 },
  { time: '04:00', value: 35 },
  { time: '08:00', value: 42 },
  { time: '12:00', value: 25 },
  { time: '16:00', value: 31 },
  { time: '20:00', value: 40 },
]

const node01IocCards: IocServerCardProps[] = [
  {
    dataTestId: 'ioc-card-node-01-temp',
    title: 'IOC Temp Server',
    subtitle: 'Temperature Sensor #1',
    iconName: 'thermometer',
    metrics: [
      { label: 'CPU', value: 45 },
      { label: 'RAM', value: 62 },
      { label: 'Disk', value: 38 },
    ],
  },
  {
    dataTestId: 'ioc-card-node-01-pressure',
    title: 'IOC Pressure Server',
    subtitle: 'Pressure Sensor #2',
    iconName: 'speedometer',
    metrics: [
      { label: 'CPU', value: 72 },
      { label: 'RAM', value: 55 },
      { label: 'Disk', value: 81 },
    ],
  },
]

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
    iocServerCards: node01IocCards,
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