import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { ActiveAnomalyRow } from './ActiveAnomalyRow'

const meta: Meta<typeof ActiveAnomalyRow> = {
  title: 'Molecules/ActiveAnomalyRow',
  component: ActiveAnomalyRow,
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
type Story = StoryObj<typeof ActiveAnomalyRow>

export const None: Story = {
  render: () => <ActiveAnomalyRow />,
}

export const RunningNetwork: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }}
    />
  ),
}

export const RunningResource: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'resource', optionValue: 'cpu_hog', status: 'running' }}
    />
  ),
}

export const RunningDisk: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'disk', optionValue: 'disk_fill', status: 'running' }}
    />
  ),
}

export const ScheduledNetwork: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'scheduled', scheduledDate: '2026-05-01 10:00' }}
    />
  ),
}

export const ScheduledResource: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'resource', optionValue: 'cpu_hog', status: 'scheduled', scheduledDate: '2026-05-02 14:30' }}
    />
  ),
}

export const ScheduledDisk: Story = {
  render: () => (
    <ActiveAnomalyRow
      data={{ type: 'disk', optionValue: 'disk_fill', status: 'scheduled', scheduledDate: '2026-05-03 09:00' }}
    />
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ActiveAnomalyRow />
      <ActiveAnomalyRow data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }} />
      <ActiveAnomalyRow data={{ type: 'resource', optionValue: 'cpu_hog', status: 'scheduled', scheduledDate: '2026-05-01 10:00' }} />
      <ActiveAnomalyRow data={{ type: 'disk', optionValue: 'disk_fill', status: 'running' }} />
    </div>
  ),
}
