import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { SensorDataConfigTemplate } from './SensorDataConfigTemplate'

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
  title: 'Sensor data config',
  subtitle: 'Define how sensor values are generated to simulate system behavior under controlled conditions.',
  sensors: [
    {
      title: 'Temperature #1',
      baseValue: 300,
      unit: 'ºC',
      distributionModel: 'Normal',
      standardDeviation: 0.2,
      eventInjectionCount: 2,
      eventInjectionLabel: 'Active',
      refreshRate: '5 seconds',
      driftFactor: 0.05,
    },
  ],
}

describe('Templates/SensorDataConfigTemplate', () => {
  describe('Render', () => {
    it('renders base layout and sensor data config content', () => {
      renderWithTheme(<SensorDataConfigTemplate sidebar={sidebar} data={data} />)

      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Sensor data config' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Temperature #1' })).toBeInTheDocument()
      expect(screen.getByText('Define how sensor values are generated to simulate system behavior under controlled conditions.')).toBeInTheDocument()
      expect(screen.getByText('2 Active')).toBeInTheDocument()
    })
  })
})
