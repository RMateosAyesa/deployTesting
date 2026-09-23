import React from 'react'
import { BaseTemplate, BaseTemplateProps } from '../BaseTemplate'
import { SensorConfigForm, SensorConfigFormProps } from '../../Organisms/SensorConfigForm'

export interface SensorConfigurationTemplateProps extends Omit<BaseTemplateProps, 'children'> {
  sensorConfigForm: SensorConfigFormProps
}

export function SensorConfigurationTemplate({
  sidebar,
  sensorConfigForm,
}: SensorConfigurationTemplateProps): React.ReactElement {
  return (
    <BaseTemplate sidebar={sidebar}>
      <SensorConfigForm {...sensorConfigForm} />
    </BaseTemplate>
  )
}
