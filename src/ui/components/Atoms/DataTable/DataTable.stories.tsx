import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTable, DataTableRecord } from './DataTable'

const StoryPreview = styled.div<{ $background?: string }>`
  background-color: ${({ theme, $background }) => $background || theme.colors.backgroundMid};
  padding: ${({ theme }) => theme.spacing.md};
`

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'PV Name',
    dataIndex: 'pvName',
    key: 'pvName',
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
  },
]

const data: DataTableRecord[] = [
  {
    key: '1',
    timestamp: '13/03/2026 - 12:59',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.5',
  },
  {
    key: '2',
    timestamp: '12/03/2026 - 11:42',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.1',
  },
  {
    key: '3',
    timestamp: '10/03/2026 - 10:33',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.2',
  },
]

const paginatedData: DataTableRecord[] = [
  ...data,
  {
    key: '4',
    timestamp: '08/03/2026 - 09:15',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.4',
  },
  {
    key: '5',
    timestamp: '06/03/2026 - 14:20',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.3',
  },
  {
    key: '6',
    timestamp: '04/03/2026 - 16:45',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.6',
  },
]

const EventText = styled.span<{ $variant: 'start' | 'stop' }>`
  color: ${({ theme, $variant }) => $variant === 'start' ? theme.colors.semanticSuccess : theme.colors.semanticDanger};
`

const eventColumns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Event',
    dataIndex: 'event',
    key: 'event',
  },
]

const eventData: DataTableRecord[] = [
  {
    key: '1',
    timestamp: '01/04/2026 - 8:00',
    event: <EventText $variant="start">Start</EventText>,
  },
  {
    key: '2',
    timestamp: '24/03/2026 - 8:00',
    event: <EventText $variant="stop">Stop</EventText>,
  },
]

const configurationColumns = [
  {
    title: 'Event type',
    dataIndex: 'eventType',
    key: 'eventType',
  },
  {
    title: 'Event name',
    dataIndex: 'eventName',
    key: 'eventName',
  },
  {
    title: 'Start date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Star date',
    dataIndex: 'starDate',
    key: 'starDate',
  },
  {
    title: 'Intensity',
    dataIndex: 'intensity',
    key: 'intensity',
  },
  {
    title: 'Drift factor',
    dataIndex: 'driftFactor',
    key: 'driftFactor',
  },
]

const configurationData: DataTableRecord[] = [
  {
    key: '1',
    eventType: 'Drift low (↓)',
    eventName: 'Drift Simulation #11',
    startDate: '13/02/2026 - 13:00',
    starDate: '13/03/2026 - 13:00',
    intensity: '0.1',
    driftFactor: '0.05',
  },
  {
    key: '2',
    eventType: 'Noise burst',
    eventName: 'Noise Simulation #33',
    startDate: '11/02/2026 - 12:00',
    starDate: '11/03/2026 - 12:00',
    intensity: '0.15',
    driftFactor: '0.08',
  },
]

const meta: Meta<typeof DataTable> = {
  title: 'Atoms/DataTable',
  component: DataTable,
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
type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  args: {
    columns,
    data,
  },
  render: (args) => (
    <StoryPreview>
      <DataTable {...args} />
    </StoryPreview>
  ),
}

export const Paginated: Story = {
  args: {
    columns,
    data: paginatedData,
    pagination: {
      pageSize: 3,
    },
  },
  render: (args) => (
    <StoryPreview>
      <DataTable {...args} />
    </StoryPreview>
  ),
}

export const Events: Story = {
  args: {
    columns: eventColumns,
    data: eventData,
  },
  render: (args) => (
    <StoryPreview>
      <DataTable {...args} />
    </StoryPreview>
  ),
}

export const Configuration: Story = {
  args: {
    columns: configurationColumns,
    data: configurationData,
  },
  render: (args) => (
    <StoryPreview $background={theme.colors.borderMid}>
      <DataTable {...args} />
    </StoryPreview>
  ),
}
