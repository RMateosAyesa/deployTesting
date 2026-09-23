import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LithiumSystemTemplate } from './LithiumSystemTemplate'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sidebar = {
  items: [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe' as const,
      badge: '',
    },
    {
      id: 'lithium',
      label: 'Lithium System',
      iconName: 'cube' as const,
      badge: '',
    },
  ],
  activeId: 'lithium',
}

const defaultCards = [
  { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
  { id: 'f1', title: 'Flowmeter Sensor #1', value: 120, unit: 'l/min', x: 0.60, y: 0.07 },
  { id: 'e1', title: 'Electrochemical Hydrogen Sensor #1', value: 0.8, unit: 'ppm', x: 0.78, y: 0.88 },
]

const defaultProps = { sidebar, cards: defaultCards }

describe('Templates/LithiumSystemTemplate', () => {
  describe('Render', () => {
    it('renders the header', () => {
      renderWithTheme(<LithiumSystemTemplate {...defaultProps} />)
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })

    it('renders the title Lithium System Overview', () => {
      renderWithTheme(<LithiumSystemTemplate {...defaultProps} />)
      const title = screen.getByText('Lithium System Overview')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('H1')
    })

    it('renders the sidebar', () => {
      renderWithTheme(<LithiumSystemTemplate {...defaultProps} />)
      expect(screen.getByText('Overview')).toBeInTheDocument()
    })

    it('renders each card with its title', () => {
      renderWithTheme(<LithiumSystemTemplate {...defaultProps} />)
      expect(screen.getByText('Pressure Sensor #1')).toBeInTheDocument()
      expect(screen.getByText('Flowmeter Sensor #1')).toBeInTheDocument()
    })
  })
})
