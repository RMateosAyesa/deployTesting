import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { IocServerCard } from './IocServerCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Molecules/IocServerCard', () => {
  describe('Render', () => {
    it('renders title and subtitle', () => {
      renderWithTheme(
        <IocServerCard
          title="IOC Server"
          subtitle="Pressure Sensor #1"
          iconName="cpu"
          metrics={[]}
        />
      )

      expect(screen.getByText('IOC Server')).toBeInTheDocument()
      expect(screen.getByText('Pressure Sensor #1')).toBeInTheDocument()
    })

    it('renders metrics list', () => {
      renderWithTheme(
        <IocServerCard
          title="IOC Server"
          subtitle="Sensor"
          iconName="cpu"
          metrics={[
            { label: 'CPU', value: 89},
            { label: 'Disk', value: 93},
          ]}
        />
      )

      expect(screen.getByText('CPU')).toBeInTheDocument()
      expect(screen.getByText('Disk')).toBeInTheDocument()
      expect(screen.getAllByText('89%').length).toBeGreaterThan(0)
      expect(screen.getAllByText('93%').length).toBeGreaterThan(0)
    })

    it('renders progress bars for each metric', () => {
      renderWithTheme(
        <IocServerCard
          title="IOC"
          subtitle="Sensor"
          iconName="cpu"
          metrics={[
            { label: 'CPU', value: 50},
            { label: 'RAM', value: 30},
          ]}
        />
      )

      expect(screen.getAllByRole('progressbar')).toHaveLength(2)
    })

    it('renders with high background', () => {
      renderWithTheme(
        <IocServerCard
          title="IOC"
          subtitle="Sensor"
          iconName="cpu"
          background="high"
          metrics={[{ label: 'CPU', value: 50}]}
        />
      )

      expect(screen.getByText('IOC')).toBeInTheDocument()
    })

    it('renders with no padding', () => {
      renderWithTheme(
        <IocServerCard
          title="IOC"
          subtitle="Sensor"
          iconName="cpu"
          padding="none"
          metrics={[{ label: 'CPU', value: 50}]}
        />
      )

      expect(screen.getByText('IOC')).toBeInTheDocument()
    })
  })
})