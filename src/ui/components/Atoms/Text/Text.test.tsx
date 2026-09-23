import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Text } from './Text'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Text', () => {
  describe('Render', () => {
    it('renders default text', () => {
      renderWithTheme(<Text>Contenido</Text>)
      expect(screen.getByText('Contenido')).toBeInTheDocument()
    })

    it('renders h1 variant', () => {
      renderWithTheme(<Text variant="h1">Título</Text>)
      expect(screen.getByText('Título')).toBeInTheDocument()
    })

    it('renders h3 variant', () => {
      renderWithTheme(<Text variant="h3">Subtítulo</Text>)
      expect(screen.getByText('Subtítulo')).toBeInTheDocument()
    })

    it('renders bodyLarge variant', () => {
      renderWithTheme(<Text variant="bodyLarge">Texto grande</Text>)
      expect(screen.getByText('Texto grande')).toBeInTheDocument()
    })

    it('renders bodyMedium variant', () => {
      renderWithTheme(<Text variant="bodyMedium">Texto medio</Text>)
      expect(screen.getByText('Texto medio')).toBeInTheDocument()
    })

    it('renders with custom color', () => {
      renderWithTheme(<Text color="#FFBE31">Coloreado</Text>)
      const text = screen.getByText('Coloreado')
      expect(text).toBeInTheDocument()
      expect(text).toHaveStyle({ color: '#FFBE31' })
    })
  })
})
