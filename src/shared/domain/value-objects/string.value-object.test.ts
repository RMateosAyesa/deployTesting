import { FieldValidationError } from '../errors/field-validation.error'

import { StringValueObject } from './string.value-object'

describe('StringValueObject', () => {
  it('should create a string value object', () => {
    expect(StringValueObject.create('name', 'Optima').value).toBe('Optima')
  })

  it('should return undefined when an optional value is not provided', () => {
    expect(StringValueObject.createOptional('name')).toBeUndefined()
  })

  it('should reject a missing value', () => {
    expect(() =>
      StringValueObject.create('name', null as unknown as string),
    ).toThrow(new FieldValidationError('Property name must be provided'))
  })

  it('should reject a non-string value', () => {
    expect(() =>
      StringValueObject.create('name', 10 as unknown as string),
    ).toThrow(new FieldValidationError('Property name must be a string'))
  })

  it('should reject an empty string', () => {
    expect(() => StringValueObject.create('name', '')).toThrow(
      new FieldValidationError('Property name must be a non-empty string'),
    )
  })
})
