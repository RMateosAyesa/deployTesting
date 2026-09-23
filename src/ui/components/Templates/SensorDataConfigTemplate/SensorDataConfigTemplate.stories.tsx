import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { fn } from 'storybook/test'
import { theme } from '../../../../styles/theme'
import { SensorDataConfigTemplate } from './SensorDataConfigTemplate'

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
  activeId: 'sensor',
}

const data = {
  title: 'Sensor data config',
  subtitle: 'Define how sensor values are generated to simulate system behavior under controlled conditions.',
  sensors: [
    {
      title: 'Temperature #1',
      baseValue: 300,
      unit: 'ºC',
      distributionModel: 'Normal',
      standardDeviation: 0.2,
      eventInjectionCount: 2,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.05,
    },
    {
      title: 'Temperature #2',
      baseValue: 350,
      unit: 'ºC',
      distributionModel: 'Normal',
      standardDeviation: 0.2,
      eventInjectionCount: 1,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.03,
    },
    {
      title: 'Pressure #1',
      baseValue: '--,-',
      distributionModel: '-',
      standardDeviation: '-',
      eventInjectionCount: 0,
      eventInjectionLabel: 'Active',
      refreshRate: '-',
      driftFactor: '-',
    },
    {
      title: 'Pressure #2',
      baseValue: '--,-',
      distributionModel: '-',
      standardDeviation: '-',
      eventInjectionCount: 0,
      eventInjectionLabel: 'Active',
      refreshRate: '-',
      driftFactor: '-',
    },
  ],
}

const meta: Meta<typeof SensorDataConfigTemplate> = {
  title: 'Templates/SensorDataConfigTemplate',
  component: SensorDataConfigTemplate,
  tags: ['autodocs'],
  args: {
    onSensorSettingsClick: fn(),
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
type Story = StoryObj<typeof SensorDataConfigTemplate>

export const Default: Story = {
  args: {
    sidebar,
    data,
  },
}
