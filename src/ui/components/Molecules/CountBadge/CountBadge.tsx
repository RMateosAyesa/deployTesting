import React from 'react'
import type { TooltipPlacement } from 'antd/es/tooltip'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Tooltip } from '../../Atoms/Tooltip'

export type CountBadgeVariant = 'default' | 'metricSelector'

export interface CountBadgeProps {
  count: number
  items: string[]
  placement?: TooltipPlacement
  variant?: CountBadgeVariant
  color?: string
}

const getBadgeStyles = (
  variant: CountBadgeVariant,
  color?: string
) => {
  const baseColor = color || theme.colors.semanticPrimary

  switch (variant) {
    case 'metricSelector':
      return {
        background:
          theme.colors.anomalyFlag,
        color:
          theme.colors.backgroundHigh,
        border: 'none',
        radius: '999px',
        minWidth: '28px',
        height: '24px',
      }

    default:
      return {
        background: color ? `${color}26` : `${theme.colors.semanticPrimary}26`,
        color: baseColor,
        border: `${theme.borderSize.sm} solid ${baseColor}`,
        radius: theme.borderRadius.xs,
        minWidth: '16px',
        height: '18px',
      }
  }
}
const Badge = styled.span<{$variant: CountBadgeVariant; $color?: string}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 16px;
  height: 18px;
  padding: ${({ theme }) => theme.padding.badge};
  border: ${({ $variant, $color }) => getBadgeStyles($variant, $color).border};
  border-radius: ${({ $variant, $color }) => getBadgeStyles($variant, $color).radius};
  color: ${({ $variant, $color }) => getBadgeStyles($variant, $color).color};
  background-color: ${({ $variant, $color }) => getBadgeStyles($variant, $color).background};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.badge.fontSize};
  font-weight: ${({ theme }) => theme.typography.badge.fontWeight};
  line-height: ${({ theme }) => theme.typography.badge.lineHeight};
  cursor: default;
`

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.contentMid};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
`

const tooltipStyles = {
  container: {
    backgroundColor: theme.colors.backgroundLowest,
    color: theme.colors.baseColor,
    padding: '8px 12px',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.bodyMedium.fontSize,
    fontWeight: theme.typography.bodyMedium.fontWeight,
    lineHeight: theme.typography.bodyMedium.lineHeight,
  },
}

export function CountBadge({
  count,
  items,
  placement = 'rightTop',
  variant = 'default',
  color,
}: CountBadgeProps): React.ReactElement {
  const tooltipContent = (
    <TooltipContent>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </TooltipContent>
  )

  return (
    <Tooltip title={tooltipContent} placement={placement} styles={tooltipStyles}>
      <Badge $variant={variant} $color={color} aria-label={`${count} linked items`}>
        {count}
      </Badge>
    </Tooltip>
  )
}
