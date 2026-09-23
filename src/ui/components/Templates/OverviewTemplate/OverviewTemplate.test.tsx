
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { OverviewTemplate } from './OverviewTemplate'

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
  ],
  activeId: 'overview',
}

const mockChartData = [
  { time: '0:00', value: 20 },
  { time: '4:00', value: 40 },
]

const defaultProps = {
  sidebar,
  title: 'Lithium Server Overview',
  description: 'View real-time performance metrics.',
  nodes: [
    {
      id: 'node-01',
      title: 'Host Server — Node 01',
      metrics: [
        {
          metricCardProps: {
            iconName: 'cpu' as const,
            iconText: 'CPU usage',
            progressPercent: 21.62,
            metricType: 'cpu' as const,
          },
          chartData: mockChartData,
          metric: 'cpu' as const,
        },
        {
          metricCardProps: {
            iconName: 'memory' as const,
            iconText: 'RAM usage',
            progressPercent: 99,
            metricType: 'ram' as const,
          },
          chartData: mockChartData,
          metric: 'ram' as const,
        },
      ]
    },
  ],
}

describe('Templates/OverviewTemplate', () => {
  describe('Render', () => {
    it('renders the title', () => {
      renderWithTheme(<OverviewTemplate {...defaultProps} />)

      expect(
        screen.getByText('Lithium Server Overview')
      ).toBeInTheDocument()
    })

    it('renders node title correctly inside accordion', () => {
      renderWithTheme(<OverviewTemplate {...defaultProps} />)

      expect(
        screen.getByText('Host Server — Node 01')
      ).toBeInTheDocument()
    })

    it('renders metrics values correctly', () => {
      renderWithTheme(<OverviewTemplate {...defaultProps} />)

      expect(screen.getByRole('heading', { name: '21.62%' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: '99%' })).toBeInTheDocument()
    })

    it('renders action buttons', () => {
      renderWithTheme(<OverviewTemplate {...defaultProps} />)

      expect(
        screen.getByRole('button', { name: /add more metrics/i })
      ).toBeInTheDocument()

      expect(
        screen.getByText(/show ioc performance/i)
      ).toBeInTheDocument()
    })
  })
})