import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { BaseTemplate } from './BaseTemplate'

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
      id: 'datalab',
      label: 'Data Lab',
      iconName: 'flask' as const,
      badge: '',
      children: [
        {
          id: 'anomaly',
          label: 'Anomaly scenarios',
          iconName: 'arrowRight' as const,
          badge: '',
        },
      ],
    },
  ],
  activeId: 'overview',
}

describe('Templates/BaseTemplate', () => {
  describe('Render', () => {
    it('renders header', () => {
      renderWithTheme(
        <BaseTemplate sidebar={sidebar}>
          <p>Content</p>
        </BaseTemplate>
      )
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })

    it('renders sidebar with nav items', () => {
      renderWithTheme(
        <BaseTemplate sidebar={sidebar}>
          <p>Content</p>
        </BaseTemplate>
      )
      expect(screen.getByText('Overview')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderWithTheme(
        <BaseTemplate sidebar={sidebar}>
          <p>Page content</p>
        </BaseTemplate>
      )
      expect(screen.getByText('Page content')).toBeInTheDocument()
    })
  })
})
