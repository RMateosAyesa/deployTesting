import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DatePicker } from './DatePicker'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/DatePicker', () => {
  describe('Render', () => {
    it('renders date picker', () => {
      renderWithTheme(<DatePicker placeholder="Select date" />)
      const datePicker = screen.getByPlaceholderText('Select date')
      expect(datePicker).toBeInTheDocument()
    })

    it('renders with error state', () => {
      renderWithTheme(<DatePicker placeholder="Error" hasError />)
      const datePicker = screen.getByPlaceholderText('Error')
      expect(datePicker).toBeInTheDocument()
    })

    it('renders full width', () => {
      renderWithTheme(<DatePicker placeholder="Full width" fullWidth />)
      const datePicker = screen.getByPlaceholderText('Full width')
      expect(datePicker).toBeInTheDocument()
    })
  })
})