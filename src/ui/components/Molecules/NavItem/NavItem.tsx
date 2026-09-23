import React from 'react'
import styled from 'styled-components'

import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { Badge } from '../../Atoms/Badge'
import { IconName } from '../../Atoms/Icon/Icon'

export interface NavItemData {
  id: string
  label: string
  iconName: IconName
  badge: string
  children?: NavItemData[]
}

export interface NavItemProps {
  item: NavItemData
  activeId?: string
  level?: number
  onSelect?: (id: string) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled(Text)<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.semanticPrimary : theme.colors.contentHigh};
`

const IconContainer = styled.div<{ $active?: boolean; $isMainItem?: boolean; $level: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $level }) => $level > 0 ? '10px' : '32px'};
  height: ${({ $level }) => $level > 0 ? '10px' : '32px'};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  transition: all 0.2s ease;

  background: ${({ $active, theme, $isMainItem }) =>
    $active && $isMainItem ? theme.colors.semanticPrimary : 'transparent'};

  & svg, & span {
    color: ${({ $active, theme, $isMainItem }) =>
      $active ? $isMainItem ? theme.colors.contentOnColor : theme.colors.semanticPrimary : 'inherit'};
  }
`

const Row = styled.button<{ $active?: boolean; $level: number }>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.contentHigh};
  transition: all 0.2s ease;

  padding: ${({ theme, $level }) => `
    ${$level > 0 ? theme.padding.xs : theme.padding.sm}
    ${theme.padding.md}
    ${$level > 0 ? theme.padding.xs : theme.padding.sm}
    ${$level > 0 ? theme.padding.xl : theme.padding.md}
  `};

  background: ${({ $active, theme }) =>
    $active ? theme.colors.backgroundMid : 'transparent'};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.backgroundLow};
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Children = styled.div`
  display: flex;
  flex-direction: column;
`

const hasActiveChild = (item: NavItemData, activeId?: string): boolean => {
  if (!item.children) return false

  return item.children.some(
    (child) =>
      child.id === activeId || hasActiveChild(child, activeId)
  )
}

export function NavItem({
  item,
  activeId,
  level = 0,
  onSelect,
}: NavItemProps): React.ReactElement {

  const isActive =
    item.id === activeId || hasActiveChild(item, activeId)

  const hasChildren = !!item.children?.length
  const isMainItem = level === 0

  const handleClick = () => {
    onSelect?.(item.id)
  }

  return (
    <Wrapper>
      <Row
        $level={level}
        $active={isActive}
        onClick={handleClick}
        data-testid={`nav-item-${item.id}`}
      >
        <Left>
          <IconContainer $active={isActive} $isMainItem={isMainItem} $level={level}>
            <IconAtom
              name={item.iconName}
              size={level > 0 ? "s" : "xl"}
              color={isActive ? 'primary' : 'secondary'}
            />
          </IconContainer>

          <Label variant="bodyMedium" $active={isActive}>
            {item.label}
          </Label>
        </Left>

        <Right>
          {item.badge && <Badge text={item.badge} />}
        </Right>
      </Row>

      {hasChildren && (
        <Children>
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              activeId={activeId}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </Children>
      )}
    </Wrapper>
  )
}