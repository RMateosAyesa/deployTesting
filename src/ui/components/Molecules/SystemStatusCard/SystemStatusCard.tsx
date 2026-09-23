import React from 'react'
import styled from 'styled-components'

import { Card, CardProps } from '../../Atoms/Card'
import { IconAtom, IconName } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'

export interface SystemStatusCardProps extends CardProps {
  iconName: IconName
  title: string
  label: string
  value: number | string
  unit?: string
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.md};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.contentMid};
`

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Value = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const Unit = styled(Text)`
  color: ${({ theme }) => theme.colors.contentMid};
`
function getIconByTitle(title: string, iconName: IconName): IconName {
  if (title === 'Start TOD') {
    return 'radioButton'
  }

  return iconName
}

export function SystemStatusCard({
  iconName,
  title,
  label,
  value,
  unit,
  variant = 'default',
  background = 'low',
  padding = 'card',
  className,
}: SystemStatusCardProps): React.ReactElement {
  return (
    <Container
      variant={variant}
      background={background}
      padding={padding}
      className={className}
    >
      <Header>
        <IconAtom
          name={getIconByTitle(title, iconName)}
          size="xl"
          color="primary"
        />

        <Title variant="h5">
          {title}
        </Title>
      </Header>

      <Label variant="bodyLarge">
        {label}
      </Label>

      <ValueRow>
        <Value variant="h1">
          {value}
        </Value>

        {unit && (
          <Unit variant="h3">
            {unit}
          </Unit>
        )}
      </ValueRow>
    </Container>
  )
}