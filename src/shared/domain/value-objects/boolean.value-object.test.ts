import { FieldValidationError } from '../errors/field-validation.error'

import { BooleanValueObject } from './boolean.value-object'

describe('BooleanValueObject', () => {
  it.each([true, false])('should create a boolean with value %s', value => {
    expect(BooleanValueObject.create('enabled', value).value).toBe(value)
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(BooleanValueObject.createOptional('enabled')).toBeUndefined()
  })

  it('should reject a missing value', () => {
    expect(() =>
      BooleanValueObject.create('enabled', null as unknown as boolean),
    ).toThrow(new FieldValidationError('Property enabled must be provided'))
  })

  it('should reject a non-boolean value', () => {
    expect(() =>
      BooleanValueObject.create('enabled', 'true' as unknown as boolean),
    ).toThrow(new FieldValidationError('Property enabled must be a boolean'))
  })
})
