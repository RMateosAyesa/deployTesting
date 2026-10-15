import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LithiumSystemTemplate } from './LithiumSystemTemplate'
import type { CardData, LineData } from './LithiumSystemTemplate'

const meta: Meta<typeof LithiumSystemTemplate> = {
  title: 'Templates/LithiumSystemTemplate',
  component: LithiumSystemTemplate,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof LithiumSystemTemplate>

const sidebar = {
  items: [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe' as const,
      badge: '',
    },
    {
      id: 'lithium',
      label: 'Lithium System',
      iconName: 'cube' as const,
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
        {
          id: 'sensor',
          label: 'Sensor data config',
          iconName: 'arrowRight' as const,
          badge: '',
        },
      ],
    },
  ],
  activeId: 'lithium',
}

const fixedCards = [
  { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
  { id: 'f1', title: 'Flowmeter Sensor #1', value: 120, unit: 'l/min', x: 0.6, y: 0.07 },
  { id: 'e1', title: 'Electrochemical Hydrogen Sensor #1', value: 0.8, unit: 'ppm', x: 0.78, y: 0.88 },
]

const dynamicCards = [
  { id: 't2', title: 'Temperature Sen. #2', value: 251, unit: 'Cº', x: 0.10, y: 0.26 },
  { id: 'v1', title: 'Valve sensors', variant: 'valve' as const, iconName: 'engine' as const, count: 4, countItems: ['Position', 'Leakage', 'Status', 'Fin carrera'], metrics: [{ label: 'Position', value: '3 voltios' }, { label: 'Leakage', value: 'False' }, { label: 'Status', value: 'Open' }, { label: 'Fin carrera', value: 'False' }], x: 0.6, y: 0.295 },
  { id: 'p2', title: 'Pressure Sensor #2', value: 3.2, unit: 'kPa', x: 0.25, y: 0.33 },
  { id: 't1', title: 'Temperature Sen. #1', value: 180, unit: 'Cº', x: 0.25, y: 0.57 },
  { id: 'p3', title: 'Pressure Sensor #3', value: 5.1, unit: 'kPa', x: 0.37, y: 0.9 },
]

const defaultLines: LineData[] = [
  { cardId: 'p1', x2: 0.45, y2: 0.07 },
  { cardId: 'f1', x2: 0.48, y2: 0.07 },
  { cardId: 'e1', x2: 0.78, y2: 0.46 },
  { cardId: 't2', x2: 0.38, y2: 0.26 },
  { cardId: 'v1', x2: 0.394, y2: 0.295 },
  { cardId: 'p2', x2: 0.38, y2: 0.33 },
  { cardId: 't1', x2: 0.35, y2: 0.57 },
  { cardId: 'p3', x2: 0.37, y2: 0.55 },
]

export const Default: Story = {
  args: {
    sidebar,
    cards: [...fixedCards, ...dynamicCards] as CardData[],
    lines: defaultLines,
  },
}

export const WithLines: Story = {
  args: {
    sidebar,
    cards: [...fixedCards, ...dynamicCards] as CardData[],
    lines: [
      { cardId: 'p1', x2: 0.30, y2: 0.07 },
      { cardId: 'p2', x2: 0.20, y2: 0.43 },
      { cardId: 'p3', x2: 0.35, y2: 0.85 },
    ],
  },
}

export const OnlyFixed: Story = {
  args: {
    sidebar,
    cards: fixedCards,
  },
}

const fixedPresetCards: CardData[] = [
  { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
  { id: 'f1', title: 'Flowmeter Sensor #1', value: 120, unit: 'l/min', x: 0.6, y: 0.07 },
  { id: 'e1', title: 'Electrochemical Hydrogen Sensor #1', value: 0.8, unit: 'ppm', x: 0.8, y: 0.83 },
]

const fixedPresetLines: LineData[] = [
  { cardId: 'p1', x2: 0.45, y2: 0.07 },
  { cardId: 'f1', x2: 0.48, y2: 0.07 },
  { cardId: 'e1', x2: 0.8, y2: 0.43 },
]

const presets = [
  {
    cards: [
      { id: 't2', title: 'Temperature Sen. #2', value: 251, unit: 'Cº', x: 0.10, y: 0.26 },
      { id: 'v1', title: 'Valve sensors', variant: 'valve' as const, iconName: 'engine' as const, count: 4, countItems: ['Position', 'Leakage', 'Status', 'Fin carrera'], metrics: [{ label: 'Position', value: '3 voltios' }, { label: 'Leakage', value: 'False' }, { label: 'Status', value: 'Open' }, { label: 'Fin carrera', value: 'False' }], x: 0.60, y: 0.295 },
      { id: 'p2', title: 'Pressure Sensor #2', value: 3.2, unit: 'kPa', x: 0.25, y: 0.33 },
      { id: 't1', title: 'Temperature Sen. #1', value: 180, unit: 'Cº', x: 0.25, y: 0.57 },
      { id: 'p3', title: 'Pressure Sensor #3', value: 5.1, unit: 'kPa', x: 0.37, y: 0.9 },
    ],
    lines: [
      { cardId: 't2', x2: 0.38, y2: 0.26 },
      { cardId: 'v1', x2: 0.394, y2: 0.295 },
      { cardId: 'p2', x2: 0.38, y2: 0.33 },
      { cardId: 't1', x2: 0.35, y2: 0.57 },
      { cardId: 'p3', x2: 0.37, y2: 0.55 },
    ],
  },
  {
    cards: [
      { id: 't2', title: 'Temperature Sen. #2', value: 251, unit: 'Cº', x: 0.10, y: 0.35 },
      { id: 'v1', title: 'Valve sensors', variant: 'valve' as const, iconName: 'engine' as const, count: 4, countItems: ['Position', 'Leakage', 'Status', 'Fin carrera'], metrics: [{ label: 'Position', value: '3 voltios' }, { label: 'Leakage', value: 'False' }, { label: 'Status', value: 'Open' }, { label: 'Fin carrera', value: 'False' }], x: 0.65, y: 0.385 },
      { id: 'p2', title: 'Pressure Sensor #2', value: 3.2, unit: 'kPa', x: 0.25, y: 0.42 },
      { id: 't1', title: 'Temperature Sen. #1', value: 180, unit: 'Cº', x: 0.25, y: 0.66 },
      { id: 'p3', title: 'Pressure Sensor #3', value: 5.1, unit: 'kPa', x: 0.408, y: 0.9 },
    ],
    lines: [
      { cardId: 't2', x2: 0.464, y2: 0.35 },
      { cardId: 'v1', x2: 0.478, y2: 0.385 },
      { cardId: 'p2', x2: 0.464, y2: 0.42 },
      { cardId: 't1', x2: 0.43, y2: 0.66 },
      { cardId: 'p3', x2: 0.408, y2: 0.685 },
    ],
  },
  {
    cards: [
      { id: 't2', title: 'Temperature Sen. #2', value: 251, unit: 'Cº', x: 0.10, y: 0.44 },
      { id: 'v1', title: 'Valve sensors', variant: 'valve' as const, iconName: 'engine' as const, count: 4, countItems: ['Position', 'Leakage', 'Status', 'Fin carrera'], metrics: [{ label: 'Position', value: '3 voltios' }, { label: 'Leakage', value: 'False' }, { label: 'Status', value: 'Open' }, { label: 'Fin carrera', value: 'False' }], x: 0.566, y: 0.25 },
      { id: 'p2', title: 'Pressure Sensor #2', value: 3.2, unit: 'kPa', x: 0.25, y: 0.51 },
      { id: 't1', title: 'Temperature Sen. #1', value: 180, unit: 'Cº', x: 0.49, y: 0.9 },
      { id: 'p3', title: 'Pressure Sensor #3', value: 5.1, unit: 'kPa', x: 0.67, y: 0.76 },
    ],
    lines: [
      { cardId: 't2', x2: 0.552, y2: 0.44 },
      { cardId: 'v1', x2: 0.566, y2: 0.475 },
      { cardId: 'p2', x2: 0.552, y2: 0.51 },
      { cardId: 't1', x2: 0.49, y2: 0.785 },
      { cardId: 'p3', x2: 0.52, y2: 0.76 },
    ],
  },
]

const SimLayer = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 2s ease;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`

const SimRoot = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
`

const Controls = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  gap: 8px;
  align-items: center;
`

const CtrlBtn = styled.button<{ $active?: boolean }>`
  padding: 6px 14px;
  border: 1px solid ${({ $active }) => ($active ? '#EBB400' : '#555')};
  background: ${({ $active }) => ($active ? '#EBB400' : '#222')};
  color: ${({ $active }) => ($active ? '#000' : '#fff')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    border-color: #EBB400;
  }
`

function SimulationInner() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setActive((p) => (p + 1) % presets.length), 5000)
    return () => clearInterval(t)
  }, [auto])

  return (
    <SimRoot>
      {presets.map((preset, i) => (
        <SimLayer key={i} $visible={i === active}>
          <LithiumSystemTemplate
            sidebar={sidebar}
            cards={[...fixedPresetCards, ...preset.cards] as CardData[]}
            lines={[...fixedPresetLines, ...preset.lines]}
          />
        </SimLayer>
      ))}
      <Controls>
        {presets.map((_, i) => (
          <CtrlBtn key={i} $active={i === active} onClick={() => { setActive(i); setAuto(false) }}>
            {i + 1}
          </CtrlBtn>
        ))}
        <CtrlBtn onClick={() => setAuto((a) => !a)}>
          {auto ? '⏸ Stop' : '▶ Auto'}
        </CtrlBtn>
      </Controls>
    </SimRoot>
  )
}

export const Simulation: Story = {
  render: () => <SimulationInner />,
}
