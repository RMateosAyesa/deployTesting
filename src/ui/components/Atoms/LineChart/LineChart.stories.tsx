import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LineChart } from './LineChart'

const Background = styled.div`
  background-color: ${theme.colors.backgroundHigh};
  padding: 24px;
`

const meta: Meta<typeof LineChart> = {
  title: 'Atoms/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    metric: { control: 'select', options: ['cpu', 'ram', 'disk', 'network', 'scanLatency', 'heartbeat'] },
    variant: { control: 'select', options: ['standard', 'expanded'] },
    height: { control: 'number' },
    ticks: { control: 'object' },
    xAxisInterval: { control: 'number' },
    showDots: { control: 'boolean' },
    fillArea: { control: 'boolean' },
    areaFill: { control: 'select', options: ['gradient', 'solid'] },
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
type Story = StoryObj<typeof LineChart>

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
    showDots: false,
    fillArea: true,
    areaFill: 'gradient',
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
    metric: 'ram',
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
    xAxisInterval: 0,
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

export const WithoutDots: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    showDots: false,
  },
}

export const GradientFilledArea: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    showDots: false,
    fillArea: true,
    areaFill: 'gradient',
  },
}

export const SolidFilledArea: Story = {
  args: {
    data: sampleData,
    metric: 'cpu',
    showDots: false,
    fillArea: true,
    areaFill: 'solid',
  },
}

export const ExpandedWithAllFeatures: Story = {
  args: {
    data: sampleData,
    metric: 'ram',
    variant: 'expanded',
    showDots: true,
    fillArea: true,
    areaFill: 'gradient',
    showReferenceLines: true,
    referenceLinesConfig: { 50: true, 75: true },
  },
}
