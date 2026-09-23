import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { MetricItem } from './MetricItem'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sampleChartData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 35 },
]

const defaultMetricCardProps = {
  iconName: 'cpu' as const,
  iconText: 'CPU',
  progressPercent: 62,
}

describe('Molecules/MetricItem', () => {
  describe('Render', () => {
    it('renders metric item with metric card and line chart', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={defaultMetricCardProps}
          chartData={sampleChartData}
          metric="cpu"
        />
      )
      expect(screen.getByText('CPU')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: '62%' })).toBeInTheDocument()
    })

    it('accepts hidden chart dots', () => {
      const { container } = renderWithTheme(
        <MetricItem
          metricCardProps={defaultMetricCardProps}
          chartData={sampleChartData}
          metric="cpu"
          showDots={false}
        />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders metric item with select in metric card', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={{
            ...defaultMetricCardProps,
            selectOptions: [
              { value: '1h', label: 'Last 1 hour' },
              { value: '24h', label: 'Last 24 hours' },
            ],
            selectValue: '24h',
          }}
          chartData={sampleChartData}
          metric="cpu"
        />
      )
      expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
    })

    it('renders metric item with different metrics', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={{
            iconName: 'memory',
            iconText: 'Memory',
            progressPercent: 45,
          }}
          chartData={sampleChartData}
          metric="ram"
        />
      )
      expect(screen.getByText('Memory')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: '45%' })).toBeInTheDocument()
    })

    it('renders metric item with background high', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={defaultMetricCardProps}
          chartData={sampleChartData}
          metric="cpu"
          background="high"
        />
      )
      expect(screen.getByText('CPU')).toBeInTheDocument()
    })

    it('renders metric item with padding none', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={defaultMetricCardProps}
          chartData={sampleChartData}
          metric="cpu"
          padding="none"
        />
      )
      expect(screen.getByRole('heading', { name: '62%' })).toBeInTheDocument()
    })

    it('renders metric item with network metric without progress bar', () => {
      renderWithTheme(
        <MetricItem
          metricCardProps={{
            iconName: 'cellTower',
            iconText: 'Network',
            progressPercent: 95,
            metricType: 'network',
          }}
          chartData={sampleChartData}
          metric="network"
        />
      )
      expect(screen.getByRole('heading', { name: '95 Mbps' })).toBeInTheDocument()
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
})
