import React from 'react'
import { Tag } from 'antd'
import styled from 'styled-components'

export type BadgeVariant = 'success' | 'warning'

export interface BadgeProps {
  text: string
  variant?: BadgeVariant
}

const variantColors: Record<BadgeVariant, string> = {
  success: 'semanticSuccess',
  warning: 'semanticWarning',
}

const StyledBadge = styled(Tag)<{ $variant: BadgeVariant }>`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.info.fontWeight };
  padding: ${({ theme }) => theme.padding.tag };
  border: 1px solid ${({ theme, $variant }) => theme.colors[variantColors[$variant]]};
  color: ${({ theme, $variant }) => theme.colors[variantColors[$variant]]};
  background-color: ${({ theme, $variant }) => theme.colors[variantColors[$variant]]}20;
  height: 29px;
  width: fit-content;
  display: flex;
  align-items: center;
`

export function Badge({ text, variant = 'success' }: BadgeProps): React.ReactElement {
  return (
    <StyledBadge $variant={variant}>
      {text}
    </StyledBadge>
  )
}
