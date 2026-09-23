import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders correctly', () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')
    expect(divider).toBeInTheDocument()
  })

  it('is horizontal by default', () => {
    render(<Divider />)
    const divider = screen.getByRole('separator')

    expect(divider).toHaveStyle('height: 1px')
    expect(divider).toHaveStyle('width: 100%')
  })

  it('can be vertical', () => {
    render(<Divider orientation="vertical" />)
    const divider = screen.getByRole('separator')

    expect(divider).toHaveStyle('width: 1px')
  })

  it('applies custom length', () => {
    render(<Divider length="50%" />)
    const divider = screen.getByRole('separator')

    expect(divider).toHaveStyle('width: 50%')
  })
})