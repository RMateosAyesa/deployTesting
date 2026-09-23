import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { AnomalyModal } from './AnomalyModal'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const mockData = {
  nodeName: 'server-prod-01',
  metrics: ['CPU usage', 'Memory consumption'],
}

describe('Organisms/AnomalyModal', () => {
  describe('Render', () => {
    it('renders modal with network anomaly header', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('Network interface disconnection')).toBeInTheDocument()
    })

    it('renders modal with resource anomaly header', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="resource" selectedOption="progressive_memory_leak" data={mockData} />
      )
      expect(screen.getByText('Progressive memory leak')).toBeInTheDocument()
    })

    it('renders modal with disk anomaly header', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="disk" selectedOption="disk_fill" data={mockData} />
      )
      expect(screen.getByText('Disk fill')).toBeInTheDocument()
    })

    it('renders description text for the anomaly', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(
        screen.getByText(/The network interface has unexpectedly disconnected/i)
      ).toBeInTheDocument()
    })

    it('renders affected node name', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('server-prod-01')).toBeInTheDocument()
    })

    it('renders affected metrics', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('CPU usage; Memory consumption')).toBeInTheDocument()
    })

    it('renders all three radio options', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('Run now')).toBeInTheDocument()
      expect(screen.getByText('Run in a few minutes')).toBeInTheDocument()
      expect(screen.getByText('Schedule date and time')).toBeInTheDocument()
    })

    it('renders all radio cards with their inputs', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('Run now')).toBeInTheDocument()
      expect(screen.getByText('Run in a few minutes')).toBeInTheDocument()
      expect(screen.getByText('Schedule date and time')).toBeInTheDocument()
    })

    it('renders with default mode "runNow" selected', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      const runNowRadio = screen.getByText('Run now').closest('.ant-radio-wrapper')
      expect(runNowRadio).toHaveClass('ant-radio-wrapper-checked')
    })

    it('renders Accept anomaly button', () => {
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} />
      )
      expect(screen.getByText('Accept anomaly')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('calls onFormModeChange when radio is selected', () => {
      const onFormModeChange = jest.fn()
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} onFormModeChange={onFormModeChange} />
      )
      const minutesRadio = screen.getByText('Run in a few minutes').closest('.ant-radio-wrapper')
      fireEvent.click(minutesRadio as HTMLElement)
      expect(onFormModeChange).toHaveBeenCalledWith('runInMinutes')
    })

    it('calls onRangeChange when slider changes', () => {
      const onRangeChange = jest.fn()
      renderWithTheme(
        <AnomalyModal open anomalyType="network" selectedOption="network_interface_disconnection" data={mockData} onRangeChange={onRangeChange} />
      )
      expect(onRangeChange).toBeDefined()
    })

    it('calls onAccept with runNow mode and text payload', () => {
      const onAccept = jest.fn()
      renderWithTheme(
        <AnomalyModal
          open
          anomalyType="network"
          selectedOption="network_interface_disconnection"
          data={mockData}
          onAccept={onAccept}
        />
      )
      const acceptButton = screen.getByText('Accept anomaly')
      fireEvent.click(acceptButton)
      expect(onAccept).toHaveBeenCalledWith('runNow', {})
    })

    it('calls onAccept with runInMinutes mode and minutes payload', () => {
      const onAccept = jest.fn()
      renderWithTheme(
        <AnomalyModal
          open
          anomalyType="network"
          selectedOption="network_interface_disconnection"
          data={mockData}
          onAccept={onAccept}
          formMode="runInMinutes"
          rangeValue={30}
        />
      )
      const acceptButton = screen.getByText('Accept anomaly')
      fireEvent.click(acceptButton)
      expect(onAccept).toHaveBeenCalledWith('runInMinutes', { minutes: 30 })
    })

    it('calls onAccept with scheduleDateTime mode and date payload', () => {
      const onAccept = jest.fn()
      renderWithTheme(
        <AnomalyModal
          open
          anomalyType="network"
          selectedOption="network_interface_disconnection"
          data={mockData}
          onAccept={onAccept}
          formMode="scheduleDateTime"
          dateValue={null}
        />
      )
      const acceptButton = screen.getByText('Accept anomaly')
      fireEvent.click(acceptButton)
      expect(onAccept).toHaveBeenCalledWith('scheduleDateTime', { date: null })
    })

    it('calls onAccept when accept button is clicked', () => {
      const onAccept = jest.fn()
      renderWithTheme(
        <AnomalyModal
          open
          anomalyType="network"
          selectedOption="network_interface_disconnection"
          data={mockData}
          onAccept={onAccept}
        />
      )
      const acceptButton = screen.getByText('Accept anomaly')
      fireEvent.click(acceptButton)
      expect(onAccept).toHaveBeenCalled()
    })
  })
})
