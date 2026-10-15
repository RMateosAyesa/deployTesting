import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'
import { Entity, Primitives } from '../../../shared/domain/entities/entity'

import { HostMetricType } from '../enums/host-metric-type.enum'

export type ChartMetricPoint = {
  timestamp: number
  measurement: number
}

export type HostMetricChartProperties = {
  type: EnumValueObject
  subtype: StringValueObject
  points: ChartMetricPoint[]
}

export type HostMetricChartValue = Primitives<HostMetricChartProperties>

export class HostMetricChart extends Entity<HostMetricChartProperties> {
  get value(): HostMetricChartValue {
    return {
      type: this.props.type.value,
      subtype: this.props.subtype.value,
      points: this.props.points,
    }
  }

  static create(
    props: HostMetricChartValue,
  ): HostMetricChart {
    return new HostMetricChart({
      type: EnumValueObject.initiate('type', props.type, HostMetricType),
      subtype: StringValueObject.create('subtype', props.subtype),
      points: props.points,
    })
  }
}
