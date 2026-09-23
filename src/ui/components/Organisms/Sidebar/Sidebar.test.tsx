import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Sidebar } from './Sidebar'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('Organisms/Sidebar', () => {
  it('renders title', () => {
    renderWithTheme(<Sidebar items={[]} />)
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('renders nav items', () => {
    renderWithTheme(
      <Sidebar
        items={[
          { id: 'overview', label: 'Overview', iconName: 'globe', badge: '' },
        ]}
      />
    )

    expect(screen.getByText('Overview')).toBeInTheDocument()
  })
})