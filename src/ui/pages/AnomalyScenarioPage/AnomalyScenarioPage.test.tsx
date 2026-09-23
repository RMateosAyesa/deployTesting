import type React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles/theme'
import { AnomalyScenarioPage } from './index'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const openAccordion = () => {
  fireEvent.click(screen.getByText('Anomaly Action Panel'))
}

describe('Pages/AnomalyScenarioPage', () => {
  describe('Render', () => {
    it('renders the anomaly scenario page content', () => {
      renderWithTheme(<AnomalyScenarioPage />)

      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'Anomaly Scenario' })
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          'Define anomaly scenarios that affect host server performance and influence system behavior across the platform.'
        )
      ).toBeInTheDocument()

      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Lithium System')).toBeInTheDocument()
      expect(screen.getByText('Data Lab')).toBeInTheDocument()
    })

    it('renders anomaly options from template', () => {
      renderWithTheme(<AnomalyScenarioPage />)
      openAccordion()

      expect(
        screen.getByText('Network interface disconnection')
      ).toBeInTheDocument()

      expect(screen.getByText('IOC service restart')).toBeInTheDocument()
      expect(screen.getByText('Full server reboot')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('opens modal when selecting network anomaly option', () => {
      renderWithTheme(<AnomalyScenarioPage />)
      openAccordion()

      fireEvent.click(
        screen.getByText('Network interface disconnection')
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    }, 15000)

    it('calls onStartAnomaly when running anomaly immediately', async () => {
      const onStartAnomaly = jest.fn().mockResolvedValue(undefined)
      renderWithTheme(
        <AnomalyScenarioPage onStartAnomaly={onStartAnomaly} />
      )
      openAccordion()

      fireEvent.click(
        screen.getByText('Network interface disconnection')
      )

      fireEvent.click(screen.getByRole('button', { name: /accept anomaly/i }))

      await waitFor(() => {
        expect(onStartAnomaly).toHaveBeenCalledWith(
          'network_interface_disconnection'
        )
      })
    }, 15000)

    it('calls onScheduleAnomaly when scheduling anomaly', async () => {
      const onScheduleAnomaly = jest.fn().mockResolvedValue(undefined)
      renderWithTheme(
        <AnomalyScenarioPage onScheduleAnomaly={onScheduleAnomaly} />
      )
      openAccordion()

      fireEvent.click(
        screen.getByText('Network interface disconnection')
      )

      fireEvent.click(screen.getByText('Schedule date and time'))

      fireEvent.click(screen.getByRole('button', { name: /accept anomaly/i }))

      await waitFor(() => {
        expect(onScheduleAnomaly).toHaveBeenCalledWith(
          'network_interface_disconnection'
        )
      })
    }, 15000)

    it('closes modal when clicking cancel', () => {
      renderWithTheme(<AnomalyScenarioPage />)
      openAccordion()

      fireEvent.click(
        screen.getByText('Network interface disconnection')
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    }, 15000)
  })
})