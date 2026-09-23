import React from 'react'
import { BaseTemplate, BaseTemplateProps } from '../BaseTemplate'
import { NodeCard, NodeCardData } from '../../Organisms/NodeCard'
import { theme } from '../../../../styles/theme'

export interface AnomalyScenarioTemplateProps extends Omit<BaseTemplateProps, 'children'> {
  title: string
  description: string
  nodeCardData: NodeCardData
  onAnomalyOptionChange?: (value: string) => void
}

export function AnomalyScenarioTemplate({
  sidebar,
  title,
  description,
  nodeCardData,
  onAnomalyOptionChange,
}: AnomalyScenarioTemplateProps): React.ReactElement {
  return (
    <BaseTemplate sidebar={sidebar} title={title} description={description}>
      <NodeCard data={nodeCardData} onAnomalyOptionChange={onAnomalyOptionChange} style={{ marginTop: theme.spacing.lg }} />
    </BaseTemplate>
  )
}
