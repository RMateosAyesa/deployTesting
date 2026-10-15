import { FieldValidationError } from '../errors/field-validation.error'

import { TimestampValueObject } from './timestamp.value-object'

describe('TimestampValueObject', () => {
  it('should create a timestamp value object', () => {
    const timestamp = Date.UTC(2026, 7, 27, 10, 0, 0)

    expect(TimestampValueObject.create('timestamp', timestamp).value).toBe(timestamp)
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(TimestampValueObject.createOptional('timestamp')).toBeUndefined()
  })

  it.each([-1, 1.5, Number.MAX_VALUE])('should reject invalid timestamp %s', invalidValue => {
    expect(() => TimestampValueObject.create('timestamp', invalidValue)).toThrow(
      new FieldValidationError('Property timestamp must be a valid timestamp'),
    )
  })
})
