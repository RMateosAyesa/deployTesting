import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { NodeCard } from './NodeCard'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Organisms/NodeCard', () => {
  describe('Render', () => {
    it('renders host server details, count badge and action panel', () => {
      renderWithTheme(
        <NodeCard
          data={{
            title: 'Host Server — Node 01',
            iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
          }}
        />
      )

      expect(screen.getByRole('heading', { name: 'Host Server — Node 01' })).toBeInTheDocument()
      expect(screen.getByText('IOC Instances:')).toBeInTheDocument()
      expect(screen.getByLabelText('3 linked items')).toBeInTheDocument()
      expect(screen.getByText('Active anomalies')).toBeInTheDocument()
      expect(screen.getByText('None')).toBeInTheDocument()
      expect(screen.getByText('Anomaly Action Panel')).toBeInTheDocument()
    })

    it('renders anomaly options when action panel is open', () => {
      renderWithTheme(
        <NodeCard
          data={{
            title: 'Host Server — Node 01',
            iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
          }}
          defaultActionPanelOpen
        />
      )

      expect(screen.getByText('Network / Connectivity')).toBeInTheDocument()
      expect(screen.getByText('Resource Consumption')).toBeInTheDocument()
      expect(screen.getByText('Disk I/O')).toBeInTheDocument()
    })

    it('calls onAnomalyOptionChange when selecting an anomaly option', () => {
      const handleAnomalyOptionChange = jest.fn()

      renderWithTheme(
        <NodeCard
          data={{
            title: 'Host Server — Node 01',
            iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
          }}
          defaultActionPanelOpen
          onAnomalyOptionChange={handleAnomalyOptionChange}
        />
      )

      fireEvent.click(screen.getByRole('button', { name: 'IOC service restart' }))

      expect(handleAnomalyOptionChange).toHaveBeenCalledWith('ioc_service_restart')
    })
  })
})
