import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Text } from '../../Atoms/Text'
import { LithiumSystemCard } from './LithiumSystemCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/LithiumSystemCard', () => {
  describe('standard variant', () => {
    it('renders title, value and unit', () => {
      renderWithTheme(
        <LithiumSystemCard title="Temperature Sen.  #1" value={251} unit="Cº" />
      )

      expect(screen.getByRole('heading', { name: 'Temperature Sen. #1' })).toBeInTheDocument()
      expect(screen.getByText('251')).toBeInTheDocument()
      expect(screen.getByText('Cº')).toBeInTheDocument()
    })
  })

  describe('valve variant', () => {
    it('renders title with icon and count badge', () => {
      renderWithTheme(
        <LithiumSystemCard
          variant="valve"
          title="Valve A"
          iconName="gear"
          count={3}
          countItems={['Metric 1', 'Metric 2']}
        />
      )

      expect(screen.getByRole('heading', { name: 'Valve A' })).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders children metrics', () => {
      renderWithTheme(
        <LithiumSystemCard
          variant="valve"
          title="Valve B"
          count={2}
          countItems={['CPU', 'RAM']}
        >
          <Text variant="bodyMedium">Metric A</Text>
          <Text variant="bodyMedium">Metric B</Text>
        </LithiumSystemCard>
      )

      expect(screen.getByText('Metric A')).toBeInTheDocument()
      expect(screen.getByText('Metric B')).toBeInTheDocument()
    })
  })
})
