import { FieldValidationError } from '../errors/field-validation.error'

import { PositiveIntegerValueObject } from './positive-integer.value-object'

describe('PositiveIntegerValueObject', () => {
  it.each([0, 10])('should create a positive integer with value %s', value => {
    expect(PositiveIntegerValueObject.create('page', value).value).toBe(value)
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(PositiveIntegerValueObject.createOptional('page')).toBeUndefined()
  })

  it('should reject a decimal value', () => {
    expect(() => PositiveIntegerValueObject.create('page', 1.5)).toThrow(
      new FieldValidationError('Property page must be an integer'),
    )
  })

  it('should reject a negative value', () => {
    expect(() => PositiveIntegerValueObject.create('page', -1)).toThrow(
      new FieldValidationError('Property page must be greater than or equal to 0'),
    )
  })
})
