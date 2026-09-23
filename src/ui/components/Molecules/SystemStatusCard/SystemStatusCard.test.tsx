import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'
import { SystemStatusCard } from './SystemStatusCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

describe('Molecules/SystemStatusCard', () => {
  it('renders title correctly', () => {
    renderWithTheme(
      <SystemStatusCard
        iconName="radioButton"
        title="Restart counter"
        label="Value"
        value={23}
        unit="Restarts"
      />
    )

    expect(screen.getByText('Restart counter')).toBeInTheDocument()
  })

  it('renders value correctly', () => {
    renderWithTheme(
      <SystemStatusCard
        iconName="radioButton"
        title="Restart counter"
        label="Value"
        value={23}
        unit="Restarts"
      />
    )

    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByText('Restarts')).toBeInTheDocument()
  })
})