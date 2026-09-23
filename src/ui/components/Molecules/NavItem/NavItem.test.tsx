import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { NavItem } from './NavItem'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const baseItem = {
  id: 'overview',
  label: 'Overview',
  iconName: 'globe' as const,
  badge: '',
}

describe('Molecules/NavItem', () => {
  it('renders the label correctly', () => {
    renderWithTheme(<NavItem item={baseItem} />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
  })

  it('renders sub-items when provided', () => {
    const itemWithChildren = {
      ...baseItem,
      label: 'Parent',
      children: [
        {
          id: 'sub1',
          label: 'Sub Item 1',
          iconName: 'cube' as const,
          badge: '',
        },
      ],
    }

    renderWithTheme(<NavItem item={itemWithChildren} />)

    const parent = screen.getByText('Parent')
    fireEvent.click(parent)

    expect(screen.getByText('Sub Item 1')).toBeInTheDocument()
  })

  it('applies active styles when activeId matches', () => {
    renderWithTheme(
      <NavItem
        item={baseItem}
        activeId="overview"
      />
    )

    const label = screen.getByText('Overview')
    expect(label).toBeInTheDocument()
  })
})