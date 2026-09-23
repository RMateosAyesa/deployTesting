import React from 'react'
import styled from 'styled-components'
import { Card, CardProps } from '../../Atoms/Card'
import { IconAtom, IconName } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { CountBadge } from '../../Molecules/CountBadge'

export type LithiumSystemCardVariant = 'standard' | 'valve'

const getValueStyles = (value: string | number): { color: string; weight: string | number } => {
  const str = String(value).toLowerCase()
  const isPositive = str === 'true' || str === 'open'
  const isNegative = str === 'false' || str === 'close'

  if (isPositive) return { color: '#07FFB9', weight: 'bold' }
  if (isNegative) return { color: '#FF4D4D', weight: 'bold' }
  return { color: '#BCBCBC', weight: 'normal' }
}

export interface ValveMetric {
  label: string
  value: string | number
}

export interface LithiumSystemCardProps extends Omit<CardProps, 'variant' | 'children'> {
  variant?: LithiumSystemCardVariant
  title: string
  value?: string | number
  unit?: string
  iconName?: IconName
  count?: number
  countItems?: string[]
  metrics?: ValveMetric[]
  children?: React.ReactNode
}

const Container = styled(Card)<{ $variant: LithiumSystemCardVariant }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: ${({ $variant }) => ($variant === 'valve' ? 'fit-content' : '159px')};
  height: fit-content;
  padding: ${({ theme }) => theme.padding.md};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.backgroundTransKpi};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow:
    0 11px 19.3px 0 rgba(13, 20, 36, 0.1),
    0 6px 40px 0 rgba(0, 0, 0, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.12),
    0 9px 28px 0 rgba(0, 0, 0, 0.05);
`

const Title = styled(Text)`
  && {
    margin: 0;
    color: ${({ theme }) => theme.colors.contentHigh};
    font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const ValueRow = styled.div`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #4b370b;
  border-radius: 50%;
  flex: 0 0 28px;
`

const ValveIconContainer = styled(IconContainer)`
  background-color: ${({ theme }) => theme.colors.semanticSuccess}50;
`

const ValueGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  min-width: 0;
`

const Value = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.contentHigh};
    font-size: 26px;
    line-height: 18px;
  }
`

const Unit = styled(Text)`
  && {
    margin-left: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.contentMid};
    line-height: 18px;
  }
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 36px;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 146px;
`

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  width: 100%;
`

const MetricLabel = styled(Text)`
  && {
    color: ${({ theme }) => theme.colors.contentMid};
  }
`

const MetricValue = styled(Text)<{ $color?: string; $weight?: string | number }>`
  && {
    padding-left: ${({ theme }) => theme.spacing.xs};
    color: ${({ $color, theme }) => $color || theme.colors.contentHigh};
    font-weight: ${({ $weight }) => $weight || 'normal'};
  }
`

export function LithiumSystemCard({
  variant = 'standard',
  title,
  value,
  unit,
  iconName = 'engine',
  count,
  countItems = [],
  metrics,
  background = 'high',
  padding = 'none',
  className,
  children,
}: LithiumSystemCardProps): React.ReactElement {
  if (variant === 'valve') {
    return (
      <Container $variant={variant} background={background} padding={padding} className={className}>
        <TitleRow>
          <ValveIconContainer aria-hidden="true">
            <IconAtom name={iconName} size="m" color="valve" />
          </ValveIconContainer>
          <Title variant="info" as="h5">{title}</Title>          
          {count !== undefined && (
            <CountBadge count={count} items={countItems} color='#07FFB9'/>
          )}
        </TitleRow>
        {metrics && metrics.length > 0 && (
          <MetricsContainer>
            {metrics.map((metric) => (
              <MetricRow key={metric.label}>
                <MetricLabel>{metric.label}</MetricLabel>
                {metric.value && (
                  <MetricValue $color={getValueStyles(metric.value).color} $weight={getValueStyles(metric.value).weight}>
                    {metric.value}
                  </MetricValue>
                )}
              </MetricRow>
            ))}
          </MetricsContainer>
        )}
        {children && <MetricsContainer>{children}</MetricsContainer>}
      </Container>
    )
  }

  return (
    <Container $variant={variant} background={background} padding={padding} className={className}>
      <Title variant="info" as="h5">
        {title}
      </Title>

      <ValueRow>
        <IconContainer aria-hidden="true">
          <IconAtom name="thermometer" size="m" color="primary" />
        </IconContainer>

        <ValueGroup>
          <Value variant="bodyLarge" as="span">
            {value}
          </Value>
          {unit && (
            <Unit variant="bodyLarge" as="span">
              {unit}
            </Unit>
          )}
        </ValueGroup>
      </ValueRow>
    </Container>
  )
}
