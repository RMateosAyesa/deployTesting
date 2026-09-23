import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { MetricCard } from './MetricCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/MetricCard', () => {
  describe('Render', () => {
    it('renders metric card with icon and progress percent', () => {
      renderWithTheme(
        <MetricCard iconName="cpu" progressPercent={85} />
      )
      expect(screen.getByRole('heading', { name: '85%' })).toBeInTheDocument()
    })

    it('renders metric card with icon text', () => {
      renderWithTheme(
        <MetricCard iconName="cpu" iconText="CPU" progressPercent={50} />
      )
      expect(screen.getByText('CPU')).toBeInTheDocument()
    })

    it('renders metric card with select', () => {
      renderWithTheme(
        <MetricCard
          iconName="memory"
          progressPercent={62}
          selectOptions={[
            { value: '1h', label: 'Last 1 hour' },
            { value: '24h', label: 'Last 24 hours' },
          ]}
          selectValue="24h"
        />
      )
      expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
    })

    it('renders metric card with progress bar', () => {
      renderWithTheme(
        <MetricCard iconName="disc" progressPercent={75} />
      )
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders metric card with filled variant', () => {
      renderWithTheme(
        <MetricCard
          iconName="globe"
          progressPercent={40}
          variant="filled"
        />
      )
      expect(screen.getByRole('heading', { name: '40%' })).toBeInTheDocument()
    })

    it('renders metric card with background high', () => {
      renderWithTheme(
        <MetricCard
          iconName="cpu"
          progressPercent={70}
          background="high"
        />
      )
      expect(screen.getByRole('heading', { name: '70%' })).toBeInTheDocument()
    })

    it('renders metric card with padding none', () => {
      renderWithTheme(
        <MetricCard
          iconName="memory"
          progressPercent={30}
          padding="none"
        />
      )
      expect(screen.getByRole('heading', { name: '30%' })).toBeInTheDocument()
    })

    it('renders metric card with network metric type without progress bar', () => {
      renderWithTheme(
        <MetricCard
          iconName="cellTower"
          iconText="Network"
          progressPercent={95}
          metricType="network"
        />
      )
      expect(screen.getByRole('heading', { name: '95 Mbps' })).toBeInTheDocument()
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    it('renders metric card with cpu metric type with percent symbol', () => {
      renderWithTheme(
        <MetricCard
          iconName="cpu"
          progressPercent={85}
          metricType="cpu"
        />
      )
      expect(screen.getByRole('heading', { name: '85%' })).toBeInTheDocument()
    })
  })
})