import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { MetricCard } from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: ['cpu', 'memory', 'disc', 'cellTower'] },
    metricType: { control: 'select', options: ['cpu', 'ram', 'disk', 'network'] },
    progressPercent: { control: { type: 'range', min: 0, max: 100 } },
    progressFixedColorKey: { control: 'select', options: ['cpu', 'ram', 'disk', 'network'] },
    background: { control: 'select', options: ['low', 'high'] },
    padding: { control: 'select', options: ['none', 'xl', 'card'] },
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
type Story = StoryObj<typeof MetricCard>

export const CPU: Story = {
  args: {
    iconName: 'cpu',
    iconText: 'CPU',
    selectOptions: [
      { value: '1h', label: 'Last 1 hour' },
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
    ],
    selectValue: '24h',
    progressPercent: 28,
    progressFixedColorKey: 'cpu',
  },
}

export const RAM: Story = {
  args: {
    iconName: 'memory',
    iconText: 'Memory',
    selectOptions: [
      { value: '1h', label: 'Last 1 hour' },
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
    ],
    selectValue: '24h',
    progressPercent: 62,
    progressFixedColorKey: 'ram',
  },
}

export const Disk: Story = {
  args: {
    iconName: 'disc',
    iconText: 'Disk',
    selectOptions: [
      { value: '1h', label: 'Last 1 hour' },
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
    ],
    selectValue: '24h',
    progressPercent: 87,
    progressFixedColorKey: 'disk',
  },
}

export const Network: Story = {
  args: {
    iconName: 'cellTower',
    iconText: 'Network',
    selectOptions: [
      { value: '1h', label: 'Last 1 hour' },
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
    ],
    selectValue: '24h',
    progressPercent: 62,
    progressFixedColorKey: 'network',
  },
}
