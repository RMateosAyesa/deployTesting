import React from 'react'
import styled from 'styled-components'
import { Button } from '../../Atoms/Button'
import { FormField } from '../FormField'
import defaultLogoSrc from '../../../../assets/images/optima-dones_logo_negativo.png'

export interface LoginCardProps {
  emailValue?: string
  passwordValue?: string
  emailPlaceholder?: string
  passwordPlaceholder?: string
  submitLabel?: string
  forgotPasswordLabel?: string
  footerTitle?: string
  footerSubtitle?: string
  logoAlt?: string
  logoSrc?: string
  loading?: boolean
  onEmailChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onForgotPasswordClick?: () => void
}

export function LoginCard({
  emailValue = '',
  passwordValue = '',
  emailPlaceholder = 'email@optima-dones.com',
  passwordPlaceholder = '********',
  submitLabel = 'Access',
  forgotPasswordLabel = 'Forgot password?',
  footerTitle = 'Authorized Personnel Only',
  footerSubtitle = 'v0.0.1  •  Secured Environment',
  logoAlt = 'Optima Dones',
  logoSrc = defaultLogoSrc,
  loading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPasswordClick,
}: LoginCardProps): React.ReactElement {
  return (
    <Wrapper>
      <Card aria-label="Operator login" onSubmit={onSubmit}>
        <Logo src={logoSrc} alt={logoAlt} />

        <Fields>
          <FormField
            label="Operator identity"
            required
            variant="input"
            inputProps={{
              type: 'email',
              value: emailValue,
              placeholder: emailPlaceholder,
              autoComplete: 'email',
              onChange: onEmailChange,
            }}
          />

          <FormField
            label="Password"
            required
            variant="input"
            inputProps={{
              type: 'password',
              value: passwordValue,
              placeholder: passwordPlaceholder,
              autoComplete: 'current-password',
              onChange: onPasswordChange,
            }}
          />
        </Fields>

        <Actions>
          <AccessButton htmlType="submit" variant="solid" loading={loading} block>
            {submitLabel}
          </AccessButton>

          <ForgotPasswordButton type="button" onClick={onForgotPasswordClick}>
            {forgotPasswordLabel}
          </ForgotPasswordButton>
        </Actions>
      </Card>

      <Footer>
        <FooterTitle>{footerTitle}</FooterTitle>
        <FooterSubtitle>{footerSubtitle}</FooterSubtitle>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: min(100%, 353px);
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Card = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  border: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.borderHigh};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.backgroundHigh};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.backgroundLowest};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const Logo = styled.img`
  width: 156px;
  height: auto;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  input.ant-input {
    height: 48px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const AccessButton = styled(Button)`
  &.ant-btn {
    height: 48px;
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
  }
`

const ForgotPasswordButton = styled.button`
  align-self: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.semanticPrimary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.bodyLargeBold.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyLargeBold.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyLargeBold.lineHeight};
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`

const FooterTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.contentMid};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.bodyMediumBold.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyLargeBold.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyMediumBold.lineHeight};
`

const FooterSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.contentMid};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
  line-height: ${({ theme }) => theme.typography.info.lineHeight};
`
