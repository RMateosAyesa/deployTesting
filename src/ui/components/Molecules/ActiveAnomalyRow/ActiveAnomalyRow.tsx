import React from 'react'
import { Row } from 'antd'
import styled from 'styled-components'
import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { Button } from '../../Atoms/Button'
import { Badge, BadgeVariant } from '../../Atoms/Badge'
import { theme } from '../../../../styles/theme'
import { AnomalyOptionType, anomalyConfig } from '../AnomalyOption/AnomalyOption'

export type AnomalyStatus = 'running' | 'scheduled'

export interface ActiveAnomalyRowProps {
  data?: {
    type: AnomalyOptionType
    optionValue: string
    status: AnomalyStatus
    scheduledDate?: string
  }
}

const Container = styled(Row)`
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding.anaomalyRow};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
  height: 46px;
  border-radius: ${({ theme }) => theme.borderRadius.row};
`

const LeftSection = styled(Row)`
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`

const InnerSection = styled(Row)`
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`

const RightSection = styled(Row)`
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`

const StyledBadge = styled(Badge)``

export function ActiveAnomalyRow({ data }: ActiveAnomalyRowProps): React.ReactElement {
  if (!data) {
    return (
      <Container>
      <Text variant="bodyMedium" color={theme.colors.contentMid}>
        None
      </Text>
      </Container>
    )
  }

  const { type, optionValue, status, scheduledDate } = data
  const { name: iconName, options } = anomalyConfig[type]
  const optionLabel = options.find(opt => opt.value === optionValue)?.label || optionValue

  const statusVariantMap: Record<AnomalyStatus, BadgeVariant> = {
    running: 'success',
    scheduled: 'warning',
  }

  const formatScheduledDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayName = days[date.getDay()]
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${dayName}. ${day} - ${hours}:${minutes}`
  }

  return (
    <Container>
      <LeftSection>
        <InnerSection>
          <IconAtom name={iconName} size="l" color="primary" />
          <Text variant="bodyMedium" color={theme.colors.contentHigh}>
            {optionLabel}
          </Text>
        </InnerSection>
        <InnerSection>
          <StyledBadge text={status.charAt(0).toUpperCase() + status.slice(1)} variant={statusVariantMap[status]} />
          {status === 'scheduled' && scheduledDate && (
            <Text variant="bodyMedium" color={theme.colors.contentMid}>
              {formatScheduledDate(scheduledDate)}
            </Text>
          )}
        </InnerSection>
      </LeftSection>
      <RightSection>
        {status === 'running' && (
          <Button variant="filled" fontSize="small">
            Stop anomaly
          </Button>
        )}
        {status === 'scheduled' && (
          <>
            <Button variant="filled" fontSize="small">
              Run now
            </Button>
            <Button variant="filled" fontSize="small">
              Edit
            </Button>
            <Button variant="filled" fontSize="small" customColor={theme.colors.contentMid}>
              Cancel
            </Button>
          </>
        )}
      </RightSection>
    </Container>
  )
}
