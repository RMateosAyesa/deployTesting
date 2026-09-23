import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTableRecord } from '../../Atoms/DataTable'
import { SystemTraceabilityTable } from './SystemTraceabilityTable'

const StoryPreview = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundMid};
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

const meta: Meta<typeof SystemTraceabilityTable> = {
  title: 'Molecules/SystemTraceabilityTable',
  component: SystemTraceabilityTable,
  tags: ['autodocs'],
  argTypes: {
    onExportCsv: { action: 'export csv clicked' },
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
type Story = StoryObj<typeof SystemTraceabilityTable>

export const Default: Story = {
  args: {
    columns,
    data,
  },
  render: (args) => (
    <StoryPreview>
      <SystemTraceabilityTable {...args} />
    </StoryPreview>
  ),
}
