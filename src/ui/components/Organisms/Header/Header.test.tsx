import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Header } from './Header'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/Header', () => {
  describe('Render', () => {
    it('renders header with logo', () => {
      renderWithTheme(<Header />)
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })

    it('renders wifi icon', () => {
      renderWithTheme(<Header />)
      const icons = screen.getAllByRole('img')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('renders avatar', () => {
      renderWithTheme(<Header />)
      expect(screen.getByText('OD')).toBeInTheDocument()
    })
  })
})
