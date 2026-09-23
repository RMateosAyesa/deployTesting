import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { RangeSlider } from './RangeSlider'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/RangeSlider', () => {
  it('renders slider and input by default', () => {
    renderWithTheme(<RangeSlider defaultValue={40} />)

    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders with correct value in both slider and input', () => {
    renderWithTheme(<RangeSlider value={30} />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
    expect(screen.getByRole('spinbutton')).toHaveValue('30')
  })

  it('hides input when showInput is false', () => {
    renderWithTheme(<RangeSlider defaultValue={40} showInput={false} />)

    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
  })

  it('can be disabled', () => {
    renderWithTheme(<RangeSlider defaultValue={50} disabled />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('spinbutton')).toBeDisabled()
  })
})