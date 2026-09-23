import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Progress } from './Progress'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Progress', () => {
  describe('Render', () => {
    it('renders progress with default props', () => {
      renderWithTheme(<Progress percent={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders progress with grey track', () => {
      renderWithTheme(<Progress percent={30} track="grey" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders progress with black track', () => {
      renderWithTheme(<Progress percent={70} track="black" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders progress with fixed color', () => {
      renderWithTheme(<Progress percent={60} colorMode="fixed" fixedColor="cpu" />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })
})
