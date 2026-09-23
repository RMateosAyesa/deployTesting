import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'

import {
  MetricSelector,
  MetricGroup,
} from './MetricSelector'

const meta: Meta<typeof MetricSelector> = {
  title: 'Organisms/MetricSelector',
  component: MetricSelector,
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

type Story = StoryObj<typeof MetricSelector>

const mockGroups: MetricGroup[] = [
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

export const Default: Story = {
  render: () => {
    const groups = [...mockGroups]

    return (
      <MetricSelector
        groups={groups}
        onMetricToggle={(
          groupId,
          metricId,
          enabled
        ) => {
          console.log({
            groupId,
            metricId,
            enabled,
          })
        }}
      />
    )
  },
}