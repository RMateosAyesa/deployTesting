import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { FormField } from './FormField'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/FormField', () => {
  describe('Render', () => {
    it('renders an input field variant', () => {
      renderWithTheme(
        <FormField
          label="Event name"
          variant="input"
          inputProps={{ placeholder: 'Event name' }}
        />
      )

      expect(screen.getByText('Event name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Event name')).toBeInTheDocument()
    })

    it('renders a select field variant', () => {
      renderWithTheme(
        <FormField
          label="Event type"
          variant="select"
          selectProps={{
            placeholder: 'Select type',
            options: [{ value: 'alert', label: 'Alert' }],
          }}
        />
      )

      expect(screen.getByText('Event type')).toBeInTheDocument()
      expect(screen.getByText('Select type')).toBeInTheDocument()
    })

    it('renders a date picker field variant', () => {
      renderWithTheme(
        <FormField
          label="Start time"
          variant="datePicker"
          datePickerProps={{ placeholder: 'Start time' }}
        />
      )

      expect(screen.getByText('Start time')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Start time')).toBeInTheDocument()
    })

    it('renders an error message', () => {
      renderWithTheme(
        <FormField
          label="Chance"
          variant="input"
          error="Chance must be between 0 and 100"
          inputProps={{ placeholder: 'Chance' }}
        />
      )

      expect(screen.getByText('Chance must be between 0 and 100')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Chance')).toHaveAttribute('aria-invalid', 'true')
    })

    it('renders a tooltip trigger when tooltip props are provided', () => {
      renderWithTheme(
        <FormField
          label="Event type"
          variant="select"
          tooltipProps={{ title: 'Select the event category' }}
          selectProps={{
            placeholder: 'Select type',
            options: [{ value: 'alert', label: 'Alert' }],
          }}
        />
      )

      expect(screen.getByRole('button', { name: /event type information/i })).toBeInTheDocument()
    })
  })
})
