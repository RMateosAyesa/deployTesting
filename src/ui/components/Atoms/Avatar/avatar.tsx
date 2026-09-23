import React from 'react'
import styled from 'styled-components'

export interface AvatarProps {
  name?: string
  size?: number
  className?: string
}

function getInitials(name: string): string {
  const words = name
    .split(' ')
    .filter(Boolean)

  const maxLetters = Math.min(words.length, 3)

  return words
    .slice(0, maxLetters)
    .map(word => word[0].toUpperCase())
    .join('')
}

function getColorFromName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${Math.abs(hash) % 360}, 60%, 50%)`
}

const StyledAvatar = styled.div<{ $bg: string; $size: number }>`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  border-radius: ${({ theme }) => theme.borderRadius.md};

  background-color: ${({ $bg }) => $bg};
  color: ${({ theme }) => theme.colors.avatarText};

  font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
`;

export function Avatar({
  name = 'Optima Dones',
  size = 40,
  className,
}: AvatarProps): React.ReactElement {
  const initials = getInitials(name)
  const background = getColorFromName(name)

  return (
    <StyledAvatar $size={size} $bg={background} className={className}>
      {initials}
    </StyledAvatar>
  )
}