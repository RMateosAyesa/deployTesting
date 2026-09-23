import React from 'react'
import styled from 'styled-components'
import { Button } from '../../Atoms/Button'
import { DataTable, DataTableProps } from '../../Atoms/DataTable'

export interface SensorDataConfigTableProps extends DataTableProps {
  clearButtonLabel?: string
  onClearLogEntries?: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`

const TableWrapper = styled.div`
  width: 100%;
`

const ClearButton = styled(Button)`
  width: 157px;
  height: 32px;
  padding: 6px 15px;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};
`

export function SensorDataConfigTable({
  clearButtonLabel = 'Clear all log entries',
  onClearLogEntries,
  ...tableProps
}: SensorDataConfigTableProps): React.ReactElement {
  return (
    <Container>
      <Actions>
        <ClearButton variant="filled" fontSize="small" onClick={onClearLogEntries}>
          {clearButtonLabel}
        </ClearButton>
      </Actions>
      <TableWrapper>
        <DataTable {...tableProps} />
      </TableWrapper>
    </Container>
  )
}
