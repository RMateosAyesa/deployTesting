import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { BarChart } from './BarChart'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sampleData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 35 },
]

describe('Atoms/BarChart', () => {
  describe('Render', () => {
    it('renders without crashing', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with cpu metric', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with ram metric', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="ram" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with disk metric', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="disk" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with network metric', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="network" />)
      expect(container).toBeInTheDocument()
    })

    it('renders with standard variant', () => {
      const { container } = renderWithTheme(
        <BarChart data={sampleData} metric="cpu" variant="standard" />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with expanded variant', () => {
      const { container } = renderWithTheme(
        <BarChart data={sampleData} metric="cpu" variant="expanded" />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with showReferenceLines false', () => {
      const { container } = renderWithTheme(
        <BarChart data={sampleData} metric="cpu" showReferenceLines={false} />
      )
      expect(container).toBeInTheDocument()
    })

    it('renders with custom referenceLinesConfig', () => {
      const { container } = renderWithTheme(
        <BarChart
          data={sampleData}
          metric="cpu"
          referenceLinesConfig={{ 50: true, 75: false }}
        />
      )
      expect(container).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('accepts data prop', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="cpu" />)
      expect(container).toBeInTheDocument()
    })

    it('accepts metric prop', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="ram" />)
      expect(container).toBeInTheDocument()
    })

    it('accepts variant prop', () => {
      const { container } = renderWithTheme(<BarChart data={sampleData} metric="cpu" variant="expanded" />)
      expect(container).toBeInTheDocument()
    })
  })
})