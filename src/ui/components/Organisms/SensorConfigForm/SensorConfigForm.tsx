import React from 'react'
import styled from 'styled-components'
import { Button } from '../../Atoms/Button'
import { IconAtom } from '../../Atoms/Icon'
import { Tab } from '../../Atoms/Tab'
import { Text } from '../../Atoms/Text'
import { FormField } from '../../Molecules/FormField'
import { SensorDataConfigTable } from '../../Molecules/SensorDataConfigTable'
import { theme } from '../../../../styles/theme'
import type { DataTableRecord } from '../../Atoms/DataTable'

export interface SensorConfigFormData {
  title: string
  subtitle: string
  identity: {
    processVariableName: string
    description?: string
    variableType: string
    unit: string
  }
  baseline: {
    baseValue: string
    rangeMin: string
    rangeMax: string
    refreshRate: string
    distributionModel: string
    standardDeviation: string
    driftFactor: string
  }
  eventInjections: SensorConfigFormEvent[]
  historicalLogEntries: SensorConfigFormHistoricalLogEntry[]
}

export interface SensorConfigFormEvent {
  id: string
  eventName: string
  eventType: string
  intensity: string
  chance: string
  startTime: string
  endTime: string
}

export interface SensorConfigFormHistoricalLogEntry {
  id: string
  eventType: string
  eventName: string
  startDate: string
  starDate: string
  intensity: string
  driftFactor: string
}

export interface SensorConfigFormProps {
  data: SensorConfigFormData
  activeEventTab?: 'queue' | 'history'
  onBack?: () => void
  onAddEvent?: () => void
  onRemoveEvent?: (id: string) => void
  onSaveConfiguration?: () => void
  onEventTabChange?: (tab: 'queue' | 'history') => void
  onClearHistoricalLogEntries?: () => void
}

const variableTypeOptions = [
  { value: 'float64', label: 'Float64' },
  { value: 'int', label: 'Int' },
  { value: 'double', label: 'Double' },
  { value: 'boolean', label: 'Boolean' },
]

const unitOptions = [
  { value: 'Cº', label: 'Cº' },
  { value: 'kPa', label: 'kPa' },
  { value: 'ppm', label: 'ppm' },
  { value: 'L/min', label: 'L/min' },
]

const distributionOptions = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Poisson', label: 'Poisson' },
  { value: 'Exponencial', label: 'Exponencial' },
  { value: 'Bernouilli', label: 'Bernouilli' },
]

const eventTypeOptions = [
  { value: 'Spike', label: 'Spike' },
  { value: 'Noise burst', label: 'Noise burst' },
  { value: 'Drift high (↑)', label: 'Drift high (↑)' },
  { value: 'Drift low (↓)', label: 'Drift low (↓)' },
]

const historicalLogColumns = [
  {
    title: 'Event type',
    dataIndex: 'eventType',
    key: 'eventType',
  },
  {
    title: 'Event name',
    dataIndex: 'eventName',
    key: 'eventName',
  },
  {
    title: 'Start date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Star date',
    dataIndex: 'starDate',
    key: 'starDate',
  },
  {
    title: 'Intensity',
    dataIndex: 'intensity',
    key: 'intensity',
  },
  {
    title: 'Drift factor',
    dataIndex: 'driftFactor',
    key: 'driftFactor',
  },
]

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
  color: ${({ theme }) => theme.colors.contentHigh};
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderText = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundLow};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const EventSection = styled(Section)`
  gap: ${({ theme }) => theme.spacing.sm};
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FieldsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

const FieldsGrid = styled.div<{ $columns?: number; $template?: string }>`
  display: grid;
  grid-template-columns: ${({ $columns = 4, $template }) =>
    $template || `repeat(${$columns}, minmax(0, 1fr))`};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const EventSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const EventNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`

const TabsRow = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
`

const TabsContainer = styled.div`
  width: fit-content;
`

const EventCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const EventCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundLowest};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const RemoveEventAction = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
`

const EventFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const DateFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`

