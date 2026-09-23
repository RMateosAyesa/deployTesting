import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { fn } from 'storybook/test'
import { theme } from '../../../../styles/theme'
import { SensorConfigurationTemplate } from './SensorConfigurationTemplate'

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
  title: 'Sensor configuration',
  subtitle: 'Temperature #1 Sensor [ID: 04]',
  identity: {
    processVariableName: 'DONES-Li:Purif:HT1-T-In',
    description: '',
    variableType: 'float64',
    unit: 'Cº',
  },
  baseline: {
    baseValue: '300',
    rangeMin: '250',
    rangeMax: '350',
    refreshRate: '5',
    distributionModel: 'Normal',
    standardDeviation: '0.2',
    driftFactor: '0.05',
  },
  eventInjections: [
    {
      id: '1',
      eventName: 'Simulation name #1',
      eventType: 'Spike',
      intensity: '1.5',
      chance: '0.15',
      startTime: '13/04/2026 - 14:00',
      endTime: '17/04/2026 - 22:00',
    },
    {
      id: '2',
      eventName: 'Simulation name #2',
      eventType: 'Drift high (↑)',
      intensity: '1',
      chance: '0.10',
      startTime: '13/04/2026 - 14:00',
      endTime: '17/04/2026 - 18:30',
    },
  ],
  historicalLogEntries: [
    {
      id: '1',
      eventType: 'Drift low (↓)',
      eventName: 'Drift Simulation #11',
      startDate: '13/02/2026 - 13:00',
      starDate: '13/03/2026 - 13:00',
      intensity: '0.1',
      driftFactor: '0.05',
    },
    {
      id: '2',
      eventType: 'Noise burst',
      eventName: 'Noise Simulation #33',
      startDate: '11/02/2026 - 12:00',
      starDate: '11/03/2026 - 12:00',
      intensity: '0.15',
      driftFactor: '0.08',
    },
  ],
}

const meta: Meta<typeof SensorConfigurationTemplate> = {
  title: 'Templates/SensorConfigurationTemplate',
  component: SensorConfigurationTemplate,
  tags: ['autodocs'],
  argTypes: {
    sidebar: { control: 'object' },
    sensorConfigForm: { control: 'object' },
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
type Story = StoryObj<typeof SensorConfigurationTemplate>

export const Default: Story = {
  args: {
    sidebar,
    sensorConfigForm: {
      data,
      activeEventTab: 'queue',
      onBack: fn(),
      onAddEvent: fn(),
      onRemoveEvent: fn(),
      onSaveConfiguration: fn(),
      onEventTabChange: fn(),
      onClearHistoricalLogEntries: fn(),
    },
  },
}

export const HistoricalLog: Story = {
  args: {
    sidebar,
    sensorConfigForm: {
      data,
      activeEventTab: 'history',
      onBack: fn(),
      onAddEvent: fn(),
      onRemoveEvent: fn(),
      onSaveConfiguration: fn(),
      onEventTabChange: fn(),
      onClearHistoricalLogEntries: fn(),
    },
  },
}
