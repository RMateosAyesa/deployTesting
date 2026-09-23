import React from 'react'
import { Table as AntTable } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import type { TablePaginationConfig } from 'antd/es/table'
import styled from 'styled-components'
import { Button } from '../Button'

export type DataTableRecord = Record<string, React.ReactNode> & {
  key?: React.Key
}

export interface DataTableProps extends Omit<TableProps<DataTableRecord>, 'columns' | 'dataSource'> {
  columns: TableColumnsType<DataTableRecord>
  data: DataTableRecord[]
}

const StyledTable = styled(AntTable<DataTableRecord>)`
  .ant-table {
    color: ${({ theme }) => theme.colors.contentHigh};
    background: transparent;
    border-radius: 0;
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  .ant-table-container,
  .ant-table-content,
  .ant-table-tbody {
    background: transparent;
    border-radius: 0;
  }

  .ant-table-container {
    border: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  .ant-table-thead > tr > th {
    padding: 13px ${({ theme }) => theme.spacing.sm} 14px;
    color: ${({ theme }) => theme.colors.contentHigh};
    background: ${({ theme }) => theme.colors.backgroundLowest};
    border-bottom: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
    border-inline-end: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMediumBold.fontWeight};
    line-height: 18px;
    border-radius: 0 !important;
  }

  .ant-table-thead > tr > th::before {
    display: none;
  }

  .ant-table-tbody > tr > td {
    padding: 11px ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.contentHigh};
    background: transparent;
    border-bottom: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
    border-inline-end: ${({ theme }) => theme.borderSize.sm} solid ${({ theme }) => theme.colors.backgroundLowest};
    font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
    line-height: 18px;
    transition: none;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }

  .ant-table-tbody > tr:hover > td {
    background: transparent !important;
  }

  .ant-table-tbody > tr > td.ant-table-cell-row-hover,
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: transparent !important;
  }

  .ant-table-thead > tr > th:last-child,
  .ant-table-tbody > tr > td:last-child {
    border-inline-end: none;
  }

  .ant-pagination {
    margin: ${({ theme }) => theme.spacing.md} 0 0;
  }

  .ant-pagination .ant-pagination-item,
  .ant-pagination .ant-pagination-prev,
  .ant-pagination .ant-pagination-next {
    min-width: auto;
    height: auto;
    margin-inline-end: ${({ theme }) => theme.spacing.xs};
    background: transparent;
    border: none;
  }

  .ant-pagination .ant-pagination-item-active {
    background: transparent;
    border: none;
  }

`

const PaginationButton = styled(Button)`
  min-width: 32px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  line-height: ${({ theme }) => theme.typography.bodyMedium.lineHeight};

  .ant-pagination-item-active & {
    background-color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    border-color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    color: ${({ theme }) => theme.colors.contentOnColor} !important;
  }
`

const getPaginationConfig = (
  pagination: DataTableProps['pagination'],
  totalRows: number
): false | TablePaginationConfig => {
  if (!pagination) {
    return false
  }

  const paginationConfig = pagination
  const pageSize = paginationConfig.pageSize || paginationConfig.defaultPageSize || 10
  const lastPage = Math.max(1, Math.ceil((paginationConfig.total || totalRows) / pageSize))

  return {
    ...paginationConfig,
    itemRender: (page, type, originalElement) => {
      if (type === 'jump-next' || type === 'jump-prev') {
        return originalElement
      }

      const label = type === 'prev'
        ? '<'
        : type === 'next'
          ? '>'
          : String(page)
      const isDisabled = (type === 'prev' && page < 1) || (type === 'next' && page > lastPage)

      return (
        <PaginationButton
          variant="outlined"
          fontSize="small"
          disabled={isDisabled}
        >
          {label}
        </PaginationButton>
      )
    },
  }
}

export function DataTable({
  columns,
  data,
  rowKey = 'key',
  pagination = false,
  ...props
}: DataTableProps): React.ReactElement {
  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={getPaginationConfig(pagination, data.length)}
      {...props}
    />
  )
}
