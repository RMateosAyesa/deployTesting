import { FieldValidationError } from '../errors/field-validation.error'

import { ValueObject } from './value-object'

export class NumberValueObject extends ValueObject<{ value: number }> {
  get value(): number {
    return this.props.value
  }

  protected constructor(value: number) {
    super({ value })
  }

  static create(property: string, value: number): NumberValueObject {
    if (value == null) {
      throw new FieldValidationError(`Property ${property} must be provided`)
    }

    this.validateNumber(property, value)

    return new NumberValueObject(value)
  }

  static createOptional(property: string, value?: number): NumberValueObject | undefined {
    if (value == null) {
      return undefined
    }

    this.validateNumber(property, value)

    return new NumberValueObject(value)
  }

  private static validateNumber(property: string, value: number): void {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new FieldValidationError(`Property ${property} must be a number`)
    }
  }
}
