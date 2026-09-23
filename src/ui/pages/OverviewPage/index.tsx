import React from 'react'

import { OverviewTemplate } from '../../components/Templates/OverviewTemplate'
import type { SidebarProps } from '../../components/Organisms/Sidebar'

import {
  overviewSidebar,
  overviewPageData,
  overviewNodes,
  metricSelectorGroups,
  addMetrics,
  showIOC,
  changeTimeRange,
} from './Overview.service'

export interface OverviewPageProps {
  sidebar?: SidebarProps
  onAddMetrics?: (nodeId: string) => Promise<void>
  onShowIOC?: (nodeId: string) => Promise<void>
  onTimeRangeChange?: (
    nodeId: string,
    value: string
  ) => Promise<void>
}

export function OverviewPage({
  sidebar,
  onAddMetrics = addMetrics,
  onShowIOC = showIOC,
  onTimeRangeChange = changeTimeRange,
}: OverviewPageProps): React.ReactElement {
  const nodes = overviewNodes.map((node) => ({
    ...node,

    onAddMetrics: async () => {
      await onAddMetrics(node.id)
    },

    onShowIOC: () => {
      void onShowIOC(node.id)
    },

    onTimeRangeChange: (value: string) => {
      void onTimeRangeChange(node.id, value)
    },
  }))

  return (
    <OverviewTemplate
      sidebar={sidebar ?? overviewSidebar}
      title={overviewPageData.title}
      description={overviewPageData.description}
      nodes={nodes}
      metricSelectorGroups={metricSelectorGroups}
    />
  )
}

export default OverviewPage