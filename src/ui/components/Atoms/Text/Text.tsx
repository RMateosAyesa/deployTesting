import styled, { css } from 'styled-components'

export type TextVariant = 'h1' | 'h3' | 'h5' | 'bodyLargeBold' | 'bodyLarge' | 'bodyMediumBold' | 'bodyMedium' | 'info'

export interface TextProps {
  variant?: TextVariant
  color?: string
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

const variantStyles = {
  h1: css`
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
  `,
  h3: css`
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
  `,
  h5: css`
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
    line-height: ${({ theme }) => theme.typography.h5.lineHeight};
  `,
  bodyLargeBold: css`
    font-size: ${({ theme }) => theme.typography.bodyLargeBold.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyLargeBold.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyLargeBold.lineHeight};
  `,
  bodyLarge: css`
    font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyLarge.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyLarge.lineHeight};
  `,
  bodyMediumBold: css`
    font-size: ${({ theme }) => theme.typography.bodyMediumBold.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyMediumBold.lineHeight};
  `,
  bodyMedium: css`
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
  `,
  info: css`
    font-size: ${({ theme }) => theme.typography.info.fontSize};
    font-weight: ${({ theme }) => theme.typography.info.fontWeight};
    line-height: ${({ theme }) => theme.typography.info.lineHeight};
  `,
}

const variantTags: Record<TextVariant, string> = {
  h1: 'h1',
  h3: 'h2',
  h5: 'h5',
  bodyLargeBold: 'p',
  bodyLarge: 'p',
  bodyMediumBold: 'p',
  bodyMedium: 'p',
  info: 'p'
}

const StyledText = styled.span<TextProps>`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  ${({ variant = 'bodyMedium' }) => variantStyles[variant]}
  ${({ color }) => color && css`color: ${color};`}
  display: inline-block;
  margin: 0;
`

export function Text({ variant = 'bodyMedium', color, children, className, as }: TextProps) {
  const Tag = as || variantTags[variant]

  return (
    <StyledText as={Tag} variant={variant} color={color} className={className}>
      {children}
    </StyledText>
  )
}
