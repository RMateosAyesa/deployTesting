import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { ActiveAnomalyRow } from './ActiveAnomalyRow'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/ActiveAnomalyRow', () => {
  describe('Render', () => {
    it('renders "None" when no data is provided', () => {
      renderWithTheme(<ActiveAnomalyRow />)
      expect(screen.getByText('None')).toBeInTheDocument()
    })

  it('renders network anomaly with icon and text', () => {
    renderWithTheme(
      <ActiveAnomalyRow
        data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }}
      />
    )
    expect(screen.getByText('IOC service restart')).toBeInTheDocument()
  })

  it('renders resource anomaly with icon and text', () => {
    renderWithTheme(
      <ActiveAnomalyRow
        data={{ type: 'resource', optionValue: 'cpu_hog', status: 'scheduled', scheduledDate: '2026-05-01' }}
      />
    )
    expect(screen.getByText('CPU hog (CPU burn)')).toBeInTheDocument()
  })

  it('renders disk anomaly with icon and text', () => {
    renderWithTheme(
      <ActiveAnomalyRow
        data={{ type: 'disk', optionValue: 'disk_fill', status: 'running' }}
      />
    )
    expect(screen.getByText('Disk fill')).toBeInTheDocument()
  })

    it('renders running status badge', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }}
        />
      )
      expect(screen.getByText('Running')).toBeInTheDocument()
    })

    it('renders scheduled status badge', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'scheduled' }}
        />
      )
      expect(screen.getByText('Scheduled')).toBeInTheDocument()
    })

    it('renders scheduled date when status is scheduled', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'scheduled', scheduledDate: '2026-05-01 10:00' }}
        />
      )
      expect(screen.getByText('Fri. 1 - 10:00')).toBeInTheDocument()
    })

    it('renders Stop anomaly button when status is running', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }}
        />
      )
      expect(screen.getByText('Stop anomaly')).toBeInTheDocument()
    })

    it('renders Run now, Edit and Cancel buttons when status is scheduled', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'scheduled' }}
        />
      )
      expect(screen.getByText('Run now')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('does not render scheduled date when status is running', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'running' }}
        />
      )
      expect(screen.queryByText('2026-05-01')).not.toBeInTheDocument()
    })

    it('does not render Stop anomaly button when status is scheduled', () => {
      renderWithTheme(
        <ActiveAnomalyRow
          data={{ type: 'network', optionValue: 'ioc_service_restart', status: 'scheduled' }}
        />
      )
      expect(screen.queryByText('Stop anomaly')).not.toBeInTheDocument()
    })
  })
})
