import React from 'react'

import { IocServerTemplate } from '../../components/Templates/IocServerTemplate'

import {
  sidebar,
  iocServerData,
  goBack,
  exportTraceabilityCsv,
  exportEventCsv,
} from './IocServerStatus.service'

export interface IocServerStatusPageProps {
  onBack?: () => void
  onTraceabilityAction?: () => void
  onEventAction?: () => void
}

export function IocServerStatusPage({
  onBack = goBack,
  onTraceabilityAction = exportTraceabilityCsv,
  onEventAction = exportEventCsv,
}: IocServerStatusPageProps): React.ReactElement {
  return (
    <IocServerTemplate
      sidebar={sidebar}
      data={iocServerData}
      onBack={onBack}
      onTraceabilityAction={onTraceabilityAction}
      onEventAction={onEventAction}
    />
  )
}

export default IocServerStatusPage