import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'
import { MetricSelector } from './MetricSelector'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

const mockGroups = [
  {
    id: 'cpu',
    title: 'CPU Metrics',
    metrics: [
      {
        id: 'cpu-seconds',
        label: 'node_cpu_seconds',
        enabled: false,
      },
      {
        id: 'cpu-total',
        label: 'node_cpu_seconds_total',
        enabled: true,
      },
    ],
  },
  {
    id: 'ram',
    title: 'RAM Metrics',
    metrics: [
      {
        id: 'mem-avail',
        label: 'node_memory_MemAvailable_bytes',
        enabled: false,
      },
    ],
  },
]

describe('Organisms/MetricSelector', () => {
  describe('Render', () => {
    it('renders selector title', () => {
      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
        />
      )

      expect(
        screen.getByText('Show metrics affected by anomaly')
      ).toBeInTheDocument()
    })

    it('renders metric groups', () => {
      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
        />
      )

      expect(screen.getByText('CPU Metrics')).toBeInTheDocument()
      expect(screen.getByText('RAM Metrics')).toBeInTheDocument()
    })

    it('renders metrics inside groups', () => {
      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
        />
      )

      fireEvent.click(screen.getByText('CPU Metrics'))
      fireEvent.click(screen.getByText('RAM Metrics'))

      expect(
        screen.getByText('node_cpu_seconds')
      ).toBeInTheDocument()

      expect(
        screen.getByText('node_cpu_seconds_total')
      ).toBeInTheDocument()

      expect(
        screen.getByText('node_memory_MemAvailable_bytes')
      ).toBeInTheDocument()
    })

    it('renders switches', () => {
      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
        />
      )

      const switches = screen.getAllByRole('switch')

      expect(switches.length).toBeGreaterThan(0)
    })
  })

  describe('Interactions', () => {
    it('calls onToggleEnabled when main switch changes', () => {
      const onToggleEnabled = jest.fn()

      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
          onToggleEnabled={onToggleEnabled}
        />
      )

      const switches = screen.getAllByRole('switch')

      fireEvent.click(switches[0])

      expect(onToggleEnabled).toHaveBeenCalled()
    })

    it('calls onMetricToggle when metric switch changes', () => {
      const onMetricToggle = jest.fn()

      renderWithTheme(
        <MetricSelector
          groups={mockGroups}
          onMetricToggle={onMetricToggle}
        />
      )

      fireEvent.click(screen.getByText('CPU Metrics'))

      const switches = screen.getAllByRole('switch')

      fireEvent.click(switches[1])

      expect(onMetricToggle).toHaveBeenCalled()
    })
  })
})