import React from 'react'
import styled from 'styled-components'
import { NavItem, NavItemData } from '../../Molecules/NavItem'
import { Text } from '../../Atoms/Text'

export interface SidebarProps {
  items: NavItemData[]
  activeId?: string
  onSelect?: (id: string) => void
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundLow};
`

const Title = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.contentMid};
`

const NavSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export function Sidebar({
  items,
  activeId,
  onSelect,
}: SidebarProps): React.ReactElement {
  return (
    <Container>
      <Title variant="bodyMedium">Menu</Title>

      <NavSection>
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </NavSection>
    </Container>
  )
}