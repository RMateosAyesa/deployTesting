import { Entity, type Primitives } from '../../../shared/domain/entities/entity'
import { NumberValueObject } from '../../../shared/domain/value-objects/number.value-object'
import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'

export interface IocServerStatusProperties {
  restartCounter: NumberValueObject
  recordCounter: NumberValueObject
  startTod: StringValueObject
  totalCAConnections: NumberValueObject
  activeCAClients: NumberValueObject
  epicsBaseVersion: StringValueObject
  linuxKernelVersion: StringValueObject
}

export type IocServerStatusValue = Primitives<IocServerStatusProperties>

export class IocServerStatus extends Entity<IocServerStatusProperties> {
  get value(): IocServerStatusValue {
    return {
      restartCounter: this.props.restartCounter.value,
      recordCounter: this.props.recordCounter.value,
      startTod: this.props.startTod.value,
      totalCAConnections: this.props.totalCAConnections.value,
      activeCAClients: this.props.activeCAClients.value,
      epicsBaseVersion: this.props.epicsBaseVersion.value,
      linuxKernelVersion: this.props.linuxKernelVersion.value,
    }
  }

  static create(value: IocServerStatusValue): IocServerStatus {
    return new IocServerStatus({
      restartCounter: NumberValueObject.create('restartCounter', value.restartCounter),
      recordCounter: NumberValueObject.create('recordCounter', value.recordCounter),
      startTod: StringValueObject.create('startTod', value.startTod),
      totalCAConnections: NumberValueObject.create('totalCAConnections', value.totalCAConnections),
      activeCAClients: NumberValueObject.create('activeCAClients', value.activeCAClients),
      epicsBaseVersion: StringValueObject.create('epicsBaseVersion', value.epicsBaseVersion),
      linuxKernelVersion: StringValueObject.create('linuxKernelVersion', value.linuxKernelVersion),
    })
  }
}
