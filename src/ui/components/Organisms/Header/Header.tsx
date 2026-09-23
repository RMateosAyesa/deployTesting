import React from 'react'
import styled from 'styled-components'
import { Avatar } from '../../Atoms/Avatar'
import { IconAtom } from '../../Atoms/Icon'
import logoSrc from '/src/assets/images/optima-dones_logo_negativo.png'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  width: 100%;
  padding: ${({ theme }) => theme.padding.card} ${({ theme }) => theme.padding.card} ${({ theme }) => theme.padding.card} ${({ theme }) => theme.padding.lg};
  background-color: ${({ theme }) => theme.colors.backgroundLow};
`

const Logo = styled.img`
  height: 40px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

export function Header(): React.ReactElement {
  return (
    <Container>
      <Logo src={logoSrc} alt="Optima DONES" />
      <RightSection>
        <IconAtom name="gear" size="l" color="secondary" />
        <Avatar name="Optima Dones" />
      </RightSection>
    </Container>
  )
}
