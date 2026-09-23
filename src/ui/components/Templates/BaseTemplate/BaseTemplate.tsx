import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Header } from '../../Organisms/Header'
import { Sidebar, SidebarProps } from '../../Organisms/Sidebar'
import { Text } from '../../Atoms/Text'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: auto 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLow};
`

const HeaderArea = styled.div`
  grid-column: 1 / -1;
  grid-row: 1;
`

const SidebarArea = styled.div`
  grid-column: 1;
  grid-row: 2;
  overflow: hidden;
`

const Content = styled.main`
  grid-column: 2;
  grid-row: 2;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
  border-radius: ${({ theme }) => theme.padding.md};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-height: 0;
`

export interface BaseTemplateProps {
  sidebar: SidebarProps
  title?: string
  description?: string
  children: React.ReactNode
}

export function BaseTemplate({ sidebar, title, description, children }: BaseTemplateProps): React.ReactElement {
  const theme = useTheme()
  return (
    <Layout>
      <HeaderArea>
        <Header />
      </HeaderArea>
      <SidebarArea>
        <Sidebar items={sidebar.items} activeId={sidebar.activeId} onSelect={sidebar.onSelect} />
      </SidebarArea>
      <Content>
        {title && <Text variant="h1" color={theme.colors.contentHigh}>{title}</Text>}
        {description && <Text variant="bodyLarge" color={theme.colors.contentHigh}>{description}</Text>}
        <ContentContainer>{children}</ContentContainer>
      </Content>
    </Layout>
  )
}
