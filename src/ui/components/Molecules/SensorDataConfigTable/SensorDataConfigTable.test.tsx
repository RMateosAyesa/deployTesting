import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTableRecord } from '../../Atoms/DataTable'
import { SensorDataConfigTable } from './SensorDataConfigTable'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

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
]

const data: DataTableRecord[] = [
  {
    key: '1',
    eventType: 'Drift low (↓)',
    eventName: 'Drift Simulation #11',
  },
]

describe('Molecules/SensorDataConfigTable', () => {
  describe('Render', () => {
    it('renders clear action and table data', () => {
      renderWithTheme(<SensorDataConfigTable columns={columns} data={data} />)

      expect(screen.getByRole('button', { name: 'Clear all log entries' })).toBeInTheDocument()
      expect(screen.getByText('Event type')).toBeInTheDocument()
      expect(screen.getByText('Event name')).toBeInTheDocument()
      expect(screen.getByText('Drift low (↓)')).toBeInTheDocument()
      expect(screen.getByText('Drift Simulation #11')).toBeInTheDocument()
    })
  })
})
