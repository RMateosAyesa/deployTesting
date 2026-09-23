import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Accordion } from './Accordion'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Accordion', () => {
  it('renders items with default variant', () => {
    renderWithTheme(
      <Accordion
        items={[
          { key: '1', label: 'Test', children: 'Content' }
        ]}
      />
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('renders items with primary variant', () => {
    renderWithTheme(
      <Accordion
        variant="primary"
        items={[
          { key: '1', label: 'Primary Test', children: 'Content' }
        ]}
      />
    )

    expect(screen.getByText('Primary Test')).toBeInTheDocument()
  })
})