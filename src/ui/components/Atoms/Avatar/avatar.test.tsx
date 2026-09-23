import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Avatar } from './avatar'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Avatar', () => {
  describe('Render', () => {

    it('renders up to 3 initials', () => {
      renderWithTheme(<Avatar name="Test Optima Dones" />)
      expect(screen.getByText('TOD')).toBeInTheDocument()
    })

    it('renders initials correctly', () => {
      renderWithTheme(<Avatar name="Optima Dones" />)
      expect(screen.getByText('OD')).toBeInTheDocument()
    })

    it('renders single word correctly', () => {
      renderWithTheme(<Avatar name="Optima" />)
      expect(screen.getByText('O')).toBeInTheDocument()
    })
  })
})
