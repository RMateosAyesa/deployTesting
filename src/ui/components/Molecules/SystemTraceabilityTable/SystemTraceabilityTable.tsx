import React from 'react'
import styled from 'styled-components'
import { Button } from '../../Atoms/Button'
import { DataTable, DataTableProps } from '../../Atoms/DataTable'
import { Text } from '../../Atoms/Text'

export interface SystemTraceabilityTableProps extends Omit<DataTableProps, 'title'> {
  title?: string
  exportButtonLabel?: string
  onExportCsv?: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.contentMid};
`

const ExportButton = styled(Button)`
  height: 32px;
  padding: 6px 15px;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  border: none !important;
  background: transparent !important;
  box-shadow: none;
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.info.fontWeight};
  line-height: ${({ theme }) => theme.typography.info.lineHeight};
`

export function SystemTraceabilityTable({
  title = 'System Traceability Table',
  exportButtonLabel = 'Export CSV',
  onExportCsv,
  ...tableProps
}: SystemTraceabilityTableProps): React.ReactElement {
  return (
    <Container>
      <Header>
        <Title variant="info">{title}</Title>
        <ExportButton variant="filled" fontSize="small" onClick={onExportCsv}>
          {exportButtonLabel}
        </ExportButton>
      </Header>
      <DataTable {...tableProps} />
    </Container>
  )
}
