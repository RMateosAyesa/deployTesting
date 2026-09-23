import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Input } from './Input'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Input', () => {
  describe('Render', () => {
    it('renders input', () => {
      renderWithTheme(<Input placeholder="Test placeholder" />)
      const input = screen.getByPlaceholderText('Test placeholder')
      expect(input).toBeInTheDocument()
    })

    it('renders with error state', () => {
      renderWithTheme(<Input placeholder="Error" hasError />)
      const input = screen.getByPlaceholderText('Error')
      expect(input).toBeInTheDocument()
    })

    it('renders full width', () => {
      renderWithTheme(<Input placeholder="Full width" fullWidth />)
      const input = screen.getByPlaceholderText('Full width')
      expect(input).toBeInTheDocument()
    })
  })
})
