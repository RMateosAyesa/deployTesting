import type React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../styles/theme'

import { OverviewPage } from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

describe('Pages/OverviewPage', () => {
  describe('Render', () => {
    it('renders overview content', () => {
      renderWithTheme(<OverviewPage />)

      expect(
        screen.getByRole('heading', {
          name: 'Lithium Server Overview',
        })
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'View real-time performance metrics for each host server'
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText('Host Server — Node 01')
      ).toBeInTheDocument()

      expect(
        screen.getByText('Host Server — Node 02')
      ).toBeInTheDocument()
    })

    it('opens metric selector when clicking add more metrics', () => {
      renderWithTheme(<OverviewPage />)

      fireEvent.click(
        screen.getAllByRole('button', {
          name: /add more metrics/i,
        })[0]
      )

      expect(
        screen.getByText(/cpu metrics/i)
      ).toBeInTheDocument()
    })

    it('closes metric selector when clicking add more metrics again', () => {
      renderWithTheme(<OverviewPage />)

      const button = screen.getAllByRole('button', {
        name: /add more metrics/i,
      })[0]

      fireEvent.click(button)
      expect(screen.getByText(/cpu metrics/i)).toBeInTheDocument()

      fireEvent.click(button)
      expect(screen.queryByText(/cpu metrics/i)).not.toBeInTheDocument()
    })

    it('shows IOC server cards when clicking show IOC performance', () => {
      renderWithTheme(<OverviewPage />)

      fireEvent.click(
        screen.getAllByRole('button', {
          name: /show ioc performance/i,
        })[0]
      )

      expect(
        screen.getByText('IOC Temp Server')
      ).toBeInTheDocument()

      expect(
        screen.getByTestId('ioc-card-node-01-temp')
      ).toBeInTheDocument()

      expect(
        screen.getByTestId('ioc-card-node-01-pressure')
      ).toBeInTheDocument()
    })

    it('hides IOC server cards when clicking show IOC performance again', () => {
      renderWithTheme(<OverviewPage />)

      const button = screen.getAllByRole('button', {
        name: /show ioc performance/i,
      })[0]

      fireEvent.click(button)
      expect(screen.getByText('IOC Temp Server')).toBeInTheDocument()

      fireEvent.click(button)
      expect(screen.queryByText('IOC Temp Server')).not.toBeInTheDocument()
    })
  })
})