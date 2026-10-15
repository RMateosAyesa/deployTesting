import type { CardData, LineData } from '../../components/Templates/LithiumSystemTemplate'
import type { ValveMetric } from '../../components/Molecules/LithiumSystemCard'

export interface CylinderPreset {
  cards: CardData[]
  lines: LineData[]
}

export const FIXED_CARDS: CardData[] = [
  { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
  { id: 'f1', title: 'Flowmeter Sensor #1', value: 120, unit: 'l/min', x: 0.6, y: 0.07 },
  { id: 'e1', title: 'Electrochemical Hydrogen Sensor #1', value: 0.8, unit: 'ppm', x: 0.78, y: 0.88 },
]

export const FIXED_LINES: LineData[] = [
  { cardId: 'p1', x2: 0.45, y2: 0.07 },
  { cardId: 'f1', x2: 0.48, y2: 0.07 },
  { cardId: 'e1', x2: 0.78, y2: 0.46 },
]

// The Storybook transition preview uses a slightly adjusted fixed-card layout.
export const SIMULATION_FIXED_CARDS: CardData[] = [
  { id: 'p1', title: 'Pressure Sensor #1', value: 4.5, unit: 'kPa', x: 0.30, y: 0.07 },
  { id: 'f1', title: 'Flowmeter Sensor #1', value: 120, unit: 'l/min', x: 0.6, y: 0.07 },
  { id: 'e1', title: 'Electrochemical Hydrogen Sensor #1', value: 0.8, unit: 'ppm', x: 0.8, y: 0.83 },
]

export const SIMULATION_FIXED_LINES: LineData[] = [
  { cardId: 'p1', x2: 0.45, y2: 0.07 },
  { cardId: 'f1', x2: 0.48, y2: 0.07 },
  { cardId: 'e1', x2: 0.8, y2: 0.43 },
]

const VALVE_METRICS: ValveMetric[] = [
  { label: 'Position', value: '3 voltios' },
  { label: 'Leakage', value: 'False' },
  { label: 'Status', value: 'Open' },
  { label: 'Fin carrera', value: 'False' },
]

export const CYLINDER_PRESETS: CylinderPreset[] = [
  {
    cards: [
      { id: 't2', title: 'Temperature Sen. #2', value: 251, unit: 'Cº', x: 0.10, y: 0.26 },
      { id: 'v1', title: 'Valve sensors', variant: 'valve', iconName: 'engine', metrics: VALVE_METRICS, x: 0.60, y: 0.295 },
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
      { id: 'v1', title: 'Valve sensors', variant: 'valve', iconName: 'engine', metrics: VALVE_METRICS, x: 0.65, y: 0.385 },
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
      { id: 'v1', title: 'Valve sensors', variant: 'valve', iconName: 'engine', metrics: VALVE_METRICS, x: 0.566, y: 0.25 },
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
