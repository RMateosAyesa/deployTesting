import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LineChart } from './LineChart'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sampleData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 35 },
]

describe('Atoms/LineChart', () => {
  describe('Render', () => {
    it('renders without crashing', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with cpu metric', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with ram metric', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="ram" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with disk metric', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="disk" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with network metric', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="network" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with scan latency metric', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="scanLatency" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with heartbeat metric', () => {
      const heartbeatData = [
        { time: '10:00', value: 1 },
        { time: '10:01', value: 0 },
      ]
      const { container } = renderWithTheme(
        <LineChart data={heartbeatData} metric="heartbeat" ticks={[0, 1]} />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with standard variant', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" variant="standard" />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with expanded variant', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" variant="expanded" />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with showReferenceLines false', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" showReferenceLines={false} />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with custom referenceLinesConfig', () => {
      const { container } = renderWithTheme(
        <LineChart
          data={sampleData}
          metric="cpu"
          referenceLinesConfig={{ 50: true, 75: false }}
        />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders without dots', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" showDots={false} />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders without area fill', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" fillArea={false} />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with gradient area fill', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="disk" fillArea areaFill="gradient" />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with solid area fill', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" fillArea areaFill="solid" />
      )
      expect(container).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('accepts data prop', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('accepts metric prop', () => {
      const { container } = renderWithTheme(<LineChart data={sampleData} metric="ram" />)
      expect(container).toBeInTheDocument()
    })

    it('accepts variant prop', () => {
      const { container } = renderWithTheme(
        <LineChart data={sampleData} metric="cpu" variant="expanded" />
      )
      expect(container).toBeInTheDocument()
    })

    it('accepts custom height, ticks and x-axis interval', () => {
      const { container } = renderWithTheme(
        <LineChart
          data={sampleData}
          metric="cpu"
          height={300}
          ticks={[0, 25, 50, 75, 100]}
          xAxisInterval={0}
        />
      )
      expect(container).toBeInTheDocument()
    })

    it('accepts all line display options together', () => {
      const { container } = renderWithTheme(
        <LineChart
          data={sampleData}
          metric="network"
          showDots={false}
          fillArea
          areaFill="gradient"
          showReferenceLines
          referenceLinesConfig={{ 50: false, 75: true }}
        />
      )
      expect(container).toBeInTheDocument()
    })
  })
})
