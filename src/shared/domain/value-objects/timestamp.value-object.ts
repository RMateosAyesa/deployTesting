import { FieldValidationError } from '../errors/field-validation.error'

import { NumberValueObject } from './number.value-object'

export class TimestampValueObject extends NumberValueObject {
  static override create(property: string, value: number): TimestampValueObject {
    super.create(property, value)
    this.validateTimestamp(property, value)

    return new TimestampValueObject(value)
  }

  static override createOptional(
    property: string,
    value?: number,
  ): TimestampValueObject | undefined {
    if (value == null) {
      return undefined
    }

    return this.create(property, value)
  }

  private static validateTimestamp(property: string, value: number): void {
    const isValidDate = !Number.isNaN(new Date(value).getTime())

    if (!Number.isInteger(value) || value < 0 || !isValidDate) {
      throw new FieldValidationError(`Property ${property} must be a valid timestamp`)
    }
  }
}
