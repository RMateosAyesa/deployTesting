import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { RadioButton } from './RadioButton'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/RadioButton', () => {
  it('renders radio with label', () => {
    renderWithTheme(<RadioButton label="Option 1" />)

    expect(screen.getByRole('radio')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('can be checked', () => {
    renderWithTheme(<RadioButton label="Option" checked />)

    const radio = screen.getByRole('radio') as HTMLInputElement
    expect(radio.checked).toBe(true)
  })

  it('can be disabled', () => {
    renderWithTheme(<RadioButton label="Option" disabled />)

    expect(screen.getByRole('radio')).toBeDisabled()
  })
})