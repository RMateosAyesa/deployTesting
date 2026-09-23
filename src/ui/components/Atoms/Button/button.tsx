import React from 'react'
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd'
import styled, { css } from 'styled-components'
import { IconAtom, type IconColor, type IconName, type IconSize, type IconWeight } from '../Icon'

export type ButtonVariant = 'solid' | 'outlined' | 'filled' | 'text'
export type ButtonFontSize = 'default' | 'small'
export type ButtonSizeVariant = 'default' | 'form'

export interface ButtonProps extends AntButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  fontSize?: ButtonFontSize
  buttonSize?: ButtonSizeVariant
  customColor?: string
  minWidth?: string
  iconName?: IconName
  iconSize?: IconSize
  iconColor?: IconColor
  iconWeight?: IconWeight
}

const baseStyles = css`
  font-weight: ${({ theme }) => theme.typography.bodyLarge.fontWeight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  padding: ${({ theme }) => theme.padding.button};

  &:disabled,
  &.ant-btn-disabled {
    background-color: transparent !important;
    border-color: ${({ theme }) => theme.colors.borderMid} !important;
    color: ${({ theme }) => theme.colors.contentMid} !important;
    opacity: 0.45;
    cursor: not-allowed;
  }
`

const fontSizeStyles: Record<ButtonFontSize, ReturnType<typeof css>> = {
  default: css`
    font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
  `,
  small: css`
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
  `,
}

const buttonSizeStyles: Record<ButtonSizeVariant, ReturnType<typeof css>> = {
  default: css``,
  form: css`
    height: 40px;
    padding: 6px 15px;
    gap: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.button};
  `,
}

const solidStyles = css`
  background-color: ${({ theme }) => theme.colors.semanticPrimary};
  border-color: ${({ theme }) => theme.colors.semanticPrimary};
  color: ${({ theme }) => theme.colors.contentOnColor} !important;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.buttonFillHover} !important;
    border-color: ${({ theme }) => theme.colors.buttonFillHover} !important;
    color: ${({ theme }) => theme.colors.contentOnColor} !important;
  }
`

const outlinedStyles = css`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.semanticPrimary};
  color: ${({ theme }) => theme.colors.semanticPrimary} !important;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.semanticPrimary}15 !important;
    border-color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    color: ${({ theme }) => theme.colors.semanticPrimary} !important;
  }
`

const filledStyles = css`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.semanticPrimary} !important;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.semanticPrimary}15 !important;
    border-color: transparent !important;
    color: ${({ theme }) => theme.colors.semanticPrimary} !important;
  }
`

const textStyles = css`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.contentMid};
  color: ${({ theme }) => theme.colors.contentMid} !important;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.semanticPrimary}15 !important;
    border-color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    color: ${({ theme }) => theme.colors.semanticPrimary} !important;
  }
`

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  solid: solidStyles,
  outlined: outlinedStyles,
  filled: filledStyles,
  text: textStyles,
}

const StyledButton = styled(AntButton)<{
  $variant: ButtonVariant;
  $fontSize: ButtonFontSize;
  $buttonSize: ButtonSizeVariant;
  $customColor?: string;
  $minWidth?: string;
}>`
  ${baseStyles}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fontSize }) => fontSizeStyles[$fontSize]}
  ${({ $buttonSize }) => buttonSizeStyles[$buttonSize]}
  ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `}
  ${({ $variant, $customColor }) =>
    ($variant === 'filled' || $variant === 'text') &&
    $customColor &&
    css`
      color: ${$customColor};
      border-color: ${$variant === 'text' ? $customColor : 'transparent'} !important;
      &:hover:not(:disabled) {
        color: ${$customColor} !important;
        border-color: ${$variant === 'text' ? $customColor : 'transparent'} !important;
        background-color: ${$customColor}15 !important;
      }
    `}
`

export function Button({
  children,
  variant = 'filled',
  fontSize = 'default',
  buttonSize = 'default',
  customColor,
  minWidth,
  iconName,
  iconSize = 'm',
  iconColor = 'primary',
  iconWeight = 'regular',
  ...rest
}: ButtonProps): React.ReactElement {
  return (
    <StyledButton
      $variant={variant}
      $fontSize={fontSize}
      $buttonSize={buttonSize}
      $customColor={customColor}
      $minWidth={minWidth}
      {...rest}
    >
      {iconName && (
        <IconAtom name={iconName} size={iconSize} color={iconColor} weight={iconWeight} />
      )}
      {children}
    </StyledButton>
  )
}
