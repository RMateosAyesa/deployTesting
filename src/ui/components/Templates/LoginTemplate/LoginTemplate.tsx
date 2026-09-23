import React from 'react'
import styled from 'styled-components'
import { LoginCard, LoginCardProps } from '../../Molecules/LoginCard'

export interface LoginTemplateProps extends LoginCardProps {
  backgroundImageSrc?: string
}

export function LoginTemplate({
  backgroundImageSrc = '/src/assets/images/optima-dones_fondo_login.png',
  ...loginCardProps
}: LoginTemplateProps): React.ReactElement {
  return (
    <Page aria-label="Login page" $backgroundImageSrc={backgroundImageSrc}>
      <LoginCard {...loginCardProps} />
    </Page>
  )
}

const Page = styled.main<{ $backgroundImageSrc: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
  background-image: url(${({ $backgroundImageSrc }) => $backgroundImageSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`
