import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { OverviewTemplate } from './OverviewTemplate'
import { MetricItemProps } from '../../Molecules/MetricItem'

const meta: Meta<typeof OverviewTemplate> = {
  title: 'Templates/OverviewTemplate',
  component: OverviewTemplate,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof OverviewTemplate>

const sidebar = {
  items: [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe' as const,
      badge: '',
    },
    {
      id: 'lithium',
      label: 'Lithium System',
      iconName: 'cube' as const,
      badge: '',
    },
    {
      id: 'datalab',
      label: 'Data Lab',
      iconName: 'flask' as const,
      badge: '',
      children: [
        {
          id: 'anomaly',
          label: 'Anomaly scenarios',
          iconName: 'arrowRight' as const,
          badge: '',
        },
        {
          id: 'sensor',
          label: 'Sensor data config',
          iconName: 'arrowRight' as const,
          badge: '',
        },
      ],
    },
  ],
  activeId: 'overview',
}

const mockChartData = [
  { time: '10:00', value: 30 },
  { time: '10:05', value: 45 },
  { time: '10:10', value: 55 },
  { time: '10:15', value: 40 },
  { time: '10:20', value: 65 },
  { time: '10:25', value: 20 },
  { time: '10:30', value: 15 },
  { time: '10:35', value: 85 },
  { time: '10:40', value: 75 },
  { time: '10:45', value: 90 },
  { time: '10:50', value: 50 },
  { time: '10:55', value: 35 },
]

const cpuMetric: MetricItemProps = {
  metricCardProps: {
    iconName: 'cpu',
    iconText: 'CPU usage',
    progressPercent: 75,
    metricType: 'cpu',
  },
  chartData: mockChartData,
  metric: 'cpu',
}

const ramMetric: MetricItemProps = {
  metricCardProps: {
    iconName: 'memory',
    iconText: 'RAM usage',
    progressPercent: 62,
    metricType: 'ram',
  },
  chartData: mockChartData,
  metric: 'ram',
}

const diskMetric: MetricItemProps = {
  metricCardProps: {
    iconName: 'disc',
    iconText: 'Disk I/O',
    progressPercent: 48,
    metricType: 'disk',
  },
  chartData: mockChartData,
  metric: 'disk',
}

const networkMetric: MetricItemProps = {
  metricCardProps: {
    iconName: 'cellTower',
    iconText: 'Network',
    progressPercent: 81,
    metricType: 'network',
  },
  chartData: mockChartData,
  metric: 'network',
}

const cpuMetricNode2: MetricItemProps = {
  ...cpuMetric,
  metricCardProps: {
    ...cpuMetric.metricCardProps,
    progressPercent: 54,
  },
}

const ramMetricNode2: MetricItemProps = {
  ...ramMetric,
  metricCardProps: {
    ...ramMetric.metricCardProps,
    progressPercent: 71,
  },
}

const diskMetricNode2: MetricItemProps = {
  ...diskMetric,
  metricCardProps: {
    ...diskMetric.metricCardProps,
    progressPercent: 39,
  },
}

const networkMetricNode2: MetricItemProps = {
  ...networkMetric,
  metricCardProps: {
    ...networkMetric.metricCardProps,
    progressPercent: 66,
  },
}

export const Default: Story = {
  args: {
    sidebar,
    title: 'Lithium server',
    description:
      'View real-time performance metrics and manage observables for the selected host server',
    nodes: [
      {
        id: 'node-1',
        title: 'Host Server - Node 1',
        metrics: [
          cpuMetric,
          ramMetric,
          diskMetric,
          networkMetric,
        ],
        onAddMetrics: () => console.log('Add metrics node 1'),
        onShowIOC: () => console.log('Show IOC node 1'),
      },
      {
        id: 'node-2',
        title: 'Host Server - Node 2',
        metrics: [
          cpuMetricNode2,
          ramMetricNode2,
          diskMetricNode2,
          networkMetricNode2,
        ],
        onAddMetrics: () => console.log('Add metrics node 2'),
        onShowIOC: () => console.log('Show IOC node 2'),
      },
    ],
  },
}