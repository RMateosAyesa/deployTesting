import React from 'react'
import styled from 'styled-components'
import { Card, CardProps } from '../../Atoms/Card'
import { IconAtom, IconName, IconSize, IconColor } from '../../Atoms/Icon'
import { Select } from '../../Atoms/Select'
import { Text } from '../../Atoms/Text'
import { Progress, ProgressFixedColorKey, ProgressTrack } from '../../Atoms/Progress'

export type MetricCardMetricType = 'cpu' | 'ram' | 'disk' | 'network'
export type { ProgressFixedColorKey, ProgressTrack }

export interface MetricCardProps extends CardProps {
  iconName: IconName
  iconSize?: IconSize
  iconColor?: IconColor
  iconText?: string
  selectOptions?: { value: string; label: string }[]
  selectValue?: string
  selectOnChange?: (value: string) => void
  progressPercent?: number
  metricType?: MetricCardMetricType
  progressFixedColorKey?: ProgressFixedColorKey
  progressTrack?: ProgressTrack
}

const MetricCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 107px;
`

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const IconText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const formatProgressValue = (value: number, metricType?: MetricCardMetricType): string => {
  if (metricType === 'network') {
    return `${value} Mbps`
  }
  return `${value}%`
}

export function MetricCard({
  iconName,
  iconSize = 'm',
  iconColor = 'primary',
  iconText,
  selectOptions = [],
  selectValue,
  selectOnChange,
  progressPercent = 0,
  metricType,
  progressFixedColorKey,
  progressTrack = 'grey',
  variant = 'default',
  background = 'low',
  padding = 'card',
  className,
  children,
}: MetricCardProps): React.ReactElement {
  const showProgress = metricType !== 'network'

  return (
    <MetricCardContainer 
      variant={variant} 
      background={background}
      padding={padding}
      className={className}
    >
      <IconTextWrapper>
        <IconAtom name={iconName} size={iconSize} color={iconColor} />
        {iconText && (
          <IconText variant="bodyMediumBold">
            {iconText}
          </IconText>
        )}
      </IconTextWrapper>

      {selectOptions.length > 0 && (
        <Select
          variant="minimalistSmall"
          options={selectOptions}
          value={selectValue}
          onChange={selectOnChange}
        />
      )}

      <StyledText variant="h1">
        {formatProgressValue(progressPercent, metricType)}
      </StyledText>

      {showProgress && <Progress percent={progressPercent} fixedColor={progressFixedColorKey} colorMode="fixed" track={progressTrack} />}
      
      {children}
    </MetricCardContainer>
  )
}