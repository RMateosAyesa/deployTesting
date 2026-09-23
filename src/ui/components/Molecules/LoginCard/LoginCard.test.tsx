import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LoginCard } from './LoginCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/LoginCard', () => {
  describe('Render', () => {
    it('renders login card content', () => {
      renderWithTheme(<LoginCard />)

      expect(screen.getByRole('form', { name: /operator login/i })).toBeInTheDocument()
      expect(screen.getByAltText('Optima Dones')).toBeInTheDocument()
      expect(screen.getByText('Operator identity')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('email@optima-dones.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Access' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Forgot password?' })).toBeInTheDocument()
      expect(screen.getByText('Authorized Personnel Only')).toBeInTheDocument()
      expect(screen.getByText(/v0\.0\.1\s+•\s+Secured Environment/)).toBeInTheDocument()
    })
  })
})
