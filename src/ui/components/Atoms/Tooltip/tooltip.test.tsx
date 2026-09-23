import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Tooltip } from './tooltip'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Tooltip', () => {
  describe('Render', () => {
    it('renders children', () => {
      renderWithTheme(<Tooltip title="Tooltip text"><button>Hover me</button></Tooltip>)
      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('renders with title', () => {
      renderWithTheme(<Tooltip title="Tooltip text"><span>Test</span></Tooltip>)
      const children = screen.getByText('Test')
      expect(children).toBeInTheDocument()
    })
  })
})