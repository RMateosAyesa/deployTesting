import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTableRecord } from '../../Atoms/DataTable'
import { SensorDataConfigTable } from './SensorDataConfigTable'

const StoryPreview = styled.div`
  background-color: ${({ theme }) => theme.colors.borderMid};
  padding: ${({ theme }) => theme.spacing.md};
`

const columns = [
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

const data: DataTableRecord[] = [
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

const meta: Meta<typeof SensorDataConfigTable> = {
  title: 'Molecules/SensorDataConfigTable',
  component: SensorDataConfigTable,
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
type Story = StoryObj<typeof SensorDataConfigTable>

export const Default: Story = {
  args: {
    columns,
    data,
  },
  render: (args) => (
    <StoryPreview>
      <SensorDataConfigTable {...args} />
    </StoryPreview>
  ),
}
