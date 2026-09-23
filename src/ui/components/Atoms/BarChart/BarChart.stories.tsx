import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { BarChart } from './BarChart'

const Background = styled.div`
  background-color: ${theme.colors.backgroundHigh};
  padding: 24px;
`

const meta: Meta<typeof BarChart> = {
  title: 'Atoms/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    metric: { control: 'select', options: ['cpu', 'ram', 'disk', 'network', 'scanLatency', 'heartbeat'] },
    variant: { control: 'select', options: ['standard', 'expanded'] },
    height: { control: 'number' },
    ticks: { control: 'object' },
    xAxisInterval: { control: 'number' },
    showReferenceLines: { control: 'boolean' },
    referenceLinesConfig: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Background>
          <Story />
        </Background>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BarChart>

const sampleData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 35 },
  { time: '13:00', value: 80 },
  { time: '14:00', value: 55 },
  { time: '15:00', value: 70 },
]

export const Default: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'standard',
  },
}

export const Standard: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'standard',
  },
}

export const Expanded: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'expanded',
  },
}

export const CpuMetric: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'standard',
  },
}

export const RamMetric: Story = {
  args: {
    data: sampleData,
    metric: 'ram',
    variant: 'standard',
  },
}

export const DiskMetric: Story = {
  args: {
    data: sampleData,
    metric: 'disk',
    variant: 'standard',
  },
}

export const NetworkMetric: Story = {
  args: {
    data: [
      { time: '10:00', value: 100 },
      { time: '11:00', value: 150 },
      { time: '12:00', value: 180 },
      { time: '13:00', value: 200 },
      { time: '14:00', value: 120 },
      { time: '15:00', value: 160 },
    ],
    metric: 'network',
    variant: 'standard',
  },
}

export const WithoutReferenceLines: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'standard',
    showReferenceLines: false,
    xAxisInterval: 0
  },
}

export const CustomReferenceLines: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    variant: 'standard',
    showReferenceLines: true,
    referenceLinesConfig: { 50: false, 75: true },
  },
}

export const ExpandedWithAllFeatures: Story = {
  args: {
    data: sampleData,
    metric: 'ram',
    variant: 'expanded',
    showReferenceLines: true,
    referenceLinesConfig: { 50: true, 75: true },
  },
}
