import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTableRecord } from '../../Atoms/DataTable'
import { SystemTraceabilityTable } from './SystemTraceabilityTable'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

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
]

describe('Molecules/SystemTraceabilityTable', () => {
  describe('Render', () => {
    it('renders title, export action and table data', () => {
      renderWithTheme(<SystemTraceabilityTable columns={columns} data={data} />)

      expect(screen.getByText('System Traceability Table')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Export CSV' })).toBeInTheDocument()
      expect(screen.getByText('Timestamp')).toBeInTheDocument()
      expect(screen.getByText('PV Name')).toBeInTheDocument()
      expect(screen.getByText('Change')).toBeInTheDocument()
      expect(screen.getByText('DONES-Li:HT1:StdDev')).toBeInTheDocument()
    })
  })
})
