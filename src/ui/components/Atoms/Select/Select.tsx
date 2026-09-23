import React from 'react'
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import styled, { createGlobalStyle, css } from 'styled-components'

export type SelectStyleVariant = 'standard' | 'minimalist' | 'minimalistSmall' | 'sensorConfig'

export interface SelectProps extends Omit<AntSelectProps, 'variant'> {
  fullWidth?: boolean
  variant?: SelectStyleVariant
}

interface StyledSelectProps {
  $fullWidth?: boolean
  $variant?: SelectStyleVariant
}

const SelectDropdownStyles = createGlobalStyle`
  .ant-select-dropdown.custom-select-dropdown {
    background-color: ${({ theme }) => theme.colors.backgroundMid};
    padding: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border: 1px solid ${({ theme }) => theme.colors.borderMid};
  }

  .ant-select-dropdown.custom-select-dropdown .ant-select-item {
    color: ${({ theme }) => theme.colors.contentHigh};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    padding: 6px 8px;
  }

  .ant-select-dropdown.custom-select-dropdown .ant-select-item:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLowest};
  }

  .ant-select-dropdown.custom-select-dropdown .ant-select-item-option-selected {
    color: ${({ theme }) => theme.colors.semanticPrimary};
    background-color: ${({ theme }) => theme.colors.backgroundMid};
    font-weight: ${({ theme }) => theme.typography.bodyLarge.fontWeight};
  }
`

const StyledSelect = styled(AntSelect)<StyledSelectProps>`
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  min-width: 270px;

  &.ant-select {
    background: ${({ theme }) => theme.colors.backgroundMid};
    color: ${({ theme }) => theme.colors.contentHigh};
    border-color: ${({ theme }) => theme.colors.backgroundLowest};

    &:hover {
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
    }
    &.ant-select-focused {
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.backgroundLowest};
    }
  }

  .ant-select-placeholder {
    color: ${({ theme }) => theme.colors.contentHigh};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
  }

  .ant-select-suffix {
    color: ${({ theme }) => theme.colors.contentHigh};
  }

  .ant-select-content {
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  .ant-select-content-has-value {
    color: ${({ theme }) => theme.colors.contentHigh} !important;
  }

  ${({ $variant, theme }) =>
    $variant === 'sensorConfig' &&
    css`
      min-width: 0;
      height: 40px;

      .ant-select-selector {
        display: flex;
        align-items: center;
        height: 40px !important;
        padding: ${theme.padding.sm} ${theme.padding.md} !important;
        border-color: ${theme.colors.backgroundLowest} !important;
        border-radius: ${theme.borderRadius.sm} !important;
        background-color: ${theme.colors.backgroundMid} !important;
      }

      .ant-select-selection-search {
        inset-inline-start: ${theme.padding.md} !important;
        inset-inline-end: ${theme.padding.md} !important;
      }

      .ant-select-selection-search-input {
        height: 100% !important;
      }

      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        display: flex;
        align-items: center;
        color: ${theme.colors.contentHigh} !important;
        font-size: ${theme.typography.bodyMedium.fontSize} !important;
        line-height: ${theme.typography.bodyMedium.lineHeight} !important;
      }
    `}
`

const MinimalistSelect = styled(AntSelect)<StyledSelectProps>`
  &.ant-select {
    width: fit-content;
    background: transparent;
    border: none;
    box-shadow: none;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
    padding: 0;
  }

  .ant-select-placeholder {
    color: ${({ theme }) => theme.colors.contentMid};
  }

  .ant-select-content-has-value {
    color: ${({ theme }) => theme.colors.contentHigh};
  }

  .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.contentHigh};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
  }

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colors.contentMid};
  }

  .ant-select-suffix {
    color: ${({ theme }) => theme.colors.semanticPrimary};
  }
`

const MinimalistSmallSelect = styled(AntSelect)<StyledSelectProps>`
  &.ant-select {
    width: fit-content;
    background: transparent;
    border: none;
    box-shadow: none;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.info.fontSize};
    font-weight: ${({ theme }) => theme.typography.info.fontWeight};
    line-height: ${({ theme }) => theme.typography.info.lineHeight};
    padding: 0;
  }

  .ant-select-placeholder {
    color: ${({ theme }) => theme.colors.contentMid};
  }

  .ant-select-content-has-value {
    color: ${({ theme }) => theme.colors.contentMid};
  }

  .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.contentHigh};
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.info.fontSize};
    font-weight: ${({ theme }) => theme.typography.info.fontWeight};
    line-height: ${({ theme }) => theme.typography.info.lineHeight};
  }

  .ant-select-single:not(.ant-select-customize).ant-select-open .ant-select-content {
    color: ${({ theme }) => theme.colors.contentHigh} ;
}

  .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colors.contentMid}
  }

  .ant-select-suffix {
    color: ${({ theme }) => theme.colors.semanticPrimary};
  }
`

export function Select({ 
  fullWidth = false, 
  variant = 'standard',
  ...props 
}: SelectProps): React.ReactElement {
  const SelectComponent = 
    variant === 'minimalist' ? MinimalistSelect : 
    variant === 'minimalistSmall' ? MinimalistSmallSelect : StyledSelect

  return (
    <>
      <SelectDropdownStyles />
      <SelectComponent 
        $fullWidth={fullWidth}
        $variant={variant}
        classNames={{ popup: { root: 'custom-select-dropdown' } }}
        {...props} 
      />
    </>
  )
}
