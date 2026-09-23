import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Label } from './Label'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Label', () => {
  describe('Render', () => {
    it('renders label text', () => {
      renderWithTheme(<Label text="Test label" />)
      expect(screen.getByText('Test label')).toBeInTheDocument()
    })

    it('renders required label', () => {
      renderWithTheme(<Label text="Required" required />)
      expect(screen.getByText('Required')).toBeInTheDocument()
    })

  })
})
