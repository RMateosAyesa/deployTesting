import type { CardData, LineData } from '../../components/Templates/LithiumSystemTemplate'
import { CYLINDER_PRESETS, FIXED_CARDS, FIXED_LINES } from './lithiumSystem.config'
import type { CylinderPreset } from './lithiumSystem.config'
export type { CylinderPreset } from './lithiumSystem.config'

export interface LithiumSystemData {
  cards: CardData[]
  lines: LineData[]
}

export const CYLINDER_COUNT = CYLINDER_PRESETS.length

export async function getLithiumSystemData(activeCylinder: number = 0): Promise<LithiumSystemData> {
  const preset = CYLINDER_PRESETS[activeCylinder] ?? CYLINDER_PRESETS[0]
  return {
    cards: [...FIXED_CARDS, ...preset.cards],
    lines: [...FIXED_LINES, ...preset.lines],
  }
}

export function getCylinderPreset(index: number): CylinderPreset {
  return CYLINDER_PRESETS[index] ?? CYLINDER_PRESETS[0]
}
