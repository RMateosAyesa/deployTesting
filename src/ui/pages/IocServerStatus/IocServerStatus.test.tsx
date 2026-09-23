import type React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../styles/theme'

import { IocServerStatusPage } from './Index'

const renderWithTheme = (
  ui: React.ReactElement
) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

describe('Pages/IocServerStatusPage', () => {
  describe('Render', () => {
    it('renders IOC Server Status page', () => {
      renderWithTheme(<IocServerStatusPage />)

      expect(
        screen.getByText('IOC Server Status')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Pressure Sensor #1')
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'System Status & General State'
        )
      ).toBeInTheDocument()
    })

    it('renders traceability section', () => {
      renderWithTheme(<IocServerStatusPage />)

      expect(
        screen.getByText('System Traceability')
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'Process Variable Change Log'
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'IOC Lifecycle Events'
        )
      ).toBeInTheDocument()
    })

    it('renders performance section', () => {
      renderWithTheme(<IocServerStatusPage />)

      expect(
        screen.getByText('Performance metrics')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Scan latency')
      ).toBeInTheDocument()
    })
  })
})