import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { AnomalyOption } from './AnomalyOption'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const mockModalData = {
  nodeName: 'server-prod-01',
  metrics: ['CPU usage', 'Memory consumption'],
}

describe('Molecules/AnomalyOption', () => {
  describe('Render', () => {
    it('renders network anomaly option with correct icon and text', () => {
      renderWithTheme(
        <AnomalyOption
          type="network"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Network / Connectivity')).toBeInTheDocument()
    })

    it('renders resource consumption anomaly option with correct icon and text', () => {
      renderWithTheme(
        <AnomalyOption
          type="resource"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Resource Consumption')).toBeInTheDocument()
    })

    it('renders disk I/O anomaly option with correct icon and text', () => {
      renderWithTheme(
        <AnomalyOption
          type="disk"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Disk I/O')).toBeInTheDocument()
    })

    it('renders all option buttons for network', () => {
      renderWithTheme(
        <AnomalyOption
          type="network"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Network interface disconnection')).toBeInTheDocument()
      expect(screen.getByText('IOC service restart')).toBeInTheDocument()
      expect(screen.getByText('Full server reboot')).toBeInTheDocument()
    })

    it('renders all option buttons for resource', () => {
      renderWithTheme(
        <AnomalyOption
          type="resource"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Progressive memory leak')).toBeInTheDocument()
      expect(screen.getByText('CPU hog (CPU burn)')).toBeInTheDocument()
      expect(screen.getByText('Fork bomb / zombie processes')).toBeInTheDocument()
      expect(screen.getByText('File description leak')).toBeInTheDocument()
      expect(screen.getByText('TCP connection saturation')).toBeInTheDocument()
    })

    it('renders all option buttons for disk', () => {
      renderWithTheme(
        <AnomalyOption
          type="disk"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Log flooding (massive disk writes)')).toBeInTheDocument()
      expect(screen.getByText('Disk fill')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('calls onChange when button is clicked', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <AnomalyOption
          type="network"
          onChange={onChange}
        />
      )
      screen.getByText('Network interface disconnection').click()
      expect(onChange).toHaveBeenCalledWith('network_interface_disconnection')
    })

    it('calls onChange with correct value for disk option', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <AnomalyOption
          type="disk"
          onChange={onChange}
        />
      )
      screen.getByText('Disk fill').click()
      expect(onChange).toHaveBeenCalledWith('disk_fill')
    })
  })

  describe('Modal integration', () => {
    it('opens modal when button is clicked and modalData is provided', async () => {
      renderWithTheme(
        <AnomalyOption
          type="network"
          onChange={() => {}}
          modalData={mockModalData}
        />
      )
      fireEvent.click(screen.getByText('Network interface disconnection'))
      await waitFor(() => {
        expect(screen.getByText(/The network interface has unexpectedly disconnected/i)).toBeInTheDocument()
      })
    })

    it('calls onModalOpenChange when modal is closed', async () => {
      const onModalOpenChange = jest.fn()
      renderWithTheme(
        <AnomalyOption
          type="network"
          onChange={() => {}}
          modalData={mockModalData}
          modalOpen={true}
          modalSelectedOption="network_interface_disconnection"
          onModalOpenChange={onModalOpenChange}
        />
      )
      await waitFor(() => {
        expect(screen.getByText(/The network interface has unexpectedly disconnected/i)).toBeInTheDocument()
      })
      const closeButtons = document.querySelectorAll('.ant-modal-close')
      expect(closeButtons.length).toBeGreaterThan(0)
      fireEvent.click(closeButtons[0])
      expect(onModalOpenChange).toHaveBeenCalledWith(false, 'network_interface_disconnection')
    })
  })
})
