import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { CountBadge } from './CountBadge'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/CountBadge', () => {
  describe('Render', () => {
    it('renders the count badge', () => {
      renderWithTheme(
        <CountBadge
          count={3}
          items={['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01']}
        />
      )

      expect(screen.getByLabelText('3 linked items')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })
})
