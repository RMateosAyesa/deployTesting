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
  compact?: boolean
  title: string
  subtitle: string
  iconName: IconName
  metrics: IocServerItem[]
}

const Container = styled(Card)<{ $compact?: boolean }>`
  ${({ $compact }) => $compact && `
    padding: 10px;
    min-width: 0;
    & p { font-size: 10px; }
  `}
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $compact }) => $compact ? theme.spacing.sm : theme.spacing.md};

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
  min-width: 0;
  overflow-wrap: anywhere;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MetricsContainer = styled.div<{ $compact: boolean }>`
  background: ${({ theme }) => theme.colors.backgroundHigh};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $compact }) => $compact ? '4px' : theme.spacing.sm};
`

const MetricRow = styled.div<{ $compact: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme, $compact }) => $compact ? '4px' : theme.spacing.sm};
`

const Label = styled(Text)<{ $compact: boolean }>`
  min-width: ${({ $compact }) => $compact ? '24px' : '40px'};
  color: ${({ theme }) => theme.colors.contentMid};
`

const Value = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
`

const ProgressWrapper = styled.div`
  flex: 1;
  min-width: 0;
`

export function IocServerCard({
  compact = false,
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
      $compact={compact}
      variant={variant}
      background={background}
      padding={padding}
      {...props}
    >
      <Header>
        <IconAtom name={iconName} size={compact ? 'm' : 'xl'} color="primary" />

        <HeaderText>
          <Text variant="bodyMediumBold" color={theme.colors.textColor}>
            {title}
          </Text>

          {subtitle && <Text variant="bodyMedium" color={theme.colors.contentMid}>
            {subtitle}
          </Text>}
        </HeaderText>
      </Header>

      <MetricsContainer $compact={compact}>
        {metrics.map(metric => (
          <MetricRow key={metric.label} $compact={compact}>
            <Label variant="bodyMediumBold" $compact={compact}>
              {metric.label}
            </Label>

            <ProgressWrapper>
              <Progress
                percent={metric.value}
                colorMode="range"
                {...(compact ? { showInfo: false, size: 'small' as const, strokeWidth: 3, trailColor: theme.colors.backgroundLowest } : {})}
              />
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