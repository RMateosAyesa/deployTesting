import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { AnomalyScenarioTemplate } from './AnomalyScenarioTemplate'

const meta: Meta<typeof AnomalyScenarioTemplate> = {
  title: 'Templates/AnomalyScenarioTemplate',
  component: AnomalyScenarioTemplate,
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

type Story = StoryObj<typeof AnomalyScenarioTemplate>

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
  activeId: 'anomaly',
}

export const Default: Story = {
  args: {
    sidebar,
    title: 'Anomaly Scenario',
    description: 'Define anomaly scenarios that affect host server performance and influence system behavior across the platform.',
    nodeCardData: {
      title: 'Host Server — Node 01',
      iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
    },
  },
}

export const WithActiveAnomaly: Story = {
  args: {
    sidebar,
    title: 'Anomaly Scenario',
    description: 'A node with an active anomaly.',
    nodeCardData: {
      title: 'Host Server — Node 02',
      iocInstances: ['IOC-Temp-01', 'IOC-Press-02'],
      activeAnomaly: {
        type: 'network',
        optionValue: 'ioc_service_restart',
        status: 'running',
      },
    },
  },
}
