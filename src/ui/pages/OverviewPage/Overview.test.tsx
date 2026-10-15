import type React from 'react'
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import type { HostMetricValue } from '../../../host-metrics/domain/entities/host-metric.entity'
import {
  HostMetricSubtype,
  HostMetricType,
  OverviewMetricsTimeRange,
} from '../../../host-metrics/domain/enums'
import { theme } from '../../../styles/theme'

jest.mock('../../../host-metrics/dependencies/use-cases.deps', () => ({
  getOverviewMetrics: { execute: jest.fn() },
}))

import { OverviewPage, type OverviewPageProps } from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

const pendingFetch = jest.fn(
  () => new Promise<HostMetricValue[]>(() => undefined),
)

const renderOverview = (props: OverviewPageProps = {}) =>
  renderWithTheme(
    <OverviewPage onFetchOverviewMetrics={pendingFetch} {...props} />,
  )

async function flushMicrotasks(): Promise<void> {
  await act(async () => {
    await Promise.resolve()
  })
}

describe('Pages/OverviewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Render', () => {
    it('renders overview content', () => {
      renderOverview()

      expect(
        screen.getByRole('heading', {
          name: 'Lithium Server Overview',
        })
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'View real-time performance metrics for each host server'
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText('Host Server — Node 01')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Host Server — Node 02')
      ).toBeInTheDocument()
    })

    it('opens metric selector when clicking add more metrics', () => {
      renderOverview()

      fireEvent.click(
        screen.getAllByRole('button', {
          name: /add more metrics/i,
        })[0]
      )

      expect(
        screen.getByText(/cpu metrics/i)
      ).toBeInTheDocument()
    })

    it('closes metric selector when clicking add more metrics again', () => {
      renderOverview()

      const button = screen.getAllByRole('button', {
        name: /add more metrics/i,
      })[0]

      fireEvent.click(button)
      expect(screen.getByText(/cpu metrics/i)).toBeInTheDocument()

      fireEvent.click(button)
      expect(screen.queryByText(/cpu metrics/i)).not.toBeInTheDocument()
    })

    it('shows only one cylinder at a time and allows closing the active cylinder', () => {
      renderOverview()

      expect(screen.getAllByTestId(/^ioc-card-node-01-cylinder-1-/)).toHaveLength(12)
      expect(screen.queryAllByTestId(/^ioc-card-node-01-cylinder-2-/)).toHaveLength(0)
      expect(screen.queryAllByTestId(/^ioc-card-node-01-cylinder-3-/)).toHaveLength(0)

      for (const cylinder of [2, 3]) {
        const button = screen.getByRole('button', { name: new RegExp(`show cylinder ${cylinder}`, 'i') })
        expect(button).toHaveTextContent('12')
        fireEvent.click(button)
        expect(button).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getAllByTestId(/^ioc-card-node-01-cylinder-/)).toHaveLength(12)
        expect(screen.getByRole('button', { name: new RegExp(`show cylinder ${cylinder - 1}`, 'i') })).toHaveAttribute('aria-expanded', 'false')
        expect(screen.getAllByTestId(new RegExp(`^ioc-card-node-01-cylinder-${cylinder}-`))).toHaveLength(12)
      }

      fireEvent.click(screen.getByRole('button', { name: /hide cylinder 3/i }))
      expect(screen.queryAllByTestId(/^ioc-card-node-01-cylinder-1-/)).toHaveLength(0)
      expect(screen.queryAllByTestId(/^ioc-card-node-01-cylinder-/)).toHaveLength(0)

      fireEvent.click(screen.getByRole('button', { name: /show cylinder 1/i }))
      expect(screen.getAllByTestId(/^ioc-card-node-01-cylinder-1-/)).toHaveLength(12)
    })

    it('loads realtime metrics and maps them to the overview UI', async () => {
      const metrics: HostMetricValue[] = [
        {
          type: HostMetricType.CPU,
          subtype: HostMetricSubtype.CPU_USAGE_USER,
          value: 42,
          timestamp: Date.UTC(2026, 8, 22, 10, 30) / 1000,
          visibleName: 'CPU usage user',
        },
      ]
      const onFetchOverviewMetrics = jest.fn().mockResolvedValue(metrics)

      renderOverview({ onFetchOverviewMetrics })
      await flushMicrotasks()

      expect(onFetchOverviewMetrics).toHaveBeenCalledTimes(1)
      expect(onFetchOverviewMetrics).toHaveBeenCalledWith(
        OverviewMetricsTimeRange.REALTIME,
      )
      expect(
        within(screen.getByTestId('metric-card-node-01-cpu')).getByRole(
          'heading',
          { name: '42%' },
        ),
      ).toBeInTheDocument()
    })

    it('reloads metrics when the time range changes', async () => {
      const onFetchOverviewMetrics = jest.fn().mockResolvedValue([])

      renderOverview({ onFetchOverviewMetrics })

      await waitFor(() => {
        expect(onFetchOverviewMetrics).toHaveBeenCalledWith(
          OverviewMetricsTimeRange.REALTIME,
        )
      })

      fireEvent.mouseDown(screen.getAllByRole('combobox')[0])
      fireEvent.click(await screen.findByText('Last hour'))

      await waitFor(() => {
        expect(onFetchOverviewMetrics).toHaveBeenLastCalledWith(
          OverviewMetricsTimeRange.LAST_HOUR,
        )
      })
    })

    it('shows placeholders when no metrics have been loaded yet', () => {
      renderOverview()

      expect(
        within(screen.getByTestId('metric-card-node-01-cpu')).getByRole(
          'heading',
          { name: '0%' },
        ),
      ).toBeInTheDocument()
    })
  })
})