export function SensorConfigForm({
  data,
  activeEventTab = 'queue',
  onBack,
  onAddEvent,
  onRemoveEvent,
  onSaveConfiguration,
  onEventTabChange,
  onClearHistoricalLogEntries,
}: SensorConfigFormProps): React.ReactElement {
  const historicalLogData: DataTableRecord[] = data.historicalLogEntries.map((entry) => ({
    key: entry.id,
    eventType: entry.eventType,
    eventName: entry.eventName,
    startDate: entry.startDate,
    starDate: entry.starDate,
    intensity: entry.intensity,
    driftFactor: entry.driftFactor,
  }))
  const eventTabs = [
    {
      key: 'queue',
      label: 'Injection queue',
      icon: <IconAtom name="lightning" size="m" color={activeEventTab === 'queue' ? 'primary' : 'secondary'} />,
    },
    {
      key: 'history',
      label: 'Historical log',
      icon: <IconAtom name="clock" size="m" color={activeEventTab === 'history' ? 'primary' : 'secondary'} />,
    },
  ]

  return (
    <Page>
      <Header>
        <Button
          htmlType="button"
          variant="filled"
          iconName="arrowUUpLeft"
          iconSize="xl"
          iconColor="primary"
          aria-label="Go back"
          onClick={onBack}
        />
        <HeaderText>
          <Text variant="h3" color={theme.colors.contentHigh}>{data.title}</Text>
          <Text variant="bodyMedium" color={theme.colors.contentMid}>{data.subtitle}</Text>
        </HeaderText>
      </Header>

      <FormPanel>
        <Section>
          <SectionTitle>
            <Text variant="bodyLargeBold" color={theme.colors.semanticPrimary}>1.</Text>
            <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>Identity & Meta</Text>
          </SectionTitle>
          <FieldsGrid>
            <FormField appearance="sensorConfig" label="Process variable name" inputProps={{ value: data.identity.processVariableName, readOnly: true }} />
            <FormField appearance="sensorConfig" label="Description" inputProps={{ value: data.identity.description || '', placeholder: 'Add a short description', readOnly: true }} />
            <FormField appearance="sensorConfig"
              label="Variable type"
              variant="select"
              selectProps={{ value: data.identity.variableType, options: variableTypeOptions }}
            />
            <FormField appearance="sensorConfig"
              label="Unit"
              variant="select"
              selectProps={{ value: data.identity.unit, options: unitOptions }}
            />
          </FieldsGrid>
        </Section>

        <Section>
          <SectionTitle>
            <Text variant="bodyLargeBold" color={theme.colors.semanticPrimary}>2.</Text>
            <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>Baseline modeling</Text>
          </SectionTitle>
          <FieldsStack>
            <FieldsGrid $template="2fr 1fr 1fr 2fr">
              <FormField appearance="sensorConfig" label="Valor base" inputProps={{ value: data.baseline.baseValue, readOnly: true }} />
              <FormField appearance="sensorConfig" label="Range min." inputProps={{ value: data.baseline.rangeMin, readOnly: true }} />
              <FormField appearance="sensorConfig" label="Range max." inputProps={{ value: data.baseline.rangeMax, readOnly: true }} />
              <FormField appearance="sensorConfig" label="Refresh rate (s)" inputProps={{ value: data.baseline.refreshRate, readOnly: true }} />
            </FieldsGrid>
            <FieldsGrid $columns={3}>
              <FormField appearance="sensorConfig"
                label="Distribution model"
                variant="select"
                selectProps={{ value: data.baseline.distributionModel, options: distributionOptions }}
              />
              <FormField appearance="sensorConfig" label="STD Dev" inputProps={{ value: data.baseline.standardDeviation, readOnly: true }} />
              <FormField appearance="sensorConfig" label="Drift factor" inputProps={{ value: data.baseline.driftFactor, readOnly: true }} />
            </FieldsGrid>
          </FieldsStack>
        </Section>

        <EventSection>
          <EventSectionHeader>
            <SectionTitle>
              <Text variant="bodyLargeBold" color={theme.colors.semanticPrimary}>3.</Text>
              <Text variant="bodyLargeBold" color={theme.colors.contentHigh}>Event injections</Text>
            </SectionTitle>
            <Button
              variant="outlined"
              fontSize="default"
              buttonSize="form"
              iconName="plus"
              iconSize="l"
              iconColor="primary"
              onClick={onAddEvent}
            >
              Add event
            </Button>
          </EventSectionHeader>

          <EventNavigation>
            <TabsRow>
              <TabsContainer>
                <Tab
                  items={eventTabs}
                  activeKey={activeEventTab}
                  onChange={(key) => onEventTabChange?.(key as 'queue' | 'history')}
                  size="small"
                />
              </TabsContainer>
            </TabsRow>

            {activeEventTab === 'queue' ? (
              <EventCards>
                {data.eventInjections.map((event) => (
                  <EventCard key={event.id}>
                    <RemoveEventAction>
                      <Button
                        htmlType="button"
                        variant="filled"
                        iconName="x"
                        iconSize="l"
                        iconColor="primary"
                        aria-label={`Remove ${event.eventName}`}
                        onClick={() => onRemoveEvent?.(event.id)}
                      />
                    </RemoveEventAction>
                    <FormField appearance="sensorConfig" label="Event name" inputProps={{ value: event.eventName, readOnly: true }} />
                    <EventFieldsGrid>
                      <FormField appearance="sensorConfig"
                        label="Event type"
                        variant="select"
                        selectProps={{ value: event.eventType, options: eventTypeOptions }}
                      />
                      <FormField appearance="sensorConfig"
                        label="Intensity"
                        tooltipProps={{ title: 'Event intensity value' }}
                        inputProps={{ value: event.intensity, readOnly: true }}
                      />
                      <FormField appearance="sensorConfig"
                        label="Chance"
                        tooltipProps={{ title: 'Event probability' }}
                        inputProps={{ value: event.chance, readOnly: true }}
                      />
                    </EventFieldsGrid>
                    <DateFieldsGrid>
                      <FormField appearance="sensorConfig"
                        label="Start time"
                        variant="datePicker"
                        datePickerProps={{
                          placeholder: event.startTime,
                          format: 'DD/MM/YYYY - HH:mm',
                          showTime: true,
                        }}
                      />
                      <FormField appearance="sensorConfig"
                        label="End time"
                        variant="datePicker"
                        datePickerProps={{
                          placeholder: event.endTime,
                          format: 'DD/MM/YYYY - HH:mm',
                          showTime: true,
                        }}
                      />
                    </DateFieldsGrid>
                  </EventCard>
                ))}
              </EventCards>
            ) : (
              <SensorDataConfigTable
                columns={historicalLogColumns}
                data={historicalLogData}
                onClearLogEntries={onClearHistoricalLogEntries}
              />
            )}
          </EventNavigation>
        </EventSection>
      </FormPanel>

      <Footer>
        <Button
          variant="solid"
          fontSize="default"
          buttonSize="form"
          minWidth="200px"
          onClick={onSaveConfiguration}
        >
          Save configuration
        </Button>
      </Footer>
    </Page>
  )
}
