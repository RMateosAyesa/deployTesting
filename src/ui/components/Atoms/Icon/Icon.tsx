import React from 'react'
import styled, { css } from 'styled-components'
import {
  GlobeIcon,
  CubeIcon,
  FlaskIcon,
  CpuIcon,
  MemoryIcon,
  DiscIcon,
  CellTowerIcon,
  EyeSlashIcon,
  WifiHighIcon,
  ThermometerIcon,
  ArrowUUpLeftIcon,
  RadioButtonIcon,
  ClockIcon,
  ChartBarIcon,
  ChartLineIcon,
  SpeedometerIcon,
  ArrowRightIcon,
  GearIcon,
  LightningIcon,
  ProhibitIcon,
  PlusIcon,
  XIcon,
  EngineIcon
} from '@phosphor-icons/react'

import { theme } from '../../../../styles/index'

export type IconSize = 's' | 'l' | 'm' |'xl'
export type IconColor = 'primary' | 'secondary' | 'active' | 'valve'
export type IconWeight = 'regular' | 'fill'
export type IconName = keyof typeof iconMap

const iconMap = {
  globe: GlobeIcon,
  cube: CubeIcon,
  flask: FlaskIcon,
  cpu: CpuIcon,
  memory: MemoryIcon,
  disc: DiscIcon,
  cellTower: CellTowerIcon,
  eyeSlash: EyeSlashIcon,
  wifiHigh: WifiHighIcon,
  thermometer: ThermometerIcon,
  arrowUUpLeft: ArrowUUpLeftIcon,
  radioButton: RadioButtonIcon,
  clock: ClockIcon,
  chartBar: ChartBarIcon,
  chartLine: ChartLineIcon,
  speedometer: SpeedometerIcon,
  arrowRight: ArrowRightIcon,
  gear: GearIcon,
  lightning: LightningIcon,
  prohibit: ProhibitIcon,
  plus: PlusIcon,
  x: XIcon,
  engine: EngineIcon
}

export interface IconProps {
  name: IconName
  size: IconSize
  color: IconColor
  weight?: IconWeight
  isActive?: boolean
  className?: string
}

interface StyledIconProps {
  size: IconSize
  color: IconColor
  $isActive: boolean
}

const sizeMap = {
  s: 10,
  m: 18,
  l: 20,
  xl: 24
}

const colorMap = {
  primary: 'semanticPrimary',
  secondary: 'contentHigh',
  active: 'contentOnColor',
  valve: 'anomalyFlag'
}

const IconWrapper = styled.span<StyledIconProps>`
  display: ${theme.display.inLine};
  align-items: ${theme.aling.center};
  justify-content: ${theme.justify.center};
  ${({ size = 'm' }) => css`
    width: ${sizeMap[size]}px;
    height: ${sizeMap[size]}px;
  `}
  ${({ color = 'primary', $isActive: isActive, theme }) => css`
    color: ${isActive ? theme.colors.contentOnColor : theme.colors[colorMap[color]]};
    background-color: ${isActive ? theme.colors.semanticPrimary : 'transparent'};
    border-radius: ${isActive ? theme.borderRadius.xs : '0'};
    padding: ${isActive ? theme.padding.xs : '0'};
  `}
`

export function IconAtom({ name, size = 'm', color = 'primary', weight = 'regular', isActive = false, className }: IconProps): React.ReactElement | null {
  const IconComponent = name ? iconMap[name] : null

  if (!IconComponent) {
    return null
  }

  const activeColor = isActive ? 'active' : color

  return (
    <IconWrapper size={size} color={activeColor} $isActive={isActive} className={className}>
      <IconComponent size={sizeMap[size]} weight={weight} />
    </IconWrapper>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const icons = Object.keys(iconMap) as IconName[]
