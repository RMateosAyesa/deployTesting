import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Button } from './button'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Button', () => {
  describe('Render', () => {
    it('renders button with children', () => {
      renderWithTheme(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('renders with variant solid', () => {
      renderWithTheme(<Button variant="solid">Solid</Button>)
      expect(screen.getByText('Solid')).toBeInTheDocument()
    })

    it('renders with variant outlined', () => {
      renderWithTheme(<Button variant="outlined">Outlined</Button>)
      expect(screen.getByText('Outlined')).toBeInTheDocument()
    })

    it('renders with variant filled', () => {
      renderWithTheme(<Button variant="filled">Filled</Button>)
      expect(screen.getByText('Filled')).toBeInTheDocument()
    })

    it('renders with variant text', () => {
      renderWithTheme(<Button variant="text">Text</Button>)
      expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('renders with icon', () => {
      renderWithTheme(
        <Button variant="filled" iconName="arrowUUpLeft" aria-label="Go back" />
      )
      expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()
    })
  })
})
