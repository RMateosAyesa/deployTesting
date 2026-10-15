import { FieldValidationError } from '../errors/field-validation.error'

import { StringValueObject } from './string.value-object'

type GenericEnum = Record<string, string | number>

export class EnumValueObject extends StringValueObject {
  static initiate<Enum extends GenericEnum>(
    property: string,
    value: string,
    enumList: Enum,
  ): EnumValueObject {
    super.create(property, value)
    this.validateEnum(property, value, enumList)

    return new EnumValueObject(value)
  }

  static initiateOptional<Enum extends GenericEnum>(
    property: string,
    value: string | undefined,
    enumList: Enum,
  ): EnumValueObject | undefined {
    if (value == null) {
      return undefined
    }

    return this.initiate(property, value, enumList)
  }

  private static validateEnum<Enum extends GenericEnum>(
    property: string,
    value: string,
    enumList: Enum,
  ): void {
    if (!Object.values(enumList).includes(value)) {
      throw new FieldValidationError(
        `Property ${property} must be one of ${Object.values(enumList).join(', ')}`,
      )
    }
  }
}
