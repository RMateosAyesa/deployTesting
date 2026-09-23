import React from 'react'
import { Tabs, TabPaneProps } from 'antd'
import styled from 'styled-components'
import { IconProps } from '../Icon'

export interface TabItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactElement<IconProps>
  children?: React.ReactNode
  disabled?: boolean
}

export type TabSize = 'default' | 'small'

export interface TabProps extends Omit<TabPaneProps, 'tab'> {
  items: TabItem[]
  activeKey?: string
  onChange?: (key: string) => void
  defaultActiveKey?: string
  size?: TabSize
}

const sizeStyles = {
  default: {
    fontSize: 'bodyLarge',
  },
  small: {
    fontSize: 'bodyMedium',
  },
}

const StyledTabs = styled(Tabs)<{ $size: TabSize }>`
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-nav::before {
    border-bottom: none !important;
  }

  .ant-tabs-nav-list {
    width: 100%;
    display: flex;
  }

  .ant-tabs-tab {
    flex: 1;
    font-weight: ${({ theme }) => theme.typography.bodyLargeBold.fontWeight};
    padding: 8px 0px;
    margin: 0;
    transition: all 0.2s ease;
    color: ${({ theme }) => theme.colors.contentHigh} !important;
    font-size: ${({ theme, $size }) => theme.typography[sizeStyles[$size].fontSize as keyof typeof theme.typography].fontSize};
    justify-content: center;

    &:hover {
      color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    }

    &:hover .ant-tabs-tab-icon > span, 
    &:hover .ant-tabs-tab-icon svg {
      color: ${({ theme }) => theme.colors.semanticPrimary} !important;
    }
  }

  .ant-tabs-tab-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .ant-tabs-tab-icon {
    margin-inline-end: 8px !important;

    & > span {
      padding-top: 6px;
  }
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.semanticPrimary} !important;
  }

  .ant-tabs-tab-active .ant-tabs-tab-icon > span,
  .ant-tabs-tab-active .ant-tabs-tab-icon svg,
  .ant-tabs-tab-active .ant-tabs-tab-icon > span svg {
    color: ${({ theme }) => theme.colors.semanticPrimary} !important;
  }

  .ant-tabs-ink-bar {
    background: ${({ theme }) => theme.colors.semanticPrimary};
    height: 2px;
  }
`

const TabLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  
  & > span {
    display: inline-flex;
    align-items: center;
  }
`

export function Tab({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  size = 'default',
}: TabProps): React.ReactElement {
  return (
    <StyledTabs
      $size={size}
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      items={items.map((item) => ({
        ...item,
        key: item.key,
        tab: (
          <TabLabel>
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </TabLabel>
        ),
      }))}
    />
  )
}
