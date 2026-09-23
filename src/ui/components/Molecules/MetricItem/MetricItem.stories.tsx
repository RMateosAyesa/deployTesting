import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { MetricItem } from './MetricItem'

const meta: Meta<typeof MetricItem> = {
  title: 'Molecules/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
  argTypes: {
    metric: { control: 'select', options: ['cpu', 'ram', 'disk', 'network'] },
    progressFixedColorKey: { control: 'select', options: ['cpu', 'ram', 'disk', 'network'] },
    lineChartVariant: { control: 'select', options: ['standard', 'expanded'] },
    showDots: { control: 'boolean' },
    fillArea: { control: 'boolean' },
    areaFill: { control: 'select', options: ['gradient', 'solid'] },
    showReferenceLines: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MetricItem>

const sampleChartData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 35 },
  { time: '13:00', value: 80 },
  { time: '14:00', value: 55 },
  { time: '15:00', value: 70 },
]

export const CPU: Story = {
  args: {
    metricCardProps: {
      iconName: 'cpu',
      iconText: 'CPU',
      metricType: 'cpu',
      progressPercent: 85,
      selectOptions: [
        { value: '1h', label: 'Last 1 hour' },
        { value: '24h', label: 'Last 24 hours' },
      ],
      selectValue: '24h',
    },
    chartData: sampleChartData,
    metric: 'cpu',
    lineChartVariant: 'standard',
    progressFixedColorKey: 'cpu',
  },
}

export const RAM: Story = {
  args: {
    metricCardProps: {
      iconName: 'memory',
      iconText: 'Memory',
      metricType: 'ram',
      progressPercent: 62,
      selectOptions: [
        { value: '1h', label: 'Last 1 hour' },
        { value: '24h', label: 'Last 24 hours' },
      ],
      selectValue: '24h',
    },
    chartData: sampleChartData,
    metric: 'ram',
    lineChartVariant: 'standard',
    progressFixedColorKey: 'ram',
  },
}

export const Disk: Story = {
  args: {
    metricCardProps: {
      iconName: 'disc',
      iconText: 'Disk',
      metricType: 'disk',
      progressPercent: 45,
      selectOptions: [
        { value: '1h', label: 'Last 1 hour' },
        { value: '24h', label: 'Last 24 hours' },
      ],
      selectValue: '24h',
    },
    chartData: sampleChartData,
    metric: 'disk',
    lineChartVariant: 'standard',
    progressFixedColorKey: 'disk',
  },
}

export const Network: Story = {
  args: {
    metricCardProps: {
      iconName: 'cellTower',
      iconText: 'Network',
      metricType: 'network',
      progressPercent: 95,
      selectOptions: [
        { value: '1h', label: 'Last 1 hour' },
        { value: '24h', label: 'Last 24 hours' },
      ],
      selectValue: '24h',
    },
    chartData: [
      { time: '10:00', value: 100 },
      { time: '11:00', value: 150 },
      { time: '12:00', value: 180 },
      { time: '13:00', value: 200 },
      { time: '14:00', value: 120 },
      { time: '15:00', value: 160 },
    ],
    metric: 'network',
    lineChartVariant: 'standard',
    background: 'high',
    progressFixedColorKey: 'network',
  },
}
