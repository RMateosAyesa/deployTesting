import { FieldValidationError } from '../errors/field-validation.error'

import { ValueObject } from './value-object'

export class StringValueObject extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value
  }

  protected constructor(value: string) {
    super({ value })
  }

  static create(property: string, value: string): StringValueObject {
    if (value == null) {
      throw new FieldValidationError(`Property ${property} must be provided`)
    }

    this.validateString(property, value)

    return new StringValueObject(value)
  }

  static createOptional(property: string, value?: string): StringValueObject | undefined {
    if (value == null) {
      return undefined
    }

    this.validateString(property, value)

    return new StringValueObject(value)
  }

  private static validateString(property: string, value: string): void {
    if (typeof value !== 'string') {
      throw new FieldValidationError(`Property ${property} must be a string`)
    }

    if (value.length === 0) {
      throw new FieldValidationError(`Property ${property} must be a non-empty string`)
    }
  }
}
