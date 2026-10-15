import { Entity, type Primitives } from '../../../shared/domain/entities/entity'
import { BooleanValueObject } from '../../../shared/domain/value-objects/boolean.value-object'
import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { NumberValueObject } from '../../../shared/domain/value-objects/number.value-object'
import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'
import { TimestampValueObject } from '../../../shared/domain/value-objects/timestamp.value-object'
import { SensorDataSource, SensorLocation, SensorOrigin } from '../enums'

type SensorMetricValueObject =
  | NumberValueObject
  | StringValueObject
  | BooleanValueObject

export interface SensorMetricProperties {
  sensorId: StringValueObject
  value: SensorMetricValueObject
  timestamp: TimestampValueObject
  dataFrom: EnumValueObject
  origin: EnumValueObject
  location: EnumValueObject
  variable: StringValueObject
}

export type SensorMetricValue = Primitives<SensorMetricProperties>

export class SensorMetric extends Entity<SensorMetricProperties> {
  get value(): SensorMetricValue {
    return {
      sensorId: this.props.sensorId.value,
      value: this.props.value.value,
      timestamp: this.props.timestamp.value,
      dataFrom: this.props.dataFrom.value,
      origin: this.props.origin.value,
      location: this.props.location.value,
      variable: this.props.variable.value,
    }
  }

  static create(value: SensorMetricValue): SensorMetric {
    return new SensorMetric({
      sensorId: StringValueObject.create('sensorId', value.sensorId),
      value: this.createValue(value.value),
      timestamp: TimestampValueObject.create('timestamp', value.timestamp),
      dataFrom: EnumValueObject.initiate('dataFrom', value.dataFrom, SensorDataSource),
      origin: EnumValueObject.initiate('origin', value.origin, SensorOrigin),
      location: EnumValueObject.initiate('location', value.location, SensorLocation),
      variable: StringValueObject.create('variable', value.variable),
    })
  }

  private static createValue(value: number | string | boolean): SensorMetricValueObject {
    if (typeof value === 'number') {
      return NumberValueObject.create('value', value)
    }

    if (typeof value === 'string') {
      return StringValueObject.create('value', value)
    }

    return BooleanValueObject.create('value', value)
  }
}
