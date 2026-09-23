import { render, screen, fireEvent } from '@testing-library/react'
import { SwitchButton } from './SwitchButton'

describe('Toggle', () => {
  it('renders correctly', () => {
    render(<SwitchButton />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('is unchecked by default', () => {
    render(<SwitchButton />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
  })

  it('can be checked', () => {
    render(<SwitchButton checked />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn()
    render(<SwitchButton onChange={handleChange} />)

    const switchElement = screen.getByRole('switch')
    fireEvent.click(switchElement)

    expect(handleChange).toHaveBeenCalled()
  })

  it('is disabled when prop is set', () => {
    render(<SwitchButton disabled />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).toBeDisabled()
  })
})