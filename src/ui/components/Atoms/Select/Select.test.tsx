import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Select } from './Select'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Select', () => {
  describe('Render', () => {
    it('renders select with placeholder', () => {
      const options = [
        { value: '1', label: 'Opción 1' },
        { value: '2', label: 'Opción 2' },
      ]
      renderWithTheme(<Select placeholder="Selecciona" options={options} />)
      expect(screen.getByText('Selecciona')).toBeInTheDocument()
    })

    it('renders select with default value', () => {
      const options = [
        { value: 'option1', label: 'Opción 1' },
        { value: 'option2', label: 'Opción 2' },
      ]
      renderWithTheme(<Select defaultValue="option1" options={options} />)
      expect(screen.getByText('Opción 1')).toBeInTheDocument()
    })

    it('renders disabled select', () => {
      const options = [
        { value: '1', label: 'Opción 1' },
      ]
      renderWithTheme(<Select options={options} disabled />)
      expect(screen.getByRole('combobox')).toBeDisabled()
    })
  })
})