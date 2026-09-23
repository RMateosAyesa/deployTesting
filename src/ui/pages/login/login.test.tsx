import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles/theme'
import { LoginPage } from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Pages/LoginPage', () => {
  describe('Render', () => {
    it('renders the login template content', () => {
      renderWithTheme(<LoginPage />)

      expect(screen.getByRole('main', { name: 'Login page' })).toBeInTheDocument()
      expect(screen.getByRole('form', { name: /operator login/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Access' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Forgot password?' })).toBeInTheDocument()
    })

    it('updates login field values', () => {
      renderWithTheme(<LoginPage />)

      const emailInput = screen.getByPlaceholderText('email@optima-dones.com') as HTMLInputElement
      const passwordInput = screen.getByPlaceholderText('********') as HTMLInputElement

      fireEvent.change(emailInput, { target: { value: 'operator@optima-dones.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })

      expect(emailInput).toHaveValue('operator@optima-dones.com')
      expect(passwordInput).toHaveValue('password')
    })

    it('submits login credentials through the login action', async () => {
      const onLogin = jest.fn().mockResolvedValue({
        token: 'token',
        operatorEmail: 'operator@optima-dones.com',
      })

      renderWithTheme(<LoginPage onLogin={onLogin} />)

      fireEvent.change(screen.getByPlaceholderText('email@optima-dones.com'), {
        target: { value: 'operator@optima-dones.com' },
      })
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'password' },
      })
      fireEvent.submit(screen.getByRole('form', { name: /operator login/i }))

      await waitFor(() => {
        expect(onLogin).toHaveBeenCalledWith({
          email: 'operator@optima-dones.com',
          password: 'password',
        })
      })
    })

    it('requests password reset with the current email', async () => {
      const onForgotPassword = jest.fn().mockResolvedValue(undefined)

      renderWithTheme(<LoginPage onForgotPassword={onForgotPassword} />)

      fireEvent.change(screen.getByPlaceholderText('email@optima-dones.com'), {
        target: { value: 'operator@optima-dones.com' },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Forgot password?' }))

      await waitFor(() => {
        expect(onForgotPassword).toHaveBeenCalledWith('operator@optima-dones.com')
      })
    })
  })
})
