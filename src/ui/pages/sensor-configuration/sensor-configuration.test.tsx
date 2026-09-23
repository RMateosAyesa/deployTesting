import type React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles/theme'
import { SensorConfigurationPage } from './index'
import { sensorConfigurationData } from './sensor-configuration.service'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const clickButtonByText = (text: string) => {
  const button = screen.getByText(text).closest('button')
  expect(button).toBeInTheDocument()
  fireEvent.click(button as HTMLButtonElement)
}

describe('Pages/SensorConfigurationPage', () => {
  describe('Render', () => {
    it('renders the sensor configuration template content', () => {
      renderWithTheme(<SensorConfigurationPage />)

      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Sensor configuration' })).toBeInTheDocument()
      expect(screen.getByText('Temperature #1 Sensor [ID: 04]')).toBeInTheDocument()
      expect(screen.getByText('Identity & Meta')).toBeInTheDocument()
      expect(screen.getByText('Baseline modeling')).toBeInTheDocument()
      expect(screen.getByText('Event injections')).toBeInTheDocument()
      expect(screen.getByDisplayValue('DONES-Li:Purif:HT1-T-In')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Simulation name #1')).toBeInTheDocument()
    })

    it('shows historical log entries when the historical tab is selected', () => {
      renderWithTheme(<SensorConfigurationPage />)

      fireEvent.click(screen.getByText('Historical log'))

      expect(screen.getByText('Clear all log entries')).toBeInTheDocument()
      expect(screen.getByText('Drift Simulation #11')).toBeInTheDocument()
      expect(screen.getByText('Noise Simulation #33')).toBeInTheDocument()
    })

    it('calls page actions from form controls', () => {
      const onBack = jest.fn()
      const onAddEvent = jest.fn()
      const onRemoveEvent = jest.fn()
      const onSaveConfiguration = jest.fn()
      const onClearHistoricalLogEntries = jest.fn()

      renderWithTheme(
        <SensorConfigurationPage
          onBack={onBack}
          onAddEvent={onAddEvent}
          onRemoveEvent={onRemoveEvent}
          onSaveConfiguration={onSaveConfiguration}
          onClearHistoricalLogEntries={onClearHistoricalLogEntries}
        />
      )

      fireEvent.click(screen.getByLabelText('Go back'))
      clickButtonByText('Add event')
      fireEvent.click(screen.getByLabelText('Remove Simulation name #1'))
      clickButtonByText('Save configuration')
      fireEvent.click(screen.getByText('Historical log'))
      clickButtonByText('Clear all log entries')

      expect(onBack).toHaveBeenCalledTimes(1)
      expect(onAddEvent).toHaveBeenCalledTimes(1)
      expect(onRemoveEvent).toHaveBeenCalledWith('1')
      expect(onSaveConfiguration).toHaveBeenCalledWith(sensorConfigurationData)
      expect(onClearHistoricalLogEntries).toHaveBeenCalledTimes(1)
    })
  })
})
