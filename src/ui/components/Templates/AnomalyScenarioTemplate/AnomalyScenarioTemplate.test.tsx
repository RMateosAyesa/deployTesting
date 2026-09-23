import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { AnomalyScenarioTemplate } from './AnomalyScenarioTemplate'

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
  activeId: 'anomaly',
}

const defaultProps = {
  sidebar,
  title: 'Anomaly Scenario',
  description: 'Define and manage anomaly scenarios for the system nodes.',
  nodeCardData: {
    title: 'Host Server — Node 01',
    iocInstances: ['IOC-Temp-01', 'IOC-Press-02'],
  },
}

describe('Templates/AnomalyScenarioTemplate', () => {
  describe('Render', () => {
    it('renders the header', () => {
      renderWithTheme(<AnomalyScenarioTemplate {...defaultProps} />)
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })

    it('renders the title with H1 variant', () => {
      renderWithTheme(<AnomalyScenarioTemplate {...defaultProps} />)
      const title = screen.getByText('Anomaly Scenario')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('H1')
    })

    it('renders the description with bodyLarge variant', () => {
      renderWithTheme(<AnomalyScenarioTemplate {...defaultProps} />)
      const description = screen.getByText(
        'Define and manage anomaly scenarios for the system nodes.'
      )
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe('P')
    })

    it('renders the node card with node title', () => {
      renderWithTheme(<AnomalyScenarioTemplate {...defaultProps} />)
      expect(screen.getByText('Host Server — Node 01')).toBeInTheDocument()
    })

    it('renders the sidebar', () => {
      renderWithTheme(<AnomalyScenarioTemplate {...defaultProps} />)
      expect(screen.getByText('Overview')).toBeInTheDocument()
    })
  })
})
