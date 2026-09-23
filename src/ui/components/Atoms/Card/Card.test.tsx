import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Card } from './Card'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Card', () => {
  describe('Render', () => {
    it('renders card with default props', () => {
      renderWithTheme(<Card>Card Content</Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('renders card with padding none', () => {
      renderWithTheme(<Card padding="none">No Padding</Card>)
      expect(screen.getByText('No Padding')).toBeInTheDocument()
    })

    it('renders card with padding xl', () => {
      renderWithTheme(<Card padding="xl">XL Padding</Card>)
      expect(screen.getByText('XL Padding')).toBeInTheDocument()
    })

    it('renders card with background high', () => {
      renderWithTheme(<Card background="high">High Background</Card>)
      expect(screen.getByText('High Background')).toBeInTheDocument()
    })

    it('renders card with variant filled', () => {
      renderWithTheme(<Card variant="filled">Filled Card</Card>)
      expect(screen.getByText('Filled Card')).toBeInTheDocument()
    })

    it('renders card with filled and background high', () => {
      renderWithTheme(<Card variant="filled" background="high">Filled High</Card>)
      expect(screen.getByText('Filled High')).toBeInTheDocument()
    })
  })
})