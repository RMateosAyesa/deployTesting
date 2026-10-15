import { act, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../styles/theme'
import { LithiumSystemPage } from './index'
import { getLithiumSystemData, getCylinderPreset, CYLINDER_COUNT } from './lithiumSystem.service'
import type { LithiumSystemData } from './lithiumSystem.service'
import { CYLINDER_PRESETS, FIXED_CARDS, FIXED_LINES } from './lithiumSystem.config'
import { LithiumSystemTemplate } from '../../components/Templates/LithiumSystemTemplate'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

async function flushMicrotasks(): Promise<void> {
  await act(async () => {
    await Promise.resolve()
  })
}

describe('Pages/LithiumSystemPage', () => {
  describe('Render', () => {
    it('renders without crashing', async () => {
      renderWithTheme(<LithiumSystemPage />)
      await flushMicrotasks()
      expect(screen.getByText('Lithium System Overview')).toBeInTheDocument()
    })

    it('renders the sidebar with nav items', async () => {
      const sidebar = {
        items: [
          { id: 'overview', label: 'Overview', iconName: 'globe' as const, badge: '' },
          { id: 'lithium', label: 'Lithium System', iconName: 'cube' as const, badge: '' },
        ],
        activeId: 'lithium',
      }
      renderWithTheme(<LithiumSystemPage sidebar={sidebar} />)
      await flushMicrotasks()
      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Lithium System')).toBeInTheDocument()
    })

    it('renders the header', async () => {
      renderWithTheme(<LithiumSystemPage />)
      await flushMicrotasks()
      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
    })
  })

  describe('Cards rendering', () => {
    it('renders cards with titles from the default service', async () => {
      const onFetchData = jest.fn().mockImplementation((_index: number) => getLithiumSystemData())

      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(screen.getByText('Pressure Sensor #1')).toBeInTheDocument()
      expect(screen.getByText('Flowmeter Sensor #1')).toBeInTheDocument()
      expect(screen.getByText('Temperature Sen. #2')).toBeInTheDocument()

      expect(screen.getByTestId('sensor-card-p1')).toBeInTheDocument()
      expect(screen.getByTestId('sensor-card-v1')).toBeInTheDocument()
    })

    it('renders custom data from a mock', async () => {
      const testData: LithiumSystemData = {
        cards: [
          { id: 'c1', title: 'Custom Sensor', value: 42, unit: 'units', x: 0.5, y: 0.5 },
        ],
        lines: [],
      }
      const onFetchData = jest.fn().mockResolvedValue(testData)

      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(screen.getByText('Custom Sensor')).toBeInTheDocument()
    })

    it('renders valve sensor cards with metrics', async () => {
      const testData: LithiumSystemData = {
        cards: [
          {
            id: 'v1', title: 'Valve sensors', variant: 'valve', iconName: 'engine',
            metrics: [
              { label: 'Position', value: 'Open' },
              { label: 'Leakage', value: 'False' },
            ],
            x: 0.5, y: 0.5,
          },
        ],
        lines: [],
      }
      const onFetchData = jest.fn().mockResolvedValue(testData)

      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(screen.getByText('Valve 1 sensors')).toBeInTheDocument()
      expect(screen.getByText('Valve 2 sensors')).toBeInTheDocument()
      expect(screen.getAllByText('Position')).toHaveLength(2)
      expect(screen.getAllByText('Leakage')).toHaveLength(2)
    })
  })

  describe('Cylinder switching', () => {
    it('calls onFetchData with activeCylinder prop', async () => {
      const onFetchData = jest.fn().mockResolvedValue({ cards: [], lines: [] })

      renderWithTheme(<LithiumSystemPage activeCylinder={2} onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(onFetchData).toHaveBeenCalledWith(2)
    })

    it('calls onFetchData with default cylinder 0 when not specified', async () => {
      const onFetchData = jest.fn().mockResolvedValue({ cards: [], lines: [] })

      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(onFetchData).toHaveBeenCalledWith(0)
    })

    it('re-fetches data when activeCylinder changes', async () => {
      const onFetchData = jest.fn().mockResolvedValue({ cards: [], lines: [] })

      const { rerender } = renderWithTheme(<LithiumSystemPage activeCylinder={0} onFetchData={onFetchData} />)
      await flushMicrotasks()

      rerender(
        <ThemeProvider theme={theme}>
          <LithiumSystemPage activeCylinder={1} onFetchData={onFetchData} />
        </ThemeProvider>
      )
      await flushMicrotasks()

      expect(onFetchData).toHaveBeenCalledWith(0)
      expect(onFetchData).toHaveBeenCalledWith(1)
    })
  })

  describe('Sidebar callback', () => {
    it('accepts and passes onSidebarSelect', async () => {
      const onSidebarSelect = jest.fn()
      renderWithTheme(
        <LithiumSystemPage
          sidebar={{ items: [{ id: 'test', label: 'Test', iconName: 'globe', badge: '' }], activeId: 'test' }}
          onSidebarSelect={onSidebarSelect}
        />
      )
      await flushMicrotasks()
      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })

  describe('Data fetching', () => {
    it('calls onFetchData on mount', async () => {
      const onFetchData = jest.fn().mockResolvedValue({ cards: [], lines: [] })
      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()
      expect(onFetchData).toHaveBeenCalledTimes(1)
    })

    it('starts with empty cards before data resolves', async () => {
      const onFetchData = jest.fn().mockResolvedValue({ cards: [], lines: [] })
      renderWithTheme(<LithiumSystemPage onFetchData={onFetchData} />)
      await flushMicrotasks()

      expect(screen.getByText('Lithium System Overview')).toBeInTheDocument()
    })
  })

  describe('Template integration', () => {
    it('LithiumSystemTemplate renders cards directly', () => {
      const cards = [
        { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
      ]
      renderWithTheme(
        <LithiumSystemTemplate
          sidebar={{ items: [{ id: 'test', label: 'Test', iconName: 'globe', badge: '' }], activeId: 'test' }}
          cards={cards}
        />
      )
      expect(screen.getByText('Pressure Sensor #1')).toBeInTheDocument()
    })
  })

  describe('Service', () => {
    it('returns 3 cylinder presets', () => {
      expect(CYLINDER_COUNT).toBe(3)
    })

    it('getLithiumSystemData returns expected data for cylinder 0', async () => {
      const data = await getLithiumSystemData(0)
      expect(data.cards).toEqual([...FIXED_CARDS, ...CYLINDER_PRESETS[0].cards])
      expect(data.lines).toEqual([...FIXED_LINES, ...CYLINDER_PRESETS[0].lines])
    })

    it('getLithiumSystemData uses the requested cylinder preset', async () => {
      const data = await getLithiumSystemData(2)

      expect(data.cards).toEqual([...FIXED_CARDS, ...CYLINDER_PRESETS[2].cards])
      expect(data.lines).toEqual([...FIXED_LINES, ...CYLINDER_PRESETS[2].lines])
    })

    it('falls back to cylinder 0 when the requested preset does not exist', async () => {
      const data = await getLithiumSystemData(CYLINDER_COUNT)

      expect(data.cards).toEqual([...FIXED_CARDS, ...CYLINDER_PRESETS[0].cards])
      expect(data.lines).toEqual([...FIXED_LINES, ...CYLINDER_PRESETS[0].lines])
      expect(getCylinderPreset(CYLINDER_COUNT)).toBe(CYLINDER_PRESETS[0])
    })

    it('each cylinder preset has different card Y positions', () => {
      const p0 = getCylinderPreset(0)
      const p1 = getCylinderPreset(1)
      const p2 = getCylinderPreset(2)

      const v1YPositions = [p0, p1, p2].map(p => p.cards.find(c => c.id === 'v1')?.y)
      expect(new Set(v1YPositions).size).toBe(3)
    })

    it('connects the valve card to a different lithium cylinder in each preset', () => {
      const valveTargets = CYLINDER_PRESETS.map((preset) => {
        expect(preset.cards.filter((card) => card.id === 'v1')).toHaveLength(1)
        expect(preset.lines.filter((line) => line.cardId === 'v1')).toHaveLength(1)

        const valveLine = preset.lines.find((line) => line.cardId === 'v1')
        return `${valveLine?.x2},${valveLine?.y2}`
      })

      expect(new Set(valveTargets).size).toBe(CYLINDER_COUNT)
    })

  })
})
