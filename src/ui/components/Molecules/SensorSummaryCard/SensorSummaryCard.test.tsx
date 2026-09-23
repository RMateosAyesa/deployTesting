import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { SensorSummaryCard } from './SensorSummaryCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const defaultData = {
  title: 'Temperature #1',
  baseValue: 300,
  unit: '°C',
  distributionModel: 'Normal',
  standardDeviation: 0.2,
  eventInjectionCount: 2,
  eventInjectionLabel: 'Active',
  refreshRate: '5 seconds',
  driftFactor: 0.05,
}

describe('Molecules/SensorSummaryCard', () => {
  describe('Render', () => {
    it('renders sensor summary card title and settings action', () => {
      renderWithTheme(<SensorSummaryCard data={defaultData} />)

      expect(screen.getByRole('heading', { name: 'Temperature #1', level: 5 })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
    })

    it('renders sensor summary values', () => {
      renderWithTheme(<SensorSummaryCard data={defaultData} />)

      expect(screen.getByText('Base value')).toBeInTheDocument()
      expect(screen.getByText('300')).toBeInTheDocument()
      expect(screen.getByText('°C')).toBeInTheDocument()
      expect(screen.getByText('Distribution model')).toBeInTheDocument()
      expect(screen.getByText('Normal')).toBeInTheDocument()
      expect(screen.getByText('STD Dev')).toBeInTheDocument()
      expect(screen.getByText('0.2')).toBeInTheDocument()
      expect(screen.getByText('Event injection')).toBeInTheDocument()
      expect(screen.getByText('2 Active')).toBeInTheDocument()
      expect(screen.getByText('Refresh rate')).toBeInTheDocument()
      expect(screen.getByText('5 seconds')).toBeInTheDocument()
      expect(screen.getByText('Drift factor')).toBeInTheDocument()
      expect(screen.getByText('0.05')).toBeInTheDocument()
    })

    it('renders none when there are no active events', () => {
      renderWithTheme(<SensorSummaryCard data={{ ...defaultData, eventInjectionCount: 0 }} />)

      expect(screen.getByText('None')).toBeInTheDocument()
      expect(screen.queryByText('0 Active')).not.toBeInTheDocument()
      expect(screen.getByTestId('inactive-event-icon').querySelector('svg')).toBeInTheDocument()
    })
  })
})
