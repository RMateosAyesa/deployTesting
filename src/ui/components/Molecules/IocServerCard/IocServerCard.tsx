import React from 'react'
import styled from 'styled-components'

import { Card, CardProps } from '../../Atoms/Card'
import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { Progress } from '../../Atoms/Progress'
import { IconName } from '../../Atoms/Icon/Icon'
import { theme } from '../../../../styles/theme'

export type IocServerItem = {
  label: string
  value: number
}

export interface IocServerCardProps extends CardProps {
  title: string
  subtitle: string
  iconName: IconName
  metrics: IocServerItem[]
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  border: 2px solid transparent;
  transition: border 0.2s ease;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.semanticPrimary};
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MetricsContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHigh};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Label = styled(Text)`
  min-width: 40px;
  color: ${({ theme }) => theme.colors.contentMid};
`

const Value = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
`

const ProgressWrapper = styled.div`
  flex: 1;
`

export function IocServerCard({
  title,
  subtitle,
  iconName,
  metrics,
  variant = 'default',
  background = 'low',
  padding = 'card',
  ...props
}: IocServerCardProps): React.ReactElement {
  return (
    <Container
      variant={variant}
      background={background}
      padding={padding}
      {...props}
    >
      <Header>
        <IconAtom name={iconName} size="xl" color="primary" />

        <HeaderText>
          <Text variant="bodyMediumBold" color={theme.colors.textColor}>
            {title}
          </Text>

          <Text variant="bodyMedium" color={theme.colors.contentMid}>
            {subtitle}
          </Text>
        </HeaderText>
      </Header>

      <MetricsContainer>
        {metrics.map(metric => (
          <MetricRow key={metric.label}>
            <Label variant="bodyMediumBold">
              {metric.label}
            </Label>

            <ProgressWrapper>
              <Progress percent={metric.value} colorMode="range" />
            </ProgressWrapper>

            <Value variant="bodyMediumBold">
              {metric.value}%
            </Value>
          </MetricRow>
        ))}
      </MetricsContainer>
    </Container>
  )
}