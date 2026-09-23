import type React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles/theme'
import { SensorDataConfigPage } from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Pages/SensorDataConfigPage', () => {
  describe('Render', () => {
    it('renders the sensor data config template content', () => {
      renderWithTheme(<SensorDataConfigPage />)

      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Sensor data config' })).toBeInTheDocument()
      expect(screen.getByText('Define how sensor values are generated to simulate system behavior under controlled conditions.')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Temperature #1' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Temperature #2' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Pressure #1' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Pressure #2' })).toBeInTheDocument()
    })

    it('calls sensor settings action when a card settings button is selected', () => {
      const onSensorSettingsOpen = jest.fn()

      renderWithTheme(<SensorDataConfigPage onSensorSettingsOpen={onSensorSettingsOpen} />)

      fireEvent.click(screen.getAllByRole('button', { name: 'Settings' })[0])

      expect(onSensorSettingsOpen).toHaveBeenCalledWith('Temperature #1')
    })
  })
})
