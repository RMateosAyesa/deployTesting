import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LoginTemplate } from './LoginTemplate'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Templates/LoginTemplate', () => {
  describe('Render', () => {
    it('renders the login page with the login card content', () => {
      renderWithTheme(<LoginTemplate />)

      expect(screen.getByRole('main', { name: 'Login page' })).toBeInTheDocument()
      expect(screen.getByRole('form', { name: /operator login/i })).toBeInTheDocument()
      expect(screen.getByAltText('Optima Dones')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('email@optima-dones.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Access' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Forgot password?' })).toBeInTheDocument()
    })
  })
})
