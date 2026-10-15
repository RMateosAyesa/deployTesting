import { FieldValidationError } from '../errors/field-validation.error'

import { NumberValueObject } from './number.value-object'

describe('NumberValueObject', () => {
  it('should create a number value object', () => {
    expect(NumberValueObject.create('value', 0).value).toBe(0)
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(NumberValueObject.createOptional('value')).toBeUndefined()
  })

  it('should reject a missing value', () => {
    expect(() =>
      NumberValueObject.create('value', null as unknown as number),
    ).toThrow(new FieldValidationError('Property value must be provided'))
  })

  it.each([NaN, Infinity, '10'])('should reject invalid number %s', invalidValue => {
    expect(() =>
      NumberValueObject.create('value', invalidValue as unknown as number),
    ).toThrow(new FieldValidationError('Property value must be a number'))
  })
})
