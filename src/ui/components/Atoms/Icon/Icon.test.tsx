import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { IconAtom } from './Icon'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Icon', () => {
  describe('Render', () => {
    it('renders icon', () => {
      renderWithTheme(<IconAtom name="globe" size="l" color="primary" />)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('renders with size l', () => {
      renderWithTheme(<IconAtom name="globe" size="l" color="primary"/>)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '20')
      expect(svg).toHaveAttribute('height', '20')
    })

    it('renders with size m', () => {
      renderWithTheme(<IconAtom name="globe" size="m" color="primary" />)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '18')
      expect(svg).toHaveAttribute('height', '18')
    })

    it('renders with primary color', () => {
      renderWithTheme(<IconAtom name="globe" size="l" color="primary" />)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('renders with secondary color', () => {
      renderWithTheme(<IconAtom name="globe" size="l" color="secondary" />)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })
})
