import React from 'react'
import { Progress as AntProgress, ProgressProps as AntProgressProps } from 'antd'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

export type ProgressTrack = 'black' | 'grey'
export type ProgressColorMode = 'range' | 'fixed'
export type ProgressFixedColorKey = 'cpu' | 'ram' | 'disk' | 'network'

const fixedColorMap: Record<ProgressFixedColorKey, string> = {
  cpu: theme.colors.cpuColor,
  ram: theme.colors.ramColor,
  disk: theme.colors.diskColor,
  network: theme.colors.networkColor,
}

const getFixedColor = (key: ProgressFixedColorKey): string => fixedColorMap[key]

export interface ProgressProps extends Omit<AntProgressProps, 'strokeColor'> {
  track?: ProgressTrack
  colorMode?: ProgressColorMode
  fixedColor?: ProgressFixedColorKey
}

const StyledProgress = styled(AntProgress)<{ 
  $track: ProgressTrack 
}>`
  .ant-progress-rail {
    background-color: ${({ theme, $track }) => 
      $track === 'black' ? theme.colors.contentOnColor : theme.colors.backgroundHigh
    };
  }

  .ant-progress-indicator {
    display: none;
  }
`

const getRangeColor = (percent: number): string => {
  if (percent <= 50) return theme.colors.semanticSuccess
  if (percent <= 75) return theme.colors.semanticWarning
  if (percent > 75) return theme.colors.semanticDanger
}

export function Progress({ 
  track = 'grey',
  colorMode = 'range',
  fixedColor,
  percent = 0,
  ...props 
}: ProgressProps): React.ReactElement {
  const strokeColor = colorMode === 'range' ? getRangeColor(percent) : fixedColor ? getFixedColor(fixedColor) : undefined

  return (
    <StyledProgress 
      $track={track} 
      percent={percent} 
      strokeColor={strokeColor}
      {...props} 
    />
  )
}