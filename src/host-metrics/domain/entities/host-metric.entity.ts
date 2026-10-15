import { Entity, Primitives } from '../../../shared/domain/entities/entity'
import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { NumberValueObject } from '../../../shared/domain/value-objects/number.value-object'
import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'
import { TimestampValueObject } from '../../../shared/domain/value-objects/timestamp.value-object'

import { HostMetricType } from '../enums/host-metric-type.enum'

export type HostMetricProperties = {
  type: EnumValueObject
  subtype: StringValueObject
  value: NumberValueObject
  timestamp: TimestampValueObject
  visibleName: StringValueObject
}

export type HostMetricValue = Primitives<HostMetricProperties>

export class HostMetric extends Entity<HostMetricProperties> {
  get value(): HostMetricValue {
    return {
      type: this.props.type.value,
      subtype: this.props.subtype.value,
      value: this.props.value.value,
      timestamp: this.props.timestamp.value,
      visibleName: this.props.visibleName.value,
    }
  }

  static create(props: HostMetricValue): HostMetric {
    return new HostMetric({
      type: EnumValueObject.initiate('type', props.type, HostMetricType),
      subtype: StringValueObject.create('subtype', props.subtype),
      value: NumberValueObject.create('value', props.value),
      timestamp: TimestampValueObject.create('timestamp', props.timestamp),
      visibleName: StringValueObject.create('visibleName', props.visibleName),
    })
  }
}