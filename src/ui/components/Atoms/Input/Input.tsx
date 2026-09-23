import React from 'react'
import { Input as AntInput } from 'antd'
import styled, { css } from 'styled-components'

export type InputVariant = 'standard' | 'sensorConfig'

export interface InputProps {
  hasError?: boolean
  fullWidth?: boolean
  variant?: InputVariant
  placeholder?: string
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface StyledInputProps {
  $hasError?: boolean
  $fullWidth?: boolean
  $variant: InputVariant
}

const StyledInput = styled(AntInput)<StyledInputProps>`
    &.ant-input {
    background-color: ${({ theme }) => theme.colors.backgroundMid};
    border: 1px solid ${({ theme, $hasError: hasError }) => hasError ? theme.colors.semanticDanger : theme.colors.borderMid};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    color: ${({ theme }) => theme.colors.contentMid};
    font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
    padding: ${({ theme }) => theme.padding.sm} ${({ theme }) => theme.padding.md};
    height: 40px;
    width: ${({ $fullWidth: fullWidth }) => fullWidth ? '100%' : 'auto'};

    &::placeholder {
      color: ${({ theme }) => theme.colors.contentMid}40;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.borderLow} !important;
    }

    &:focus, &.ant-input-focused {
      border-color: ${({ theme }) => theme.colors.semanticPrimary} !important;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.semanticPrimary}20 !important;
    }

    ${({ $hasError: hasError, theme }) => hasError && `
      border-color: ${theme.colors.semanticDanger} !important;
      &:focus {
        box-shadow: 0 0 0 2px ${theme.colors.semanticDanger}20 !important;
      }
    `}

    ${({ $variant, theme }) =>
      $variant === 'sensorConfig' &&
      css`
        border-color: ${theme.colors.backgroundLowest};
        color: ${theme.colors.contentHigh};
        font-size: ${theme.typography.bodyMedium.fontSize};
        line-height: ${theme.typography.bodyMedium.lineHeight};
      `}
  }
`

export function Input({
  fullWidth = false,
  hasError = false,
  variant = 'standard',
  ...props
}: InputProps): React.ReactElement {
  return (
    <StyledInput $fullWidth={fullWidth} $hasError={hasError} $variant={variant} {...props} />
  )
}
