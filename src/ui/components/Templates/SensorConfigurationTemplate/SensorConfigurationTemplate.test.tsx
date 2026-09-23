import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { SensorConfigurationTemplate } from './SensorConfigurationTemplate'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sidebar = {
  items: [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe' as const,
      badge: '',
    },
    {
      id: 'datalab',
      label: 'Data Lab',
      iconName: 'flask' as const,
      badge: '',
      children: [
        {
          id: 'sensor',
          label: 'Sensor data config',
          iconName: 'arrowRight' as const,
          badge: '',
        },
      ],
    },
  ],
  activeId: 'sensor',
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
  historicalLogEntries: [],
}

const defaultProps = {
  sidebar,
  sensorConfigForm: {
    data,
  },
}

describe('Templates/SensorConfigurationTemplate', () => {
  describe('Render', () => {
    it('renders the base template header', () => {
      renderWithTheme(<SensorConfigurationTemplate {...defaultProps} />)
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })

    it('renders the sidebar active section', () => {
      renderWithTheme(<SensorConfigurationTemplate {...defaultProps} />)
      expect(screen.getByText('Sensor data config')).toBeInTheDocument()
    })

    it('renders the sensor configuration form', () => {
      renderWithTheme(<SensorConfigurationTemplate {...defaultProps} />)

      expect(screen.getByRole('heading', { name: 'Sensor configuration' })).toBeInTheDocument()
      expect(screen.getByText('Temperature #1 Sensor [ID: 04]')).toBeInTheDocument()
      expect(screen.getByText('Identity & Meta')).toBeInTheDocument()
      expect(screen.getByText('Baseline modeling')).toBeInTheDocument()
      expect(screen.getByText('Event injections')).toBeInTheDocument()
      expect(screen.getByDisplayValue('DONES-Li:Purif:HT1-T-In')).toBeInTheDocument()
    })
  })
})
