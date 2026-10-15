import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import {
  CYLINDER_PRESETS,
  FIXED_CARDS,
  FIXED_LINES,
  SIMULATION_FIXED_CARDS,
  SIMULATION_FIXED_LINES,
} from '../../../pages/lithium-system/lithiumSystem.config'
import { LithiumSystemTemplate } from './LithiumSystemTemplate'

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
    { id: 'overview', label: 'Overview', iconName: 'globe' as const, badge: '' },
    { id: 'lithium', label: 'Lithium System', iconName: 'cube' as const, badge: '' },
    {
      id: 'datalab', label: 'Data Lab', iconName: 'flask' as const, badge: '',
      children: [
        { id: 'anomaly', label: 'Anomaly scenarios', iconName: 'arrowRight' as const, badge: '' },
        { id: 'sensor', label: 'Sensor data config', iconName: 'arrowRight' as const, badge: '' },
      ],
    },
  ],
  activeId: 'lithium',
}

const defaultPreset = CYLINDER_PRESETS[0]
const defaultCylinderIndex = 0

export const Default: Story = {
  args: {
    sidebar,
    cards: [...FIXED_CARDS, ...defaultPreset.cards],
    lines: [...FIXED_LINES, ...defaultPreset.lines],
  },
}

export const WithLines: Story = {
  args: {
    sidebar,
    cards: [...FIXED_CARDS, ...defaultPreset.cards],
    lines: [
      { cardId: 'p1', x2: 0.30, y2: 0.07 },
      { cardId: 'p2', x2: 0.20, y2: 0.43 },
      { cardId: 'p3', x2: 0.35, y2: 0.85 },
    ],
  },
}

export const OnlyFixed: Story = {
  args: { sidebar, cards: FIXED_CARDS },
}

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
  const [active, setActive] = useState(defaultCylinderIndex)
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    if (!auto) return
    const timer = setInterval(() => setActive((current) => (current + 1) % CYLINDER_PRESETS.length), 5000)
    return () => clearInterval(timer)
  }, [auto])

  return (
    <SimRoot>
      {CYLINDER_PRESETS.map((preset, index) => (
        <SimLayer key={index} $visible={index === active}>
          <LithiumSystemTemplate
            sidebar={sidebar}
            cards={[...SIMULATION_FIXED_CARDS, ...preset.cards]}
            lines={[...SIMULATION_FIXED_LINES, ...preset.lines]}
          />
        </SimLayer>
      ))}
      <Controls>
        {CYLINDER_PRESETS.map((_, index) => (
          <CtrlBtn key={index} $active={index === active} onClick={() => { setActive(index); setAuto(false) }}>
            {index + 1}
          </CtrlBtn>
        ))}
        <CtrlBtn onClick={() => setAuto((current) => !current)}>
          {auto ? '⏸ Stop' : '▶ Auto'}
        </CtrlBtn>
      </Controls>
    </SimRoot>
  )
}

export const Simulation: Story = {
  render: () => <SimulationInner />,
}
