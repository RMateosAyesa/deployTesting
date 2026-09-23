import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { SensorConfigForm } from './SensorConfigForm'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
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
  ],
}

describe('Organisms/SensorConfigForm', () => {
  describe('Render', () => {
    it('renders sensor configuration sections and event data', () => {
      renderWithTheme(<SensorConfigForm data={data} />)

      expect(screen.getByRole('heading', { name: 'Sensor configuration' })).toBeInTheDocument()
      expect(screen.getByText('Temperature #1 Sensor [ID: 04]')).toBeInTheDocument()
      expect(screen.getByText('Identity & Meta')).toBeInTheDocument()
      expect(screen.getByText('Baseline modeling')).toBeInTheDocument()
      expect(screen.getByText('Event injections')).toBeInTheDocument()
      expect(screen.getByDisplayValue('DONES-Li:Purif:HT1-T-In')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Simulation name #1')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add event' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Save configuration' })).toBeInTheDocument()
    })

    it('renders historical log table when history tab is active', () => {
      renderWithTheme(<SensorConfigForm data={data} activeEventTab="history" />)

      expect(screen.getByRole('button', { name: 'Clear all log entries' })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: 'Event type' })).toBeInTheDocument()
      expect(screen.getByText('Drift Simulation #11')).toBeInTheDocument()
      expect(screen.queryByDisplayValue('Simulation name #1')).not.toBeInTheDocument()
    })
  })
})
