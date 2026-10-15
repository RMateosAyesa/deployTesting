import { FieldValidationError } from '../errors/field-validation.error'

import { ValueObject } from './value-object'

export class BooleanValueObject extends ValueObject<{ value: boolean }> {
  get value(): boolean {
    return this.props.value
  }

  protected constructor(value: boolean) {
    super({ value })
  }

  static create(property: string, value: boolean): BooleanValueObject {
    if (value == null) {
      throw new FieldValidationError(`Property ${property} must be provided`)
    }

    this.validateBoolean(property, value)

    return new BooleanValueObject(value)
  }

  static createOptional(property: string, value?: boolean): BooleanValueObject | undefined {
    if (value == null) {
      return undefined
    }

    this.validateBoolean(property, value)

    return new BooleanValueObject(value)
  }

  private static validateBoolean(property: string, value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new FieldValidationError(`Property ${property} must be a boolean`)
    }
  }
}
