import React from 'react'
import styled, { css } from 'styled-components'

export type CardVariant = 'default' | 'filled'
export type CardBackground = 'low' | 'high'
export type CardPadding = 'none' | 'xl' | 'card'

export interface CardProps {
  variant?: CardVariant
  background?: CardBackground
  padding?: CardPadding
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  dataTestId?: string
}

interface StyledCardProps {
  $background: CardBackground
  $padding: CardPadding
}

const paddingStyles = {
  none: css`padding: 0;`,
  xl: css`padding: ${({ theme }) => theme.padding.lg};`,
  card: css`padding: ${({ theme }) => theme.padding.card};`,
}

const backgroundStyles = {
  low: css`background-color: ${({ theme }) => theme.colors.backgroundLow};`,
  high: css`background-color: ${({ theme }) => theme.colors.backgroundHigh};`,
}

const StyledCard = styled.div<StyledCardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${({ $padding }) => paddingStyles[$padding]}
  ${({ $background }) => backgroundStyles[$background]}
`

export function Card({ 
  background = 'low',
  padding = 'card',
  children, 
  className,
  style,
  dataTestId,
}: CardProps): React.ReactElement {
  return (
    <StyledCard 
      $background={background}
      $padding={padding}
      className={className}
      style={style}
      data-testid={dataTestId}
    >
      {children}
    </StyledCard>
  )
}