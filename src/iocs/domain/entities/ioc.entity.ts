import { Entity, type Primitives } from '../../../shared/domain/entities/entity'
import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { StringValueObject } from '../../../shared/domain/value-objects/string.value-object'

import { IocLocation, IocOrigin, IocServer } from '../enums'

export interface IocProperties {
  name: StringValueObject
  origin: EnumValueObject
  location: EnumValueObject
  server: EnumValueObject
}

export type IocValue = Primitives<IocProperties>

export class Ioc extends Entity<IocProperties> {
  get value(): IocValue {
    return {
      name: this.props.name.value,
      origin: this.props.origin.value,
      location: this.props.location.value,
      server: this.props.server.value,
    }
  }

  static create(value: IocValue): Ioc {
    return new Ioc({
      name: StringValueObject.create('name', value.name),
      origin: EnumValueObject.initiate('origin', value.origin, IocOrigin),
      location: EnumValueObject.initiate('location', value.location, IocLocation),
      server: EnumValueObject.initiate('server', value.server, IocServer),
    })
  }
}
