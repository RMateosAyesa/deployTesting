import { FieldValidationError } from '../errors/field-validation.error'

import { EnumValueObject } from './enum.value-object'

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

describe('EnumValueObject', () => {
  it('should create an enum value object', () => {
    expect(EnumValueObject.initiate('status', Status.ACTIVE, Status).value).toBe(Status.ACTIVE)
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(EnumValueObject.initiateOptional('status', undefined, Status)).toBeUndefined()
  })

  it('should reject a value outside the enum', () => {
    expect(() => EnumValueObject.initiate('status', 'unknown', Status)).toThrow(
      new FieldValidationError('Property status must be one of active, inactive'),
    )
  })

  it('should reject an empty value before validating the enum', () => {
    expect(() => EnumValueObject.initiate('status', '', Status)).toThrow(
      new FieldValidationError('Property status must be a non-empty string'),
    )
  })
})
