import { FieldValidationError } from '../errors/field-validation.error'

import { NumberValueObject } from './number.value-object'

export class PositiveIntegerValueObject extends NumberValueObject {
  static override create(property: string, value: number): PositiveIntegerValueObject {
    super.create(property, value)
    this.validatePositiveInteger(property, value)

    return new PositiveIntegerValueObject(value)
  }

  static override createOptional(
    property: string,
    value?: number,
  ): PositiveIntegerValueObject | undefined {
    if (value == null) {
      return undefined
    }

    return this.create(property, value)
  }

  private static validatePositiveInteger(property: string, value: number): void {
    if (!Number.isInteger(value)) {
      throw new FieldValidationError(`Property ${property} must be an integer`)
    }

    if (value < 0) {
      throw new FieldValidationError(`Property ${property} must be greater than or equal to 0`)
    }
  }
}
