import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Badge } from './badge'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Badge', () => {
  describe('Render', () => {
    it('renders badge text', () => {
      renderWithTheme(<Badge text="Test badge" />)
      expect(screen.getByText('Test badge')).toBeInTheDocument()
    })

    it('renders with variant success', () => {
      renderWithTheme(<Badge text="Success" variant="success" />)
      expect(screen.getByText('Success')).toBeInTheDocument()
    })

    it('renders with variant warning', () => {
      renderWithTheme(<Badge text="Warning" variant="warning" />)
      expect(screen.getByText('Warning')).toBeInTheDocument()
    })
  })
})
