import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { SensorSummaryCard } from './SensorSummaryCard'

const meta: Meta<typeof SensorSummaryCard> = {
  title: 'Molecules/SensorSummaryCard',
  component: SensorSummaryCard,
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'select', options: ['low', 'high'] },
    padding: { control: 'select', options: ['none', 'xl', 'card'] },
    onSettingsClick: { action: 'settings clicked' },
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
type Story = StoryObj<typeof SensorSummaryCard>

export const Temperature: Story = {
  args: {
    data: {
      title: 'Temperature #1',
      baseValue: 302.4,
      unit: '°C',
      distributionModel: 'Gaussian',
      standardDeviation: 0.2,
      eventInjectionCount: 2,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.03,
    },
  },
}

export const WithoutActiveEvents: Story = {
  args: {
    data: {
      title: 'Temperature #1',
      baseValue: 302.4,
      unit: '°C',
      distributionModel: 'Gaussian',
      standardDeviation: 0.2,
      eventInjectionCount: 0,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.03,
    },
  },
}
