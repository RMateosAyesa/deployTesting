import React from 'react'
import styled from 'styled-components'
import { Card, CardProps } from '../../Atoms/Card'
import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'

export interface SensorSummaryCardData {
  title: string
  baseValue: string | number
  unit?: string
  distributionModel: string
  standardDeviation: string | number
  eventInjectionCount: number
  eventInjectionLabel?: string
  refreshRate: string
  driftFactor: string | number
}

export interface SensorSummaryCardProps extends CardProps {
  data: SensorSummaryCardData
  onSettingsClick?: () => void
}

const SensorSummaryCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 408px;
  padding: ${({ theme }) => theme.padding.sm};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding-left: ${({ theme }) => theme.spacing.md};
  min-height: 40px;
`

const SettingsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: ${({ theme }) => theme.colors.semanticPrimary};
  background: transparent;
  border: none;
  cursor: pointer;
`

const TitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: ${({ theme }) => theme.spacing.lg};
  row-gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.padding.md} ${theme.spacing.md} ${theme.spacing.md}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentHigh};
`

const ValueText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentMid};
`

const BaseValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.contentMid};
`

const UnitText = styled(Text)`
  color: ${({ theme }) => theme.colors.contentMid};
`

const EventValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ActiveEventIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.semanticPrimary};
  background-color: ${({ theme }) => theme.colors.semanticPrimary}33;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`

const InactiveEventIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.contentMid};
  background-color: ${({ theme }) => theme.colors.contentMid}33;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`

const EventText = styled(Text)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.semanticPrimary : theme.colors.contentHigh};
`

export function SensorSummaryCard({
  data,
  onSettingsClick,
  background = 'low',
  padding = 'none',
  className,
}: SensorSummaryCardProps): React.ReactElement {
  const {
    title,
    baseValue,
    unit,
    distributionModel,
    standardDeviation,
    eventInjectionCount,
    eventInjectionLabel = 'Active',
    refreshRate,
    driftFactor,
  } = data

  const hasActiveEvents = eventInjectionCount > 0
  const eventInjectionText = hasActiveEvents
    ? `${eventInjectionCount} ${eventInjectionLabel}`
    : 'None'

  return (
    <SensorSummaryCardContainer background={background} padding={padding} className={className}>
      <Header>
        <TitleText variant="h5">
          {title}
        </TitleText>
        <SettingsButton type="button" aria-label="Settings" onClick={onSettingsClick}>
          <IconAtom name="gear" size="l" color="primary" />
        </SettingsButton>
      </Header>

      <DetailsGrid>
        <DetailColumn>
          <DetailItem>
            <LabelText variant="bodyMediumBold">Base value</LabelText>
            <BaseValue>
              <Text variant="h3" as="span">
                {baseValue}
              </Text>
              {unit && <UnitText variant="bodyMedium">{unit}</UnitText>}
            </BaseValue>
          </DetailItem>

          <DetailItem>
            <LabelText variant="bodyMediumBold">Distribution model</LabelText>
            <ValueText variant="bodyLarge">{distributionModel}</ValueText>
          </DetailItem>

          <DetailItem>
            <LabelText variant="bodyMediumBold">STD Dev</LabelText>
            <ValueText variant="bodyLarge">{standardDeviation}</ValueText>
          </DetailItem>
        </DetailColumn>

        <DetailColumn>
          <DetailItem>
            <LabelText variant="bodyMediumBold">Event injection</LabelText>
            <EventValue>
              {hasActiveEvents ? (
                <ActiveEventIcon data-testid="active-event-icon">
                  <IconAtom name="lightning" size="m" color="primary" weight="fill" />
                </ActiveEventIcon>
              ) : (
                <InactiveEventIcon data-testid="inactive-event-icon" aria-hidden="true">
                  <IconAtom name="prohibit" size="m" color="secondary" />
                </InactiveEventIcon>
              )}
              <EventText variant="bodyLargeBold" $isActive={hasActiveEvents}>
                {eventInjectionText}
              </EventText>
            </EventValue>
          </DetailItem>

          <DetailItem>
            <LabelText variant="bodyMediumBold">Refresh rate</LabelText>
            <ValueText variant="bodyLarge">{refreshRate}</ValueText>
          </DetailItem>

          <DetailItem>
            <LabelText variant="bodyMediumBold">Drift factor</LabelText>
            <ValueText variant="bodyLarge">{driftFactor}</ValueText>
          </DetailItem>
        </DetailColumn>
      </DetailsGrid>
    </SensorSummaryCardContainer>
  )
}
