import React from 'react'
import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

export type AccordionVariant = 'default' | 'primary' | 'metricSelector'

export interface AccordionProps extends CollapseProps {
  variant?: AccordionVariant
}

const getExpandIconColor = (variant: AccordionVariant) => {
  switch (variant) {
    case 'primary':
    case 'metricSelector':
      return theme.colors.semanticPrimary
    default:
      return theme.colors.contentHigh
  }
}

const getHeaderTextColor = (variant: AccordionVariant) => {
  return variant === 'metricSelector' ? theme.colors.semanticPrimary : theme.colors.contentHigh
}

const getBackgroundColor = (variant: AccordionVariant) => {
  switch (variant) {
    case 'metricSelector':
    case 'default':
      return 'transparent'
    default:
      return theme.colors.backgroundLowest 
  }
}

const getHeaderTypography = (variant: AccordionVariant) => {
  return variant === 'metricSelector'
    ? {
        ...theme.typography.info,
        fontWeight: theme.typography.bodyMediumBold.fontWeight,
      }
    : theme.typography.bodyMediumBold
}

const StyledCollapse = styled(Collapse)<{
  $variant: AccordionVariant
}>`
  &.ant-collapse {
    background-color: ${({ $variant }) => getBackgroundColor($variant)};
    border: none;
    border-radius: ${theme.borderRadius.md};
    --ant-collapse-content-bg: ${({ $variant }) => getBackgroundColor($variant)};
    --ant-color-border: transparent;
    
    & .ant-collapse-body  {
      padding: ${({ $variant }) =>
        $variant === 'metricSelector'
          ? `0 16px !important`
          : undefined};
    }

    & .ant-collapse-item {
      border-bottom: none;
      background-color: transparent;
      
      & .ant-collapse-header {
        display: flex;
        align-items: center;
        background-color: transparent;
        color: ${({ $variant }) => getHeaderTextColor($variant)};
        
        font-size: ${({ $variant }) => getHeaderTypography($variant).fontSize};
        font-weight: ${({ $variant }) => getHeaderTypography($variant).fontWeight};
        line-height: ${({ $variant }) => getHeaderTypography($variant).lineHeight};
        
        padding: ${({ $variant }) =>
          $variant === 'metricSelector'
            ? `0 !important`
            : undefined};

        & .ant-collapse-expand-icon {
          color: ${({ $variant }) => getExpandIconColor($variant)};
        }
      }
    }

    & .ant-collapse-content {
      background-color: transparent;
      border-top: none;
    }

    & .ant-collapse-item {
      border-bottom: none;
      background-color: transparent;
      margin-bottom: ${theme.spacing.md};
    }
  }
`

export function Accordion({
  variant = 'default', 
  ...props
}: AccordionProps): React.ReactElement {
  return (
    <StyledCollapse
      $variant={variant}
      {...props}
    />
  )
}